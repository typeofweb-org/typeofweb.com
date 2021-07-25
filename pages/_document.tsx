import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pl-PL">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const floaded=()=>document.documentElement.className+=' fonts-loaded';
              if(sessionStorage.fonts)floaded();
              else Promise.all(["400 1em Merriweather","700 1em Merriweather","italic 400 1em Merriweather","italic 700 1em Merriweather","400 1em Fira Sans","600 1em Fira Sans","400 1em Fira Mono"].map(n=>document.fonts.load(n))).then(() => {sessionStorage.fonts=true;floaded();})
              setTimeout(()=>document.documentElement.className+=' animations-ready',1000);
            `.trim(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
