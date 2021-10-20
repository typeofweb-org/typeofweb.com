import { setCachedCommentsCount } from '../../utils/commentsCountCache';

import type { HookPayload } from './_types/discussion';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload: HookPayload = req.body;

  if (payload.action === 'created' && 'comment' in payload) {
    await setCachedCommentsCount(payload.discussion.title, payload.discussion.comments);
  } else if (payload.action === 'created') {
    await setCachedCommentsCount(payload.discussion.title, payload.discussion.comments);
  } else if (payload.action === 'deleted' && 'comment' in payload) {
    await setCachedCommentsCount(payload.discussion.title, payload.discussion.comments);
  } else if (payload.action === 'deleted') {
    await setCachedCommentsCount(payload.discussion.title, 0);
  }

  res.status(200).end();
};

export default handler;
