import { Octokit } from 'octokit';

import { memoize } from '../../utils/memoize';

import type { NextApiHandler, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (typeof req.query.action !== 'string' || typeof req.query.path !== 'string') {
    res.status(400).send('Missing action');
    return;
  }
  try {
    return await getData({ path: req.query.path, action: req.query.action }, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const getData = async ({ path, action }: { readonly path: string; readonly action: string }, res: NextApiResponse) => {
  if (action === 'readFile') {
    const data = await readFileGitHub(path);
    res
      .setHeader('Content-Type', 'application/json')
      .setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
      .send({ data });
  } else if (action === 'listFilesInDir') {
    const data = await listFilesInDirGitHub(path);
    res
      .setHeader('Content-Type', 'application/json')
      .setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
      .send({ data });
  }
};

export default handler;

const getListDirFromGithubMemoized = (memoize(async ({ relativePath }: { readonly relativePath: string }) => {
  console.count('github request');

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.rest.repos.getContent({
    owner: 'typeofweb-org',
    repo: 'typeofweb.com',
    path: relativePath,
  });

  if (!Array.isArray(response.data)) {
    throw new Error('GITHUB API ERROR');
  }

  return response.data;
}));

const getFileFromGithubMemoized = memoize(async ({ relativePath }: { readonly relativePath: string }) => {
  console.count('github request');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.rest.repos.getContent({
    owner: 'typeofweb-org',
    repo: 'typeofweb.com',
    path: relativePath,
  });

  if (typeof response.data !== 'object' || Array.isArray(response.data) || !('content' in response.data)) {
    throw new Error('GITHUB API ERROR');
  }

  return response.data;
});

async function readFileGitHub(relativePath: string): Promise<string> {
  const data = await getFileFromGithubMemoized({ relativePath });
  return Buffer.from(data.content, 'base64').toString('utf8');
}

async function listFilesInDirGitHub(relativePath: string): Promise<readonly string[]> {
  const data = await getListDirFromGithubMemoized({ relativePath });

  return (
    await Promise.all(
      data.map(async (entry) => {
        if (entry.type === 'dir') {
          return await listFilesInDirGitHub(entry.path);
        }
        if (entry.type === 'file') {
          return entry.path;
        }
        return;
      }),
    )
  )
    .flat()
    .filter((x: string | undefined): x is string => !!x);
}
