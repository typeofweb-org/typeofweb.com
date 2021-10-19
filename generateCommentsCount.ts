import Fs from 'fs/promises';
import Path from 'path';
import Url from 'url';

import { createAppAuth } from '@octokit/auth-app';
import Bluebird from 'bluebird';
import { Octokit } from 'octokit';

import { readAllPosts } from './utils/wordpress';

const run = async () => {
  const posts = await readAllPosts({ includePages: true });
  const results = await Bluebird.map(
    posts.posts,
    async (post) => {
      // @todo cache ?
      console.log(`Processing ${post.data.title}…`);
      const count = await fetchCommentsCount(post.data.title);
      const result: readonly [title: string, count: number] = [post.data.title, count];
      return result;
    },
    { concurrency: 1 },
  );

  const map = Object.fromEntries(results);

  await Fs.writeFile(
    Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), 'public', 'comments.json'),
    JSON.stringify(map),
    'utf-8',
  );
};

run()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

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
  readonly search?: { readonly nodes?: readonly { readonly comments?: { readonly totalCount?: number } }[] };
}

export const fetchCommentsCount = async (title: string) => {
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

  const q = `repo:typeofweb/typeofweb.com category:"Komentarze" in:title ${title}`;

  const response = await octokit.graphql<SearchDiscussionsQueryResult>(SEARCH_DISCUSSIONS_QUERY, {
    q,
    fetch: global.fetch,
  });
  return response?.search?.nodes?.[0]?.comments?.totalCount ?? 0;
};
