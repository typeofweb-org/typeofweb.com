import Dynamic from 'next/dynamic';
import { memo } from 'react';

import { useUIState } from '../../hooks/useUiState';
import { SiteHeader } from '../molecules/SiteHeader';
import { AppFooter } from '../organisms/AppFooter';
import { Sidebar } from '../organisms/Sidebar';

import Hamburger from './hamburger.module.css';

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
      <div className="mt-16 md:mt-12 flex flex-col items-center lg:flex-row lg:items-start lg:justify-center">
        <main
          itemScope
          itemType="http://schema.org/Blog"
          id="main-content"
          className="relative flex-1 px-2 w-full max-w-3xl lg:pb-20 lg:px-0"
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
        <svg
          className={`${Hamburger.ham} ${uiState.isMenuOpen ? Hamburger.active : ''}`}
          viewBox="0 0 100 100"
          width="80"
        >
          <path
            className={`${Hamburger.line} ${Hamburger.top}`}
            d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568"
          />
          <path
            className={`${Hamburger.line} ${Hamburger.middle}`}
            d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7"
          />
          <path
            className={`${Hamburger.line} ${Hamburger.bottom}`}
            d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0"
          />
        </svg>
        {/* <span
          className={`after:absolute before:absolute relative after:-bottom-2.5 before:-top-2.5 after:left-0 before:left-0 block h-1 before:h-1 after:h-1 bg-gray-800 before:bg-gray-800 after:bg-gray-800 after:rounded-xl before:rounded-xl rounded-xl transition-all before:transition-all after:transition-all after:transform-gpu before:transform-gpu after:origin-center before:origin-center ${
            uiState.isMenuOpen
              ? `w-7 before:w-5 after:w-5 after:-translate-y-1 after:translate-x-3 before:translate-x-3 before:translate-y-1 after:-rotate-45 before:rotate-45`
              : 'w-9 before:w-9 after:w-9 after:-translate-y-0 after:translate-x-0 before:translate-x-0 before:translate-y-0 after:-rotate-0  before:rotate-0 '
          }`}
        /> */}
      </button>
      <AppFooter />
    </>
  );
});
TwoColumns.displayName = 'TwoColumns';
