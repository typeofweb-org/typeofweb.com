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

  const series = post.data.series
    ? {
        name: post.data.series.name,
        slug: post.data.series.slug,
        links: (await readAllPosts({ series: post.data.series.slug })).posts
          .map((p) => ({
            permalink: p.data.permalink,
            title: p.data.title,
          }))
          .reverse(),
      }
    : null;

  return {
    ...contentObj,
    frontmatter: {
      id: post.data.id,
      title: post.data.title,
      index: post.data.index,
      date: post.data.date,
      series,
      authors: authors
        .filter((author): author is AuthorJson => !!author)
        .map((author) => {
          if (onlyExcerpt) {
            return {
              avatarUrl: author.avatarUrl ?? null,
              displayName: author.displayName ?? null,
              slug: author.slug ?? null,
              facebook: author.meta.facebook ?? null,
            };
          }
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
  series,
}: { readonly page?: number; readonly category?: string; readonly series?: string } = {}) {
  const { postsCount, posts } = await readAllPosts({ category, series, skip: (page - 1) * pageSize, limit: pageSize });

  return { postsCount, posts, page };
}
