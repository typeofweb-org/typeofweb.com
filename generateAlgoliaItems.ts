import { categoriesToMainCategory, categorySlugToCategory } from './utils/categories';
import { splitContent, trimExcerpt } from './utils/excerpt';
import { toHtml } from './utils/markdown';
import { seriesSlugToSeries } from './utils/series';
import { readAllPosts } from './utils/wordpress';

async function run() {
  const data = await readAllPosts({ includePages: true });

  console.log(
    JSON.stringify(
      await Promise.all(
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
      ),
    ),
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
