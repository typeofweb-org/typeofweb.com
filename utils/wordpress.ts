import Fs from 'fs/promises';
import Path from 'path';
import Url from 'url';

import GrayMatter from 'gray-matter';

import { toHtmlString } from './markdown';

import type { PromiseValue } from '../types';

const pathToPosts = Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), '..', 'wordpress_posts');

async function readFilesInDir(dir: string): Promise<readonly string[]> {
  const entries = await Fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = Path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return await readFilesInDir(fullPath);
        }
        if (entry.isFile() && entry.name.endsWith('.md')) {
          return fullPath;
        }
        return;
      }),
    )
  )
    .flat()
    .filter((x: string | undefined): x is string => !!x);
}

export async function readAllPosts() {
  const files = await readFilesInDir(pathToPosts);

  const posts = await Promise.all(files.map((file) => Fs.readFile(file, 'utf-8')));
  return posts
    .map(readFrontMatter)
    .sort((a, b) => Number(b.data.date) - Number(a.data.date))
    .map((fm) => {
      return {
        content: fm.content,
        data: {
          ...fm.data,
          date: fm.data.date?.toISOString(),
          permalink: fm.data.permalink,
        },
      };
    });
}

export async function getAllPermalinks() {
  const posts = await readAllPosts();
  return posts.map((fm) => fm.data.permalink);
}

export async function getPostByPermalink(permalink: string) {
  const posts = await readAllPosts();
  return posts.find((fm) => fm.data.permalink === permalink);
}
export type PostByPermalink = PromiseValue<ReturnType<typeof getPostByPermalink>>;

export function getExcerptAndContent(post: string) {
  const match = /<!--\s*more\s*-->|$##\s*|\n\n|\r\n\r\n|\<h\d/.exec(post);

  if (!match) {
    throw new Error('???');
  }

  const [excerpt, content] = [post.slice(0, match.index), post.slice(match.index)];

  /**
   * @todo:
   * - parse HTML and add missing <p> tags
   * - fix headings level (h1 -> h2 etc.)
   * - if markdown – compile it
   * - add syntax highlighting
   */

  return {
    excerpt: toHtmlString(excerpt, { excerpt: true }),
    content: toHtmlString(content, { excerpt: false }).toString('utf-8'),
  };
}

interface PostFrontmatter {
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
  readonly category?: readonly { readonly slug: string; readonly name: string }[];
  readonly series?: { readonly slug: string; readonly name: string };
  readonly seo?: {
    readonly focusKeywords?: readonly string[];
    readonly focusKeywordSynonyms?: readonly string[];
  };
}

function readFrontMatter(post: string) {
  const fm = GrayMatter(post);
  return {
    ...fm,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- PostFrontmatter
    data: fm.data as PostFrontmatter,
  };
}
