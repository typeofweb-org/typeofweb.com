import Algoliarecommend from '@algolia/recommend';

import { getFingerprint } from '../../utils/fingerprint';

import type { TypeOfWebHit } from '../../types';
import type { NextApiHandler } from 'next';

const getRelatedPostsHandler: NextApiHandler = async (req, res) => {
  const { query } = req;

  const permalink = query.permalink;

  if (!permalink || typeof permalink !== 'string') {
    return res.status(400).json({ message: 'permalink is required' });
  }

  const algoliarecommendClient = Algoliarecommend('QB2FWHH99M', '25fc15b3e367b7a46c1f3617b39aa749', {
    headers: {
      'x-algolia-usertoken': getFingerprint(),
    },
  });

  try {
    const { results } = await algoliarecommendClient.getRelatedProducts<TypeOfWebHit>([
      {
        objectID: permalink,
        indexName: 'typeofweb_prod',
      },
    ]);
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
};

export default getRelatedPostsHandler;
