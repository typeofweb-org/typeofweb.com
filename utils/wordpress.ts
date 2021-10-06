import Fs from 'fs/promises';
import Path from 'path';
import Url from 'url';

import GrayMatter from 'gray-matter';

import { allCategories, categoriesToMainCategory, categorySlugToCategory } from './categories';
import { splitContent, trimExcerpt } from './excerpt';
import { getCommentsCount } from './getCommentsCount';
import { toHtml, toMdx } from './markdown';
import { allSeries } from './series';

import type { PromiseValue } from '../types';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export const wordpressFolderName = '_wordpress_posts';
export const postsFolderName = '_posts';
export const pagesFolderName = '_pages';
const basePath = Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), '..');

export const pathToLegacyPosts = Path.resolve(basePath, wordpressFolderName);
export const pathToPosts = Path.resolve(basePath, postsFolderName);
export const pathToPages = Path.resolve(basePath, pagesFolderName);

export async function readFilesInDir(dir: string): Promise<readonly string[]> {
  const entries = await Fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = Path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return await readFilesInDir(fullPath);
        }
        if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
          return fullPath;
        }
        return;
      }),
    )
  )
    .flat()
    .filter((x: string | undefined): x is string => !!x);
}

export async function readAllPosts({
  category,
  series,
  skip,
  limit,
  includePages,
}: {
  readonly category?: string;
  readonly series?: string;
  readonly skip?: number;
  readonly limit?: number;
  readonly includePages?: boolean;
} = {}) {
  const filePaths = (
    await Promise.all([
      readFilesInDir(pathToLegacyPosts),
      readFilesInDir(pathToPosts),
      includePages ? readFilesInDir(pathToPages) : null,
    ])
  ).flat();

  const postsAndPaths = await Promise.all(
    filePaths
      .filter((filePath): filePath is Exclude<typeof filePath, null> => !!filePath)
      .map(async (filePath) => {
        const post = await Fs.readFile(filePath, 'utf-8');
        const relativePath = Path.relative(basePath, filePath);
        return { filePath: relativePath, post };
      }),
  );

  let postsWithFm = postsAndPaths
    .map(({ filePath, post }) => {
      return {
        ...readFrontMatter(post),
        filePath,
      };
    })
    .sort((a, b) => Number(b.data.date) - Number(a.data.date));

  if (category) {
    postsWithFm = postsWithFm.filter((post) =>
      'category' in post.data
        ? categorySlugToCategory(post.data.category)?.slug === category
        : 'categories' in post.data
        ? categoriesToMainCategory(post.data.categories)?.slug === category
        : null,
    );
  }
  if (series) {
    postsWithFm = postsWithFm.filter((post) =>
      typeof post.data.series === 'string' ? post.data.series === series : post.data.series?.slug === series,
    );
  }
  const postsCount = postsWithFm.length;

  if (skip != null && limit) {
    postsWithFm = postsWithFm.slice(skip, skip + limit);
  }

  return {
    postsCount,
    posts: await Promise.all(
      postsWithFm.map((fm) => {
        return {
          filePath: fm.filePath,
          content: fm.content,
          data: {
            ...fm.data,
            date: fm.data.date?.toISOString(),
            permalink: fm.data.permalink,
            authors: fm.data.authors || ['michal-miszczyszyn'],
            commentsCount: getCommentsCount(fm.data.title),
          },
        };
      }),
    ),
  };
}

export async function getAllPermalinks() {
  const { posts } = await readAllPosts({ includePages: true });
  return [
    ...allCategories.map((n) => n.slug),
    ...allSeries.map((s) => s.slug),
    ...posts.map((fm) => fm.data.permalink),
  ];
}

export async function getSeriesPermalinks() {
  const { posts } = await readAllPosts({ includePages: false });
  const seriesSlugs = [
    ...new Set(
      posts
        .map((fm) => (typeof fm.data.series === 'string' ? fm.data.series : fm.data.series?.slug))
        .filter((slug): slug is string => !!slug),
    ),
  ];
  return seriesSlugs;
}

export async function getPostByPermalink(permalink: string) {
  const { posts } = await readAllPosts({ includePages: true });
  return posts.find((fm) => fm.data.permalink === permalink);
}
export type PostByPermalink = PromiseValue<ReturnType<typeof getPostByPermalink>>;

export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: true },
): Promise<{ readonly excerpt: string; readonly isMdx: boolean }>;
export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: false },
): Promise<
  | { readonly excerpt: string; readonly isMdx: true; readonly content: MDXRemoteSerializeResult }
  | { readonly excerpt: string; readonly isMdx: false; readonly content: string }
>;
export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: boolean },
): Promise<
  | { readonly excerpt: string; readonly isMdx: boolean }
  | { readonly excerpt: string; readonly isMdx: true; readonly content: MDXRemoteSerializeResult }
  | { readonly excerpt: string; readonly isMdx: false; readonly content: string }
> {
  if (!post) {
    throw new Error();
  }

  const splittedContent = splitContent(post.content);
  const [excerpt, content] = post.data.type === 'post' ? splittedContent : [null, splittedContent.join('\n')];

  // This check won't pass in preview (when posts has no content yet)
  // if ((!excerpt && post.data.type === 'post') || !content) {
  //   throw new Error('????');
  // }

  const excerptString = await toHtml(excerpt ?? '', { excerpt: true });
  const ex = trimExcerpt(excerptString);

  if (options.onlyExcerpt) {
    return {
      excerpt: ex,
      isMdx: false as const,
    };
  }

  try {
    return {
      excerpt: excerptString,
      content: await toMdx(content, post.data),
      isMdx: true as const,
    };
  } catch (err) {
    // console.log(post.data.permalink, err);
    return {
      excerpt: excerptString,
      content: (await toHtml(content, { excerpt: false })).toString('utf-8'),
      isMdx: false as const,
    };
  }
}

interface LegacyPostFrontmatter {
  readonly title: string;
  readonly date: Date;
  readonly isMarkdown: boolean;
  readonly status: string;
  readonly permalink: string;
  readonly authors: readonly string[];
  readonly type: 'post' | 'page';
  readonly thumbnail?: {
    readonly url: string;
    readonly width: number;
    readonly height: number;
  };
  readonly categories?: readonly { readonly slug: string; readonly name: string }[];
  readonly series?: { readonly slug: string; readonly name: string };
  readonly seo?: {
    readonly focusKeywords?: readonly string[];
    readonly focusKeywordSynonyms?: readonly string[];
    readonly metadesc?: string;
    readonly title?: string;
  };
}

interface NewPostFrontmatter {
  readonly type: never;
  readonly title: string;
  readonly permalink: string;
  readonly date: Date;
  readonly authors: readonly string[];
  readonly thumbnail: {
    readonly url: string;
    readonly width: number;
    readonly height: number;
  };
  readonly category?: string;
  readonly series?: string;
  readonly seo?: {
    readonly focusKeywords?: readonly string[];
    readonly focusKeywordSynonyms?: readonly string[];
    readonly metadesc?: string;
    readonly title?: string;
  };
}

export function readFrontMatter(post: string) {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- this function is ignored
  const { stringify: _, ...fm } = GrayMatter(post);
  return {
    ...fm,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- PostFrontmatter
    data: fm.data as LegacyPostFrontmatter | NewPostFrontmatter,
  };
}
