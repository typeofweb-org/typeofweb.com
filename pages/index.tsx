import { Fragment } from 'react';

import AuthorsJson from '../authors.json';
import { Pagination } from '../components/atoms/Pagination';
import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { host } from '../constants';
import { getUrlForPermalink } from '../utils/permalinks';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';

import type { InferGetStaticPropsType, PageKind, SeriesWithToC } from '../types';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor();

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
    props: {
      posts,
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

const IndexPage = ({
  posts,
  postsCount,
  permalink,
  pageKind,
  seriesLinks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const href = permalink ? getUrlForPermalink(permalink) : null;
  return (
    <TwoColumns withSidebar={true} pageKind={pageKind} series={pageKind === 'series' ? seriesLinks : null}>
      {posts.map((post, i) => {
        if (!post.excerpt) {
          console.warn(`Missing excerpt for post ${post.frontmatter.permalink}!`);
        }
        const sneakPeek = (
          <ArticleSneakPeek
            key={post.frontmatter.permalink}
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

        if (i === 0) {
          return (
            <Fragment key={post.frontmatter.permalink}>
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
