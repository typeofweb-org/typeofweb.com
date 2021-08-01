import { forwardRef, memo } from 'react';

import type { PropsWithChildren } from 'react';

interface CardProps {
  readonly as?: 'article' | 'div' | 'form' | 'section';
  readonly roundAllCorners?: boolean;
  readonly moreSpace?: boolean;
  readonly className?: string;
}

export const Card = memo(
  forwardRef<HTMLElement, PropsWithChildren<CardProps>>(
    ({ children, as: As = 'article', className, roundAllCorners, moreSpace, ...props }, ref) => {
      const rounded = roundAllCorners ? 'rounded-xl' : 'rounded-b-xl';
      const p = moreSpace ? 'py-8' : 'pb-8';
      return (
        <As
          {...props}
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- it's alright
          ref={ref as any}
          className={`mb-8 ${p} bg-gray-100 ${rounded} shadow-md ${className ?? ''} sm:mb-8`}
        >
          {children}
          <span className="intersection-observer--pixel-to-watch" />
        </As>
      );
    },
  ),
);
Card.displayName = 'Card';
