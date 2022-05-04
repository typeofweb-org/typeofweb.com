import { cloneElement, Children, forwardRef, memo } from 'react';

import type {
  ReactElement,
  FunctionComponentElement,
  MutableRefObject,
  RefCallback,
  ReactComponentElement,
} from 'react';

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
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- necessary to cast
    const link = Children.only(children) as ReactComponentElement<'a'>;

    const className = link.props.className ?? '';

    const newProps = {
      ...link.props,
      href: href || link.props.href,
      ref: fref,
      className: `${className} fancy-link`,
    };

    return <span className="fancy-inner-link">{cloneElement(link, newProps)}</span>;
  }),
);
LinkUnderlineEffect.displayName = 'LinkUnderlineEffect';
