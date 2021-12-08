import AuthorsJson from '../../../authors.json';
import { pageSize } from '../../../constants';
import { permalinkIsCategory } from '../../../utils/categories';
import { getMarkdownPostsFor, postToProps } from '../../../utils/postToProps';
import { getAllPermalinks, readAllPosts } from '../../../utils/posts';
import IndexPage from '../../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const permalinks = (await getAllPermalinks()).filter(permalinkIsCategory);
  const allPostsForPermalink = await Promise.all(
    permalinks.map(async (permalink) => {
      return {
        ...(await readAllPosts({ category: permalink, includePages: false })),
        category: permalink,
      };
    }),
  );

  const paths = allPostsForPermalink.flatMap(({ postsCount, category }) => {
    const maxPages = Math.ceil(postsCount / pageSize);
    return Array.from({ length: maxPages })
      .map((_, idx) => String(idx + 1))
      .map((page) => ({ params: { permalink: category, page } }));
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.page !== 'string' || Number.isNaN(Number(params.page))) {
    return { notFound: true };
  }

  if (typeof params.permalink !== 'string') {
    return { notFound: true };
  }

  const page = Number(params.page);
  const { posts: allPosts, postsCount } = await getMarkdownPostsFor({ page, category: params.permalink });

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const posts = (
    await Promise.all(
      allPosts.map((post) =>
        postToProps(post, AuthorsJson.authors, {
          onlyExcerpt: true,
          parseOembed: false,
          includeCommentsCount: true,
          includePlaiceholder: true,
        }),
      ),
    )
  ).map((p) => ({
    ...p,
    content: '',
  }));

  return {
    revalidate: 60 * 60 * 2,
    props: { posts, page, postsCount, permalink: params.permalink, pageKind: 'category' },
  };
};

export default IndexPage;
