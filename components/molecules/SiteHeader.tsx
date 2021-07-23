import Link from 'next/link';

import { useRunningHeader } from '../../hooks/runningHeader';
import TypeOfWebLogo from '../../images/logo-typeofweb-black.svg';
import { TopNav } from '../molecules/TopNav';

export const SiteHeader = ({ firstPostHasCover }: { readonly firstPostHasCover: boolean }) => {
  const { text, progress } = useRunningHeader();

  return (
    <header
      className={`bg-gray-100 drop-shadow flex flex-row items-stretch justify-center lg:mb-4 lg:sticky lg:top-0 lg:z-50
          ${firstPostHasCover ? 'sr-only lg:not-sr-only' : ''}`}
    >
      <div className="flex flex-1 flex-row pl-8 max-w-3xl">
        <Link href="/">
          <a>
            <h1 className="py-2">
              <span className="sr-only">Type of Web</span>
              <TypeOfWebLogo className="w-40 max-w-full" />
            </h1>
          </a>
        </Link>
        <TopNav />
      </div>
      <div className="hidden lg:flex lg:items-center lg:mx-4 lg:px-8 lg:w-80">
        <span className="text-gray-500 font-serif text-xs lg:whitespace-nowrap">{text}</span>
      </div>
      <progress className="absolute z-50 top-full w-full h-1 text-pink-500 appearance-none" value={progress} />
    </header>
  );
};
