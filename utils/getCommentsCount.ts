import Comments from '../public/comments.json';
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed
export const getCommentsCount = (title: string) => (title in Comments ? Comments[title as keyof typeof Comments] : 0);
