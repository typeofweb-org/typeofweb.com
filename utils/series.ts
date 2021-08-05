import type { Series, SeriesWithToC } from '../types';

export const findCurrentSeriesIndex = (currentPostPermalink: string, seriesPermalinks: SeriesWithToC['links']) => {
  return seriesPermalinks.findIndex(({ permalink }) => permalink === currentPostPermalink);
};

export const getNextSeriesLink = (currentPostPermalink: string, seriesPermalinks: SeriesWithToC) => {
  if (currentPostPermalink && seriesPermalinks) {
    const currentIndex = findCurrentSeriesIndex(currentPostPermalink, seriesPermalinks.links);
    if (currentIndex < seriesPermalinks.links.length - 1) {
      return seriesPermalinks.links[currentIndex + 1];
    }
  }
};

export const getPrevSeriesLink = (
  currentPostPermalink: string,
  seriesPermalinks: {
    readonly name: string;
    readonly slug: string;
    readonly links: readonly {
      readonly permalink: string;
      readonly title: string;
    }[];
  },
) => {
  if (currentPostPermalink && seriesPermalinks) {
    const currentIndex = findCurrentSeriesIndex(currentPostPermalink, seriesPermalinks.links);
    if (currentIndex > 1) {
      return seriesPermalinks.links[currentIndex - 1];
    }
  }
};

export const allSeries = [
  { slug: 'self-publishing', name: 'Self Publishing' },
  { slug: 'react-js', name: 'React.js' },
  { slug: 'piece-of-cake', name: 'Piece of cake' },
  { slug: 'buddy-works', name: 'CI/CD z Buddy.works' },
  { slug: 'vue-js', name: 'Vue.js' },
  { slug: 'hapijs', name: 'HapiJS' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'angular-2', name: 'Angular 2' },
];

export const getSeriesLink = (seriesOrSlug: Series | string) =>
  typeof seriesOrSlug === 'string' ? `/kurs/${seriesOrSlug}` : `/kurs/${seriesOrSlug.slug}`;

export function permalinkIsSeries(permalink: string) {
  return allSeries.map((s) => s.slug).includes(permalink);
}
