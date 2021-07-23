import { RunningHeaderProvider } from '../hooks/runningHeader';

import type { AppType } from 'next/dist/next-server/lib/utils';

import '../styles.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RunningHeaderProvider>
      <Component {...pageProps} />
    </RunningHeaderProvider>
  );
};

export default MyApp;
