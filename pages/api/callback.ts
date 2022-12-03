import { getCallback } from '@openlab/vercel-netlify-cms-github';

export default (
  getCallback({
    // scopes: ['public_repo'],
    scopes: ['repo', 'user'],
    secure: process.env.NODE_ENV === 'production',
  }),
);
