export function tryCatch<T>(fn: () => T): T | Error;
export function tryCatch<T>(fn: () => Promise<T>): Promise<T | Error>;
export function tryCatch<T>(fn: () => T | Promise<T>): T | Error | Promise<T | Error> {
  try {
    const result = fn();
    if (typeof result === 'object' && 'then' in result) {
      return result.catch((err) => (err instanceof Error ? err : new Error(String(err))));
    } else {
      return result;
    }
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err));
  }
}
