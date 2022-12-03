import Image from 'next/legacy/image';
import React, { memo } from 'react';

import Pattern from '../../images/typeofweb-pattern.svg';
import { SectionTitle } from '../atoms/SectionTitle';

import { social } from './SocialWidget';

import type { Author } from './ArticleMeta';

interface ArticleFooterProps {
  readonly authors: readonly Author[];
}

const getAuthorsTitle = (authors: readonly Author[]) => {
  if (authors.length === 1) {
    return authors[0]?.gender === 'f' ? 'Autorka' : 'Autor';
  }
  return authors.every((a) => a.gender === 'f') ? 'Autorki' : 'Autorzy';
};

export const ArticleFooter = memo<ArticleFooterProps>(({ authors }) => {
  const title = getAuthorsTitle(authors);
  return (
    <footer>
      <Pattern className="mb-6 mt-8 mx-auto w-32 text-green-500" />
      <div className="flex flex-col items-start mb-4 mt-4 mx-auto px-4 max-w-lg text-left">
        <SectionTitle level="none" size="small">
          {title}
        </SectionTitle>
        {authors.map((a) => {
          return (
            <div key={a.slug} itemScope itemType="http://schema.org/Person" itemProp="author">
              <span className="flex flex-wrap items-center my-2 sm:flex-nowrap">
                <span className={`inline-flex border-2 rounded-full border-gray-100 mr-4`}>
                  <Image
                    src={a.avatarUrl + `?s=${96}`}
                    width={48}
                    height={48}
                    layout="fixed"
                    alt={`Zdjęcie ${a.displayName}`}
                    className={`rounded-full`}
                    unoptimized
                  />
                </span>
                <span
                  className={` text-gray-800 inline-block text-lg font-sans font-bold leading-none`}
                  itemProp="name"
                >
                  {a.displayName}
                </span>
                &#8203;
                <span className="inline-flex mb-2 ml-3 mt-3 sm:-mt-2 sm:mb-0">
                  {social
                    .filter((s) => s.slug in a && !!a[s.slug])
                    .map(({ icon: Icon, slug, label }) => (
                      <a
                        key={slug}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- filtered above
                        href={a[slug]!}
                        aria-label={`${a.displayName} ${label}`}
                        title={`${a.displayName} ${label}`}
                        className="text-gray-700 hover:text-green-500 transition-colors"
                      >
                        <Icon className={`mx-2 w-5 ${slug === 'website' ? 'stroke-current' : 'fill-current'}`} />
                      </a>
                    ))}
                </span>
              </span>
              <p className="mb-4 text-gray-900">{a.description}</p>
            </div>
          );
        })}
      </div>
    </footer>
  );
});
ArticleFooter.displayName = 'ArticleFooter';
