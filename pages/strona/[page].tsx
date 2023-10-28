import AuthorsJson from '../../authors.json' assert { type: 'json' };
import { pageSize } from '../../constants';
import { getMarkdownPostsFor, postToProps } from '../../utils/postToProps';
import { readAllPosts } from '../../utils/posts';
import { getYouTubeVideosFor } from '../../utils/youtube';
import IndexPage from '../index';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const { postsCount } = await readAllPosts({ includePages: false });

  const maxPages = Math.ceil(postsCount / pageSize);

  return {
    paths: Array.from({ length: maxPages })
      .map((_, idx) => String(idx + 1))
      .map((page) => ({ params: { page } })),
    fallback: false,
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

  const videos = await getYouTubeVideosFor({ page });

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
    revalidate: 60 * 15,
    props: { posts, videos, page, postsCount, pageKind: 'index' },
  };
};

export default IndexPage;
