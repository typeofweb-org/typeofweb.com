import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';

export interface Author {
  readonly avatarUrl: string;
  readonly displayName: string;
  readonly slug: string;
}

export const ArticleMeta = memo<{
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly rel?: boolean;
}>(({ authors, mainCategory, rel }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-shrink-0 items-center mr-2">
          {authors.map((author, idx) => (
            <span key={author.slug} className="inline-flex" style={{ zIndex: authors.length - idx }}>
              <Image
                src={author.avatarUrl}
                width="32"
                height="32"
                layout="fixed"
                alt={`Zdjęcie ${author.displayName}`}
                className="block -mr-4 last:mr-0 w-8 h-8 border-2 border-gray-100 rounded-full lg:w-10 lg:h-10"
              />
            </span>
          ))}
        </div>
        <div className="font-sans text-sm font-semibold leading-tight sm:text-base">
          {authors.map((author, idx) => (
            <span key={author.slug} itemScope itemType="http://schema.org/Person" itemProp="author">
              <LinkUnderlineEffect>
                <a className="text-blue-500" href="#" itemProp="url">
                  <span itemProp="name">{author.displayName}</span>
                </a>
              </LinkUnderlineEffect>
              {idx === authors.length - 2 ? (
                <span className="text-gray-800 font-normal"> i&nbsp;</span>
              ) : idx === authors.length - 1 ? (
                ''
              ) : (
                ', '
              )}
            </span>
          ))}
          {mainCategory && (
            <span className="before:content-['·'] before:mx-2 text-blue-500 before:text-gray-900 whitespace-nowrap">
              <LinkUnderlineEffect>
                <Link href={`/${mainCategory.slug}`}>
                  <a {...(rel && { rel: 'category tag' })}>{mainCategory.name}</a>
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
