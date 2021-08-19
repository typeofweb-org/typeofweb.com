import { getCallback } from '@openlab/vercel-netlify-cms-github';

export default getCallback({
  scopes: ['public_repo'],
  secure: process.env.NODE_ENV === 'production',
});
