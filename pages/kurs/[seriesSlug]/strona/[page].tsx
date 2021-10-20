import { pageSize } from '../../../../constants';
import { getMarkdownPostsFor, postToProps } from '../../../../utils/postToProps';
import { permalinkIsSeries } from '../../../../utils/series';
import { getAllPermalinks, readAllPosts } from '../../../../utils/wordpress';
import IndexPage from '../../../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const permalinks = (await getAllPermalinks()).filter(permalinkIsSeries);

  const allPostsForPermalink = await Promise.all(
    permalinks.map(async (permalink) => {
      return {
        ...(await readAllPosts({ series: permalink, includePages: false })),
        series: permalink,
      };
    }),
  );

  const paths = allPostsForPermalink.flatMap(({ postsCount, series }) => {
    const maxPages = Math.ceil(postsCount / pageSize);
    return Array.from({ length: maxPages })
      .map((_, idx) => String(idx + 1))
      .map((page) => ({ params: { seriesSlug: series, page } }));
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
    await Promise.all(
      allPosts.map((post) =>
        postToProps(post, authorsJson, {
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
