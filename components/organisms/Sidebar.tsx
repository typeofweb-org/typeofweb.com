import { LatestPostsWidget } from '../molecules/LatestPostsWidget';
import { SocialWidget } from '../molecules/SocialWidget';

export const Sidebar = () => {
  return (
    <aside className="lg:top-[4vh] lg:mt-[4vh] hidden lg:sticky lg:block lg:mx-4 lg:w-80">
      <SocialWidget />
      <LatestPostsWidget />
    </aside>
  );
};
