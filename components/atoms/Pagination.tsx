import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, memo, useState } from 'react';

import type { ChangeEventHandler } from 'react';

export const Pagination = memo<{ readonly pages: number; readonly prefix: string }>(({ prefix, pages }) => {
  const router = useRouter();
  const currentPage = Number(router.query['page']) || 1;
  const next = currentPage + 1;
  const prev = currentPage - 1;

  const [isLoading, setIsLoading] = useState(false);

  const goToPage = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      const page = Number(e.currentTarget.value);
      const href = `${prefix}/strona/${page}`;
      setIsLoading(true);
      router.push(href, undefined, { scroll: true }).finally(() => setIsLoading(false));
    },
    [prefix, router],
  );

  return (
    <nav
      className={`flex flex-col gap-4 items-center mb-4 ${isLoading ? 'cursor-wait' : ''}`}
      role="navigation"
      aria-label="Paginacja"
      aria-busy={isLoading}
    >
      <p className="items-center mr-2 text-gray-900 text-lg">
        Strona {currentPage} z {pages}
      </p>
      <div className="flex flex-row gap-2 items-stretch justify-center pb-4">
        <Link href={`${prefix}/strona/${prev}`}>
          <a
            rel="prev"
            className={`focus:no-underline gap-3 inline-flex items-center px-4 py-2 bg-gray-200 border rounded-md shadow-sm hover:shadow-md transition-shadow ${
              isLoading ? 'cursor-wait pointer-events-none text-gray-500' : 'text-gray-900'
            }
            ${prev > 0 ? '' : 'invisible'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Poprzednia strona
          </a>
        </Link>
        <select
          className={`m-0 bg-gray-100 text-gray-900 text-lg border-transparent rounded-sm hover:shadow-md shadow-sm transition-shadow ${
            isLoading ? 'cursor-wait pointer-events-none' : ''
          }`}
          disabled={isLoading || pages === 1}
          aria-label="Wybierz stronę"
          title="Wybierz stronę"
          value={currentPage}
          onChange={goToPage}
        >
          {[...Array(pages)].map((_, idx) => {
            const page = idx + 1;
            const isCurrent = currentPage === page;
            return (
              <option
                key={page}
                value={page}
                aria-label={isCurrent ? `Obecna strona, strona ${page}` : `Strona ${page}`}
                aria-current={isCurrent ? 'page' : false}
                disabled={isCurrent}
              >
                {page}
              </option>
            );
          })}
        </select>
        <Link href={`${prefix}/strona/${next}`}>
          <a
            rel="next"
            className={`focus:no-underline gap-3 inline-flex items-center px-4 py-2 bg-gray-200 border rounded-md shadow-sm hover:shadow-md transition-shadow ${
              isLoading ? 'cursor-wait pointer-events-none text-gray-500' : 'text-gray-900'
            }
              ${next <= pages ? '' : 'invisible'}`}
          >
            Następna strona
            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </Link>
      </div>
    </nav>
  );
});
Pagination.displayName = 'Pagination';
