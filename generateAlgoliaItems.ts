import { readAllPosts } from './utils/wordpress';

async function run() {
  const data = await readAllPosts({ includePages: true });

  console.log(
    JSON.stringify(
      data.posts.map((p) => {
        return {
          objectID: p.data.permalink,
          title: p.data.title,
          date: p.data.date,
          permalink: p.data.permalink,
          series: p.data.series,
          authors: p.data.authors,
          seo: p.data.seo,
          content: p.content.replace(/<[^>]+>/g, ''),
        };
      }),
    ),
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
