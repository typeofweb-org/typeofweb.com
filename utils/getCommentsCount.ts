import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from 'octokit';

const SEARCH_DISCUSSIONS_QUERY = /* GraphQL */ `
query searchDiscussions($q: String!) {
  search(type: DISCUSSION last: 1 query: $q) {
    nodes {
      ... on Discussion {
        comments {
          totalCount
        }
      }
    }
  }
}
`.trim();

interface SearchDiscussionsQueryResult {
  readonly searchDiscussions?: { readonly nodes?: readonly { readonly comments?: { readonly totalCount?: number } }[] };
}

global.getCommentsCountCache = {};
export const getCommentsCount = async (title: string) => {
  if (process.env.NODE_ENV === 'development') {
    return (Math.random() * 100) | 0;
  }

  if (global.getCommentsCountCache[title] !== undefined) {
    return global.getCommentsCountCache[title];
  }

  const octokit = new Octokit({
    fetch: global.fetch,
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      installationId: process.env.GITHUB_INSTALLATION_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  });

  const q = `repo:typeofweb/typeofweb.com category:"General" in:title ${title}`;

  const response = await octokit.graphql<SearchDiscussionsQueryResult>(SEARCH_DISCUSSIONS_QUERY, {
    q,
    fetch: global.fetch,
  });
  return (global.getCommentsCountCache[title] = response?.searchDiscussions?.nodes?.[0]?.comments?.totalCount ?? 0);
};
