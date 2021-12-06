import Path from 'path';
import * as Process from 'process';

import { Octokit } from '@octokit/rest';

import { memoize } from './memoize';

export const wordpressFolderName = '_wordpress_posts';
export const postsFolderName = '_posts';
export const pagesFolderName = '_pages';
const basePath = Path.resolve(Process.cwd(), '');

export const pathToLegacyPosts = Path.resolve(basePath, wordpressFolderName);
export const pathToPosts = Path.resolve(basePath, postsFolderName);
export const pathToPages = Path.resolve(basePath, pagesFolderName);

async function listFilesInDirFileSystem(absolutePath: string): Promise<readonly string[]> {
  // eslint-disable-next-line import/dynamic-import-chunkname -- ok
  const Fs = await import('fs/promises');
  const entries = await Fs.readdir(absolutePath, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = Path.join(absolutePath, entry.name);
        if (entry.isDirectory()) {
          return await listFilesInDirFileSystem(fullPath);
        }
        if (entry.isFile()) {
          return fullPath;
        }
        return;
      }),
    )
  )
    .flat()
    .filter((x: string | undefined): x is string => !!x);
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

export async function listFilesInDir(absolutePath: string): Promise<readonly string[]> {
  const shouldReadFromGitHub = process.env.NODE_ENV === 'production' || process.env.FORCE_GITHUB_READ;
  const relativePath = absolutePath.replace(basePath, '');

  const files = shouldReadFromGitHub
    ? await listFilesInDirGitHub(relativePath)
    : await listFilesInDirFileSystem(absolutePath);

  return files.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));
}

export async function readFile(
  absolutePath: string,
): Promise<{ readonly file: string; readonly relativePath: string }> {
  const shouldReadFromGitHub = process.env.NODE_ENV === 'production' || process.env.FORCE_GITHUB_READ;
  const relativePath = absolutePath.replace(basePath, '');

  const file = shouldReadFromGitHub ? await readFileGitHub(relativePath) : await readFileFileSystem(absolutePath);

  return { file, relativePath };
}

async function readFileGitHub(relativePath: string): Promise<string> {
  const data = await getFileFromGithubMemoized({ relativePath });
  return Buffer.from(data.content, 'base64').toString('utf8');
}

async function readFileFileSystem(absolutePath: string): Promise<string> {
  // eslint-disable-next-line import/dynamic-import-chunkname -- ok
  const Fs = await import('fs/promises');
  return Fs.readFile(absolutePath, 'utf-8');
}

const getListDirFromGithubMemoized = memoize(async ({ relativePath }: { readonly relativePath: string }) => {
  console.count('github request');

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.rest.repos
    .getContent({
      owner: 'typeofweb',
      repo: 'typeofweb.com',
      path: relativePath,
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

  if (!Array.isArray(response.data)) {
    console.error(response.data);
    throw new Error('GITHUB API ERROR');
  }

  return response.data;
});

const getFileFromGithubMemoized = memoize(async ({ relativePath }: { readonly relativePath: string }) => {
  console.count('github request');
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await octokit.rest.repos.getContent({
    owner: 'typeofweb',
    repo: 'typeofweb.com',
    path: relativePath,
  });

  if (typeof response.data !== 'object' || Array.isArray(response.data) || !('content' in response.data)) {
    console.error(response.data);
    throw new Error('GITHUB API ERROR');
  }

  return response.data;
});
