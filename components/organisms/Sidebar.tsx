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
};

export const Sidebar = ({ pageKind }: { readonly pageKind: PageKind }) => {
  return (
    <aside className="lg:top-[4vh] lg:mt-[4vh] hidden lg:sticky lg:block lg:mx-4 lg:w-80">
      {widgetsPerPage[pageKind]}
    </aside>
  );
};
