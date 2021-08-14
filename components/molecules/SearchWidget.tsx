import { useEffect, useRef, memo } from 'react';

import { Input } from '../atoms/Input';
import { Widget } from '../atoms/Widget';

export const SearchWidget = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isK = event.key === 'k' || event.which === 75 || event.keyCode === 75;
      const isCmd = !event.ctrlKey && !event.altKey && !event.shiftKey && event.metaKey;
      if (isK && isCmd) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <Widget>
      <form>
        <Input ref={inputRef} type="search" className="mt-0" placeholder="Szukaj…  [⌘ + K]" aria-keyshortcuts="cmd+k">
          <span className="sr-only">Szukaj…</span>
        </Input>
      </form>
    </Widget>
  );
});
SearchWidget.displayName = 'SearchWidget';
