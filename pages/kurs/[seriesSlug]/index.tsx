import AuthorsJson from '../../../authors.json';
import { getMarkdownPostsFor, postToProps } from '../../../utils/postToProps';
import { getSeriesPermalinks } from '../../../utils/wordpress';
import IndexPage from '../../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const seriesSlugs = await getSeriesPermalinks();

  return {
    paths: seriesSlugs.map((seriesSlug) => {
      return {
        params: { seriesSlug },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.seriesSlug !== 'string') {
    return Promise.resolve({ notFound: true });
  }
  const seriesSlug = params.seriesSlug;

  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor({ series: seriesSlug, page: 1 });

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

  return { props: { posts, page, postsCount, permalink: seriesSlug, pageKind: 'index' as const } };
};

export default IndexPage;
