import { useCallback, useEffect, useRef, useState } from 'react';

type UseIntersectionObserverArgs = Pick<IntersectionObserverInit, 'rootMargin' | 'threshold'>;
type ObserverCallback = (entry: IntersectionObserverEntry) => void;
type Observer = {
  readonly key: string;
  readonly intersectionObserver: IntersectionObserver;
  // eslint-disable-next-line -- mutable map needed here
  readonly elementToCallback: Map<Element, ObserverCallback>;
};

export const useIntersectionObserver = <T extends Element = HTMLElement>(options: UseIntersectionObserverArgs) => {
  // eslint-disable-next-line -- mutable map needed here
  const unobserve = useRef<Map<Element, () => void>>(new Map());

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observeElement = useCallback(
    (el: T | null) => {
      if (!el) {
        return;
      }

      if (unobserve.current.has(el)) {
        unobserve.current.get(el)?.();
      }
      unobserve.current.set(el, observe(el, setEntry, options));
    },
    [options],
  );

  const cleanup = useCallback(() => {
    unobserve.current.forEach((callback) => callback());
    unobserve.current.clear();
  }, []);

  useEffect(() => {
    const map = unobserve.current;
    return () => {
      map.forEach((callback) => callback());
      map.clear();
    };
  }, []);

  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return { observeElement: () => {}, entry: null, cleanup: () => {} } as const;
  }

  return { observeElement, entry, cleanup } as const;
};

const observe = (() => {
  const observers = new Map<string, Observer>();

  const createObserver = (options: UseIntersectionObserverArgs) => {
    const key = JSON.stringify(options);
    if (observers.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- has
      return observers.get(key)!;
    }

    const elementToCallback = new Map<Element, ObserverCallback>();
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = elementToCallback.get(entry.target);
        if (callback) {
          callback(entry);
        }
      });
    }, options);

    const observer: Observer = {
      key,
      elementToCallback,
      intersectionObserver,
    };
    observers.set(key, observer);

    return observer;
  };

  return <T extends Element>(el: T, callback: ObserverCallback, options: UseIntersectionObserverArgs) => {
    const { key, elementToCallback, intersectionObserver } = createObserver(options);
    elementToCallback.set(el, callback);
    intersectionObserver.observe(el);

    const unobserve = () => {
      intersectionObserver.unobserve(el);
      elementToCallback.delete(el);

      if (elementToCallback.size === 0) {
        intersectionObserver.disconnect();
        observers.delete(key);
      }
    };
    return unobserve;
  };
})();
