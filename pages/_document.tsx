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
        <Head />
        <body>
          <svg style={{ display: 'none' }} version="2.0">
            <defs>
              <symbol id="fancy-link-underline" preserveAspectRatio="none" viewBox="0 0 101 9">
                <path
                  d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
                  pathLength="1"
                />
              </symbol>
            </defs>
          </svg>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
