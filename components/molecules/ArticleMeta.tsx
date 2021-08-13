import Image from 'next/image';
import Link from 'next/link';
import { Fragment, memo } from 'react';

import { getCategoryLink } from '../../utils/categories';
import { cloudinaryLoader } from '../../utils/imageLoader';
import { getSeriesLink } from '../../utils/series';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';

import type { Series } from '../../types';

export interface Author {
  readonly avatarUrl: string;
  readonly displayName: string;
  readonly slug: string;
  readonly gender?: 'm' | 'f' | null;
  readonly facebook?: string | null;
  readonly instagram?: string | null;
  readonly linkedin?: string | null;
  readonly twitter?: string | null;
  readonly youtube?: string | null;
  readonly description?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly website?: string | null;
  readonly github?: string | null;
}

const S = 32;
const L = 48;

export const ArticleMeta = memo<{
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly rel?: boolean;
  readonly size: 'small' | 'large';
  readonly series?: Series | null;
}>(({ authors, mainCategory, rel, series, size = 'small' }) => {
  const isSmall = size === 'small';

  return (
    <>
      {series && (
        <p className="mb-4 mt-3 text-center text-lg">
          Ten artykuł jest częścią{' '}
          <strong>
            {series.currentIndex + 1} z {series.count}
          </strong>{' '}
          w serii{' '}
          <Link href={getSeriesLink(series)} passHref={true}>
            <LinkUnderlineEffect>
              <a className="text-blue-500">{series.name}</a>
            </LinkUnderlineEffect>
          </Link>
          .
        </p>
      )}
      <div className="mt-2">
        <div className="flex items-center justify-center">
          <div className="flex flex-shrink-0 items-center mr-2">
            {authors.map((author, idx) => (
              <span
                key={author.slug}
                className={`inline-flex border-2 rounded-full border-gray-100  ${
                  isSmall ? '-mr-4 last:mr-0' : '-mr-6 last:mr-2'
                }`}
                style={{ zIndex: authors.length - idx }}
              >
                <Image
                  loader={cloudinaryLoader}
                  src={author.avatarUrl + (isSmall ? `?s=${S * 2}` : `?s=${L * 2}`)}
                  width={isSmall ? S : L}
                  height={isSmall ? S : L}
                  layout="fixed"
                  alt={`Zdjęcie ${author.displayName}`}
                  className={`rounded-full`}
                  unoptimized
                />
              </span>
            ))}
          </div>
          <div className="font-sans text-sm font-semibold leading-tight sm:text-base">
            {authors.map((author, idx) => (
              <Fragment key={author.slug}>
                <span itemScope itemType="http://schema.org/Person" itemProp="author">
                  <span className={`text-gray-800 ${isSmall ? 'text-base' : 'text-lg'}`} itemProp="name">
                    {author.displayName}
                  </span>
                </span>
                {idx === authors.length - 2 ? (
                  <span className={`text-gray-800 font-normal ${isSmall ? 'text-base' : 'text-lg'}`}> i&nbsp;</span>
                ) : idx === authors.length - 1 ? (
                  ''
                ) : (
                  ', '
                )}
              </Fragment>
            ))}{' '}
            {mainCategory && (
              <span
                className={`before:content-['·'] before:mx-2 text-blue-500 before:text-gray-900 whitespace-nowrap ${
                  isSmall ? 'text-base' : 'text-lg'
                }`}
              >
                <LinkUnderlineEffect>
                  <Link href={getCategoryLink(mainCategory)}>
                    <a {...(rel && { rel: 'category tag' })}>{mainCategory.name}</a>
                  </Link>
                </LinkUnderlineEffect>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
ArticleMeta.displayName = 'ArticleMeta';
