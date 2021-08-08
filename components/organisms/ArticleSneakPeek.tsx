import Link from 'next/link';
import React, { memo } from 'react';

import { getUrlForPermalink } from '../../utils/permalinks';
import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Series } from '../../types';
import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';
import type { Author } from '../molecules/ArticleMeta';

interface ArticleSneakPeekProps {
  readonly cover: CoverPlaiceholder | null;
  readonly index: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly permalink: string;
  readonly excerpt: string;
  readonly series?: Series | null;
}

export const ArticleSneakPeek = memo<ArticleSneakPeekProps>(
  ({ cover, index, title, authors, mainCategory, permalink, series, excerpt }) => {
    const href = getUrlForPermalink(permalink);
    return (
      <Card as="article" itemScope itemType="http://schema.org/BlogPosting" roundAllCorners={!cover} moreSpace={!cover}>
        <header className="bg-gray-200">
          {cover && (
            <Link href={href}>
              <a tabIndex={-1} aria-hidden="true">
                <ArticleCoverImage cover={cover} wide={false} />
              </a>
            </Link>
          )}
          <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 ${cover ? 'pt-6' : ''}`}>
            <ArticleTitle title={title} index={index} href={href} level={2} />
            <ArticleMeta series={series} authors={authors} mainCategory={mainCategory} size="small" />
          </div>
        </header>
        <div className="pb-2 px-7 text-gray-700 font-serif text-lg sm:px-8 lg:px-12">
          <p className="!indent-0">
            {excerpt}{' '}
            <span className="ml-2">
              <Link href={href} passHref>
                <LinkUnderlineEffect>
                  <a className="text-blue-500 font-bold tracking-wider">
                    Czytaj dalej… <span className="sr-only">artykuł {title}</span>
                  </a>
                </LinkUnderlineEffect>
              </Link>
            </span>
          </p>
        </div>
        <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content="https://typeofweb.com/wp-content/uploads/2020/04/logo_kwadrat11.png" />
          </span>
          <meta itemProp="name" content="Type of Web" />
        </span>
        <link itemProp="mainEntityOfPage" href={href} />
      </Card>
    );
  },
);
ArticleSneakPeek.displayName = 'ArticleSneakPeek';
