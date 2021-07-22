import Image from 'next/image';

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
        {coverUrl && (
          <div className="text-[length:0] rounded-t-xl overflow-hidden">
            <Image
              width={800}
              height={450}
              className="duration-[10s] hover:scale-110 transition-transform ease-in hover:ease-out"
              src={coverUrl}
              alt=""
            />
          </div>
        )}
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 ${coverUrl ? 'pt-6' : ''}`}>
          <a href={href}>
            <SectionTitle size="large">
              {title}
              <span
                aria-label={`Artykuł numer ${id}`}
                title={`Artykuł numer ${id}`}
                className="text-stroke absolute -left-7 top-1 text-gray-500 font-sans text-xl font-semibold"
              >
                {id}
              </span>
            </SectionTitle>
          </a>
          <div className="mt-2">
            <ArticleMeta authors={authors} mainCategory={mainCategory} />
          </div>
        </div>
      </header>
      <div className="article-content pb-2 px-7 sm:px-8 lg:px-12">
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
