import Link from 'next/link';
import { memo } from 'react';

import BadgeCheckIcon from '../../images/social/badge-check.svg';
import BriefcaseIcon from '../../images/social/briefcase.svg';
import ChatAltIcon from '../../images/social/chat-alt.svg';
import ComputerIcon from '../../images/social/computer.svg';
import CubeTransparentIcon from '../../images/social/cube-transparent.svg';
import DiscordIcon from '../../images/social/discord.svg';
import GlobeIcon from '../../images/social/globe.svg';
import JsIcon from '../../images/social/js.svg';
import { allCategories, getCategoryLink } from '../../utils/categories';
import { getUrlForPermalink } from '../../utils/permalinks';
import { myUrls, social } from '../molecules/SocialWidget';

import type { ComponentType } from 'react';

const categoryToIcon: Record<string, ComponentType<React.SVGProps<SVGSVGElement>>> = {
  javascript: JsIcon,
  opinie: CubeTransparentIcon,
  'dobry-kod': BadgeCheckIcon,
  'praca-zdalna': BriefcaseIcon,
};

const sections: ReadonlyArray<{
  readonly title: string;
  readonly items: ReadonlyArray<{
    readonly slug: string;
    readonly label: string;
    readonly url: string;
    readonly icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
    readonly fill?: true;
  }>;
}> = [
  {
    title: 'Social',
    items: social.map((s) => ({ ...s, url: myUrls[s.slug], fill: true })),
  },
  {
    title: 'Strony',
    items: [
      { slug: 'polski-frontend-discord', label: 'Serwer Discord', icon: DiscordIcon },
      { slug: 'michal-miszczyszyn-uses', label: 'Sprzęt, którego używam', icon: ComputerIcon },
      { slug: 'wspolpraca', label: 'O mnie i współpraca', icon: ChatAltIcon },
      { slug: 'znajdz-prace-zdalna-tymi-serwisami', label: 'Gdzie szukać pracy zdalnej?', icon: GlobeIcon },
    ].map((l) => ({ ...l, url: getUrlForPermalink(l.slug) })),
  },
  {
    title: 'Kategorie',
    items: allCategories.map((c) => ({
      slug: c.slug,
      label: c.name,
      url: getCategoryLink(c),
      icon: categoryToIcon[c.slug],
    })),
  },
];

export const AppFooter = memo(() => {
  return (
    <footer className="app-footer py-8 text-blue-100 bg-blue-900">
      <nav className="w-fit flex flex-col gap-8 self-center mx-auto pb-8 max-w-5xl sm:flex-row sm:gap-0 sm:justify-around sm:w-auto">
        {sections.map((s) => (
          <section key={s.title}>
            <h3 className="mb-4 text-gray-200 text-xl font-bold sm:mb-6">{s.title}</h3>
            <ul className="flex flex-col gap-2 sm:gap-4">
              {s.items.map(({ icon: Icon, label, slug, url, fill }) => {
                return (
                  <li className="inline-flex items-center h-11" key={slug}>
                    <a href={url} className="inline-flex flex-row items-center hover:text-green-700 transition-colors">
                      {Icon && <Icon className={`mr-4 w-8 ${fill ? 'fill-current' : 'stroke-current'} `} />}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
      <address className="text-center leading-7">
        Type of Web - Michał Miszczyszyn
        <div>
          <Link href="/polityka-prywatnosci">
            <a className="hover:text-green-700 transition-colors">Polityka prywatności</a>
          </Link>
          {' | '}
          <Link href="/regulamin">
            <a className="hover:text-green-700 transition-colors">Regulamin</a>
          </Link>
        </div>
      </address>
    </footer>
  );
});
AppFooter.displayName = 'AppFooter';
