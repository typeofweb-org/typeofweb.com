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
      className={`flex py-2 flex-row gap-2 items-stretch justify-center ${isLoading ? 'cursor-wait' : ''}`}
      role="navigation"
      aria-label="Paginacja"
      aria-disabled={isLoading}
      aria-busy={isLoading}
    >
      <span className="inline-flex items-center mr-2 text-lg">
        Strona {currentPage} z {pages}
      </span>
      {prev > 0 && (
        <Link href={`${prefix}/strona/${prev}`}>
          <a
            rel="prev"
            className={`focus:no-underline inline-flex items-center px-4 transition-color text-3xl bg-gray-100 border rounded-sm hover:shadow-md shadow-sm transition-shadow ${
              isLoading ? 'cursor-wait pointer-events-none text-gray-500' : 'text-blue-500'
            }`}
            aria-label="Poprzednia strona"
            title="Poprzednia strona"
          >
            <span className="transform rotate-180">➔</span>
          </a>
        </Link>
      )}
      <select
        className={`m-0 text-lg border-transparent rounded-sm hover:shadow-md shadow-sm transition-shadow ${
          isLoading ? 'cursor-wait pointer-events-none' : ''
        }`}
        disabled={isLoading}
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
      {next <= pages && (
        <Link href={`${prefix}/strona/${next}`}>
          <a
            rel="next"
            className={`focus:no-underline inline-flex items-center px-4 transition-color text-3xl bg-gray-100 border rounded-sm hover:shadow-md shadow-sm transition-shadow ${
              isLoading ? 'cursor-wait pointer-events-none text-gray-500' : 'text-blue-500'
            }`}
            aria-label="Następna strona"
            title="Następna strona"
          >
            ➔
          </a>
        </Link>
      )}
    </nav>
  );
});
Pagination.displayName = 'Pagination';
