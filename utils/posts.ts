import GrayMatter from 'gray-matter';

import { allCategories, categoriesToMainCategory, categorySlugToCategory } from './categories';
import { splitContent, trimExcerpt } from './excerpt';
import { listFilesInDir, pathToLegacyPosts, pathToPosts, pathToPages, readFile } from './fs';
import { getCommentsCount } from './getCommentsCount';
import { toHtml, toMdx } from './markdown';
import { memoize } from './memoize';
import { allSeries } from './series';

import type { PromiseValue } from '../types';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export const readAllPosts = (() => {
  // const memoizedReadAllPosts = process.env.NODE_ENV === 'production' ? memoize(readAllPosts) : readAllPosts;
  const memoizedReadAllPosts = readAllPosts;

  return ({
    category,
    series,
    skip,
    limit,
    includePages,
    includeCommentsCount,
  }: {
    readonly category?: string;
    readonly series?: string;
    readonly skip?: number;
    readonly limit?: number;
    readonly includePages?: boolean;
    readonly includeCommentsCount?: boolean;
  } = {}): ReturnType<typeof readAllPosts> => {
    return memoizedReadAllPosts({
      category,
      series,
      skip,
      limit,
      includePages,
      includeCommentsCount,
    });
  };

  async function readAllPosts({
    category,
    series,
    skip,
    limit,
    includePages,
    includeCommentsCount,
  }: {
    readonly category?: string;
    readonly series?: string;
    readonly skip?: number;
    readonly limit?: number;
    readonly includePages?: boolean;
    readonly includeCommentsCount?: boolean;
  } = {}) {
    const filePaths = (
      await Promise.all([
        listFilesInDir(pathToLegacyPosts),
        listFilesInDir(pathToPosts),
        includePages ? listFilesInDir(pathToPages) : null,
      ])
    ).flat();

    const postsAndPaths = await Promise.all(
      filePaths
        .filter((filePath): filePath is Exclude<typeof filePath, null> => !!filePath)
        .map(async (absolutePath) => {
          const { file: post, relativePath: filePath } = await readFile(absolutePath);
          return { filePath, post };
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
        postsWithFm.map(async (fm) => {
          return {
            filePath: fm.filePath,
            content: fm.content,
            data: {
              ...fm.data,
              date: fm.data.date?.toISOString(),
              permalink: fm.data.permalink,
              authors: fm.data.authors || ['michal-miszczyszyn'],
              commentsCount: includeCommentsCount ? await getCommentsCount(fm.data.title) : 0,
            },
          };
        }),
      ),
    };
  }
})();

export async function getAllPermalinks() {
  const { posts } = await readAllPosts({ includePages: true, includeCommentsCount: false });
  return [
    ...allCategories.map((n) => n.slug),
    ...allSeries.map((s) => s.slug),
    ...posts.map((fm) => fm.data.permalink),
  ];
}

export async function getImportantPermalinks() {
  const { posts } = await readAllPosts({ includePages: true, limit: 15, skip: 0, includeCommentsCount: false });

  return [
    ...allCategories.map((n) => n.slug),
    ...allSeries.map((s) => s.slug),
    ...posts.map((fm) => fm.data.permalink),
  ];
}

export async function getSeriesPermalinks() {
  const { posts } = await readAllPosts({ includePages: false, includeCommentsCount: false });
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
  const { posts } = await readAllPosts({ includePages: true, includeCommentsCount: true });
  return posts.find((fm) => fm.data.permalink === permalink);
}
export type PostByPermalink = PromiseValue<ReturnType<typeof getPostByPermalink>>;

export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: true; readonly parseOembed: boolean },
): Promise<{ readonly excerpt: string; readonly isMdx: boolean }>;
export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: false; readonly parseOembed: boolean },
): Promise<
  | { readonly excerpt: string; readonly isMdx: true; readonly content: MDXRemoteSerializeResult }
  | { readonly excerpt: string; readonly isMdx: false; readonly content: string }
>;
export async function getExcerptAndContent(
  post: PostByPermalink,
  options: { readonly onlyExcerpt: boolean; readonly parseOembed: boolean },
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

  const excerptString = await toHtml(excerpt ?? '', { excerpt: true, parseOembed: options.parseOembed });
  const ex = trimExcerpt(excerptString);

  if (options.onlyExcerpt) {
    return {
      excerpt: ex,
      isMdx: false as const,
    };
  }

  if (postsThatWeKnowAreHtml.includes(post.data.permalink)) {
    return {
      excerpt: excerptString,
      content: (await toHtml(content, { excerpt: false, parseOembed: options.parseOembed })).toString('utf-8'),
      isMdx: false as const,
    };
  }

  try {
    return {
      excerpt: excerptString,
      content: await toMdx(content, post.data, { parseOembed: options.parseOembed }),
      isMdx: true as const,
    };
  } catch (err) {
    console.log(`\n\nERR --> ${post.data.permalink}\n\n`);
    // console.log(post.data.permalink, err);
    return {
      excerpt: excerptString,
      content: (await toHtml(content, { excerpt: false, parseOembed: options.parseOembed })).toString('utf-8'),
      isMdx: false as const,
    };
  }
}

const postsThatWeKnowAreHtml = [
  'asynchronicznosc-w-redux-redux-thunk',
  'flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych',
  'tworzymy-wlasne-dependency-injection-w-typescript',
  'jak-kurs-programowania-ani-bootcamp-nie-zrobi-z-ciebie-programisty-w-dwa-miesiące',
  'komunikacja-pomiedzy-komponentami-w-react-js',
  'poprawne-bindowanie-funkcji-react-js',
  'testowanie-react-js-enzyme-props-state-interakcje',
  'testowanie-aplikacji-react-js-podstawy-enzyme',
  'react-js-na-github-pages-dzieki-create-react-app',
  'tworzenie-aplikacji-react-js-dzieki-create-react-app',
  'react-js-w-przykladach-filtrowanie-statycznej-listy',
  'odmiana-rzeczownikow-przy-liczebnikach-jezyku-polskim',
  'metody-cyklu-zycia-komponentu-react-js',
  'state-react-js-2',
  'state-react-js',
  'joi-walidacja-danych',
  'pierwszy-komponent-react-js',
  'this-js-kontekst-wywolania-funkcji',
  'kilka-faktow-na-temat-promise',
  'symlink-zip-upload-plikow-dla-hackera',
  'usuwanie-bialych-paskow-safari-iphone-x',
  'payment-request-api-platnosci-przegladarce',
  'praca-zdalna-rekrutacja-do-toptal',
  'observable-rxjs',
  'tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-3-dokumentacja-api',
  'tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-2',
  'tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-1',
  'dobry-czytelny-czysty-kod',
  'innerhtml-furtka-do-xss',
  'kurs-typescript-czesc-3',
  'weekly-javascript-challenge-3',
  'kurs-typescript-czesc-2',
  'weekly-javascript-challenge-1',
  'weekly-javascript-challenge-2',
  'dependency-injection-w-angular-2',
  'nowy-font-na-githubie-font-systemowy',
  'typescript-czesc-1',
  'wzorce-projektowe-dependency-injection',
  'komunikacja-pomiedzy-komponentami-w-angular-2',
  'angular-2-i-redux',
  'wlasne-komponenty-w-angular-2',
  'wstep-do-angular-2',
  'struktura-aplikacji-angularjs-czesc-2-komponenty',
  'struktura-aplikacji-angularjs-czesc-1',
  'asi-czyli-automatyczne-wstawianie-srednikow',
  'komunikacja-pomiedzy-kontrolerami',
  'typescript-na-serwerze',
  'interakcja-komponentami-react-js',
  'klasy-jako-komponenty-react-js',
  'props-czyli-atrybuty-react-js',
  'hackowanie-css',
];

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
