import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

import { Seo } from '../components/Seo';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';

import type { AppType } from 'next/dist/next-server/lib/utils';

import '../styles.css';
import '../fonts.css';
import '../prism.css';
import '../node_modules/katex/dist/katex.min.css';

function ScriptAfterInteraction(props: Partial<HTMLScriptElement>) {
  useEffect(() => {
    const listener = () => {
      const script = Object.entries(props).reduce((script, [key, value]) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-member-access -- we know that value is a keyof script
        script[key as any] = value;
        return script;
      }, document.createElement('script'));
      document.body.appendChild(script);
    };
    window.addEventListener('scroll', listener, { passive: true, once: true });
    return () => {
      window.removeEventListener('scroll', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore
  }, []);

  return null;
}

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
      <Script strategy="lazyOnload">{`if (typeof CSS !== 'undefined' && typeof CSS.paintWorklet !== 'undefined') {CSS.paintWorklet.addModule('/fancyLinkUnderline.js');}`}</Script>
      <ScriptAfterInteraction src="/contentVisibility.js" defer async />
      <ScriptAfterInteraction
        src="https://www.googletagmanager.com/gtag/js?id=G-KNFC661M43"
        defer
        async
        onload={() => {
          gtag('js', new Date());
          gtag('config', 'G-KNFC661M43');
        }}
      />
    </>
  );
};

export default MyApp;
