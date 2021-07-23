import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { SectionTitle } from '../atoms/SectionTitle';
import { ArticleMeta } from '../molecules/ArticleMeta';

import type { Author } from '../molecules/ArticleMeta';

interface ArticleSneakPeekProps {
  readonly coverUrl?: string;
  readonly id: number;
  readonly title: string;
  readonly authors: readonly Author[];
  readonly mainCategory: string;
  readonly href: string;
}

export const ArticleSneakPeek = ({ coverUrl, id, title, authors, mainCategory, href }: ArticleSneakPeekProps) => {
  return (
    <Card as="article" roundAllCorners={!coverUrl} moreSpace={!coverUrl}>
      <header className="bg-gray-200">
        {coverUrl && <ArticleCoverImage coverUrl={coverUrl} wide={false} />}
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 ${coverUrl ? 'pt-6' : ''}`}>
          <ArticleTitle title={title} id={id} href={href} />
          <ArticleMeta authors={authors} mainCategory={mainCategory} />
        </div>
      </header>
      <div className="prose lg:prose-xl pb-2 px-7 sm:px-8 lg:px-12">
        <p>
          Wielu osobom wydaje się, że im stajemy się starsi, tym czas szybciej płynie. Mamy tysiące wspomnień ze
          wczesnej młodości, a później trudno nam odróżnić rok od roku. Ale czy aby na pewno tylko nam się wydaje? Czy
          to zjawisko jest jakoś opisane i uzasadnione?{' '}
          <LinkUnderlineEffect>
            <a href={href}>Czytaj dalej…</a>
          </LinkUnderlineEffect>
        </p>
      </div>
    </Card>
  );
};
