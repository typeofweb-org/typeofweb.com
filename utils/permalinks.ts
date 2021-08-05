import { permalinkIsCategory, getCategoryLink } from './categories';
import { permalinkIsSeries, getSeriesLink } from './series';

export const getUrlForPermalink = (permalink: string) => {
  return permalinkIsCategory(permalink)
    ? getCategoryLink(permalink)
    : permalinkIsSeries(permalink)
    ? getSeriesLink(permalink)
    : `/${permalink}`;
};
