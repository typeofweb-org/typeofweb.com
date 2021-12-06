export const stableKey = (obj: Record<keyof object, unknown>): string => {
  return JSON.stringify(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
};

export const memoize = <Arg extends object, Result>(fn: (arg: Arg) => Result): typeof fn => {
  const cache = new Map<string, { readonly date: Date; readonly result: Result }>();
  return (arg) => {
    const key = stableKey(arg);
    if (cache.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked above
      const entry = cache.get(key)!;
      if (entry.date.getTime() + 1000 * 60 * 15 > Date.now()) {
        return entry.result;
      } else {
        cache.delete(key);
      }
    }

    const result = fn(arg);
    cache.set(key, { date: new Date(), result });
    return result;
  };
};
