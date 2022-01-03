import { forwardRef, memo } from 'react';

import type { PropsWithChildren, HTMLAttributes } from 'react';

interface CardProps {
  readonly as?: 'article' | 'div' | 'form' | 'section';
  readonly className?: string;
  readonly itemScope?: HTMLAttributes<Element>['itemScope'];
  readonly itemType?: HTMLAttributes<Element>['itemType'];
  readonly itemProp?: HTMLAttributes<Element>['itemProp'];
}

export const Card = memo(
  forwardRef<HTMLElement, PropsWithChildren<CardProps>>(
    ({ children, as: As = 'article', className, ...props }, ref) => {
      return (
        <As
          {...props}
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- it's alright
          ref={ref as any}
          className={`mb-2 pb-12 bg-gray-100 rounded-lg ${className ?? ''}`}
        >
          {children}
          <span className="intersection-observer--pixel-to-watch" />
        </As>
      );
    },
  ),
);
Card.displayName = 'Card';
