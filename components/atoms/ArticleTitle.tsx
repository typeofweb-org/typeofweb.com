import Link from 'next/link';
import { memo } from 'react';

import { SectionTitle } from './SectionTitle';

export const ArticleTitle = memo<{
  readonly title: string;
  readonly id: number;
  readonly index: number;
  readonly href: string;
  readonly level: 1 | 2;
}>(({ title, index, href, level }) => {
  return (
    <Link href={href}>
      <a className="block" itemProp="mainEntityOfPage" rel="bookmark">
        <SectionTitle size="large" level={level} itemProp="headline">
          {title}
          <span
            aria-label={`Artykuł numer ${index}`}
            title={`Artykuł numer ${index}`}
            className="text-stroke absolute -left-8 top-1 w-8 text-gray-500 font-sans text-xl font-semibold lg:-left-12 lg:w-12"
          >
            {index}
          </span>
        </SectionTitle>
      </a>
    </Link>
  );
});
ArticleTitle.displayName = 'ArticleTitle';
