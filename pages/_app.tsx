import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Seo } from '../components/Seo';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';
import { identifyUser } from '../utils/fingerprint';

import type { AppType } from 'next/dist/shared/lib/utils';
import type { ScriptProps as NextScriptProps } from 'next/script';

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
  id,
  ...props
}: Partial<Omit<HTMLScriptElement, 'children'>> & { readonly children?: string; readonly id: string }) {
  useEffect(() => {
    window.addEventListener('scroll', listener, { passive: true, once: true });

    if (sessionStorage['s' + id]) {
      // hopefully the script is cached at this point
      listener();
    }

    return () => {
      window.removeEventListener('scroll', listener);
    };

    function listener() {
      sessionStorage['s' + id] = true;
      window.removeEventListener('scroll', listener);
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
  useEffect(() => {
    identifyUser();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call -- ok
  const urlsToPreload: readonly string[] | undefined = pageProps?.posts
    ?.map(
      (p: undefined | { readonly frontmatter?: { readonly cover?: { readonly blurDataURL?: string } } }) =>
        p?.frontmatter?.cover?.blurDataURL,
    )
    .filter(Boolean);

  return (
    <ErrorBoundary>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ScriptOnce strategy="afterInteractive">
        {`let o=()=>e.className+=" fonts-loaded",e=document.documentElement,n="00 1em Merriweather",t="00 1em Fira Sans";sessionStorage.fonts?o():Promise.all(["4"+n,"7"+n,"italic 4"+n,"italic 7"+n,"4"+t,"6"+t,"400 1em Fira Mono"].map(o=>document.fonts.load(o))).then(()=>{sessionStorage.fonts=!0,o()})`}
      </ScriptOnce>
      <ScriptOnce strategy="afterInteractive" async defer>
        {`a=window,t=a.dataLayer=a.dataLayer||[];a.gtag=(...a)=>t.push(a),t.push({"gtm.start":Date.now(),event:"gtm.js"})`}
      </ScriptOnce>
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
      <ScriptAfterInteraction
        id="fancyLinkUnderline"
        defer
        async
      >{`a.CSS?.paintWorklet?.addModule("/fancyLinkUnderline.min.js")`}</ScriptAfterInteraction>
      <ScriptAfterInteraction id="contentVisibility" src="/contentVisibility.min.js" defer async />
      <ScriptAfterInteraction
        id="gtag"
        src="https://www.googletagmanager.com/gtag/js?id=G-KNFC661M43"
        defer
        async
        onload={() => {
          gtag('js', new Date());
          gtag('config', 'G-KNFC661M43');
        }}
      />
      <ScriptAfterInteraction
        id="gtm"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-NTFGFPB"
        defer
        async
        onload={() => {
          gtag('js', new Date());
          gtag('config', 'G-KNFC661M43');
        }}
      />

      {urlsToPreload?.map((url) => (
        <link key={url} rel="preload" href={url} as="image" />
      ))}
      <Seo />
    </ErrorBoundary>
  );
};

export default MyApp;
