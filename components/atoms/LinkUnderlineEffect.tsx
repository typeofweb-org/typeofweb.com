import { cloneElement, Children, forwardRef, memo } from 'react';

import type { ReactElement, FunctionComponentElement, MutableRefObject, RefCallback } from 'react';

export const LinkUnderlineEffect = memo(
  forwardRef<
    HTMLAnchorElement,
    {
      readonly children: FunctionComponentElement<
        ReactElement<JSX.IntrinsicElements['a']> & {
          readonly ref?: MutableRefObject<HTMLAnchorElement> | RefCallback<HTMLAnchorElement>;
        }
      >;
      readonly href?: string;
    }
  >(({ children, href }, fref) => {
    const link = Children.only(children);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ok
    const className: string = link.props.className ?? '';

    return (
      <span className="fancy-inner-link">
        {cloneElement(link, {
          ...link.props,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ok
          href: href || link.props.href,
          ref: fref,
          className: `${className} fancy-link`,
        })}
      </span>
    );
  }),
);
LinkUnderlineEffect.displayName = 'LinkUnderlineEffect';
