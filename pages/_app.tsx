import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { Seo } from '../components/Seo';
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
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag('config', 'UA-75923815-1', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- trust me, I'm an engineer
  const typedPageProps = pageProps as
    | undefined
    | {
        readonly posts?: readonly (
          | undefined
          | { readonly frontmatter?: { readonly cover?: { readonly blurDataURL?: string } } }
        )[];
      };

  const urlsToPreload: readonly string[] | undefined = typedPageProps?.posts
    ?.map((p) => p?.frontmatter?.cover?.blurDataURL)
    .filter((x): x is Exclude<typeof x, undefined> => Boolean(x));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ScriptOnce strategy="afterInteractive">
        {`let o=()=>e.className+=" fonts-loaded",e=document.documentElement,n="00 1em Merriweather",t="00 1em Fira Sans";sessionStorage.fonts?o():Promise.all(["4"+n,"7"+n,"italic 4"+n,"italic 7"+n,"4"+t,"6"+t,"400 1em Fira Mono"].map(o=>document.fonts.load(o))).then(()=>{sessionStorage.fonts=!0,o()})`}
      </ScriptOnce>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=UA-75923815-1`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-75923815-1', {
              page_path: window.location.pathname
            });
          `.trim(),
        }}
      />
      <Script
        id="algolia-search-insights"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@2.0.3";

            !function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
            (e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
            i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
            }(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");
          `.trim(),
        }}
      />
      <script defer data-domain="typeofweb.com" data-api="/api/event" src="/js/script.js" />
      <Seo />
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
      <ScriptAfterInteraction
        id="fancyLinkUnderline"
        defer
        async
      >{`window?.CSS?.paintWorklet?.addModule("/fancyLinkUnderline.min.js")`}</ScriptAfterInteraction>
      <ScriptAfterInteraction id="contentVisibility" src="/contentVisibility.min.js" defer async />

      {urlsToPreload?.map((url) => (
        <link key={url} rel="preload" href={url} as="image" />
      ))}
    </>
  );
};

export default MyApp;
