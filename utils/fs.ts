import Path from 'path';
import * as Process from 'process';

import { host } from '../constants';

export const wordpressFolderName = '_wordpress_posts';
export const postsFolderName = '_posts';
export const pagesFolderName = '_pages';
const basePath = Path.resolve(Process.cwd(), '');

export const pathToLegacyPosts = Path.resolve(basePath, wordpressFolderName);
export const pathToPosts = Path.resolve(basePath, postsFolderName);
export const pathToPages = Path.resolve(basePath, pagesFolderName);

export async function listFilesInDir(absolutePath: string): Promise<readonly string[]> {
  const shouldReadFromGitHub = process.env.ENABLE_GITHUB_READ === 'true';
  const relativePath = absolutePath.replace(basePath, '');

  const files = shouldReadFromGitHub
    ? await listFilesInDirGitHub(relativePath)
    : await listFilesInDirFileSystem(absolutePath);

  return files.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));
}

export async function readFile(
  absolutePath: string,
): Promise<{ readonly file: string; readonly relativePath: string }> {
  const shouldReadFromGitHub = process.env.ENABLE_GITHUB_READ === 'true';
  const relativePath = absolutePath.replace(basePath, '');

  const file = shouldReadFromGitHub ? await readFileGitHub(relativePath) : await readFileFileSystem(absolutePath);

  return { file, relativePath };
}

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

async function readFileFileSystem(absolutePath: string): Promise<string> {
  // eslint-disable-next-line import/dynamic-import-chunkname -- ok
  const Fs = await import('fs/promises');
  return Fs.readFile(absolutePath, 'utf-8');
}

async function listFilesInDirGitHub(relativePath: string): Promise<readonly string[]> {
  const res = await fetch(`${host}/api/githubProxy?action=listFilesInDir&path=${encodeURIComponent(relativePath)}`);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- response
  const json = (await res.json()) as { readonly data: readonly string[] };
  return json.data;
}

async function readFileGitHub(relativePath: string): Promise<string> {
  const res = await fetch(`${host}/api/githubProxy?action=readFile&path=${encodeURIComponent(relativePath)}`);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- response
  const json = (await res.json()) as { readonly data: string };
  return json.data;
}
