import { generateFeed } from './feed';

import type { NextApiHandler } from 'next';

const feedApiHandler: NextApiHandler = async (req, res) => {
  const feed = await generateFeed();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate`);

  res.json(feed.json1());
};

export default feedApiHandler;
