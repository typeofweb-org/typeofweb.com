import { SingleArticle } from '../components/organisms/SingleArticle';
import { postToProps } from '../utils/postToProps';
import { getAllPermalinks, getPostByPermalink, getExcerptAndContent } from '../utils/wordpress';

import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPermalinks();

  return {
    paths: posts.map((permalink) => {
      return {
        params: { permalink },
      };
    }),
    fallback: false,
  };
};

type PromiseValue<T> = T extends PromiseLike<infer R> ? R : T;

type InferGetStaticPropsType<T extends (...args: any) => any> = PromiseValue<ReturnType<T>> extends {
  readonly props?: infer P;
}
  ? P
  : never;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.permalink !== 'string') {
    return { notFound: true };
  }

  const permalink = params.permalink;

  const post = await getPostByPermalink(permalink);

  if (!post) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default;
  return { props: postToProps(post, authorsJson) };
};

const PermalinkPage = ({ excerpt, content, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SingleArticle
      excerpt={excerpt}
      content={content}
      id={frontmatter.id}
      index={frontmatter.index}
      title={frontmatter.title}
      authors={frontmatter.authors}
      mainCategory={frontmatter.mainCategory}
      href={frontmatter.permalink}
      cover={frontmatter.cover}
    />
  );
};
export default PermalinkPage;
