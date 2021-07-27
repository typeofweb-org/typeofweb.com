/* eslint-disable @typescript-eslint/consistent-type-assertions, functional/prefer-readonly-type -- ok */
// import RehypeToc from '@jsdevtools/rehype-toc';
import RehypePrism from '@mapbox/rehype-prism';
import HastUtilToString from 'hast-util-to-string';
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

import type { Node, Parent } from 'unist';

interface HtmlNode extends Node {
  type: 'element';
  children?: HtmlNode[];
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
interface PreNode extends HtmlNode {
  tagName: 'pre';
  properties?: {
    className?: string[] | undefined;
    [prop: string]: string[] | string | undefined;
  };
}

function isPreNode(node: Node): node is PreNode {
  return node && node.type === 'element' && (node as PreNode).tagName === 'pre';
}

function isAnchorNode(node: Node): node is AnchorNode {
  return node && node.type === 'element' && (node as AnchorNode).tagName === 'a';
}

function isPNode(node: Node): node is PNode {
  return node && node.type === 'element' && (node as PNode).tagName === 'p';
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

function addDataToCodeBlocks(): import('unified').Transformer {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!isPreNode(node)) {
        return;
      }

      const prefix = 'language-';
      const lang = node.properties?.className?.find((className) => className.startsWith(prefix))?.slice(prefix.length);
      if (lang) {
        node.properties = {
          ...node.properties,
          'data-lang': lang,
          'aria-label': `Kod w języku programowania ${lang.toUpperCase()}`,
        };
      }
    });
  };
}

export function toHtmlString(source: string, options: { excerpt: false }): import('vfile').VFile;
export function toHtmlString(source: string, options: { excerpt: true }): string;
export function toHtmlString(
  source: string,
  options: { excerpt: boolean } = { excerpt: false },
): string | import('vfile').VFile {
  let processor = Unified.unified()
    .use(RemarkParse)
    .use(RemarkGfm)
    .use(RemarkFrontmatter)
    .use(RemarkMath)
    .use(RemarkRehype, { allowDangerousHtml: true })
    .use(RehypeRaw);

  if (options.excerpt) {
    processor = processor.use(getOnlyFirstPara).use(addLeadToFirstParagraph);
  }

  processor = processor
    .use(RehypeKatex as any, { strict: false })
    .use(wrapLinksInSpans)
    .use(RehypeSlug)
    .use(RehypeAutolinkHeadings)
    .use(RehypePrism)
    .use(addDataToCodeBlocks);

  if (options.excerpt) {
    const parsed = processor.parse(source);
    const result = processor.runSync(parsed);
    return HastUtilToString(result);
  }

  return processor.use(RehypeStringify).processSync(source) as any;
}
