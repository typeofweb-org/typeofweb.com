import Link from 'next/link';
import { memo } from 'react';

import { useRunningHeader } from '../../hooks/runningHeader';
import TypeOfWebLogo from '../../images/logo-typeofweb-black.svg';
import { isIndex } from '../../utils/pageKind';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { MainNav } from '../molecules/MainNav';

import type { PageKind } from '../../types';

export const SiteHeader = memo<{ readonly pageKind: PageKind }>(({ pageKind }) => {
  const { text, progress } = useRunningHeader();

  const HeaderEl = isIndex(pageKind) ? 'h1' : 'div';

  return (
    <>
      <a href="#main-content" className="focus:not-sr-only sr-only">
        Skocz do treści
      </a>
      <header className="ios:transcluent-white after:absolute fixed z-50 after:bottom-0 top-0 flex flex-row items-stretch justify-center pb-1 after:w-full w-full after:h-1 h-12 bg-gray-100 after:bg-gray-200 shadow overflow-hidden">
        <div itemScope itemType="http://schema.org/WPHeader" className="flex flex-1 flex-row px-4 max-w-3xl xl:px-0">
          <Link href="/">
            <HeaderEl itemProp="headline" className="-ml-2 p-2">
              <span className="sr-only">Type of Web</span>
              <TypeOfWebLogo className="mt-0.5 w-36 max-w-full" />
            </HeaderEl>
          </Link>
          <MainNav />
        </div>
        <div className="hidden lg:flex lg:items-center lg:mx-4 lg:px-8 lg:w-80" aria-hidden>
          {pageKind === 'post' && (
            <span
              aria-live="off"
              className="animate-delay-1000 text-gray-600 font-serif text-xs animate-appear lg:whitespace-nowrap lg:text-sm"
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
      <div className="fixed z-10 top-12 text-lg flex items-center justify-center px-6 py-1 w-full text-center bg-white shadow-md border-2 font-serif">
        <p>
          <LinkUnderlineEffect>
            <a
              className="text-blue-500 font-bold"
              href="https://www.next13masters.pl/?utm_source=typeofweb&utm_medium=sidebar"
            >
              Już wkrótce odpalamy zapisy na drugą edycję next13masters.pl. Zapisz się na listę oczekujących!
            </a>
          </LinkUnderlineEffect>
        </p>
      </div>
    </>
  );
});
SiteHeader.displayName = 'SiteHeader';
