import { categoriesToMainCategory, categorySlugToCategory } from './utils/categories';
import { toHtml } from './utils/markdown';
import { seriesSlugToSeries } from './utils/series';
import { readAllPosts } from './utils/wordpress';

async function run() {
  const data = await readAllPosts({ includePages: true });

  console.log(
    JSON.stringify(
      data.posts.map((p) => {
        const category =
          'categories' in p.data
            ? categoriesToMainCategory(p.data.categories)
            : 'category' in p.data
            ? categorySlugToCategory(p.data.category)
            : null;

        const series = typeof p.data.series === 'string' ? seriesSlugToSeries(p.data.series) : p.data.series;

        const content = toHtml(p.content, { excerpt: false }).toString('utf-8');
        return {
          objectID: p.data.permalink,
          title: p.data.title,
          date: p.data.date,
          permalink: p.data.permalink,
          authors: p.data.authors,
          seo: p.data.seo,
          content: content.replace(/<[^>]+>/g, ''),
          category,
          series,
        };
      }),
    ),
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
