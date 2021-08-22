import Algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, memo, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, Configure, connectSearchBox, connectHits } from 'react-instantsearch-dom';

import { useBodyFix } from '../../hooks/useBodyFix';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { splitContent, trimExcerpt } from '../../utils/excerpt';
import { getUrlForPermalink } from '../../utils/permalinks';
import { Input } from '../atoms/Input';

import type { KeyboardEventHandler, ChangeEventHandler } from 'react';
import type { HitsProvided, SearchBoxProvided } from 'react-instantsearch-core';

const searchClient = Algoliasearch('QB2FWHH99M', '25fc15b3e367b7a46c1f3617b39aa749');

export const SearchWidget = memo(() => {
  const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

  const { events } = useRouter();

  const toggleSearch = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);
  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    events.on('routeChangeStart', closeSearch);
    return () => events.off('routeChangeStart', closeSearch);
  }, [events, closeSearch]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isEsc = event.key === 'Escape';
      const isK = event.key === 'k';
      const isMeta = IS_MAC ? event.metaKey : event.ctrlKey;
      if (isK && isMeta && !event.altKey && !event.shiftKey) {
        toggleSearch();
      } else if (isEsc) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [IS_MAC, closeSearch, toggleSearch]);

  return (
    <div className="block lg:mb-8">
      {isOpen && <SearchModal onCancel={closeSearch} />}
      <button
        aria-label="Szukaj na stronie…"
        className="flex flex-row items-center justify-between px-5 w-full h-11 bg-gradient-to-b focus:border-blue-200 border-gray-300 rounded-lg hover:shadow-lg focus:shadow-lg shadow-md from-white to-gray-100 transition-shadow focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:ring-offset-2 lg:h-12"
        title="Szukaj…"
        type="button"
        onClick={openSearch}
      >
        <div className="animate-delay-0 flex flex-row gap-3 items-baseline mt-1 w-full text-gray-600 animate-appear">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 fill-current opacity-75">
            <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z" />
          </svg>
          <span>
            Szukaj<span className="sr-only md:not-sr-only"> na stronie</span>…
          </span>
        </div>
        <div className="animate-delay-0 hidden animate-appear md:flex md:flex-grow-0 md:gap-2 md:items-center">
          <kbd className="shadow-darker block text-gray-600 bg-gradient-to-tl border-b-2 border-gray-300 rounded from-gray-100 to-gray-200">
            <span
              className={`inline-flex items-center justify-center p-2 h-7  leading-none border-l border-r border-t border-white rounded ${
                IS_MAC ? 'text-lg' : 'text-base'
              }`}
            >
              {IS_MAC ? '⌘' : 'ctrl'}
            </span>
          </kbd>
          <kbd className="shadow-darker block text-gray-600 bg-gradient-to-tl border-b-2 border-gray-300 rounded from-gray-100 to-gray-200">
            <span className="inline-flex items-center justify-center p-2 h-7 leading-none border-l border-r border-t border-white rounded">
              K
            </span>
          </kbd>
        </div>
      </button>
    </div>
  );
});
SearchWidget.displayName = 'SearchWidget';

const InBody = ({ children }: { readonly children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

interface SearchModalProps {
  readonly onCancel: () => void;
}

interface CustomSearchBoxProps extends SearchBoxProvided {
  readonly currentObjectID?: string | null;
  readonly onChange: (refinement: string) => void;
}

const CustomSearchBox = connectSearchBox<CustomSearchBoxProps>(
  ({ refine, currentRefinement, currentObjectID, onChange }) => {
    const handleCustomSearchBoxKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
      (e) => {
        if (currentRefinement && e.key === 'Escape') {
          e.stopPropagation();
          refine('');
        } else if (e.key === 'Enter') {
          e.preventDefault();
        }
      },
      [currentRefinement, refine],
    );

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        refine(e.currentTarget.value);
        onChange(e.currentTarget.value);
      },
      [onChange, refine],
    );

    return (
      <form className="relative flex items-center w-full max-h-screen" noValidate role="search">
        <Input
          onKeyDown={handleCustomSearchBoxKeyDown}
          className="flex-1 mt-0 pl-8 w-full h-14 text-lg border-transparent shadow-none sm:text-3xl lg:pl-16 lg:h-20"
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Szukaj na stronie…"
          maxLength={512}
          type="search"
          enterKeyHint="go"
          value={currentRefinement}
          onChange={handleChange}
          autoFocus
          aria-controls="search-hits-list"
          {...(currentObjectID && { 'aria-activedescendant': 'id' + currentObjectID })}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute z-10 left-3 top-1/2 py-1 h-6 text-gray-700 -translate-y-1/2 lg:left-6 lg:h-8"
          >
            <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path>
          </svg>
        </Input>
      </form>
    );
  },
);
CustomSearchBox.displayName = 'CustomSearchBox';

interface TypeOfWebHit {
  readonly title: string;
  readonly date: string;
  readonly permalink: string;
  readonly series?: {
    readonly slug: string;
    readonly name: string;
  } | null;
  readonly category?: {
    readonly slug: string;
    readonly name: string;
  } | null;
  readonly authors: readonly string[];
  readonly seo: {
    readonly focusKeywords?: readonly string[];
    readonly focusKeywordSynonyms?: readonly string[];
    readonly metadesc?: string;
  };
  readonly content: string;
  readonly objectID: string;
  readonly _highlightResult: {
    readonly title: {
      readonly value: string;
      readonly matchLevel: string;
      readonly matchedWords: readonly string[];
    };
    readonly series: {
      readonly name: {
        readonly value: string;
        readonly matchLevel: string;
        readonly matchedWords: readonly string[];
      };
    };
    readonly category: {
      readonly name: {
        readonly value: string;
        readonly matchLevel: string;
        readonly matchedWords: readonly string[];
      };
    };
    readonly authors: readonly [
      {
        readonly value: string;
        readonly matchLevel: string;
        readonly matchedWords: readonly string[];
      },
    ];
    readonly seo: {
      readonly focusKeywords: readonly [
        {
          readonly value: string;
          readonly matchLevel: string;
          readonly matchedWords: readonly string[];
        },
        {
          readonly value: string;
          readonly matchLevel: string;
          readonly matchedWords: readonly string[];
        },
        {
          readonly value: string;
          readonly matchLevel: string;
          readonly matchedWords: readonly string[];
        },
      ];
      readonly focusKeywordSynonyms: readonly [
        {
          readonly value: string;
          readonly matchLevel: string;
          readonly matchedWords: readonly string[];
        },
      ];
      readonly metadesc: {
        readonly value: string;
        readonly matchLevel: string;
        readonly matchedWords: readonly string[];
      };
    };
    readonly content: {
      readonly value: string;
      readonly matchLevel: string;
      readonly matchedWords: readonly string[];
    };
  };
  readonly __position: number;
  readonly __queryID: string;
}

interface CustomHitsProps extends HitsProvided<TypeOfWebHit> {
  readonly currentObjectID: string | null;
  readonly setObjectId: (objectId: string) => void;
}

export const CustomHits = connectHits<CustomHitsProps, TypeOfWebHit>(({ hits, currentObjectID, setObjectId }) => {
  const { push } = useRouter();

  const currentHitIndex = hits.findIndex((h) => h.objectID === currentObjectID);

  const selectNextHit = useCallback(() => {
    const nextHitIndex = (currentHitIndex + 1) % hits.length;
    const nextHit = hits[nextHitIndex];
    setObjectId(nextHit.objectID);
  }, [currentHitIndex, hits, setObjectId]);

  const selectPrevHit = useCallback(() => {
    const prevHitIndex = (currentHitIndex - 1 + hits.length) % hits.length;
    const prevHit = hits[prevHitIndex];
    setObjectId(prevHit.objectID);
  }, [currentHitIndex, hits, setObjectId]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectPrevHit();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectNextHit();
      } else if (event.key === 'Enter' && currentObjectID) {
        event.preventDefault();
        void push(getUrlForPermalink(currentObjectID));
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [selectNextHit, selectPrevHit, currentObjectID, push]);

  const currentHit = hits.find((h) => h.objectID === currentObjectID);

  return (
    <div className="lg:h-[50vh] flex flex-row max-h-screen">
      <ol
        id="search-hits-list"
        className="overflow-scrolling-touch mt-1 pb-32 w-full overflow-y-auto lg:w-1/2"
        aria-controls="search-details"
      >
        {hits.map((hit) => (
          <li
            data-insights-object-id={hit.objectID}
            data-insights-position={hit.__position}
            data-insights-query-id={hit.__queryID}
            key={hit.objectID}
            role="option"
            aria-describedby="search-details"
            aria-selected={currentObjectID === hit.objectID ? 'true' : 'false'}
            id={'id' + hit.objectID}
          >
            <CustomHit hit={hit} onItemHover={setObjectId} currentObjectID={currentObjectID} />
          </li>
        ))}
      </ol>
      <div
        className="lg:overflow-scrolling-touch hidden lg:block lg:mt-1 lg:px-8 lg:py-6 lg:w-1/2 lg:overflow-y-auto"
        aria-atomic
        aria-live="polite"
        role="region"
        id="search-details"
      >
        {currentHit && <HitDetails currentHit={currentHit} />}
      </div>
    </div>
  );
});
CustomHits.displayName = 'CustomHits';

const HitDetails = memo<{ readonly currentHit: TypeOfWebHit }>(
  ({ currentHit }) => {
    const excerpt = trimExcerpt(splitContent(currentHit.content)[0]);
    return (
      <>
        <p className="text-gray-900 text-xl font-bold">{currentHit.title || ''}</p>
        <p className="mt-1 text-gray-600 text-sm">
          {currentHit.category?.name || ''} {currentHit.series ? `> ${currentHit.series.name}` : ''}
        </p>
        <p className="mt-3 text-gray-900">{excerpt}</p>
        <Link href={getUrlForPermalink(currentHit.objectID)}>
          <a className="inline-block mt-5 px-4 py-2 text-gray-100 text-2xl focus:bg-green-600 bg-green-700 rounded-md outline-none cursor-pointer transition-all focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:ring-offset-2">
            Idź do artykułu
          </a>
        </Link>
      </>
    );
  },
  (prev, next) => prev.currentHit.objectID === next.currentHit.objectID,
);
HitDetails.displayName = 'HitDetails';

interface CustomHitProps {
  readonly hit: TypeOfWebHit;
  readonly onItemHover: (objectID: string) => void;
  readonly currentObjectID?: string | null;
}

export const CustomHit = memo<CustomHitProps>(
  ({ hit, onItemHover, currentObjectID }) => {
    const isActive = currentObjectID === hit.objectID;

    const currentElRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      if (isActive) {
        currentElRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
      }
    }, [isActive]);

    return (
      <Link href={getUrlForPermalink(hit.objectID)}>
        <a
          ref={currentElRef}
          onMouseEnter={() => onItemHover(hit.objectID)}
          onFocus={() => onItemHover(hit.objectID)}
          onPointerEnter={() => onItemHover(hit.objectID)}
          className={`relative flex flex-col pl-4 pr-12 py-1 border-b last:border-b-0 focus:no-underline ${
            isActive ? 'bg-green-600 shadow-md' : ''
          }`}
          title={hit.title}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute right-4 top-1/2 block w-6 h-auto -translate-y-1/2 ${
              isActive ? 'block text-gray-100' : 'hidden'
            }`}
          >
            <polyline points="9 10 4 15 9 20" />
            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
          </svg>
          <span
            className={`block whitespace-nowrap text-lg overflow-hidden overflow-ellipsis ${
              isActive ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {hit.title}
          </span>
          <span
            className={`block whitespace-nowrap text-sm overflow-hidden overflow-ellipsis ${
              isActive ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            {hit.category?.name || ''} {hit.series ? `> ${hit.series.name}` : ''}
          </span>
        </a>
      </Link>
    );
  },
  (prev, next) => prev.hit.objectID === next.hit.objectID && prev.currentObjectID === next.currentObjectID,
);
CustomHit.displayName = 'AlogliaHit';

const SearchModal = ({ onCancel }: SearchModalProps) => {
  const [currentObjectID, setObjectId] = useState<string | null>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);
  const bodyFix = useBodyFix();
  useOnClickOutside(searchModalRef, onCancel);

  useEffect(() => {
    bodyFix.fixBody();
    return () => {
      bodyFix.unfixBody();
    };
  }, [bodyFix]);

  const handleInputChange = useCallback(() => {
    setTimeout(() => setObjectId(null), 0);
  }, []);

  return (
    <InBody>
      <InstantSearch searchClient={searchClient} indexName="typeofweb_prod">
        <Configure clickAnalytics />
        <div className="animate-delay-0 animate-duration-100 lg:pt-[20vh] fixed z-50 inset-0 flex items-start justify-center text-base bg-gray-400 bg-opacity-50 overflow-hidden animate-appear">
          <div
            ref={searchModalRef}
            className="flex flex-col items-stretch justify-between w-full max-h-screen bg-white shadow-md xl:max-w-5xl xl:rounded-md"
            // eslint-disable-next-line jsx-a11y/role-has-required-aria-props -- https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html
            role="combobox"
            aria-owns="search-hits-list"
            aria-expanded="true"
            aria-haspopup="listbox"
          >
            <div className="flex flex-row rounded-lg shadow-md">
              <CustomSearchBox currentObjectID={currentObjectID} onChange={handleInputChange} />
              <div className="w-0.5 bg-gray-200" />
              <button
                onClick={onCancel}
                type="button"
                className="flex flex-row items-center px-4 text-gray-600 hover:text-gray-800 focus:border-blue-200 border-gray-300 rounded-md transition-shadow focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:ring-offset-2 lg:px-16"
              >
                Anuluj
              </button>
            </div>
            <CustomHits currentObjectID={currentObjectID} setObjectId={setObjectId} />
          </div>
        </div>
      </InstantSearch>
    </InBody>
  );
};
SearchModal.displayName = 'SearchModal';
