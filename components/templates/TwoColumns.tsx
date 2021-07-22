import { SiteHeader } from '../molecules/SiteHeader';
import { Sidebar } from '../organisms/Sidebar';

import type { PropsWithChildren } from 'react';

export const TwoColumns = ({
  firstPostHasCover,
  children,
  withSidebar,
}: PropsWithChildren<{ readonly firstPostHasCover: boolean; readonly withSidebar: boolean }>) => {
  return (
    <>
      <SiteHeader firstPostHasCover={firstPostHasCover} />
      <div className="flex flex-row items-start justify-center">
        <main className="flex-1 max-w-3xl">{children}</main>
        {withSidebar && <Sidebar />}
      </div>
    </>
  );
};
