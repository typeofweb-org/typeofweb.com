import { permalinkIsCategory } from '../../../components/molecules/MainNav';
import { pageSize } from '../../../constants';
import { getMarkdownPostsFor, postToProps } from '../../../utils/postToProps';
import { getAllPermalinks, readAllPosts } from '../../../utils/wordpress';
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

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../../../authors.json')).default;

  const posts = (await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true })))).map(
    (p) => ({
      ...p,
      content: '',
    }),
  );

  return { props: { posts, page, postsCount, permalink: params.permalink } };
};

export default IndexPage;
