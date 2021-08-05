/* eslint-disable @typescript-eslint/consistent-type-assertions, functional/prefer-readonly-type -- ok */
// import RehypeToc from '@jsdevtools/rehype-toc';
import RehypePrism from '@mapbox/rehype-prism';
import HastUtilToString from 'hast-util-to-string';
import { serialize } from 'next-mdx-remote/serialize';
import RehypeAutolinkHeadings from 'rehype-autolink-headings';
import RehypeKatex from 'rehype-katex';
import RehypeRaw from 'rehype-raw';
import RehypeSlug from 'rehype-slug';
import RehypeStringify from 'rehype-stringify';
import RemarkFrontmatter from 'remark-frontmatter';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';
import RemarkParse from 'remark-parse';
import RemarkRehype from 'remark-rehype';
import * as Unified from 'unified';
import { visit } from 'unist-util-visit';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { Node, Parent } from 'unist';

interface HtmlNode extends Node {
  tagName: string;
  type: 'element';
  children?: HtmlNode[];
  properties?: {
    [prop: string]: string[] | string | undefined;
  };
}
interface MdxNode extends Node {
  type: 'mdxJsxTextElement';
  name: string;
  children?: (MdxNode | HtmlNode)[];
  properties?: {
    [prop: string]: string[] | string | undefined;
  };
}
interface AnchorNode extends HtmlNode {
  tagName: 'a';
  properties?: {
    href?: string | undefined;
    [prop: string]: string[] | string | undefined;
  };
}
interface PNode extends HtmlNode {
  tagName: 'p';
}
interface MdxPNode extends MdxNode {
  name: 'p';
}
interface PreNode extends HtmlNode {
  tagName: 'pre';
  properties?: {
    className?: string[] | undefined;
    [prop: string]: string[] | string | undefined;
  };
}
interface CodeNode extends HtmlNode {
  tagName: 'code';
  properties?: {
    className?: string[] | undefined;
    [prop: string]: string[] | string | undefined;
  };
}
interface PathNode extends HtmlNode {
  tagName: 'path';
  properties?: {
    d?: string;
    [prop: string]: string[] | string | undefined;
  };
}

function isPreNode(node: Node): node is PreNode {
  return node && node.type === 'element' && (node as PreNode).tagName === 'pre';
}
function isCodeNode(node: Node): node is CodeNode {
  return node && node.type === 'element' && (node as CodeNode).tagName === 'code';
}

function isAnchorNode(node: Node): node is AnchorNode {
  return node && node.type === 'element' && (node as AnchorNode).tagName === 'a';
}

function isPNode(node: Node): node is PNode {
  return node && node.type === 'element' && (node as PNode).tagName === 'p';
}
function isMdxPNode(node: Node): node is MdxPNode {
  return node && node.type === 'mdxJsxTextElement' && (node as MdxPNode).name === 'p';
}
function isPathNode(node: Node): node is PathNode {
  return node && node.type === 'element' && (node as PathNode).tagName === 'path';
}

function isParentNode(node: Node): node is Parent {
  return node && 'children' in node;
}

function wrapLinksInSpans(): import('unified').Transformer {
  return function transformer(tree) {
    const preorder = (node: Node) => {
      if (isAnchorNode(node)) {
        return {
          type: 'element',
          tagName: 'span',
          properties: { class: 'inner-link' },
          children: [node],
        };
      }
      if (isParentNode(node)) {
        node.children = node.children.map((child) => {
          return preorder(child);
        });
      }
      return node;
    };

    return preorder(tree);
  };
}

function fixSvgPaths(): import('unified').Transformer {
  return function transformer(tree) {
    const run = (node: Node) => {
      if (isPathNode(node)) {
        if (node.properties?.d) {
          node.properties.d = node.properties.d.replace(/\s+/g, ' ');
        }
        return node;
      }
      if (isParentNode(node)) {
        node.children = node.children.map((child) => {
          return run(child);
        });
      }
      return node;
    };

    return run(tree);
  };
}

function addLeadToFirstParagraph(): import('unified').Transformer {
  return function transformer(tree) {
    const run = (node: Node): { found: boolean; node: HtmlNode } => {
      if (isPNode(node)) {
        return {
          found: true,
          node: {
            ...node,
            properties: {
              ...node.properties,
              class: 'lead',
            },
          },
        };
      } else if (isParentNode(node)) {
        const c = (node.children as HtmlNode[]).reduce<{
          found: boolean;
          children: HtmlNode[];
        }>(
          ({ found, children }, node) => {
            if (found) {
              return { found, children: [...children, node] };
            } else {
              const result = run(node);
              return { found: result.found, children: [...children, result.node] };
            }
          },
          { found: false, children: [] },
        );
        return {
          found: c.found,
          node: {
            ...(node as HtmlNode),
            children: c.children,
          },
        };
      } else {
        return { found: false, node: node as HtmlNode };
      }
    };

    return run(tree).node;
  };
}

function getOnlyFirstPara(): import('unified').Transformer {
  return function transformer(tree) {
    const run = (node: Node): Node | undefined => {
      if (isPNode(node)) {
        return node;
      }
      if (isParentNode(node)) {
        return node.children.find(isPNode);
      }
    };

    const result = run(tree);
    return result;
  };
}

export function collapseParagraphs(): import('unified').Transformer {
  return function transformer(tree) {
    const run = (node: Node): HtmlNode | MdxNode | Node => {
      console.log(node.type);
      if (node.type === 'element') {
        console.log(node);
      }
      if (isPNode(node)) {
        if (
          node.children?.length === 1 &&
          node.children[0] &&
          (isPNode(node.children[0]) || isMdxPNode(node.children[0]))
        ) {
          return node.children[0];
        } else {
          // what to do with multiple paragraphs?
          return node;
        }
      } else if (isParentNode(node)) {
        node.children = node.children.map(run);
      }
      return node;
    };
    return run(tree);
  };
}

export function normalizeHeaders(): import('unified').Transformer {
  return function transformer(tree) {
    const desiredHeading = 2;

    let mostImportantHeading = Infinity;
    visit(tree, 'element', (node: HtmlNode) => {
      if (node.tagName.length === 2 && node.tagName.toLowerCase().startsWith('h')) {
        const level = parseInt(node.tagName.substr(1), 10);
        if (level < mostImportantHeading) {
          mostImportantHeading = level;
        }
      }
    });
    if (mostImportantHeading === Infinity) {
      return tree;
    }

    visit(tree, 'element', (node: HtmlNode) => {
      if (node.tagName.length === 2 && node.tagName.toLowerCase().startsWith('h')) {
        const level = parseInt(node.tagName.substr(1), 10);
        const newLevel = desiredHeading - mostImportantHeading + level;
        node.tagName = `h${newLevel}`;
      }
    });
  };
}

export function addDataToCodeBlocks(): import('unified').Transformer {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!isPreNode(node) && !isCodeNode(node)) {
        return;
      }

      const prefix = 'language-';
      const lang = node.properties?.className?.find((className) => className.startsWith(prefix))?.slice(prefix.length);
      if (lang) {
        node.properties = {
          ...node.properties,
          'data-lang': lang,
          ...(isPreNode(node) && { 'aria-label': `Kod w języku programowania ${lang.toUpperCase()}` }),
        };
      }
    });
  };
}

const commonRemarkPlugins = [RemarkGfm, RemarkFrontmatter, RemarkMath];
const commonRehypePlugins = [
  normalizeHeaders,
  [RehypeKatex, { strict: 'ignore' }],
  wrapLinksInSpans,
  RehypeSlug,
  RehypeAutolinkHeadings,
  RehypePrism,
  addDataToCodeBlocks,
  collapseParagraphs,
];

export function toMdx(source: string, frontmatter: object): Promise<MDXRemoteSerializeResult<Record<string, unknown>>> {
  return serialize(
    source
      .replace(/style="(.*?)"/g, (match, styles: string) => {
        const jsxStyles = JSON.stringify(
          Object.fromEntries(
            [...styles.trim().matchAll(/(.*?)\s*:\s*(.*)/g)].map(([, property, value]) => {
              if (!property?.trim() || !value?.trim()) {
                return [];
              }
              const trimmedProperty = property.trim();
              const trimmedValue = value.trim();
              return [
                toCamelCase(trimmedProperty),
                trimmedValue.endsWith(';') ? trimmedValue.slice(0, -1) : trimmedValue,
              ];
            }),
          ),
        );
        return `style={${jsxStyles}}`;
      })
      .replace(/class="(.*?)"/g, 'className="$1"'),
    {
      scope: { data: frontmatter },
      mdxOptions: {
        remarkPlugins: [...commonRemarkPlugins],
        rehypePlugins: [...commonRehypePlugins, fixSvgPaths as any],
      },
    },
  );
}

export function toHtml(source: string, options: { excerpt: false }): import('vfile').VFile;
export function toHtml(source: string, options: { excerpt: true }): string;
export function toHtml(
  source: string,
  options: { excerpt: boolean } = { excerpt: false },
): string | import('vfile').VFile {
  let processor = Unified.unified().use(RemarkParse);
  commonRemarkPlugins.forEach((plugin) => (processor = processor.use(plugin)));
  processor = processor.use(RemarkRehype, { allowDangerousHtml: true }).use(RehypeRaw);

  if (options.excerpt) {
    processor = processor.use(getOnlyFirstPara).use(addLeadToFirstParagraph);
  }

  commonRehypePlugins.forEach(
    (plugin) =>
      (processor = Array.isArray(plugin) ? processor.use(...(plugin as [any, any])) : processor.use(plugin as any)),
  );

  if (options.excerpt) {
    const parsed = processor.parse(source);
    const result = processor.runSync(parsed);
    return HastUtilToString(result);
  }

  return processor.use(RehypeStringify).processSync(source) as any;
}
// snake case to camel case
function toCamelCase(str: string): any {
  return str.replace(/-([a-z])/gi, ([_, g]) => (g ? g.toUpperCase() : ''));
}
