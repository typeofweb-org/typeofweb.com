import { getExcerptAndContent, readAllPosts } from './wordpress';

import type { PostByPermalink } from './wordpress';

type AuthorJson = typeof import('../authors.json')[number];

export const postToProps = (post: Exclude<PostByPermalink, undefined>, authorsJson: readonly AuthorJson[]) => {
  const { excerpt, content } = getExcerptAndContent(post.content);

  const authors = post.data.authors.map((slug) => authorsJson.find((author) => author.slug === slug));

  return {
    excerpt,
    content,
    frontmatter: {
      id: post.data.id,
      title: post.data.title,
      index: post.data.index,
      authors: authors
        .filter((author): author is AuthorJson => !!author)
        .map((author) => {
          return {
            avatarUrl: author.avatarUrl,
            displayName: author.displayName,
            slug: author.slug,
          };
        }),
      mainCategory: post.data.category?.[0] ?? null,
      permalink: post.data.permalink,
      cover: post.data.thumbnail ?? null,
    },
  };
};

export const PAGE_SIZE = 10;
export async function getMarkdownPostsForPage(page?: number) {
  const allPosts = await readAllPosts();
  const maxPages = Math.ceil(allPosts.length / PAGE_SIZE);

  const p = page ?? maxPages;

  const markdownPosts = p === 1 ? allPosts.slice(-p * PAGE_SIZE) : allPosts.slice(-p * PAGE_SIZE, -(p - 1) * PAGE_SIZE);
  return { markdownPosts, page: p };
}
