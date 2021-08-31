// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// This is a demo file once you have tina setup feel free to delete this file

import Head from 'next/head';
import { staticRequest, gql, getStaticPropsForTina } from 'tinacms';

const defaultMarked = (markdown) => markdown;
// Use the props returned by get static props (this can be deleted when the edit provider and tina-wrapper are moved to _app.js)
const BlogPage = (props) => {
  return (
    <>
      <Head>
        {/* Tailwind CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.7/tailwind.min.css"
          integrity="sha512-y6ZMKFUQrn+UUEVoqYe8ApScqbjuhjqzTuwUMEGMDuhS2niI8KA3vhH2LenreqJXQS+iIXVTRL2iaNfJbDNA1Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Marked CDN */}
        <script
          type="text/javascript"
          crossOrigin="anonymous"
          src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        />
      </Head>
      <div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h1 className="m-8 text-center text-gray-900 text-3xl font-extrabold tracking-tight leading-8 sm:text-4xl">
            {props.data.getPostsDocument.data.title}
          </h1>
          {/* Convert markdown to html in the browser only */}
          {typeof window !== 'undefined' && (
            <ContentSection content={window.marked(props.data.getPostsDocument.data.body)}></ContentSection>
          )}
        </div>
        <div className="text-center bg-green-100">
          Lost and looking for a place to start?
          <a href="https://tina.io/guides/tina-cloud/getting-started/overview/" className="text-blue-500 underline">
            {' '}
            Check out this guide
          </a>{' '}
          to see how add TinaCMS to an existing Next.js site.
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const tinaProps = await getStaticPropsForTina({
    query: gql`
      query BlogPostQuery($relativePath: String!) {
        getPostsDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      }
    `,
    variables: { relativePath: `${params.filename}.md` },
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await staticRequest({
    query: gql`
      query GetPostsList {
        getPostsList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
  });

  return {
    paths: postsListData.getPostsList.edges.map((post) => ({
      params: { filename: post.node.sys.filename },
    })),
    fallback: false,
  };
};

export default BlogPage;

const ContentSection = ({ content }) => {
  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:w-full lg:h-full">
        <div className="relative mx-auto max-w-prose h-full text-lg" aria-hidden="true">
          <svg
            className="absolute left-full top-12 transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg
            className="absolute right-full top-1/2 transform -translate-x-32 -translate-y-1/2"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </div>
  );
};
