import { Fragment } from 'react';

import { Pagination } from '../components/atoms/Pagination';
import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { host } from '../constants';
import { getUrlForPermalink } from '../utils/permalinks';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';

import type { InferGetStaticPropsType } from '../types';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor();

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default.authors;

  const posts = (
    await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true, parseOembed: false, includeCommentsCount: true, includePlaiceholder: true, })))
  ).map((p) => ({
    ...p,
    content: '',
  }));

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
  return { props: { posts, page, postsCount, permalink: null as string | null } };
};

const IndexPage = ({ posts, postsCount, permalink }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const href = permalink ? getUrlForPermalink(permalink) : null;
  return (
    <TwoColumns withSidebar={true} pageKind="index">
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
            index={post.frontmatter.index}
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
