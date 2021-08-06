import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, memo } from 'react';

import { useUIState } from '../../hooks/useUiState';
import ReactIcon from '../../images/react-icon.svg';
import { allCategories } from '../../utils/categories';
import { getUrlForPermalink } from '../../utils/permalinks';

import type { ReactNode } from 'react';

const navItems: readonly { readonly slug: string; readonly label: ReactNode; readonly className?: string }[] = [
  ...allCategories.map((c) => ({ slug: c.slug, label: c.name })),
  {
    slug: 'react-js',
    label: (
      <>
        <ReactIcon className="text-[color:#61DAFB] mr-1 w-6 h-6 fill-current transform-gpu rotate-0 group-hover:rotate-180 transition-transform" />{' '}
        Kurs React.js
      </>
    ),
  },
  {
    slug: 'wspolpraca',
    label: 'O mnie i współpraca',
    className: 'md:hidden',
  },
];

export const MainNav = memo(() => {
  const { uiState, setUIState } = useUIState();
  const router = useRouter();
  const permalink = router.query['permalink'] || router.query['seriesSlug'];
  const closeMenu = useCallback(() => setUIState((state) => ({ ...state, isMenuOpen: false })), [setUIState]);

  return (
    <nav
      id="main-menu"
      role="navigation"
      className={`${
        uiState.isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } left-0 top-0 z-40 lg:transform-none lg:flex lg:bg-transparent lg:static lg:w-auto lg:h-auto fixed w-full h-screen transition-transform bg-gray-100 flex lg:flex-1 lg:items-stretch`}
    >
      <ul className="flex flex-1 flex-col gap-8 items-center justify-center -mt-16 text-3xl lg:flex-row lg:gap-0 lg:items-stretch lg:justify-around lg:mt-0 lg:text-base">
        {navItems.map((item) => {
          const isActive = permalink === item.slug;
          return (
            <li key={item.slug} className={`flex items-stretch mt-0.5 ${item.className ?? ''}`}>
              <Link href={getUrlForPermalink(item.slug)}>
                <a
                  onClick={closeMenu}
                  className={`group inline-flex items-center transition-colors text-3xl lg:text-base whitespace-nowrap ${
                    isActive
                      ? 'text-green-500 font-semibold border-b-2 border-green-500 hover:border-green-700 hover:text-green-700'
                      : 'text-gray-800 hover:text-green-500 border-b-2 border-transparent hover:border-green-500'
                  }`}
                  aria-current={isActive}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
MainNav.displayName = 'MainNav';
