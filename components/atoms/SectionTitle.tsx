import { memo } from 'react';

import type { PropsWithChildren, HTMLAttributes } from 'react';

interface SectionTitleProps {
  readonly size?: 'xs' | 'small' | 'large';
  readonly level: 1 | 2 | 'none';
  readonly itemProp?: HTMLAttributes<Element>['itemProp'];
}

export const SectionTitle = memo<PropsWithChildren<SectionTitleProps>>(
  ({ children, itemProp, level, size = 'large' }) => {
    const textSize =
      size === 'large'
        ? 'text-2xl lg:text-5xl font-semibold'
        : size === 'small'
        ? 'text-2xl lg:text-3xl font-semibold'
        : 'text-xl lg:text-2xl';

    const El = level === 'none' ? 'span' : (`h${level}` as const);

    return (
      <El
        className={`block text-gray-900 font-sans hover:text-gray-700 transition-colors ${textSize} leading-none`}
        itemProp={itemProp}
      >
        {children}
      </El>
    );
  },
);
SectionTitle.displayName = 'SectionTitle';
