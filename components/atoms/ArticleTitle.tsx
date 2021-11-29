import Link from 'next/link';
import { memo } from 'react';

import { SectionTitle } from './SectionTitle';

export const ArticleTitle = memo<{
  readonly title: string;
  readonly href: string;
  readonly level: 1 | 2;
}>(({ title, href, level }) => {
  return (
    <Link href={href}>
      <a className="inline-block" itemProp="mainEntityOfPage" rel="bookmark">
        <SectionTitle size="large" level={level} itemProp="headline">
          {title}
        </SectionTitle>
      </a>
    </Link>
  );
});
ArticleTitle.displayName = 'ArticleTitle';
