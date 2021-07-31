import { LatestPostsWidget } from '../molecules/LatestPostsWidget';
import { SocialWidget } from '../molecules/SocialWidget';

import type { PageKind } from '../../types';

const widgetsPerPage = {
  index: (
    <>
      <SocialWidget />
      <LatestPostsWidget />
    </>
  ),
  post: null,
  page: null,
};

export const Sidebar = ({ pageKind }: { readonly pageKind: PageKind }) => {
  return <aside className="hidden lg:sticky lg:top-16 lg:block lg:mx-4 lg:w-80">{widgetsPerPage[pageKind]}</aside>;
};
