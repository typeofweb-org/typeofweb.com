import Head from 'next/head';
import Script from 'next/script';

import { Seo } from '../components/Seo';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';

import type { AppType } from 'next/dist/next-server/lib/utils';

import '../styles.css';
import '../fonts.css';
import '../prism.css';
import '../node_modules/katex/dist/katex.min.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script strategy="afterInteractive" key="fonts">
        {`{const e=()=>o.className+=" fonts-loaded",o=document.documentElement,a="00 1em Merriweather",n="00 1em Fira Sans";sessionStorage.fonts?e():Promise.all(["4"+a,"7"+a,"italic 4"+a,"italic 7"+a,"4"+n,"6"+n,"400 1em Fira Mono"].map(e=>document.fonts.load(e))).then(()=>{sessionStorage.fonts=!0,e()})}`}
      </Script>
      <Script strategy="afterInteractive" key="gtag">
        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)}`}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Seo />
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KNFC661M43"
        strategy="lazyOnload"
        onLoad={() => {
          gtag('js', new Date());
          gtag('config', 'G-KNFC661M43');
        }}
      />
      <Script strategy="lazyOnload">{`if (typeof CSS !== 'undefined' && typeof CSS.paintWorklet !== 'undefined') {CSS.paintWorklet.addModule('/fancyLinkUnderline.js');}`}</Script>
    </>
  );
};

export default MyApp;
