import { getAuth } from '@openlab/vercel-netlify-cms-github';
import { withSentry } from '@sentry/nextjs';

export default withSentry(
  getAuth({
    scopes: ['public_repo'],
    secure: process.env.NODE_ENV === 'production',
  }),
);
