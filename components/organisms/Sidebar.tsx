import { memo } from 'react';

import { LatestPostsWidget } from '../molecules/LatestPostsWidget';
import { SeriesTableOfContentsWidget } from '../molecules/SeriesTableOfContentsWidget';
import { SocialWidget } from '../molecules/SocialWidget';

import type { PageKind, SeriesWithToC } from '../../types';
import type { ComponentType } from 'react';

const widgetsPerPage: Record<PageKind, ComponentType<SidebarProps>> = {
  index() {
    return (
      <>
        <div className="min-w-[294px] flex-1 flex-shrink-0">
          <SocialWidget />
        </div>
        <div className="min-w-[294px] flex-1 flex-shrink-0">
          <LatestPostsWidget />
        </div>
      </>
    );
  },
  post({ series }) {
    return (
      <>
        {series && (
          <div className="min-w-[294px] flex-1 flex-shrink-0">
            <SeriesTableOfContentsWidget series={series} />
          </div>
        )}
      </>
    );
  },
  page() {
    return null;
  },
};

interface SidebarProps {
  readonly pageKind: PageKind;
  readonly series?: SeriesWithToC | null;
}

export const Sidebar = memo<SidebarProps>(({ pageKind, series }) => {
  const Widgets = widgetsPerPage[pageKind];
  return (
    <aside
      role="complementary"
      className="flex flex-row flex-wrap gap-4 px-2 w-full lg:sticky lg:top-16 lg:flex-col lg:flex-nowrap lg:mx-4 lg:px-0 lg:max-w-xs"
    >
      <Widgets pageKind={pageKind} series={series} />
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';
