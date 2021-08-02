import { useContext, createContext, useMemo, useState, useCallback, useRef, useEffect } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

import type { PropsWithChildren, RefCallback } from 'react';

interface RunningHeaderValue {
  readonly text: string;
  readonly setRunningHeader: RefCallback<HTMLElement>;
  readonly progress: number;
}

const RunningHeaderContext = createContext<RunningHeaderValue | null>(null);
RunningHeaderContext.displayName = 'RunningHeaderContext';

const options = {
  threshold: [1],
};

export const RunningHeaderProvider = ({ children }: PropsWithChildren<{}>) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const containerElRef = useRef<HTMLElement | null>();

  // eslint-disable-next-line functional/prefer-readonly-type -- need mutable
  const currentlyVisibleHeadersRef = useRef<Set<HTMLElement>>(new Set());

  const {
    observeElement: observeHeader,
    entry: headerEntry,
    cleanup: headerCleanup,
  } = useIntersectionObserver<HTMLElement>(options);

  useEffect(() => {
    if (!headerEntry) {
      return;
    }

    if (headerEntry.isIntersecting) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- HTMLElement
      currentlyVisibleHeadersRef.current.add(headerEntry.target as HTMLElement);
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- HTMLElement
      currentlyVisibleHeadersRef.current.delete(headerEntry.target as HTMLElement);
    }

    const highestHeader = Array.from(currentlyVisibleHeadersRef.current).reduce<HTMLElement | null>((acc, node) => {
      if (!acc) {
        return node;
      }

      // only replace if the new header is "lower"
      if (acc.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING) {
        return node;
      }
      return acc;
    }, null);

    if (highestHeader) {
      setText(highestHeader.innerText.split('\n')[0]?.replace(/\s+/g, ' ') ?? '');
    }
  }, [headerEntry]);

  const progressRafRef = useRef<number>();
  const updateProgress = useCallback(() => {
    if (progressRafRef.current) {
      window.cancelAnimationFrame(progressRafRef.current);
    }

    progressRafRef.current = window.requestAnimationFrame(() => {
      if (!containerElRef.current) {
        setProgress(0);
        return;
      }
      const rect = containerElRef.current.getBoundingClientRect();

      const firstHalf = Math.min(rect.bottom / rect.height, 1);
      const secondHalf = Math.max((rect.bottom - window.innerHeight) / rect.height, 0);

      if (firstHalf + secondHalf > 1) {
        setProgress(1 - firstHalf);
      } else {
        setProgress(1 - secondHalf);
      }
    });
  }, []);

  const setRunningHeader = useCallback<RefCallback<HTMLElement>>(
    (el) => {
      containerElRef.current = el;

      if (!el) {
        setText('');
        headerCleanup();
        if (window) {
          window.removeEventListener('scroll', updateProgress);
        }

        return;
      }

      if (window) {
        window.addEventListener('scroll', updateProgress, { passive: true });
      }

      el.querySelectorAll<HTMLElement>('h1,h2,h3').forEach(observeHeader);
    },
    [headerCleanup, observeHeader, updateProgress],
  );

  const value = useMemo(() => {
    return { text, setRunningHeader, progress };
  }, [setRunningHeader, text, progress]);

  return <RunningHeaderContext.Provider value={value}>{children}</RunningHeaderContext.Provider>;
};

export const useRunningHeader = () => {
  const ctx = useContext(RunningHeaderContext);

  if (!ctx) {
    throw new Error('Missing RunningHeaderProvider!');
  }

  return ctx;
};
