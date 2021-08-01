import { memo } from 'react';

import FacebookIcon from '../../images/social/facebook.svg';
import GithubIcon from '../../images/social/github.svg';
import InstagramIcon from '../../images/social/instagram.svg';
import LinkedinIcon from '../../images/social/linkedin.svg';
import RssIcon from '../../images/social/rss.svg';
import TwitterIcon from '../../images/social/twitter.svg';
import YoutubeIcon from '../../images/social/youtube.svg';
import { Widget } from '../atoms/Widget';

const social = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: YoutubeIcon, label: 'YouTube' },
  { icon: GithubIcon, label: 'GitHub' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: LinkedinIcon, label: 'LinkedIn' },
];

export const SocialWidget = memo(() => {
  return (
    <Widget title="Śledź mnie na:">
      <ul className="flex flex-row flex-wrap justify-between">
        {social.map(({ icon: Icon, label }) => {
          return (
            <li key={label} className="first:ml-0 ml-3 text-gray-700 hover:text-green-700 transition-colors">
              <a href="#" aria-label={label} title={label} className="block">
                <Icon className="w-8 fill-current" />
              </a>
            </li>
          );
        })}
        <li className="mt-4 text-gray-700 hover:text-green-700 text-lg font-semibold transition-colors">
          <a href="#" aria-label="RSS" title="RSS" className="block">
            <RssIcon className="inline-block mr-2 w-8 fill-current" />
            RSS
          </a>
        </li>
      </ul>
    </Widget>
  );
});
SocialWidget.displayName = 'SocialWidget';
