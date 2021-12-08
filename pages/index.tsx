import { Fragment } from 'react';

import AuthorsJson from '../authors.json';
import { Pagination } from '../components/atoms/Pagination';
import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { VideoSneakPeek } from '../components/organisms/VideoSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { host } from '../constants';
import { getUrlForPermalink } from '../utils/permalinks';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';
import { getYouTubeVideosFor } from '../utils/youtube';

import type { InferGetStaticPropsType, PageKind, SeriesWithToC } from '../types';
import type { YouTubePost } from '../utils/youtube';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor({ page: 1 });

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const videos = await getYouTubeVideosFor({ page: 1 });

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
    props: {
      posts,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
      videos: videos as readonly YouTubePost[] | null,
      page,
      postsCount,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
      permalink: null as string | null,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
      pageKind: 'index' as PageKind,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
      seriesLinks: null as SeriesWithToC | null,
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;
type Post = IndexPageProps['posts'][number];

const IndexPage = ({ posts, videos, postsCount, permalink, pageKind, seriesLinks }: IndexPageProps) => {
  const href = permalink ? getUrlForPermalink(permalink) : null;

  const items = [
    ...posts.map((post) => ({ ...post, type: 'post' as const })),
    ...(videos ?? []).map((video) => ({ ...video, type: 'video' as const })),
  ].sort((a, b) => {
    const dateA = a.type === 'post' ? a.frontmatter.date : a.date;
    const dateB = b.type === 'post' ? b.frontmatter.date : b.date;
    return dateB.localeCompare(dateA);
  });

  return (
    <TwoColumns withSidebar={true} pageKind={pageKind} series={pageKind === 'series' ? seriesLinks : null}>
      {items.map((item, i) => {
        const key = item.type === 'post' ? item.frontmatter.title : item.title;
        const sneakPeek =
          item.type === 'post' ? (
            <PostIndexItem key={key} pageKind={pageKind} post={item} i={i} />
          ) : (
            <VideoIndexItem key={key} video={item} />
          );

        if (i === 0) {
          return (
            <Fragment key={key}>
              {sneakPeek}
              <NewsletterForm />
            </Fragment>
          );
        }
        return sneakPeek;
      })}
      <Pagination pages={Math.ceil(postsCount / 10)} prefix={href ? `${host}${href}` : host} />
    </TwoColumns>
  );
};

export default IndexPage;

const VideoIndexItem = ({ video }: { readonly video: YouTubePost }) => {
  return <VideoSneakPeek video={video} />;
};

const PostIndexItem = ({
  post,
  pageKind,
  i,
}: {
  readonly post: Post;
  readonly pageKind: PageKind;
  readonly i: number;
}) => {
  if (!post.excerpt) {
    console.warn(`Missing excerpt for post ${post.frontmatter.permalink}!`);
  }
  return (
    <ArticleSneakPeek
      title={post.frontmatter.title}
      mainCategory={post.frontmatter.mainCategory}
      permalink={post.frontmatter.permalink}
      authors={post.frontmatter.authors}
      cover={post.frontmatter.cover ? { ...post.frontmatter.cover, preload: i === 0 } : null}
      index={pageKind === 'index' ? post.frontmatter.index : null}
      excerpt={post.excerpt}
      series={post.frontmatter.series}
      commentsCount={post.frontmatter.commentsCount}
    />
  );
};
