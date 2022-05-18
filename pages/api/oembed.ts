import Authors from '../../authors.json';
import { getExcerptAndContent, getPostByPermalink } from '../../utils/posts';

import type { OembedData } from '../../utils/oEmbedCache';
import type { NextApiRequest, NextApiResponse } from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const format = req.query.format || 'json';
  const url = req.query.url;
  if (format !== 'json') {
    res.status(501).end('Invalid format. Only json is allowed.');
    return;
  }

  if (!url || Array.isArray(url)) {
    res.status(404).end('Invalid url 1.');
    return;
  }

  const parsedUrl = new URL(decodeURIComponent(url));
  if (parsedUrl.host !== process.env.NEXT_PUBLIC_HOST && parsedUrl.host !== 'typeofweb.com') {
    res.status(404).end('Invalid url 2.');
    return;
  }

  const permalink = parsedUrl.pathname.replace(/^\//, '').replace(/\/$/, '');

  const post = await getPostByPermalink(permalink);
  if (!post) {
    console.log(permalink);
    res.status(404).end('Invalid url 3.');
    return;
  }

  const contentObj = await getExcerptAndContent(post, { onlyExcerpt: true, parseOembed: false });
  const author = post.data.authors
    .map((authorId) => Authors.authors.find((a) => a.slug === authorId))
    .map((a) => a?.displayName)
    .join(', ');

  const response: OembedData = {
    version: '1.0',
    type: 'rich',
    title: post.data.title,
    author_name: author,
    provider_name: 'Type of Web',
    provider_url: 'https://typeofweb.com',
    cache_age: '3600',
    ...(post.data.thumbnail && {
      thumbnail_url: post.data.thumbnail.url.replace(/^\/public\//, '/'),
      thumbnail_width: post.data.thumbnail.width,
      thumbnail_height: post.data.thumbnail.height,
    }),
    width: post.data.thumbnail?.width ?? 640,
    height: (post.data.thumbnail?.height ?? 480) + 64,
    html: `<p>${contentObj.excerpt}</p>`,
  };

  res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
  res.json(response);
};

export default handler;
