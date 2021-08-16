import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: TouchEvent | MouseEvent) => void) => {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ok
      if (!ref.current || ref.current.contains(event.target as Node | null)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
