import Link from 'next/link';
import { Fragment, memo } from 'react';

import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';

export interface Author {
  readonly avatarUrl: string;
  readonly displayName: string;
  readonly slug: string;
}

export const ArticleMeta = memo<{
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
}>(({ authors, mainCategory }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-shrink-0 mr-2">
          {authors.map((author, idx) => (
            <img
              key={author.slug}
              src={author.avatarUrl}
              width="32"
              height="32"
              alt={`Zdjęcie ${author.displayName}`}
              style={{ zIndex: authors.length - idx }}
              className="block -mr-4 last:mr-0 w-8 h-8 border-2 border-gray-100 rounded-full lg:w-10 lg:h-10"
            />
          ))}
        </div>
        <div className="font-sans text-sm font-semibold leading-tight sm:text-base">
          {authors.map((author, idx) => (
            <Fragment key={author.slug}>
              <LinkUnderlineEffect>
                <a className="text-blue-500" href="#">
                  {author.displayName}
                </a>
              </LinkUnderlineEffect>
              {idx === authors.length - 2 ? (
                <span className="text-gray-800 font-normal"> i&nbsp;</span>
              ) : idx === authors.length - 1 ? (
                ''
              ) : (
                ', '
              )}
            </Fragment>
          ))}
          {mainCategory && (
            <span className="before:content-['·'] before:mx-2 text-blue-500 before:text-gray-900 whitespace-nowrap">
              <LinkUnderlineEffect>
                <Link href={`/${mainCategory.slug}`}>
                  <a>{mainCategory.name}</a>
                </Link>
              </LinkUnderlineEffect>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ArticleMeta.displayName = 'ArticleMeta';
