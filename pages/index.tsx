import { Fragment } from 'react';

import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';
import { postToProps } from '../utils/postToProps';
import { readAllPosts } from '../utils/wordpress';

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

const PAGE_SIZE = 10;

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const markdownPosts = (await readAllPosts()).slice(0, PAGE_SIZE);
  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default;

  const posts = markdownPosts.map((post) => postToProps(post, authorsJson)).map((p) => ({ ...p, content: '' }));

  return { props: { posts } };
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
            href={post.frontmatter.permalink}
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
