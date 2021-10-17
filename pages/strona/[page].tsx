// import { pageSize } from '../../constants';
import { getMarkdownPostsFor, postToProps } from '../../utils/postToProps';
// import { readAllPosts } from '../../utils/wordpress';
import IndexPage from '../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  // const { postsCount } = await readAllPosts({ includePages: false });

  // const maxPages = Math.ceil(postsCount / pageSize);

  return {
    // paths: Array.from({ length: maxPages })
    //   .map((_, idx) => String(idx + 1))
    //   .map((page) => ({ params: { page } })),
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.page !== 'string' || Number.isNaN(Number(params.page))) {
    return { notFound: true };
  }

  const page = Number(params.page);
  const { posts: allPosts, postsCount } = await getMarkdownPostsFor({ page });

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../../authors.json')).default.authors;

  const posts = (
    await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true, parseOembed: false })))
  ).map((p) => ({
    ...p,
    content: '',
  }));

  return { props: { posts, page, postsCount } };
};

export default IndexPage;
