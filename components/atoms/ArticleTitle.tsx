import { SectionTitle } from './SectionTitle';

export const ArticleTitle = ({
  title,
  id,
  href,
}: {
  readonly title: string;
  readonly id: number;
  readonly href: string;
}) => {
  return (
    <a href={href} className="block">
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
  );
};
