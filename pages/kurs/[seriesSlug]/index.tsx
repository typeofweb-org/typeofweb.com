import AuthorsJson from '../../../authors.json';
import { getMarkdownPostsFor, getSeriesLinks, postToProps } from '../../../utils/postToProps';
import { getSeriesPermalinks } from '../../../utils/posts';
import { seriesSlugToSeries } from '../../../utils/series';
import IndexPage from '../../index';

import type { SeriesWithToC } from '../../../types';
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

  const series = seriesSlugToSeries(seriesSlug);
  const links = series ? await getSeriesLinks({ series, includeCommentsCount: false }) : null;

  const seriesLinks: SeriesWithToC | null =
    series && links
      ? {
          links,
          name: series.name,
          slug: series.slug,
          currentIndex: -1,
          count: links.length,
        }
      : null;

  return {
    revalidate: 60 * 60 * 2,
    props: { posts, page, postsCount, permalink: seriesSlug, pageKind: 'series' as const, seriesLinks },
  };
};

export default IndexPage;
