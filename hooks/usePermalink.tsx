import { useRouter } from 'next/router';

interface RouterQuery {
  readonly page?: string;
  readonly permalink?: string;
}

export const usePermalink = () => {
  const r = useRouter();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- it's true
  const query = r.query as RouterQuery;
  return query.permalink;
};

export const usePage = () => {
  const r = useRouter();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- it's true
  const query = r.query as RouterQuery;
  return query.page ? Number(query.page) : undefined;
};
