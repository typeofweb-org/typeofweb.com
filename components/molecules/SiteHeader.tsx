import Link from 'next/link';
import { memo } from 'react';

import { useRunningHeader } from '../../hooks/runningHeader';
import TypeOfWebLogo from '../../images/logo-typeofweb-black.svg';
import { MainNav } from '../molecules/MainNav';

import type { PageKind } from '../../types';

export const SiteHeader = memo<{ readonly pageKind: PageKind }>(({ pageKind }) => {
  const { text, progress } = useRunningHeader();

  const HeaderEl = pageKind === 'index' ? 'h1' : 'div';

  return (
    <>
      <a href="#main-content" className="sr-only">
        Skocz do treści
      </a>
      <header
        className={`bg-gray-100 pb-1 flex flex-row h-12 items-stretch justify-center lg:mb-4 overflow-hidden ios:transcluent-white dark:ios:transcluent-black shadow sticky top-0 z-10`}
      >
        <div itemScope itemType="http://schema.org/WPHeader" className="flex flex-1 flex-row pl-8 max-w-3xl">
          <Link href="/">
            <a>
              <HeaderEl itemProp="headline" className="-ml-2 p-2">
                <span className="sr-only">Type of Web</span>
                <TypeOfWebLogo className="w-40 max-w-full" />
              </HeaderEl>
            </a>
          </Link>
          <MainNav />
        </div>
        <div className="hidden lg:flex lg:items-center lg:mx-4 lg:px-8 lg:w-80" aria-hidden>
          {pageKind === 'post' && (
            <span
              aria-live="off"
              className="text-gray-600 font-serif text-xs animate-appear lg:whitespace-nowrap lg:text-sm"
            >
              {text}
            </span>
          )}
        </div>
        {pageKind === 'post' && (
          <progress
            aria-hidden
            className="absolute z-10 bottom-0 w-full h-1 text-pink-500 appearance-none"
            value={progress.toFixed(2)}
          />
        )}
      </header>
    </>
  );
});
SiteHeader.displayName = 'SiteHeader';
