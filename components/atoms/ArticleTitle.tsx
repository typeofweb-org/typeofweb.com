import Link from 'next/link';

import { SectionTitle } from './SectionTitle';

export const ArticleTitle = ({
  title,
  index,
  href,
}: {
  readonly title: string;
  readonly id: number;
  readonly index: number;
  readonly href: string;
}) => {
  return (
    <Link href={href}>
      <a className="block">
        <SectionTitle size="large">
          {title}
          <span
            aria-label={`Artykuł numer ${index}`}
            title={`Artykuł numer ${index}`}
            className="text-stroke absolute -left-7 top-1 text-gray-500 font-sans text-xl font-semibold"
          >
            {index}
          </span>
        </SectionTitle>
      </a>
    </Link>
  );
};
