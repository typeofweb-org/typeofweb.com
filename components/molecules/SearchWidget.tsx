import Algoliasearch from 'algoliasearch/lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, memo, useState, useCallback, forwardRef, useRef } from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { getUrlForPermalink } from '../../utils/permalinks';
import { Input } from '../atoms/Input';

const searchClient = Algoliasearch('QB2FWHH99M', '25fc15b3e367b7a46c1f3617b39aa749');

export const SearchWidget = memo(() => {
  const IS_MAC = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

  const { route } = useRouter();
  useEffect(() => {
    closeSearch();
  }, [route]);

  const searchModalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(searchModalRef, closeSearch);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isEsc = event.key === 'Escape';
      const isK = event.key === 'k';
      const isMeta = IS_MAC ? event.metaKey : event.ctrlKey;
      if (isK && isMeta && !event.altKey && !event.shiftKey) {
        openSearch();
      } else if (isEsc) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <div className="block mb-8">
      {isOpen && <SearchModal ref={searchModalRef} onCancel={closeSearch} />}
      <button
        aria-label="Szukaj na stronie…"
        className="flex flex-row items-center justify-between px-5 w-full h-12 bg-gradient-to-b focus:border-blue-200 border-gray-300 rounded-lg hover:shadow-lg focus:shadow-lg shadow-md from-white to-gray-100 transition-shadow focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:ring-offset-2"
        title="Szukaj…"
        type="button"
        onClick={openSearch}
      >
        <div className="flex flex-row gap-3 items-baseline mt-1 text-gray-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 fill-current opacity-75">
            <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z" />
          </svg>
          Szukaj na stronie…
        </div>
        <div className="hidden md:flex md:flex-grow-0 md:gap-2 md:items-center">
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

const CustomSearchBox = connectSearchBox(({ refine, currentRefinement }) => {
  return (
    <form className="flex items-center w-full h-full" noValidate role="search">
      <Input
        className="flex-1 mt-0 pl-16 w-full h-20 text-lg border-transparent shadow-none sm:text-3xl"
        aria-autocomplete="both"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="Szukaj na stronie…"
        maxLength={512}
        type="search"
        enterKeyHint="go"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
        autoFocus
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="z-10 inline flex-none -ml-6 mt-5 py-1 h-8 text-gray-700 translate-x-12"
        >
          <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path>
        </svg>
      </Input>
    </form>
  );
});
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
}

export const CustomHits = connectHits<TypeOfWebHit>(({ hits }) => {
  const [currentObjectID, setObjectId] = useState('');
  const currentHit = hits.find((h) => h.objectID === currentObjectID);

  return (
    <div className="max-h-[50vh] flex flex-row">
      <ol className="overflow-scrolling-touch mt-1 w-1/2 overflow-y-auto" aria-controls="search-details">
        {hits.map((hit) => (
          <li aria-describedby="search-details" key={hit.objectID}>
            <CustomHit hit={hit} onItemHover={setObjectId} currentObjectID={currentObjectID} />
          </li>
        ))}
      </ol>
      <div
        className="overflow-scrolling-touch mt-1 px-8 py-6 w-1/2 overflow-y-auto"
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
    return (
      <>
        <p className="text-gray-900 text-xl font-bold">{currentHit.title || ''}</p>
        <p className="mt-1 text-gray-600 text-sm">
          {currentHit.category?.name || ''} {currentHit.series ? `> ${currentHit.series.name}` : ''}
        </p>
        <p className="mt-3 text-gray-900">{currentHit.content.split(`{/_ more _/}`)[0] || ''}</p>
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

interface CustomHitProps {
  readonly hit: TypeOfWebHit;
  readonly onItemHover: (objectID: string) => void;
  readonly currentObjectID?: string;
}

export const CustomHit = memo<CustomHitProps>(
  ({ hit, onItemHover, currentObjectID }) => {
    const isActive = currentObjectID === hit.objectID;
    return (
      <Link href={getUrlForPermalink(hit.objectID)}>
        <a
          onMouseOver={() => onItemHover(hit.objectID)}
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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

const SearchModal = forwardRef<HTMLDivElement, SearchModalProps>(({ onCancel }, ref) => {
  return (
    <InBody>
      <InstantSearch searchClient={searchClient} indexName="typeofweb_prod">
        <div className="fixed z-50 inset-0 flex items-start justify-center text-base bg-gray-400 bg-opacity-50 overflow-hidden xl:pb-32 xl:pt-40 xl:px-40">
          <div
            ref={ref}
            className="flex flex-col items-stretch justify-between w-full bg-white shadow-md xl:max-w-5xl xl:rounded-md"
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
          >
            <div className="flex flex-row rounded-lg shadow-md">
              <CustomSearchBox />
              <div className="w-0.5 bg-gray-200" />
              <button
                onClick={onCancel}
                type="button"
                className="flex flex-row items-center px-16 text-gray-600 hover:text-gray-800 focus:border-blue-200 border-gray-300 rounded-md transition-shadow focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:ring-offset-2"
              >
                Anuluj
              </button>
            </div>
            <CustomHits />
          </div>
        </div>
      </InstantSearch>
    </InBody>
  );
});
SearchModal.displayName = 'SearchModal';
