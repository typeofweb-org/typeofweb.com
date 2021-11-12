import type { PageKind } from '../types';

export const isIndex = (pageKind: PageKind) => {
  switch (pageKind) {
    case 'index':
    case 'series':
    case 'category':
      return true;
    default:
      return false;
  }
};
