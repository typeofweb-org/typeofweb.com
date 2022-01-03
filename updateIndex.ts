import Fs from 'fs/promises';

import { pathToLegacyPosts, pathToPosts, listFilesInDir } from './utils/fs';
import { readFrontMatter } from './utils/posts';

async function run() {
  const paths = [...(await listFilesInDir(pathToPosts)), ...(await listFilesInDir(pathToLegacyPosts))];
  const files = await Promise.all(paths.map(async (path) => ({ file: await Fs.readFile(path, 'utf-8'), path })));

  const posts = files
    .map(({ file, path }) => ({ fm: readFrontMatter(file), file, path }))
    .sort(({ fm: a }, { fm: b }) => Number(b.data.date) - Number(a.data.date))
    .filter(({ fm: p }) => p.data.type === 'post')
    .reverse();

  await Promise.all(
    posts.map(({ file, path }, idx) => {
      const newfile = file.replace('index: __REPLACEME__', `index: ${idx + 1}`);
      return Fs.writeFile(path, newfile, 'utf-8');
    }),
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
