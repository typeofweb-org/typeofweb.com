import Algoliasearch from 'algoliasearch';
import Invariant from 'invariant';

import { categoriesToMainCategory, categorySlugToCategory } from './utils/categories';
import { splitContent, trimExcerpt } from './utils/excerpt';
import { getFingerprint } from './utils/fingerprint';
import { toHtml } from './utils/markdown';
import { readAllPosts } from './utils/posts';
import { seriesSlugToSeries } from './utils/series';

async function run() {
  // Invariant(!!process.env.ALGOLIA_UPDATE_API_KEY, 'ALGOLIA_UPDATE_API_KEY is not set');
  if (!process.env.ALGOLIA_UPDATE_API_KEY) {
    console.log('ALGOLIA_UPDATE_API_KEY is not set');
    return;
  }

  const data = await readAllPosts({ includePages: true, includeCommentsCount: false });

  const client = Algoliasearch('QB2FWHH99M', process.env.ALGOLIA_UPDATE_API_KEY);
  const index = client.initIndex('typeofweb_prod');

  const algoliaItems = await Promise.all(
    data.posts.map(async (p) => {
      const category =
        'categories' in p.data
          ? categoriesToMainCategory(p.data.categories)
          : 'category' in p.data
            ? categorySlugToCategory(p.data.category)
            : null;

      const series = typeof p.data.series === 'string' ? seriesSlugToSeries(p.data.series) : p.data.series;

      const [excerpt, content] = splitContent(p.content);

      const compiledContent = (await toHtml(content, { excerpt: false, parseOembed: false })).toString('utf-8');
      const compiledExcerpt = await toHtml(excerpt, { excerpt: true, parseOembed: false });
      return {
        objectID: p.data.permalink,
        title: p.data.title,
        date: p.data.date,
        type: p.data.type,
        permalink: p.data.permalink,
        authors: p.data.authors,
        seo: p.data.seo,
        excerpt: trimExcerpt(compiledExcerpt),
        content: compiledContent.replace(/<[^>]+>/g, ''),
        img: p.data.thumbnail,
        category,
        series,
      };
    }),
  );

  const results = await index.saveObjects(algoliaItems);
  console.log(`${results.objectIDs.length} items indexed`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
