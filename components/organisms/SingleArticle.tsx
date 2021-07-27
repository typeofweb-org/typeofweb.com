import React, { forwardRef } from 'react';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Author } from '../molecules/ArticleMeta';

interface SingleArticleProps {
  readonly cover: { readonly url: string; readonly width: number; readonly height: number } | null;
  readonly id: number;
  readonly index: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly href: string;
  readonly excerpt: string;
  readonly content: string;
}

export const SingleArticle = forwardRef<HTMLElement, SingleArticleProps>(
  ({ cover, id, index, title, authors, mainCategory, href, excerpt, content }, ref) => {
    return (
      <Card as="article" roundAllCorners={true} moreSpace={true} ref={ref}>
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
        <div className="prose lg:prose-xl pb-2 px-7 sm:px-8 lg:px-12" dangerouslySetInnerHTML={{ __html: content }} />
      </Card>
    );
  },
);
SingleArticle.displayName = 'SingleArticle';
