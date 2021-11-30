import Dynamic from 'next/dynamic';
import React, { forwardRef, memo, useEffect } from 'react';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { GitHubEditLink } from '../atoms/GitHubEditLink';
import { ArticleFooter } from '../molecules/ArticleFooter';
import { ArticleMeta } from '../molecules/ArticleMeta';
import { Timeline } from '../molecules/Timeline';

import type { SeriesWithToC } from '../../types';
import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';
import type { Author } from '../molecules/ArticleMeta';

const RelatedArticles = Dynamic<{ readonly permalink: string }>(() =>
  import(/* webpackChunkName: "RelatedArticles" */ '../molecules/RelatedArticles').then((m) => m.RelatedArticles),
);
const Comments = Dynamic<{ readonly postTitle: string }>(
  () => import(/* webpackChunkName: "Comments" */ '../Comments').then((m) => m.Comments),
  {
    ssr: false,
  },
);

interface SingleArticleProps {
  readonly filePath: string;
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
  readonly commentsCount: number;
}

export const SingleArticle = memo(
  forwardRef<HTMLElement, SingleArticleProps>(
    (
      {
        filePath,
        cover,
        index,
        title,
        authors,
        mainCategory,
        permalink,
        excerpt,
        content,
        isMdx,
        series,
        commentsCount,
      },
      ref,
    ) => {
      const href = '/' + permalink;

      useEffect(() => {
        window.dataLayer.push({
          algoliaDisplayedObjectIDs: permalink,
        });
      }, [permalink]);

      return (
        <Card
          as="article"
          ref={ref}
          className={`${isMdx ? '__mdx' : '__html'}`}
          itemScope
          itemProp="mainEntity"
          itemType="http://schema.org/Article"
        >
          <header>
            <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 pt-8`}>
              <ArticleTitle title={title} href={href} level={1} />
              {excerpt && (
                <div className="prose mt-8 pb-2">
                  <p className="lead">{excerpt}</p>
                </div>
              )}
              <ArticleMeta
                commentsCount={commentsCount}
                series={series}
                rel={true}
                authors={authors}
                mainCategory={mainCategory}
                permalink={permalink}
                size="small"
              />
              {cover && <ArticleCoverImage cover={cover} />}
            </div>
          </header>
          <div itemProp="articleBody" className="prose lg:prose-xl mx-auto pb-2 px-7 sm:px-8 lg:px-12">
            {content}
          </div>
          {permalink === 'wspolpraca' && <Timeline />}
          <GitHubEditLink filePath={filePath} />
          <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
              <meta
                itemProp="url"
                content="https://res.cloudinary.com/type-of-web/wp-content/uploads/2020/04/logo_kwadrat11.png"
              />
            </span>
            <meta itemProp="name" content="Type of Web" />
          </span>
          <link itemProp="mainEntityOfPage" href={href} />
          {index && <ArticleFooter authors={authors} />}
          {index && <RelatedArticles permalink={permalink} />}
          <Comments postTitle={title} />
        </Card>
      );
    },
  ),
);
SingleArticle.displayName = 'SingleArticle';
