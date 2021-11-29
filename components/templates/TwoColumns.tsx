import Dynamic from 'next/dynamic';
import { memo } from 'react';

import { useUIState } from '../../hooks/useUiState';
import { SiteHeader } from '../molecules/SiteHeader';
import { AppFooter } from '../organisms/AppFooter';
import { Sidebar } from '../organisms/Sidebar';

import type { PageKind, SeriesWithToC } from '../../types';
import type { PropsWithChildren } from 'react';

const ShareWidget = Dynamic<{}>(
  () => import(/* webpackChunkName: "ShareWidget" */ '../molecules/ShareWidget').then((m) => m.ShareWidget),
  { ssr: false },
);

export const TwoColumns = memo<
  PropsWithChildren<{
    readonly withSidebar: boolean;
    readonly pageKind: PageKind;
    readonly series?: SeriesWithToC | null;
  }>
>(({ children, withSidebar, pageKind, series }) => {
  const { setUIState, uiState } = useUIState();

  return (
    <>
      <SiteHeader pageKind={pageKind} />
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center">
        <main
          itemScope
          itemType="http://schema.org/Blog"
          id="main-content"
          className="relative flex-1 mt-4 px-2 w-full max-w-3xl lg:pb-20 lg:px-0"
        >
          <ShareWidget />
          {children}
        </main>
        {withSidebar && <Sidebar pageKind={pageKind} series={series} />}
      </div>
      <button
        id="main-menu-button"
        aria-expanded={uiState.isMenuOpen}
        aria-controls="main-menu"
        className="main-menu-button no-touch-highlight fixed z-50 bottom-8 right-6 flex items-center justify-center w-12 h-12 text-gray-800 bg-white border border-solid border-gray-200 rounded-md shadow-lg select-none lg:hidden"
        onClick={() => setUIState((state) => ({ ...state, isMenuOpen: !state.isMenuOpen }))}
      >
        <span className="sr-only">Otwórz nawigację</span>
        <span
          className={`after:absolute before:absolute relative after:-bottom-2.5 before:-top-2.5 after:left-0 before:left-0 block h-1 before:h-1 after:h-1 bg-gray-800 before:bg-gray-800 after:bg-gray-800 after:rounded-xl before:rounded-xl rounded-xl transition-all before:transition-all after:transition-all after:transform-gpu before:transform-gpu after:origin-center before:origin-center ${
            uiState.isMenuOpen
              ? `w-7 before:w-5 after:w-5 after:-translate-y-1 after:translate-x-3 before:translate-x-3 before:translate-y-1 after:-rotate-45 before:rotate-45`
              : 'w-9 before:w-9 after:w-9 after:-translate-y-0 after:translate-x-0 before:translate-x-0 before:translate-y-0 after:-rotate-0  before:rotate-0 '
          }`}
        />
      </button>
      <AppFooter />
    </>
  );
});
TwoColumns.displayName = 'TwoColumns';
