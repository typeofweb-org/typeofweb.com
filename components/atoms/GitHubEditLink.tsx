import { LinkUnderlineEffect } from './LinkUnderlineEffect';

const repo = `https://github.com/typeofweb/typeofweb.com/edit/main/`;

const NBSP = '\u00A0';

export const GitHubEditLink = ({ filePath }: { readonly filePath: string }) => {
  const url = `${repo}${filePath}`;
  return (
    <p className="mt-5 px-12 text-center text-gray-900 text-xl font-bold">
      👉{NBSP}
      {NBSP}Znalazłeś/aś błąd?{' '}
      <LinkUnderlineEffect>
        <a href={url} className="text-blue-500">
          Edytuj ten wpis na GitHubie!
        </a>
      </LinkUnderlineEffect>
      {NBSP}
      {NBSP}👈
    </p>
  );
};
