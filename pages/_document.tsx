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
else Promise.all([document.fonts.load("400 1em Merriweather"),document.fonts.load("700 1em Merriweather"),document.fonts.load("italic 400 1em Merriweather"),document.fonts.load("italic 700 1em Merriweather"),])
.then(() => {sessionStorage.fonts=true;floaded();})
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
