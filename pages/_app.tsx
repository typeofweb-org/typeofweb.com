import Head from 'next/head';

import { Seo } from '../components/Seo';
import { RunningHeaderProvider } from '../hooks/runningHeader';
import { UIStateProvider } from '../hooks/useUiState';

import type { AppType } from 'next/dist/next-server/lib/utils';

import '../styles.css';
import '../fonts.css';
import '../prism.css';

// @ts-ignore
if (typeof CSS !== 'undefined' && typeof CSS.paintWorklet !== 'undefined') {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- ok
  CSS.paintWorklet.addModule(`/fancyLinkUnderline.js`);
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Seo />
      <RunningHeaderProvider>
        <UIStateProvider>
          <Component {...pageProps} />
        </UIStateProvider>
      </RunningHeaderProvider>
    </>
  );
};

export default MyApp;
