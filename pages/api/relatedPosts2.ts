/* eslint-disable functional/no-loop-statement -- useful */
import { withSentry } from '@sentry/nextjs';

import A from '../../authors.json';
const AuthorsJson = A.authors;
import Data from '../../relatedPosts2.json';
import { postToProps } from '../../utils/postToProps';
import { getPostByPermalink } from '../../utils/wordpress';

import type { NextApiHandler } from 'next';

const NUM_RELATED = 3;

const simpleHash = (key: string, max: number) => {
  return key.split('').reduce((prev, curr, idx) => {
    return (prev + curr.charCodeAt(0) * idx) % max;
  }, 0);
};

const getRelatedPostsHandler: NextApiHandler = async (req, res) => {
  const { query } = req;

  const permalink = query.permalink;

  if (!permalink || typeof permalink !== 'string') {
    return res.status(400).json({ message: 'permalink is required' });
  }

  const { relatedSneakPeeks, randomized } = await getRelatedPosts2ForPermalink(permalink);

  res.json({ related: relatedSneakPeeks, randomized });
};

export default withSentry(getRelatedPostsHandler);

export const getRelatedPosts2ForPermalink = async (permalink: string) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- check is one line below
  const key = ('/' + permalink.replace(/\//g, '') + '/') as keyof typeof Data;

  const related = (Data[key] ?? []).slice(0, NUM_RELATED).filter(Boolean);

  const randomized = NUM_RELATED - related.length;

  const keys = Object.keys(Data);
  for (let i = 0; related.length < NUM_RELATED; ++i) {
    // quite random but also predictable
    related.push(keys[simpleHash(key + `${i}${i}${i}`, keys.length)]);
  }

  const relatedPosts = await Promise.all(related.map((path) => path.replace(/\//g, '')).map(getPostByPermalink));

  const relatedSneakPeeksPosts = await Promise.all(
    relatedPosts.map((post) => {
      return post ? postToProps(post, AuthorsJson, { onlyExcerpt: true, parseOembed: false }) : null;
    }),
  );

  const relatedSneakPeeks = relatedSneakPeeksPosts
    .filter((x): x is Exclude<typeof x, undefined | null> => !!x)
    .map(({ excerpt, frontmatter: { cover, title, permalink, mainCategory } }) => {
      return {
        excerpt,
        frontmatter: { cover, title, permalink, mainCategory },
      };
    });

  return { relatedSneakPeeks, randomized };
};
