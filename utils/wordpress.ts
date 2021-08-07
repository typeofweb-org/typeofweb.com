import Fs from 'fs/promises';
import Path from 'path';
import Url from 'url';

import GrayMatter from 'gray-matter';

import { allCategories, categoriesToMainCategory } from './categories';
import { toHtml, toMdx } from './markdown';
import { allSeries } from './series';

import type { PromiseValue } from '../types';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const pathToLegacyPosts = Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), '..', '_wordpress_posts');
const pathToPosts = Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), '..', '_posts');

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
  const files = [...(await readFilesInDir(pathToLegacyPosts)), ...(await readFilesInDir(pathToPosts))];

  const posts = await Promise.all(files.map((file) => Fs.readFile(file, 'utf-8')));

  let postsWithFm = posts.map(readFrontMatter).sort((a, b) => Number(b.data.date) - Number(a.data.date));

  if (!includePages) {
    postsWithFm = postsWithFm.filter((p) => !p.data.type || p.data.type === 'post');
  }
  if (category) {
    postsWithFm = postsWithFm.filter((post) =>
      'category' in post.data
        ? post.data.category === category
        : categoriesToMainCategory(post.data.categories)?.slug === category,
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
    posts: postsWithFm.map((fm) => {
      return {
        content: fm.content,
        data: {
          ...fm.data,
          date: fm.data.date?.toISOString(),
          permalink: fm.data.permalink,
        },
      };
    }),
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

  const more = /<!--\s*more\s*-->|{\s*\/_\s*more\s*_\/\s*}|{\s*\/\*\s*more\s*\*\/\s*}/;
  const other = /$##\s*|\n\n|\r\n\r\n|\<h\d/;
  const match = more.exec(post.content) || other.exec(post.content);

  if (!match) {
    throw new Error('???');
  }

  const [excerpt, content] =
    post.data.type === 'post'
      ? [post.content.slice(0, match.index), post.content.slice(match.index).replace(more, '')]
      : [null, post.content];

  if ((!excerpt && post.data.type === 'post') || !content) {
    throw new Error('????');
  }

  const excerptString = toHtml(excerpt ?? '', { excerpt: true });
  const excerptWords = excerptString.split(/\s+/);
  const ex = excerptWords.length > 50 ? excerptWords.slice(0, 50).join(' ') + '…' : excerptWords.join(' ');

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
      content: toHtml(content, { excerpt: false }).toString('utf-8'),
      isMdx: false as const,
    };
  }
}

interface LegacyPostFrontmatter {
  readonly id: number;
  readonly title: string;
  readonly index: number;
  readonly date: Date;
  readonly isMarkdown: boolean;
  readonly status: string;
  readonly permalink: string;
  readonly authors: readonly string[];
  readonly guid: string;
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
  readonly index: number;
  readonly title: string;
  readonly permalink: string;
  readonly date: Date;
  readonly authors: readonly string[];
  readonly thumbnail: {
    readonly url: string;
    readonly width: number;
    readonly height: number;
  };
  readonly category: string;
  readonly series?: string;
  readonly seo?: {
    readonly focusKeywords?: readonly string[];
    readonly focusKeywordSynonyms?: readonly string[];
    readonly metadesc?: string;
    readonly title?: string;
  };
}

function readFrontMatter(post: string) {
  const fm = GrayMatter(post);
  return {
    ...fm,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- PostFrontmatter
    data: fm.data as LegacyPostFrontmatter | NewPostFrontmatter,
  };
}
