import Link from 'next/link';

import TypeOfWebLogo from '../../images/logo-typeofweb-black.svg';
import { TopNav } from '../molecules/TopNav';

export const SiteHeader = ({ firstPostHasCover }: { readonly firstPostHasCover: boolean }) => {
  return (
    <header
      className={`px-8 bg-gray-100 drop-shadow flex flex-row gap-8 items-stretch justify-center lg:justify-start lg:mb-4
          ${firstPostHasCover ? 'sr-only lg:not-sr-only' : ''}`}
    >
      <div className="lg:pr-[20rem] flex flex-1 flex-row pl-8 max-w-5xl lg:mx-auto lg:pl-0">
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
    </header>
  );
};
