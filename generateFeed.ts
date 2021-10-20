import Fs from 'fs/promises';
import Path from 'path';
import Url from 'url';

import Bluebird from 'bluebird';
import { Feed } from 'feed';

import { siteName, defaultDescription } from './constants';
import { postToProps } from './utils/postToProps';
import { readAllPosts } from './utils/wordpress';

async function generateFeed() {
  const publicUrl = `https://${process.env.NEXT_PUBLIC_HOST ?? process.env.NEXT_PUBLIC_VERCEL_URL}`;

  const { posts: allPosts } = await readAllPosts({ includePages: false, includeCommentsCount: false });
  const authorsJson = (await import(/* webpackChunkName: "authors" */ './authors.json')).default.authors;

  const feed = new Feed({
    title: siteName,
    description: defaultDescription,
    id: publicUrl,
    link: publicUrl,
    language: 'pl',
    image: `${publicUrl}/apple-touch-icon.png`,
    favicon: `${publicUrl}/favicon.ico`,
    copyright: 'Type of Web',
    updated: new Date(),
    generator: siteName,
    feedLinks: {
      rss: `${publicUrl}/feed`,
    },
    author: {
      name: siteName,
      link: publicUrl,
    },
  });

  await Bluebird.map(
    allPosts,
    async (post) => {
      return postToProps(post, authorsJson, {
        onlyExcerpt: true,
        parseOembed: false,
        includeCommentsCount: false,
        includePlaiceholder: false,
      });
    },
    { concurrency: 10 },
  ).mapSeries((result) => {
    feed.addItem({
      title: result.frontmatter.title,
      description: result.excerpt || undefined,
      author: result.frontmatter.authors.map((a) => ({
        name: a.displayName,
        // link: a.website || a.facebook || a.linkedin || a.twitter || a.github || a.youtube || a.instagram || undefined,
      })),
      link: `${publicUrl}/${result.frontmatter.permalink}`,
      date: new Date(result.frontmatter.date ?? 0),
      id: result.frontmatter.permalink,
    });
  });

  return feed;
}

async function run() {
  console.log('generateFeed');
  const feed = await generateFeed();

  await Fs.writeFile(
    Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), 'public', 'feed.xml'),
    feed.rss2(),
    'utf-8',
  );
  await Fs.writeFile(
    Path.resolve(Path.dirname(Url.fileURLToPath(import.meta.url)), 'public', 'feed.json'),
    feed.json1(),
    'utf-8',
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
