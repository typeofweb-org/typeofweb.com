import { memo } from 'react';

import ClickIcon from '../../images/social/click.svg';
import FacebookIcon from '../../images/social/facebook.svg';
import GithubIcon from '../../images/social/github.svg';
import InstagramIcon from '../../images/social/instagram.svg';
import JsonFeedIcon from '../../images/social/jsonfeed.svg';
import LinkedinIcon from '../../images/social/linkedin.svg';
import RssIcon from '../../images/social/rss.svg';
import TwitterIcon from '../../images/social/twitter.svg';
import YoutubeIcon from '../../images/social/youtube.svg';
import { Widget } from '../atoms/Widget';

export const social = [
  { icon: FacebookIcon, label: 'Facebook', slug: 'facebook', className: 'text-[#4267B2]' },
  { icon: YoutubeIcon, label: 'YouTube', slug: 'youtube', className: 'text-[#FF0000]' },
  { icon: GithubIcon, label: 'GitHub', slug: 'github', className: 'text-[#24292e]' },
  { icon: InstagramIcon, label: 'Instagram', slug: 'instagram', className: 'text-[#bc2a8d]' },
  { icon: TwitterIcon, label: 'Twitter', slug: 'twitter', className: 'text-[#1DA1F2]' },
  { icon: LinkedinIcon, label: 'LinkedIn', slug: 'linkedin', className: 'text-[#0077b5]' },
] as const;

export const myUrls = {
  twitter: 'https://twitter.com/typeofweb',
  facebook: 'https://facebook.com/typeofweb',
  github: 'https://github.com/typeofweb',
  youtube: 'https://www.youtube.com/c/typeofweb',
  instagram: 'https://instagram.com/michal_typeofweb',
  linkedin: 'https://linkedin.com/in/mmiszczyszyn',
};

export const SocialWidget = memo(() => {
  return (
    <Widget title="Śledź mnie na:">
      <ul className="flex flex-row gap-3 justify-between">
        {social.map(({ icon: Icon, label, slug, className }) => {
          return (
            <li
              key={label}
              className={`${className ? className : 'text-gray-700'} hover:text-green-700 transition-colors`}
            >
              <a href={myUrls[slug]} aria-label={label} title={label} className="block">
                <Icon className="w-8 fill-current" />
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-row flex-wrap gap-3 justify-between">
        <li className="mt-7 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          <a href="/feed.json" aria-label="JSON Feed" title="JSON Feed" className="block">
            <JsonFeedIcon className="inline-block mr-2 w-8 fill-current" />
            JSON Feed
          </a>
        </li>
        <li className="mt-7 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          <a href="/feed.xml" aria-label="RSS" title="RSS" className="block">
            <RssIcon className="inline-block mr-2 w-8 fill-current" />
            RSS
          </a>
        </li>
      </ul>
      <ul className="flex flex-row flex-wrap gap-3 justify-between">
        <li className="ml-0 mt-7 pl-0 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          <a href="/wspolpraca">
            <ClickIcon className="inline-block mr-2 w-8 stroke-current" />O mnie i współpraca
          </a>
        </li>
      </ul>
    </Widget>
  );
});
SocialWidget.displayName = 'SocialWidget';
