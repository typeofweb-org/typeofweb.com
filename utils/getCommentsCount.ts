import { getCachedCommentsCount } from './commentsCountCache';

export const getCommentsCount = (title: string) => getCachedCommentsCount(title);
