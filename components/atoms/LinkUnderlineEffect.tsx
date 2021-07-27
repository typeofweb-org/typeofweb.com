import { cloneElement, Children } from 'react';

import type { ReactElement } from 'react';

export const LinkUnderlineEffect = ({ children }: { readonly children: ReactElement<JSX.IntrinsicElements['a']> }) => {
  const link = Children.only(children);

  return (
    <span className="fancy-inner-link">
      {cloneElement(link, {
        ...link.props,
        className: `${link.props.className ?? ''} fancy-link`,
        children: (
          <>
            {link.props.children}
            {/* <svg aria-hidden version="2.0" className={Styles.image}>
          <use href="#fancy-link-underline" />
        </svg> */}
          </>
        ),
      })}
    </span>
  );
};
