export type PageKind = 'post' | 'page' | 'index';

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
