import Head from 'next/head';
import { useRouter } from 'next/router';

interface RouterQuery {
  readonly page?: string;
  readonly permalink?: string;
}

const siteName = `Type of Web`;
const shortDescription = `Blog o programowaniu`;
const defaultDescription = `Blog o programowaniu. Dla front-end i back-end developerów. Trochę o urokach pracy zdalnej, ale przede wszystkim o: JavaScript, React, Vue, Angular, node.js, TypeScript, HapiJS…`;
const SEP = ' • ';
const origin = process.env.NEXT_PUBLIC_VERCEL_URL || 'typeofweb.com';
const MAX_TITLE_LEN = 50;
const robots = `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`;

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly author?: string;
}

export const Seo = ({ title = '', description = defaultDescription, author }: SeoProps) => {
  const { query: _query, asPath } = useRouter();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- RouterQuery
  const query = _query as RouterQuery;

  const page = Number(query.page);
  const pageTitle = query.page ? `Strona ${query.page}` : ``;

  const next = query.page ? page + 1 : null;
  const prev = query.page ? page - 1 : null;

  let fullTitle = [title, pageTitle, siteName].filter((x) => !!x.trim()).join(SEP);
  if (fullTitle.length < MAX_TITLE_LEN) {
    fullTitle += ` ${SEP} ${shortDescription}`;
  }

  const type = query.permalink ? 'article' : 'website';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot" content={robots} />
      <link rel="profile" href="https://gmpg.org/xfn/11" />
      <link rel="canonical" href={`https://${origin}${asPath}`} />
      {next && <link rel="next" href={`https://${origin}/strona/${next}/`} />}
      {prev && prev > 0 && <link rel="prev" href={`https://${origin}/strona/${prev}/`} />}
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://${origin}${asPath}`} />
      <meta property="og:site_name" content={siteName} />
      {type === 'article' && <meta property="article:publisher" content="https://www.facebook.com/typeofweb" />}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      <meta property="fb:app_id" content="1709793622637583" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mmiszy" />

      {/* <link
        rel="alternate"
        type="application/rss+xml"
        title="Type of Web &raquo; Kanał z wpisami"
        href="https://${baseUrl}/feed/"
      /> */}
    </Head>
  );
};
