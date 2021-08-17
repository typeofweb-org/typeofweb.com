import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pl-PL" dir="ltr">
        <Head>
          <link rel="author" href="humans.txt" />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/firamono-regular-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/firasans-regular-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/firasans-semibold-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/merriweather-12ptbold-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/merriweather-12ptbolditalic-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/merriweather-12ptitalic-typeofweb.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/merriweather-12ptregular-typeofweb.woff2"
          />

          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body itemScope itemType="http://schema.org/WebPage">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
