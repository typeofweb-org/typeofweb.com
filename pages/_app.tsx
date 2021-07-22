import type { AppType } from 'next/dist/next-server/lib/utils';
import '../styles.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
