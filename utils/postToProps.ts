import { getPlaiceholder } from 'plaiceholder';

import { pageSize } from '../constants';

import { categoriesToMainCategory, categorySlugToCategory } from './categories';
import { getPlaiceholder2 } from './plaiceholder';
import { getExcerptAndContent, readAllPosts } from './posts';
import { allSeries, findCurrentSeriesIndex } from './series';

import type { PromiseValue, Series, SeriesWithToC } from '../types';
import type { PostByPermalink } from './posts';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

type AuthorJson = typeof import('../authors.json')['authors'][number];

type Content =
  | { readonly content: string; readonly isMdx: false }
  | { readonly content: MDXRemoteSerializeResult; readonly isMdx: true };

type PostProps = {
  readonly filePath: string;
  readonly frontmatter: PostPropsFrontmatter;
  readonly excerpt: string;
} & Content;
interface PostPropsOnlyExcerpt {
  readonly filePath: string;
  readonly frontmatter: PostPropsFrontmatterOnlyExcerpt;
  readonly excerpt: string;
  readonly isMdx: false;
}

interface PostPropsFrontmatter {
  readonly title: string;
  readonly index: number | null;
  readonly date: string;
  readonly series: SeriesWithToC | null;
  readonly commentsCount: number;
  readonly authors: readonly {
    readonly avatarUrl: string;
    readonly displayName: string;
    readonly slug: string;
    readonly facebook: string | null;
    readonly gender: 'f' | 'm' | null;
    readonly description: string | null;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly instagram: string | null;
    readonly linkedin: string | null;
    readonly twitter: string | null;
    readonly youtube: string | null;
    readonly website: string | null;
    readonly github: string | null;
  }[];
  readonly seo?: {
    readonly focusKeywords?: readonly string[] | null;
    readonly focusKeywordSynonyms?: readonly string[] | null;
    readonly metadesc?: string | null;
    readonly title?: string | null;
  } | null;
  readonly mainCategory: {
    readonly slug: string;
    readonly name: string;
  } | null;
  readonly permalink: string;
  readonly cover: {
    readonly img: { readonly height: number; readonly width: number; readonly src: string };
    readonly blurDataURL: string;
  } | null;
}

interface PostPropsFrontmatterOnlyExcerpt {
  readonly title: string;
  readonly index: number | null;
  readonly date: string;
  readonly series: Series | null;
  readonly commentsCount: number;
  readonly authors: readonly {
    readonly avatarUrl: string;
    readonly displayName: string;
    readonly slug: string;
    readonly facebook: string | null;
  }[];
  readonly seo?: {
    readonly focusKeywords?: readonly string[] | null;
    readonly focusKeywordSynonyms?: readonly string[] | null;
    readonly metadesc?: string | null;
    readonly title?: string | null;
  } | null;
  readonly mainCategory: {
    readonly slug: string;
    readonly name: string;
  } | null;
  readonly permalink: string;
  readonly cover: {
    readonly img: { readonly height: number; readonly width: number; readonly src: string };
    readonly blurDataURL: string | null;
  } | null;
}

function findCurrentPostIndex(
  permalink: string,
  { posts, postsCount }: PromiseValue<ReturnType<typeof readAllPosts>>,
): number | null {
  const index = posts.findIndex((p) => p.data.permalink === permalink);
  if (index === -1) {
    return null;
  }
  // counting from 1
  return postsCount - index;
}

export async function getSeriesLinks({
  includeCommentsCount,
  series,
}: {
  readonly includeCommentsCount: boolean;
  readonly series:
    | string
    | {
        readonly slug: string;
        readonly name: string;
      };
}) {
  return (
    await readAllPosts({
      series: typeof series === 'string' ? series : series?.slug,
      includeCommentsCount: includeCommentsCount,
    })
  ).posts
    .map((p) => ({
      permalink: p.data.permalink,
      title: p.data.title,
    }))
    .reverse();
}

export async function postToProps(
  post: Exclude<PostByPermalink, undefined>,
  authorsJson: readonly AuthorJson[],
  options: {
    readonly onlyExcerpt: true;
    readonly parseOembed: boolean;
    readonly includeCommentsCount: boolean;
    readonly includePlaiceholder: boolean;
  },
): Promise<PostPropsOnlyExcerpt>;
export async function postToProps(
  post: Exclude<PostByPermalink, undefined>,
  authorsJson: readonly AuthorJson[],
  options: {
    readonly onlyExcerpt: false;
    readonly parseOembed: boolean;
    readonly includeCommentsCount: boolean;
    readonly includePlaiceholder: boolean;
  },
): Promise<PostProps>;
export async function postToProps(
  post: Exclude<PostByPermalink, undefined>,
  authorsJson: readonly AuthorJson[],
  options:
    | {
        readonly onlyExcerpt: true;
        readonly parseOembed: boolean;
        readonly includeCommentsCount: boolean;
        readonly includePlaiceholder: boolean;
      }
    | {
        readonly onlyExcerpt: false;
        readonly parseOembed: boolean;
        readonly includeCommentsCount: boolean;
        readonly includePlaiceholder: boolean;
      },
): Promise<PostPropsOnlyExcerpt | PostProps> {
  // @ts-expect-error seriously, TypeScript, stop doing this
  const contentObj = await getExcerptAndContent(post, options);

  const allPosts = await readAllPosts({ includePages: false, includeCommentsCount: false });

  const authors = post.data.authors.map((slug) => authorsJson.find((author) => author.slug === slug));

  const { base64: blurDataURL = null, img = null } =
    options.includePlaiceholder && post.data.thumbnail ? await getPlaiceholder2(post.data.thumbnail) : {};

  const mainCategory =
    'category' in post.data
      ? categorySlugToCategory(post.data.category)
      : 'categories' in post.data
      ? categoriesToMainCategory(post.data.categories)
      : null;

  const seriesLinks = post.data.series
    ? await getSeriesLinks({ series: post.data.series, includeCommentsCount: options.includeCommentsCount })
    : [];

  if (options.onlyExcerpt) {
    const result: PostPropsOnlyExcerpt = {
      filePath: post.filePath,
      excerpt: contentObj.excerpt,
      isMdx: false,
      frontmatter: {
        title: post.data.title,
        index: findCurrentPostIndex(post.data.permalink, allPosts),
        date: post.data.date,
        commentsCount: post.data.commentsCount,
        series: post.data.series
          ? {
              ...(typeof post.data.series === 'string'
                ? allSeries.find((s) => s.slug === post.data.series) || {
                    name: post.data.series,
                    slug: post.data.series,
                  }
                : {
                    name: post.data.series.name,
                    slug: post.data.series.slug,
                  }),
              count: seriesLinks.length,
              currentIndex: findCurrentSeriesIndex(post.data.permalink, seriesLinks),
            }
          : null,
        authors: authors
          .filter((author): author is AuthorJson => !!author)
          .map((author) => {
            return {
              avatarUrl: author.avatarUrl ?? null,
              displayName: author.displayName ?? null,
              slug: author.slug ?? null,
              facebook: author.meta.facebook ?? null,
            };
          }),
        seo: post.data.seo ?? null,
        mainCategory: mainCategory ?? null,
        permalink: post.data.permalink,
        cover: img ? { img: { ...img, src: img.src }, blurDataURL } : null,
      },
    };
    return result;
  } else {
    const result: PostProps = {
      filePath: post.filePath,
      ...contentObj,
      frontmatter: {
        title: post.data.title,
        index: findCurrentPostIndex(post.data.permalink, allPosts),
        date: post.data.date,
        commentsCount: post.data.commentsCount,
        series: post.data.series
          ? {
              ...(typeof post.data.series === 'string'
                ? allSeries.find((s) => s.slug === post.data.series) || {
                    name: post.data.series,
                    slug: post.data.series,
                  }
                : {
                    name: post.data.series.name,
                    slug: post.data.series.slug,
                  }),
              links: seriesLinks,
              count: seriesLinks.length,
              currentIndex: findCurrentSeriesIndex(post.data.permalink, seriesLinks),
            }
          : null,
        authors: authors
          .filter((author): author is AuthorJson => !!author)
          .map((author) => {
            return {
              avatarUrl: author.avatarUrl ?? null,
              displayName: author.displayName ?? null,
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- m or f
              gender: (author.meta.gender as 'm' | 'f') ?? null,
              slug: author.slug ?? null,
              description: author.meta.description ?? null,
              firstName: author.meta.first_name ?? null,
              lastName: author.meta.last_name ?? null,
              facebook: author.meta.facebook ?? null,
              instagram: author.meta.instagram ?? null,
              linkedin: author.meta.linkedin ?? null,
              twitter: author.meta.twitter ?? null,
              youtube: author.meta.youtube ?? null,
              website: author.meta.website ?? null,
              github: author.meta.github ?? null,
            };
          }),
        seo: post.data.seo ?? null,
        mainCategory: mainCategory ?? null,
        permalink: post.data.permalink,
        cover: img && blurDataURL ? { img: { ...img, src: img.src }, blurDataURL } : null,
      },
    };
    return result;
  }
}

export async function getMarkdownPostsFor({
  page,
  category,
  series,
}: {
  readonly page: number;
  readonly category?: string;
  readonly series?: string;
}) {
  const { postsCount, posts } = await readAllPosts({
    category,
    series,
    skip: (page - 1) * pageSize,
    limit: pageSize,
    includeCommentsCount: true,
  });

  return { postsCount, posts, page };
}
