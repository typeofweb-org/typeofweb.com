import { callback } from '@openlab/vercel-netlify-cms-github';

import type { NextApiHandler } from 'next';

const callbackHandler: NextApiHandler = async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  await callback(req, res);
};
export default callbackHandler;
