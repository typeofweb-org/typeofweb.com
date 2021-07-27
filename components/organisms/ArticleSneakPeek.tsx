import Link from 'next/link';

import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Author } from '../molecules/ArticleMeta';

interface ArticleSneakPeekProps {
  readonly cover: { readonly url: string; readonly width: number; readonly height: number } | null;
  readonly id: number;
  readonly index: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: { readonly slug: string; readonly name: string } | null;
  readonly href: string;
  readonly excerpt: string;
}

export const ArticleSneakPeek = ({
  cover,
  id,
  index,
  title,
  authors,
  mainCategory,
  href,
  excerpt,
}: ArticleSneakPeekProps) => {
  return (
    <Card as="article" roundAllCorners={!cover} moreSpace={!cover}>
      <header className="bg-gray-200">
        {cover && <ArticleCoverImage cover={cover} wide={false} />}
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 ${cover ? 'pt-6' : ''}`}>
          <ArticleTitle title={title} id={id} index={index} href={href} />
          <ArticleMeta authors={authors} mainCategory={mainCategory} />
        </div>
      </header>
      <div className="prose prose-lg pb-2 px-7 sm:px-8 lg:px-12">
        <p className="!indent-0">
          {excerpt}{' '}
          <span className="inner-link">
            <Link href={href}>
              <a>Czytaj dalej…</a>
            </Link>
          </span>
        </p>
      </div>
    </Card>
  );
};
