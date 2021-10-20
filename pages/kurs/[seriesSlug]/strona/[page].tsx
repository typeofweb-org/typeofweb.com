import { getMarkdownPostsFor, postToProps } from '../../../../utils/postToProps';
import IndexPage from '../../../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.page !== 'string' || Number.isNaN(Number(params.page))) {
    return { notFound: true };
  }

  if (typeof params.seriesSlug !== 'string') {
    return { notFound: true };
  }

  const p = Number(params.page);
  const seriesSlug = params.seriesSlug;
  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor({ series: seriesSlug, page: p });

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../../../../authors.json')).default.authors;

  const posts = (
    await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true, parseOembed: false })))
  ).map((p) => ({
    ...p,
    content: '',
  }));

  return { props: { posts, page, postsCount, permalink: seriesSlug, pageKind: 'index' as const } };
};

export default IndexPage;
