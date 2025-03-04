/* eslint-disable functional/no-loop-statement -- useful */
import AuthorsJson from '../../authors.json' assert { type: 'json' };
import Data from '../../relatedPosts2.json' assert { type: 'json' };
import { postToProps } from '../../utils/postToProps';
import { getPostByPermalink } from '../../utils/posts';

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

  try {
    const { relatedSneakPeeks, randomized } = await getRelatedPosts2ForPermalink(permalink);
    res.json({ related: relatedSneakPeeks, randomized });
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
};

export default getRelatedPostsHandler;

export const getRelatedPosts2ForPermalink = async (permalink: string) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- check is one line below
  const key = ('/' + permalink.replace(/\//g, '') + '/') as keyof typeof Data;

  const related = (Data[key] ?? []).slice(0, NUM_RELATED).filter(Boolean);

  const randomized = NUM_RELATED - related.length;

  const keys = Object.keys(Data);
  for (let i = 0; related.length < NUM_RELATED; ++i) {
    console.log(key + `${i}${i}${i}`);
    // quite random but also predictable
    related.push(keys[simpleHash(key + `${i}`, keys.length)]);
  }

  const relatedPosts = await Promise.all(related.map((path) => path.replace(/\//g, '')).map(getPostByPermalink));

  const relatedSneakPeeksPosts = await Promise.all(
    relatedPosts.map((post) => {
      return post
        ? postToProps(post, AuthorsJson.authors, {
            onlyExcerpt: true,
            parseOembed: false,
            includeCommentsCount: false,
            includePlaiceholder: true,
          })
        : null;
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
