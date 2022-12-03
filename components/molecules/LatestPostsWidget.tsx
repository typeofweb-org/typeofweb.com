import Link from 'next/link';
import { memo } from 'react';

import { getSeriesLink } from '../../utils/series';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { Widget } from '../atoms/Widget';

const selectedSeries = [
  { title: 'Kurs React.js od podstaw', slug: getSeriesLink('react-js') },
  { title: 'Studia w pigułce', slug: getSeriesLink('piece-of-cake') },
  { title: 'Self Publishing „TypeScript na poważnie”', slug: getSeriesLink('self-publishing') },
  { title: 'Kurs CI/CD z Buddy.works', slug: getSeriesLink('buddy-works') },
];

export const LatestPostsWidget = memo(() => {
  return (
    <Widget title="Najpopularniejsze wpisy:">
      <ol className="counter-reset pl-6">
        {selectedSeries.map((series) => {
          return (
            <li
              key={series.slug}
              className="counter-increment before:counter-result before:text-stroke before:absolute relative before:top-0 before:-ml-8 mb-6 before:mr-2 before:text-gray-500 before:font-sans before:text-4xl before:proportional-nums before:font-semibold before:leading-none"
            >
              <LinkUnderlineEffect>
                <Link
                  href={series.slug}
                  className="align-top hover:text-blue-500 text-gray-700 text-lg leading-snug transition-all"
                >
                  {series.title}
                </Link>
              </LinkUnderlineEffect>
            </li>
          );
        })}
      </ol>
    </Widget>
  );
});
LatestPostsWidget.displayName = 'LatestPostsWidget';
