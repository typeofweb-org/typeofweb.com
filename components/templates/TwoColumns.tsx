import { useUIState } from '../../hooks/useUiState';
import { SiteHeader } from '../molecules/SiteHeader';
import { Sidebar } from '../organisms/Sidebar';

import type { PageKind } from '../../types';
import type { PropsWithChildren } from 'react';

export const TwoColumns = ({
  children,
  withSidebar,
  pageKind,
}: PropsWithChildren<{
  readonly withSidebar: boolean;
  readonly pageKind: PageKind;
}>) => {
  const { setUIState, uiState } = useUIState();
  const open = uiState.isMenuOpen;

  return (
    <>
      <SiteHeader pageKind={pageKind} />
      <div className="flex flex-row items-start justify-center">
        <main id="main-content" className="flex-1 max-w-3xl">
          {children}
        </main>
        {withSidebar && <Sidebar pageKind={pageKind} />}
      </div>
      <button
        aria-hidden
        className="main-menu-button no-touch-highlight fixed z-40 right-6 flex items-center justify-center w-12 h-12 text-gray-800 bg-white rounded-md shadow-lg select-none lg:hidden"
        onClick={() => setUIState((state) => ({ ...state, isMenuOpen: !state.isMenuOpen }))}
      >
        <span className="sr-only">Otwórz nawigację</span>
        <span
          className={`after:absolute before:absolute relative after:-bottom-2.5 before:-top-2.5 after:left-0 before:left-0 block h-1 before:h-1 after:h-1 bg-gray-800 before:bg-gray-800 after:bg-gray-800 after:rounded-xl before:rounded-xl rounded-xl transition-all before:transition-all after:transition-all ${
            open
              ? `w-7 before:w-5 after:w-5 after:transform-gpu before:transform-gpu after:origin-center before:origin-center after:-translate-y-1 after:translate-x-3 before:translate-x-3 before:translate-y-1 after:-rotate-45 before:rotate-45`
              : 'w-9 before:w-9 after:w-9'
          }`}
        />
      </button>
    </>
  );
};
