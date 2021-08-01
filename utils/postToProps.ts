import { getPlaiceholder } from 'plaiceholder';

import { pageSize } from '../constants';

import { categoriesToMainCategory } from './mainCategory';
import { getExcerptAndContent, readAllPosts } from './wordpress';

import type { PostByPermalink } from './wordpress';

type AuthorJson = typeof import('../authors.json')[number];

export const postToProps = async (
  post: Exclude<PostByPermalink, undefined>,
  authorsJson: readonly AuthorJson[],
  { onlyExcerpt }: { readonly onlyExcerpt?: boolean } = {},
) => {
  const contentObj = await getExcerptAndContent(post, { onlyExcerpt });

  const authors = post.data.authors.map((slug) => authorsJson.find((author) => author.slug === slug));

  const { base64: blurDataURL = null, img = null } = post.data.thumbnail
    ? await getPlaiceholder(encodeURI(post.data.thumbnail.url))
    : {};

  const mainCategory = categoriesToMainCategory(post.data.categories);

  return {
    ...contentObj,
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
            facebook: author.meta.facebook,
          };
        }),
      seo: post.data.seo,
      mainCategory,
      permalink: post.data.permalink,
      cover: img && blurDataURL ? { img, blurDataURL } : null,
    },
  };
};

export async function getMarkdownPostsFor({
  page = 1,
  category,
}: { readonly page?: number; readonly category?: string } = {}) {
  const { postsCount, posts } = await readAllPosts({ category, skip: (page - 1) * pageSize, limit: pageSize });

  return { postsCount, posts, page };
}
