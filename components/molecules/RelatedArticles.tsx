import Image from 'next/image';
import Link from 'next/link';
import { useCallback, memo } from 'react';

import { fetcher, useFetch } from '../../hooks/useFetch';
import { typeofwebImageLoader } from '../../utils/imageLoader';
import { getUrlForPermalink } from '../../utils/permalinks';

import type { CoverPlaiceholder } from '../atoms/ArticleCoverImage';

const getRelated = (permalink: string) => {
  return fetcher<{
    readonly related: ReadonlyArray<{
      readonly excerpt: string;
      readonly frontmatter: {
        readonly cover: CoverPlaiceholder;
        readonly title: string;
        readonly permalink: string;
        readonly mainCategory: { readonly slug: string; readonly name: string };
      };
    }>;
  }>(`/api/relatedPosts2?permalink=${encodeURIComponent(permalink)}`, { method: 'GET' });
};

export const RelatedArticles = memo<{ readonly permalink: string }>(({ permalink }) => {
  const getRelatedForPermalink = useCallback(() => getRelated(permalink), [permalink]);
  const { value } = useFetch(getRelatedForPermalink);

  if (!value) {
    return null;
  }

  return (
    <section className="max-w-[75ch] mt-8 mx-auto px-7 text-gray-900 sm:px-8 lg:px-12">
      <h3 className="mb-4 text-xl font-bold">Może zainteresują Cię również…</h3>
      <ol className="flex flex-col gap-4 justify-between sm:flex-row sm:gap-2">
        {value.related.map((p) => {
          return (
            <li key={p.frontmatter.permalink} className="word-break-break-word flex-1 flex-shrink-0">
              <Link href={getUrlForPermalink(p.frontmatter.permalink)}>
                <a className="group hover:text-blue-500 text-gray-900 transition-colors">
                  <div className="relative w-full h-32 bg-gradient-to-br from-blue-100 to-gray-200">
                    {p.frontmatter.cover && (
                      <Image
                        loader={typeofwebImageLoader}
                        {...p.frontmatter.cover.img}
                        className="duration-[5s] motion-safe:group-hover:scale-110 bg-gray-200 transition-transform ease-in group-hover:ease-out"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                        sizes="160px"
                        alt=""
                      />
                    )}
                  </div>
                  {p.frontmatter.title}
                  <span className="block group-hover:text-blue-500 text-gray-600 transition-colors">
                    ({p.frontmatter.mainCategory.name})
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
});
RelatedArticles.displayName = 'RelatedArticles';
