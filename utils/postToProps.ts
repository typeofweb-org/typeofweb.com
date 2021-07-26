import { getExcerptAndContent } from './wordpress';

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
