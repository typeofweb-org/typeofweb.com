import React, { forwardRef } from 'react';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';
import type { Author } from '../molecules/ArticleMeta';

interface SingleArticleProps {
  readonly cover: CoverPlaiceholder | null;
  readonly id: number;
  readonly isMdx: boolean;
  readonly index: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly href: string;
  readonly excerpt: string;
  readonly content: JSX.Element;
}

export const SingleArticle = forwardRef<HTMLElement, SingleArticleProps>(
  ({ cover, id, index, title, authors, mainCategory, href, excerpt, content, isMdx }, ref) => {
    return (
      <Card as="article" roundAllCorners={true} moreSpace={true} ref={ref} className={isMdx ? '__mdx' : '__html'}>
        <header className="bg-gray-200">
          <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-6 ${cover ? 'pt-0' : 'mb-6'}`}>
            <ArticleTitle title={title} id={id} index={index} href={href} />
            <div className="prose mt-4 pb-2">
              <p className="lead">{excerpt}</p>
            </div>
            <ArticleMeta authors={authors} mainCategory={mainCategory} />
          </div>

          {cover && <ArticleCoverImage cover={cover} wide={true} />}
        </header>
        <div className="prose lg:prose-xl pb-2 px-7 sm:px-8 lg:px-12">{content}</div>
      </Card>
    );
  },
);
SingleArticle.displayName = 'SingleArticle';
