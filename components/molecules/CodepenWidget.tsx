import { useCallback, useRef, memo } from 'react';

import type { RefCallback, ReactNode } from 'react';

export interface CodepenWidgetProps {
  readonly slugHash: string;
  readonly user: string;

  readonly height?: `${number}`;
  readonly themeId?: string;
  readonly defaultTab?: string;
  readonly penTitle?: string;
  readonly children: ReactNode;

  /**
   * @deprecated
   */
  readonly embedVersion?: string;
}

export const CodepenWidget = memo<CodepenWidgetProps>(
  ({ slugHash, user, penTitle, height, themeId, defaultTab, children }) => {
    const uniqueId = useRef(
      'c' +
        slugHash +
        Math.random()
          .toString(36)
          .replace(/[^a-z0-9]/g, ''),
    );

    const onMount = useCallback<RefCallback<HTMLDivElement>>((el) => {
      if ('__CPEmbed' in window) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- __CPEmbed is a global variable
        (window as unknown as { readonly __CPEmbed: (selector: string) => void }).__CPEmbed(`#${uniqueId.current}`);
      } else {
        const script = document.createElement('script');
        script.src = `https://static.codepen.io/public/assets/embed/ei.js`;
        script.async = true;
        script.defer = true;
        script.onload = () => onMount(el);
        document.body.appendChild(script);
      }
    }, []);

    const props = {
      'data-user': user,
      'data-slug-hash': slugHash,
      'data-height': height,
      'data-theme-id': themeId,
      'data-default-tab': defaultTab,
    };

    return (
      <div {...props} id={uniqueId.current} ref={onMount}>
        {penTitle}
        {children}
      </div>
    );
  },
);
CodepenWidget.displayName = 'CodepenWidget';
