import Dynamic from 'next/dynamic';
import { memo } from 'react';

import { LatestPostsWidget } from '../molecules/LatestPostsWidget';
import { SeriesTableOfContentsWidget } from '../molecules/SeriesTableOfContentsWidget';
import { SocialWidget } from '../molecules/SocialWidget';

import type { PageKind, SeriesWithToC } from '../../types';
import type { ComponentType } from 'react';

const SearchWidget = Dynamic<{}>(
  () => import(/* webpackChunkName: "SearchWidget" */ '../molecules/SearchWidget').then((m) => m.SearchWidget),
  {
    ssr: false,
    loading() {
      return <div className="h-12 bg-white rounded-lg shadow-md lg:mb-8" />;
    },
  },
);

const searchClasses = `lg:min-w-[294px] fixed z-50 right-2 top-0 pl-5 lg:w-1/2 lg:static lg:z-auto lg:flex-1 lg:flex-shrink-0 lg:pl-0 lg:w-auto`;
const widgetClasses = `min-w-[294px] flex-1 flex-shrink-0`;

const widgetsPerPage: Record<PageKind, ComponentType<SidebarProps>> = {
  index() {
    return (
      <>
        <div className={searchClasses}>
          <SearchWidget />
        </div>
        <div className={widgetClasses}>
          <SocialWidget />
        </div>
        <div className={widgetClasses}>
          <LatestPostsWidget />
        </div>
      </>
    );
  },
  post({ series }) {
    return (
      <>
        <div className={searchClasses}>
          <SearchWidget />
        </div>
        {series && (
          <div className={widgetClasses}>
            <SeriesTableOfContentsWidget series={series} />
          </div>
        )}
      </>
    );
  },
  page() {
    return (
      <>
        <div className={searchClasses}>
          <SearchWidget />
        </div>
      </>
    );
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
      className="flex flex-row flex-wrap gap-0 px-2 w-full lg:sticky lg:top-16 lg:flex-col lg:flex-nowrap lg:mx-4 lg:px-0 lg:max-w-xs"
    >
      <Widgets pageKind={pageKind} series={series} />
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';
