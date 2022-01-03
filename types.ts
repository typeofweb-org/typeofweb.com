export type PageKind = 'post' | 'page' | 'index' | 'series' | 'category';

export type PromiseValue<T> = T extends PromiseLike<infer R> ? R : T;

export type InferGetStaticPropsType<T extends (...args: any) => any> = PromiseValue<ReturnType<T>> extends infer Temp
  ? Temp extends {
      readonly props: infer P;
    }
    ? P
    : never
  : never;

export interface Series {
  readonly name: string;
  readonly slug: string;
  readonly currentIndex: number;
  readonly count: number;
}
export interface SeriesWithToC extends Series {
  readonly links: readonly {
    readonly permalink: string;
    readonly title: string;
  }[];
}

// Algolia
export interface TypeOfWebHit {
  readonly title: string;
  readonly date: string;
  readonly permalink: string;
  readonly type: 'post' | 'page';
  readonly excerpt: string;
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
  readonly img?: { readonly height: number; readonly width: number; readonly url: string } | null;
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
