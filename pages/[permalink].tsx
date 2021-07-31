import { MDXComponent } from '../components/MDXComponent';
import { Seo } from '../components/Seo';
import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { SingleArticle } from '../components/organisms/SingleArticle';
import { TwoColumns } from '../components/templates/TwoColumns';
import { useRunningHeader } from '../hooks/runningHeader';
import { getMarkdownPostsFor, postToProps } from '../utils/postToProps';
import { getAllPermalinks, getPostByPermalink, permalinkIsCategory } from '../utils/wordpress';

import IndexPage from './index';

import type { InferGetStaticPropsType } from '../types';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const permalinks = await getAllPermalinks();

  return {
    paths: permalinks.map((permalink) => {
      return {
        params: { permalink },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  if (!params || typeof params.permalink !== 'string') {
    return Promise.resolve({ notFound: true });
  }
  const permalink = params.permalink;

  if (permalinkIsCategory(permalink)) {
    // display index page
    return getStaticPropsForCategory(permalink);
  } else {
    return getStaticPropsForSingleArticle(permalink);
  }
};

async function getStaticPropsForCategory(category: string) {
  const { allPosts, page } = await getMarkdownPostsFor({ category, page: 1 });

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

  return { props: { posts, page, pageKind: 'index' as const } };
}

async function getStaticPropsForSingleArticle(permalink: string) {
  const post = await getPostByPermalink(permalink);

  if (!post) {
    return { notFound: true };
  }

  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../authors.json')).default;
  return { props: { ...(await postToProps(post, authorsJson)), pageKind: post.data.type } };
}

const PermalinkPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setRunningHeader } = useRunningHeader();

  if (props.pageKind === 'index') {
    return <IndexPage {...props} />;
  }

  const { pageKind, excerpt, frontmatter, ...contentObj } = props;

  return (
    <TwoColumns withSidebar={true} pageKind={pageKind}>
      <Seo title={frontmatter.title} description={excerpt} author={frontmatter.authors[0]?.facebook} />
      <SingleArticle
        ref={setRunningHeader}
        excerpt={excerpt}
        isMdx={contentObj.isMdx}
        content={
          contentObj.isMdx ? (
            <MDXComponent {...contentObj.content} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: contentObj.content }} />
          )
        }
        id={frontmatter.id}
        index={frontmatter.index}
        title={frontmatter.title}
        authors={frontmatter.authors}
        mainCategory={frontmatter.mainCategory}
        href={'/' + frontmatter.permalink}
        cover={frontmatter.cover}
      />
      <NewsletterForm />
    </TwoColumns>
  );
};
export default PermalinkPage;
