import Link from 'next/link';
import { memo } from 'react';

import BookIcon from '../../images/social/book.svg';
import { Widget } from '../atoms/Widget';

export const PromoWidget = memo(() => {
  return (
    <Widget>
      <ul className="flex flex-row flex-wrap justify-between pt-2 gap-4">
        <li className="ml-0 pl-0 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          <Link href="/wspolpraca">
            <a>
              Moja książka:
              <span className="whitespace-nowrap">
                <BookIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
                „TypeScript na poważnie”
              </span>
            </a>
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          Już jesienią rusza{' '}
          <Link href="https://next.hyperfunctor.com/?utm_source=typeofweb&utm_medium=sidebar">
            <a>trzecia edycja kursu Next.js, React, GraphQL, TypeScript</a>
          </Link>
        </li>
      </ul>
    </Widget>
  );
});
PromoWidget.displayName = 'PromoWidget';
