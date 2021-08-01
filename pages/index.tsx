import { Fragment } from 'react';

import { Pagination } from '../components/atoms/Pagination';
import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { host } from '../constants';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';

import type { InferGetStaticPropsType } from '../types';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { posts: allPosts, page, postsCount } = await getMarkdownPostsFor();

  if (allPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default;

  const posts = (await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true })))).map(
    (p) => ({
      ...p,
      content: '',
    }),
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary
  return { props: { posts, page, postsCount, permalink: null as string | null } };
};

const IndexPage = ({ posts, postsCount, permalink }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TwoColumns withSidebar={true} pageKind="index">
      {posts.map((post, i) => {
        if (!post.excerpt) {
          console.warn(`Missing excerpt for post ${post.frontmatter.id}!`);
          return null;
        }
        const sneakPeek = (
          <ArticleSneakPeek
            key={post.frontmatter.id}
            title={post.frontmatter.title}
            mainCategory={post.frontmatter.mainCategory}
            href={'/' + post.frontmatter.permalink}
            authors={post.frontmatter.authors}
            cover={post.frontmatter.cover ? { ...post.frontmatter.cover, preload: i === 0 } : null}
            id={post.frontmatter.id}
            index={post.frontmatter.index}
            excerpt={post.excerpt}
          />
        );

        if (i === 0) {
          return (
            <Fragment key={post.frontmatter.id}>
              {sneakPeek}
              <NewsletterForm />
            </Fragment>
          );
        }
        return sneakPeek;
      })}
      <Pagination pages={Math.ceil(postsCount / 10)} prefix={permalink ? `${host}/${permalink}` : host} />
    </TwoColumns>
  );
};

export default IndexPage;
