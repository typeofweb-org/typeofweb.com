import { memo } from 'react';

import type { PropsWithChildren, HTMLAttributes } from 'react';

interface SectionTitleProps {
  readonly size?: 'small' | 'large';
  readonly level: 1 | 2 | 'none';
  readonly itemProp?: HTMLAttributes<Element>['itemProp'];
  readonly pad?: boolean;
}

export const SectionTitle = memo<PropsWithChildren<SectionTitleProps>>(
  ({ children, itemProp, level, size = 'large', pad = true }) => {
    const textSize = size === 'large' ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl';

    const El = level === 'none' ? 'span' : (`h${level}` as const);

    return (
      <El
        className={`relative z-auto block text-center text-gray-900 font-sans hover:text-gray-700 transition-colors ${textSize} ${
          pad ? 'px-1 lg:px-4' : ''
        } font-semibold leading-tight lg:leading-tight`}
        itemProp={itemProp}
      >
        {children}
      </El>
    );
  },
);
SectionTitle.displayName = 'SectionTitle';
