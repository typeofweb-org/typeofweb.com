import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { useUIState } from '../../hooks/useUiState';

export const navItems = [
  { slug: 'javascript', label: 'JavaScript' },
  { slug: 'opinie', label: 'Opinie' },
  { slug: 'dobry-kod', label: 'Dobry kod' },
  { slug: 'praca-zdalna', label: 'Praca zdalna' },
];

export const MainNav = memo(() => {
  const { uiState } = useUIState();
  const router = useRouter();
  const permalink = router.query['permalink'];

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
            <li key={item.slug} className="flex items-stretch mt-0.5">
              <Link href={`/${item.slug}`}>
                <a
                  className={`inline-flex items-center transition-colors text-3xl lg:text-base ${
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
