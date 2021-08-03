import { Feed } from 'feed';

import { siteName, defaultDescription } from '../../components/Seo';
import { postToProps } from '../../utils/postToProps';
import { readAllPosts } from '../../utils/wordpress';

import type { NextApiHandler } from 'next';

export async function generateFeed() {
  const publicUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  const { posts: allPosts } = await readAllPosts({ includePages: false });
  const authorsJson = (await import(/* webpackChunkName: "authors" */ '../../authors.json')).default;
  const posts = (await Promise.all(allPosts.map((post) => postToProps(post, authorsJson, { onlyExcerpt: true })))).map(
    (p) => ({
      ...p,
      content: '',
    }),
  );

  const feed = new Feed({
    title: siteName,
    description: defaultDescription,
    id: publicUrl,
    link: publicUrl,
    language: 'pl',
    image: `${publicUrl}/logo.png`,
    favicon: `${publicUrl}/favicon.ico`,
    copyright: 'Type of Web',
    updated: new Date(posts[0]?.frontmatter.date ?? 0),
    generator: siteName,
    feedLinks: {
      rss: `${publicUrl}/feed`,
    },
    author: {
      name: siteName,
      link: publicUrl,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      description: post.excerpt || undefined,
      author: post.frontmatter.authors.map((a) => ({
        name: a.displayName,
        link: a.website || a.facebook || a.linkedin || a.twitter || a.github || a.youtube || a.instagram || undefined,
      })),
      link: `${publicUrl}/${post.frontmatter.permalink}`,
      date: new Date(post.frontmatter.date ?? 0),
      id: post.frontmatter.permalink,
    });
  });

  return feed;
}

const feedApiHandler: NextApiHandler = async (req, res) => {
  const feed = await generateFeed();

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate`);

  res.end(feed.atom1());
};

export default feedApiHandler;
