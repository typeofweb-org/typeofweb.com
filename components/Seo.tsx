import Head from 'next/head';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { defaultDescription, defaultCover, host, shortDescription, siteName } from '../constants';
import { usePage, usePermalink } from '../hooks/usePermalink';
import { permalinkIsCategory } from '../utils/categories';
import { getNextSeriesLink, getPrevSeriesLink } from '../utils/series';

import type { SeriesWithToC } from '../types';

const SEP = ' • ';
const MAX_TITLE_LEN = 50;
// const robots = `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`;
const robots = 'noindex, nofollow';

interface SeoProps {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly author?: string | null;
  readonly series?: SeriesWithToC | null;
  readonly cover?: {
    readonly img: { readonly height: number; readonly width: number; readonly src: string };
  } | null;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://typeofweb.com/#organization',
      name: 'Type of Web',
      url: 'https://typeofweb.com/',
      sameAs: [
        'https://www.facebook.com/typeofweb',
        'https://www.instagram.com/michal_typeofweb/',
        'https://linkedin.com/in/mmiszczyszyn',
        'https://www.youtube.com/typeofweb',
        'https://twitter.com/mmiszy',
      ],
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://typeofweb.com/#logo',
        inLanguage: 'pl-PL',
        url: '/wp-content/uploads/2018/12/typeofweb-facebook-image-sharer.png',
        width: 1200,
        height: 627,
        caption: 'Type of Web',
      },
      image: { '@id': 'https://typeofweb.com/#logo' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://typeofweb.com/#website',
      url: 'https://typeofweb.com/',
      name: 'Type of Web',
      description:
        'Blog o programowaniu. Dla front-end i back-end developerów. Trochę o urokach pracy zdalnej, ale przede wszystkim o: JavaScript, React, Vue, Angular, node.js, TypeScript, HapiJS…',
      publisher: { '@id': 'https://typeofweb.com/#organization' },
      // potentialAction: [
      //   {
      //     '@type': 'SearchAction',
      //     target: 'https://typeofweb.com/?s={search_term_string}',
      //     'query-input': 'required name=search_term_string',
      //   },
      // ],
      inLanguage: 'pl-PL',
    },
    {
      '@type': 'CollectionPage',
      '@id': 'https://typeofweb.com/#webpage',
      url: 'https://typeofweb.com/',
      name: 'Type of Web &bull; Blog o programowaniu. Dla front-end i back-end developerów. Trochę o urokach pracy zdalnej, ale przede wszystkim o: JavaScript, React, Vue, Angular, node.js, TypeScript, HapiJS…',
      isPartOf: { '@id': 'https://typeofweb.com/#website' },
      about: { '@id': 'https://typeofweb.com/#organization' },
      description:
        'Blog o programowaniu. Dla front-end i back-end developerów. Trochę o urokach pracy zdalnej, ale przede wszystkim o: JavaScript, React, Vue, Angular, node.js, TypeScript, HapiJS…',
      inLanguage: 'pl-PL',
    },
  ],
};

export const Seo = memo<SeoProps>(
  ({ title = '', description = defaultDescription, cover = defaultCover, author, series }) => {
    const { query: _query, asPath } = useRouter();
    const permalink = usePermalink();
    const page = usePage();

    const pageTitle = page ? `Strona ${page}` : ``;

    const next = getNext(permalink, series, page);
    const prev = getPrev(permalink, series, page);

    const type = permalink ? 'article' : 'website';
    const isCategory = permalink ? permalinkIsCategory(permalink) : false;
    const relevantTitle = isCategory ? `Kategoria ${permalink}` : title;

    let fullTitle = (relevantTitle ? [relevantTitle, pageTitle, siteName] : [siteName, pageTitle])
      .filter((x): x is string => !!x && !!x.trim())
      .map((x) => x.replace(/%%(title|page|sep|sitename)%%/gi, '').trim())
      .join(SEP)
      .trim();
    if (fullTitle.length < MAX_TITLE_LEN) {
      fullTitle += ` ${SEP} ${shortDescription}`;
    }

    const canonical = (page === 1 ? `${host}${asPath}`.replace(/\/strona\/1$/, '/') : `${host}${asPath}`)
      .trim()
      .replace(/\/$/, '');

    return (
      <Head>
        <title>{fullTitle}</title>
        {description && <meta key="description" name="description" content={description.slice(0, 177)} />}
        <meta key="robots" name="robots" content={robots} />
        <meta key="googlebot" name="googlebot" content={robots} />
        <meta key="bingbot" name="bingbot" content={robots} />
        <link key="profile" rel="profile" href="https://gmpg.org/xfn/11" />
        <link key="canonical" rel="canonical" href={canonical} />

        <link rel="index" title="Strona główna" href={`${host}/`} />
        {next && <link key="next" rel="next" href={next} />}
        {prev && <link key="prev" rel="prev" href={prev} />}

        <meta key="og:locale" property="og:locale" content="pl_PL" />
        <meta key="og:type" property="og:type" content={type} />
        <meta key="og:title" property="og:title" content={fullTitle} />
        {description && <meta key="og:description" property="og:description" content={description} />}
        <meta key="og:url" property="og:url" content={canonical} />
        <meta key="og:site_name" property="og:site_name" content={siteName} />
        {type === 'article' && (
          <meta key="article:publisher" property="article:publisher" content="https://www.facebook.com/typeofweb" />
        )}
        {type === 'article' && author && <meta key="article:author" property="article:author" content={author} />}

        {cover && (
          <>
            <meta property="og:image" content={cover.img.src} />
            <meta property="og:image:width" content={cover.img.width.toString()} />
            <meta property="og:image:height" content={cover.img.height.toString()} />
          </>
        )}

        <meta key="fb:app_id" property="fb:app_id" content="1709793622637583" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@mmiszy" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#5cb784" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#5cb784" />
        <meta name="theme-color" content="#5cb784" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="Type of Web &raquo; Kanał z wpisami"
          href={`${host}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/json"
          title="Type of Web &raquo; Kanał z wpisami"
          href={`${host}/feed.json`}
        />
      </Head>
    );
  },
);
Seo.displayName = 'Seo';

function getNext(permalink: string | null | undefined, series: SeriesWithToC | null | undefined, page?: number) {
  if (permalink && series) {
    const nextSeries = getNextSeriesLink(permalink, series);
    if (nextSeries) {
      return `${host}/${nextSeries.permalink}`;
    }
  }

  if (page) {
    return `${host}/strona/${page + 1}/`;
  }

  return null;
}
function getPrev(permalink: string | null | undefined, series: SeriesWithToC | null | undefined, page?: number) {
  if (permalink && series) {
    const prevSeries = getPrevSeriesLink(permalink, series);
    if (prevSeries) {
      return `${host}/${prevSeries.permalink}`;
    }
  }

  if (page && page > 1) {
    return `${host}/strona/${page - 1}/`;
  }
  return null;
}
