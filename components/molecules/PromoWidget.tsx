import Link from 'next/link';
import { memo } from 'react';

import BookIcon from '../../images/social/book.svg';
import DiscordIcon from '../../images/social/discord.svg';
import MailIcon from '../../images/social/mail.svg';
import { Widget } from '../atoms/Widget';

export const PromoWidget = memo(() => {
  return (
    <Widget>
      <ul className="flex flex-col justify-between pt-2 gap-4">
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link className="hover:text-green-700" href="/wspolpraca">
            <BookIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
            Moja książka:
            <span className="whitespace-nowrap">„TypeScript na poważnie”</span>
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link className="hover:text-green-700" href="https://discord.typeofweb.com/">
            <DiscordIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
            Discord
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link className="hover:text-green-700" href="https://news.typeofweb.com/">
            <MailIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
            Newsletter
          </Link>
        </li>
      </ul>
    </Widget>
  );
});
PromoWidget.displayName = 'PromoWidget';
