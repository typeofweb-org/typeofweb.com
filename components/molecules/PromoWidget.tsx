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
          <Link href="/wspolpraca">
            <a className="hover:text-green-700">
              <BookIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
              Moja książka:
              <span className="whitespace-nowrap">„TypeScript na poważnie”</span>
            </a>
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link href="https://discord.typeofweb.com/">
            <a className="hover:text-green-700">
              <DiscordIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
              Discord
            </a>
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link href="https://news.typeofweb.com/">
            <a className="hover:text-green-700">
              <MailIcon className="inline-block mr-2 -mt-1 w-8 stroke-current" />
              Newsletter
            </a>
          </Link>
        </li>
        <li className="ml-0 pl-0 text-gray-700 text-lg font-semibold transition-colors">
          <Link href="https://next.hyperfunctor.com/?utm_source=typeofweb&utm_medium=sidebar">
            <a className="hover:text-green-700">
              Czwarta edycja kursu Next.js, React, GraphQL, TypeScript wkrótce dostępna!
            </a>
          </Link>
        </li>
      </ul>
    </Widget>
  );
});
PromoWidget.displayName = 'PromoWidget';
