import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { Seo } from '../components/Seo';
import { AppFooter } from '../components/organisms/AppFooter';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';

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
  ...props
}: Partial<Omit<HTMLScriptElement, 'children'>> & { readonly children?: string }) {
  useEffect(() => {
    window.addEventListener('scroll', listener, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', listener);
    };

    function listener() {
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call -- ok
  const urlsToPreload: readonly string[] | undefined = pageProps?.posts
    ?.map(
      (p: undefined | { readonly frontmatter?: { readonly cover?: { readonly blurDataURL?: string } } }) =>
        p?.frontmatter?.cover?.blurDataURL,
    )
    .filter(Boolean);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ScriptOnce strategy="afterInteractive">
        {`let o=()=>e.className+=" fonts-loaded",e=document.documentElement,n="00 1em Merriweather",t="00 1em Fira Sans";sessionStorage.fonts?o():Promise.all(["4"+n,"7"+n,"italic 4"+n,"italic 7"+n,"4"+t,"6"+t,"400 1em Fira Mono"].map(o=>document.fonts.load(o))).then(()=>{sessionStorage.fonts=!0,o()})`}
      </ScriptOnce>
      <ScriptOnce strategy="afterInteractive" async defer>
        {`var w=window;w.dataLayer=w.dataLayer||[],w.gtag=(...a)=>dataLayer.push(a)`}
      </ScriptOnce>
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
      <AppFooter />
      <ScriptAfterInteraction
        defer
        async
      >{`w.CSS?.paintWorklet?.addModule("/fancyLinkUnderline.min.js")`}</ScriptAfterInteraction>
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
      {urlsToPreload?.map((url) => (
        <link key={url} rel="preload" href={url} as="image" />
      ))}
      <Seo />
    </>
  );
};

export default MyApp;
