import { Fragment } from 'react';

import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { getMarkdownPostsForPage, postToProps } from '../utils/postToProps';

import type { InferGetStaticPropsType } from '../types';
import type { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const { markdownPosts, page } = await getMarkdownPostsForPage();

  if (markdownPosts.length === 0) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default;

  const posts = markdownPosts.map((post) => postToProps(post, authorsJson)).map((p) => ({ ...p, content: '' }));

  return { props: { posts, page } };
};

const IndexPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TwoColumns withSidebar={true} pageKind="index">
      {posts.map((post, i) => {
        const sneakPeek = (
          <ArticleSneakPeek
            key={post.frontmatter.id}
            title={post.frontmatter.title}
            mainCategory={post.frontmatter.mainCategory}
            href={'/' + post.frontmatter.permalink}
            authors={post.frontmatter.authors}
            cover={post.frontmatter.cover}
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
