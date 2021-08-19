import { getAuth } from '@openlab/vercel-netlify-cms-github';

export default getAuth({
  scopes: ['public_repo'],
  secure: process.env.NODE_ENV === 'production',
});
