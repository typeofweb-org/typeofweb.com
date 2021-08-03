export const findCurrentSeriesIndex = (
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
  return seriesPermalinks.links.findIndex(({ permalink }) => permalink === currentPostPermalink);
};

export const getNextSeriesLink = (
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
    const currentIndex = findCurrentSeriesIndex(currentPostPermalink, seriesPermalinks);
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
    const currentIndex = findCurrentSeriesIndex(currentPostPermalink, seriesPermalinks);
    if (currentIndex > 1) {
      return seriesPermalinks.links[currentIndex - 1];
    }
  }
};
