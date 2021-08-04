import Link from 'next/link';
import { memo } from 'react';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Series } from '../../types';
import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';
import type { Author } from '../molecules/ArticleMeta';

interface ArticleSneakPeekProps {
  readonly cover: CoverPlaiceholder | null;
  readonly id: number;
  readonly index: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly permalink: string;
  readonly excerpt: string;
  readonly series?: Series | null;
}

export const ArticleSneakPeek = memo<ArticleSneakPeekProps>(
  ({ cover, id, index, title, authors, mainCategory, permalink, series, excerpt }) => {
    const href = '/' + permalink;
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
            <ArticleTitle title={title} id={id} index={index} href={href} level={2} />
            <ArticleMeta series={series} authors={authors} mainCategory={mainCategory} size="small" />
          </div>
        </header>
        <div className="prose prose-lg pb-2 px-7 sm:px-8 lg:px-12">
          <p className="!indent-0">
            {excerpt}{' '}
            <span className="inner-link ml-2">
              <Link href={href}>
                <a className="!tracking-wider">
                  Czytaj dalej… <span className="sr-only">artykuł {title}</span>
                </a>
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
