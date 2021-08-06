import 'preact/debug';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { Seo } from '../components/Seo';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';

import type { AppType } from 'next/dist/next-server/lib/utils';
import type { Props as NextScriptProps } from 'next/script';

import '../styles.css';
import '../fonts.css';
import '../prism.css';
import '../node_modules/katex/dist/katex.min.css';

function ScriptOnce(props: NextScriptProps) {
  const [render, setRender] = useState(true);
  useEffect(() => setRender(false), []);
  return render ? <Script {...props} /> : null;
}

function ScriptAfterInteraction({
  children,
  ...props
}: Partial<Omit<HTMLScriptElement, 'children'>> & { readonly children?: string }) {
  useEffect(() => {
    // whichever is first wins
    window.addEventListener('scroll', listener, { passive: true, once: true });
    const timer = setTimeout(() => window.requestIdleCallback?.(() => listener()), 500);
    const done = () => {
      window.removeEventListener('scroll', listener);
      clearTimeout(timer);
    };

    return () => {
      done();
    };

    function listener() {
      done();
      (window.requestIdleCallback || window.requestAnimationFrame)(() => {
        const script = Object.entries(props).reduce((script, [key, value]) => {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-member-access -- we know that value is a keyof script
          script[key as any] = value;
          return script;
        }, document.createElement('script'));
        if (children) {
          script.textContent = children;
        }
        document.body.appendChild(script);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore
  }, []);

  return null;
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Seo />
      <ScriptOnce strategy="afterInteractive">
        {`const o=()=>e.className+=" fonts-loaded",e=document.documentElement,n="00 1em Merriweather",t="00 1em Fira Sans";sessionStorage.fonts?o():Promise.all(["4"+n,"7"+n,"italic 4"+n,"italic 7"+n,"4"+t,"6"+t,"400 1em Fira Mono"].map(o=>document.fonts.load(o))).then(()=>{sessionStorage.fonts=!0,o()})`}
      </ScriptOnce>
      <ScriptOnce strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[],window.gtag=function(){dataLayer.push(arguments)}`}
      </ScriptOnce>
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
      <ScriptAfterInteraction
        defer
        async
      >{`window.CSS?.paintWorklet?.addModule("/fancyLinkUnderline.js")`}</ScriptAfterInteraction>
      <ScriptAfterInteraction src="/contentVisibility.min.js" defer async />
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
