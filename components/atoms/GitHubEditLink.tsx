import { LinkUnderlineEffect } from './LinkUnderlineEffect';

const repo = `https://github.com/typeofweb/typeofweb.com/edit/main/`;

const NBSP = '\u00A0';

export const GitHubEditLink = ({ filePath }: { readonly filePath: string }) => {
  const url = `${repo}${filePath}`;
  return (
    <p className="mt-5 text-center text-gray-900 whitespace-nowrap text-xl font-bold">
      <span className="inline-block">
        👉{NBSP}
        {NBSP}Znalazłeś/aś błąd?{NBSP}
        {NBSP}👈
      </span>
      <span className="inline-block">
        <LinkUnderlineEffect>
          <a href={url} className="text-blue-500">
            Edytuj ten wpis na GitHubie!
          </a>
        </LinkUnderlineEffect>
      </span>
    </p>
  );
};
