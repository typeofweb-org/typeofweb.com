import Link from 'next/link';
import { memo } from 'react';

import { SectionTitle } from './SectionTitle';

const NBSP = '\u00A0';

export const wisząceSpójniki = (title: string) => title.replace(/((\s(\p{L})|(\b[0-9]{1,3}))\s)/gu, `$2${NBSP}`);

export const ArticleTitle = memo<{
  readonly title: string;
  readonly href: string;
  readonly level: 1 | 2;
}>(({ title, href, level }) => {
  return (
    <Link href={href}>
      <a className="inline-block" itemProp="mainEntityOfPage" rel="bookmark">
        <SectionTitle size="large" level={level} itemProp="headline">
          {wisząceSpójniki(title)}
        </SectionTitle>
      </a>
    </Link>
  );
});
ArticleTitle.displayName = 'ArticleTitle';
