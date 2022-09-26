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
  readonly index?: number | null;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly permalink: string;
  readonly excerpt: string;
  readonly series?: Series | null;
  readonly commentsCount: number;
}

export const ArticleSneakPeek = memo<ArticleSneakPeekProps>(
  ({ cover, title, authors, mainCategory, permalink, series, excerpt, commentsCount }) => {
    const href = getUrlForPermalink(permalink);
    return (
      <Card as="article" itemScope itemType="http://schema.org/BlogPosting">
        <header>
          <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 py-4`}>
            <ArticleTitle title={title} href={href} level={2} />
            <ArticleMeta
              series={series}
              authors={authors}
              mainCategory={mainCategory}
              commentsCount={commentsCount}
              permalink={permalink}
              size="small"
            />
            {cover && (
              <Link href={href}>
                <a tabIndex={-1} aria-hidden="true" className="block">
                  <ArticleCoverImage cover={cover} />
                </a>
              </Link>
            )}
          </div>
        </header>
        <div className="pb-12 px-7 text-gray-900 font-serif text-lg border-b-2 sm:px-8 lg:px-12">
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
            <meta itemProp="url" content="/wp-content/uploads/2020/04/logo_kwadrat11.png" />
          </span>
          <meta itemProp="name" content="Type of Web" />
        </span>
        <link itemProp="mainEntityOfPage" href={href} />
      </Card>
    );
  },
);
ArticleSneakPeek.displayName = 'ArticleSneakPeek';
