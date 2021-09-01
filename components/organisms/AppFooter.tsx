import Link from 'next/link';
import { memo } from 'react';

import ReactIcon from '../../images/react-icon.svg';
import BadgeCheckIcon from '../../images/social/badge-check.svg';
import BriefcaseIcon from '../../images/social/briefcase.svg';
import ChatAltIcon from '../../images/social/chat-alt.svg';
import ComputerIcon from '../../images/social/computer.svg';
import CubeTransparentIcon from '../../images/social/cube-transparent.svg';
import DiscordIcon from '../../images/social/discord.svg';
import GlobeIcon from '../../images/social/globe.svg';
import JsIcon from '../../images/social/js.svg';
import TsIcon from '../../images/social/ts.svg';
import VercelIcon from '../../public/powered-by-vercel.svg';
import { allCategories, getCategoryLink } from '../../utils/categories';
import { getUrlForPermalink } from '../../utils/permalinks';
import { getSeriesLink } from '../../utils/series';
import { myUrls, social } from '../molecules/SocialWidget';

import type { ComponentType } from 'react';

const categoryToIcon: Record<string, ComponentType<React.SVGProps<SVGSVGElement>>> = {
  javascript: JsIcon,
  typescript: TsIcon,
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
    items: social.map((s) => ({ ...s, url: myUrls[s.slug], fill: s.slug !== 'website' })),
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
    items: [
      ...allCategories.map((c) => ({
        slug: c.slug,
        label: c.name,
        url: getCategoryLink(c),
        icon: categoryToIcon[c.slug],
      })),
      {
        slug: 'react-js',
        label: 'Kurs React.js',
        url: getSeriesLink('react-js'),
        icon: ReactIcon,
      },
    ],
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
        <p className="not-italic">
          <Link href="/polityka-prywatnosci">
            <a className="hover:text-green-700 underline transition-colors">Polityka prywatności</a>
          </Link>
          {' | '}
          <Link href="/regulamin">
            <a className="hover:text-green-700 underline transition-colors">Regulamin</a>
          </Link>
        </p>
        <p className="mt-3 font-mono not-italic">
          <a href="/humans.txt" className="hover:text-green-700 underline transition-colors">
            humans.txt
          </a>{' '}
          <a href="/lawyers.txt" className="hover:text-green-700 underline transition-colors">
            lawyers.txt
          </a>
        </p>
        <p className="mt-3 text-lg not-italic font-bold">
          Znalazłeś/aś błąd na stronie?{' '}
          <a
            className="hover:text-green-700 underline transition-colors"
            href="https://github.com/typeofweb/typeofweb.com/issues/new"
          >
            Otwórz issue na GitHubie
          </a>
          !
        </p>
        <p aria-hidden={true} className="mt-3 text-sm not-italic font-extralight">
          {process.env.NEXT_PUBLIC_VERSION || ''}
        </p>
        <p className="mt-3 text-lg not-italic font-bold">
          <Link href="https://vercel.com?utm_source=typeofweb&utm_campaign=oss">
            <a target="_blank" rel="noopener noreferrer" className="inline-block mt-10">
              <VercelIcon className="mx-auto" width={209} height={40} />
            </a>
          </Link>
        </p>
      </address>
    </footer>
  );
});
AppFooter.displayName = 'AppFooter';
