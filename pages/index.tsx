import { Fragment } from 'react';

import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';

import type { InferGetStaticPropsType } from '../types';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { allPosts, page } = await getMarkdownPostsFor();

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

  return { props: { posts, page } };
};

const IndexPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    </TwoColumns>
  );
};

export default IndexPage;
