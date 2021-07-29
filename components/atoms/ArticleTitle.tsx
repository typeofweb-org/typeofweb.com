import Link from 'next/link';

import { SectionTitle } from './SectionTitle';

export const ArticleTitle = ({
  title,
  index,
  href,
  level,
}: {
  readonly title: string;
  readonly id: number;
  readonly index: number;
  readonly href: string;
  readonly level: 1 | 2;
}) => {
  return (
    <Link href={href}>
      <a className="block">
        <SectionTitle size="large" level={level}>
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
};
