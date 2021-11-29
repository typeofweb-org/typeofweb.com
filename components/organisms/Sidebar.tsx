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
      return <div className="h-12 bg-white rounded-lg shadow-md" />;
    },
  },
);

const searchClasses = `lg:min-w-[294px] border rounded-lg lg:w-full fixed z-50 right-3 top-0 lg:static lg:z-auto lg:flex-1 lg:flex-shrink-0`;
const widgetClasses = `min-w-[294px] border rounded-lg flex-1 flex-shrink-0`;

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
        <div className={widgetClasses}>
          <SocialWidget />
        </div>
      </>
    );
  },
  category() {
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
  series({ series }) {
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
      className="flex flex-row flex-wrap gap-8 px-2 w-full max-h-screen overflow-x-hidden overflow-y-scroll lg:sticky lg:top-12 lg:flex-col lg:flex-nowrap lg:mt-0 lg:mx-4 lg:pb-24 lg:pt-4 lg:max-w-xs"
    >
      <Widgets pageKind={pageKind} series={series} />
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';
