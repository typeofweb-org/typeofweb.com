import Dynamic from 'next/dynamic';
import React, { forwardRef, memo } from 'react';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { ArticleFooter } from '../molecules/ArticleFooter';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { SeriesWithToC } from '../../types';
import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';
import type { Author } from '../molecules/ArticleMeta';

const RelatedArticles = Dynamic<{ readonly permalink: string }>(() =>
  import(/* webpackChunkName: "RelatedArticles" */ '../molecules/RelatedArticles').then((m) => m.RelatedArticles),
);

interface SingleArticleProps {
  readonly cover: CoverPlaiceholder | null;
  readonly isMdx: boolean;
  readonly index?: number | null;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly permalink: string;
  readonly excerpt: string | null;
  readonly content: JSX.Element;
  readonly series?: SeriesWithToC | null;
}

export const SingleArticle = memo(
  forwardRef<HTMLElement, SingleArticleProps>(
    ({ cover, index, title, authors, mainCategory, permalink, excerpt, content, isMdx, series }, ref) => {
      const href = '/' + permalink;

      return (
        <Card
          as="article"
          roundAllCorners={true}
          moreSpace={true}
          ref={ref}
          className={`${isMdx ? '__mdx' : '__html'}`}
          itemScope
          itemProp="mainEntity"
          itemType="http://schema.org/Article"
        >
          <header className="bg-gray-200">
            <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-6 ${cover ? 'pt-0' : 'mb-6'}`}>
              <ArticleTitle title={title} index={index} href={href} level={1} />
              {excerpt && (
                <div className="prose mt-4 pb-2">
                  <p className="lead">{excerpt}</p>
                </div>
              )}
              <ArticleMeta series={series} rel={true} authors={authors} mainCategory={mainCategory} size="small" />
            </div>

            {cover && <ArticleCoverImage cover={cover} wide={true} />}
          </header>
          <div itemProp="articleBody" className="prose lg:prose-xl mx-auto pb-2 px-7 sm:px-8 lg:px-12">
            {content}
          </div>
          <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
              <meta itemProp="url" content="/wp-content/uploads/2020/04/logo_kwadrat11.png" />
            </span>
            <meta itemProp="name" content="Type of Web" />
          </span>
          <link itemProp="mainEntityOfPage" href={href} />
          {index && <ArticleFooter authors={authors} />}
          {index && <RelatedArticles permalink={permalink} />}
        </Card>
      );
    },
  ),
);
SingleArticle.displayName = 'SingleArticle';
