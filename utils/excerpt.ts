const MAX_WORDS = 50;
export const trimExcerpt = (excerpt: string) => {
  const excerptWords = excerpt.split(/\s+/);
  const ex =
    excerptWords.length > MAX_WORDS ? excerptWords.slice(0, MAX_WORDS).join(' ') + '…' : excerptWords.join(' ');
  return ex;
};

/**
 * Currently only `---` is used for explicitely marking the end of the excerpt.
 * For legacy reasons, WordPress tags are also included.
 * @todo remove this when legacy support is removed
 */
const more = /^\*{3,}$|^---$|^\<hr\s*\/?\>$|<!--\s*more\s*-->|\{\s*\/_\s*more\s*_\/\s*\}|\{\s*\/\*\s*more\s*\*\/\s*\}/m;

/**
 * Alternatively, split content when either one is first met:
 * - markdown header
 * - double `\n`
 * - double `\r\n`
 * - html header
 */
const other = /^##\s*|\n\n|\r\n\r\n|\<h\d/;

export const splitContent = (postContent: string) => {
  const match = more.exec(postContent) || other.exec(postContent) || { index: 0 };
  const [excerpt, content] = [postContent.slice(0, match.index), postContent.slice(match.index).replace(more, '')];
  return [excerpt.trim(), content.trim()] as const;
};
