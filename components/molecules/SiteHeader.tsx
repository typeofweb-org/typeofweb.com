import Link from 'next/link';

import { useRunningHeader } from '../../hooks/runningHeader';
import { useUIState } from '../../hooks/useUiState';
import TypeOfWebLogo from '../../images/logo-typeofweb-black.svg';
import { MainNav } from '../molecules/MainNav';

import type { PageKind } from '../../types';

export const SiteHeader = ({ pageKind }: { readonly pageKind: PageKind }) => {
  const { text, progress } = useRunningHeader();
  const { uiState } = useUIState();

  return (
    <>
      <a href="#main-content" className="sr-only">
        Skocz do treści
      </a>
      <header
        className={`bg-gray-100 ios:transcluent-white dark:ios:transcluent-black flex flex-row h-12 overflow-hidden items-stretch justify-center lg:mb-4 ${
          uiState.isMenuOpen ? 'lg:drop-shadow lg:sticky' : 'drop-shadow sticky'
        } top-0 z-40`}
      >
        <div className="flex flex-1 flex-row pl-8 max-w-3xl">
          <Link href="/">
            <a>
              <h1 className="-ml-2 p-2 ios:bg-gray-100">
                <span className="sr-only">Type of Web</span>
                <TypeOfWebLogo className="w-40 max-w-full" />
              </h1>
            </a>
          </Link>
          <MainNav />
        </div>
        <div className="hidden lg:flex lg:items-center lg:mx-4 lg:px-8 lg:w-80" aria-hidden>
          {pageKind === 'post' && (
            <span className="animate-appear text-gray-600 font-serif text-xs lg:whitespace-nowrap lg:text-sm">
              {text}
            </span>
          )}
        </div>
        {pageKind === 'post' && (
          <progress
            aria-hidden
            className="absolute z-30 bottom-0 w-full h-1 text-pink-500 appearance-none"
            value={progress.toFixed(2)}
          />
        )}
      </header>
    </>
  );
};
