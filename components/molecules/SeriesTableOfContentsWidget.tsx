import { memo } from 'react';

import { usePermalink } from '../../hooks/usePermalink';
import { findCurrentSeriesIndex } from '../../utils/series';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { Widget } from '../atoms/Widget';

interface SeriesTableOfContentsWidgetProps {
  readonly series: {
    readonly name: string;
    readonly slug: string;
    readonly links: readonly {
      readonly permalink: string;
      readonly title: string;
    }[];
  };
}

export const SeriesTableOfContentsWidget = memo<SeriesTableOfContentsWidgetProps>(({ series }) => {
  const permalink = usePermalink();

  const currentIndex = permalink ? findCurrentSeriesIndex(permalink, series.links) : -1;
  return (
    <Widget title={`Wpisy z serii ${series.name}:`}>
      <ol className="counter-reset pl-10">
        {series.links.map((link, idx) => {
          return (
            <li
              key={link.permalink}
              className="counter-increment before:counter-result before:text-stroke digits before:absolute relative before:top-0 before:-ml-12 mb-6 before:mr-2 before:text-gray-500 before:font-sans before:text-4xl before:proportional-nums before:font-semibold before:leading-none"
            >
              <LinkUnderlineEffect>
                <a
                  className={`align-top hover:text-blue-500 text-gray-700 text-lg leading-snug transition-all ${
                    currentIndex === idx ? 'font-bold' : ''
                  }`}
                  {...(currentIndex === idx && { rel: 'bookmark' })}
                  href={'/' + link.permalink}
                >
                  {link.title}
                </a>
              </LinkUnderlineEffect>
            </li>
          );
        })}
      </ol>
    </Widget>
  );
});
SeriesTableOfContentsWidget.displayName = 'SeriesTableOfContentsWidget';
