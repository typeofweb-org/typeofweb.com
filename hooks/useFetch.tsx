import { useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type FetchData<T> = {
  readonly value: T | null;
  readonly status: Status;
  readonly errorCode?: number;
};

export function useFetch<T>(fetchFunc: () => Promise<T>) {
  const [fetchData, setFetchData] = useState<FetchData<T>>({
    value: null,
    status: 'idle',
  });

  useEffect(() => {
    setFetchData((fetchData) => ({ ...fetchData, status: 'loading' }));
    fetchFunc()
      .then((data) => {
        setFetchData({ value: data, status: 'success' });
      })
      .catch((err) => {
        if (err instanceof ResponseError) {
          setFetchData({ value: null, status: 'error', errorCode: err.status });
        }
        setFetchData({ value: null, status: 'error' });
      });
  }, [fetchFunc]);

  return fetchData;
}

type FetcherConfig = {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  readonly body?: object;
  readonly config?: RequestInit;
};

export async function fetcher<T>(path: string, { method, body, config }: FetcherConfig): Promise<T> {
  try {
    const response = await fetch(path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      ...(body && { body: JSON.stringify(body) }),
    });
    if (response.ok) {
      return response.json();
    }
    throw new ResponseError(response.statusText, response.status);
  } catch (err) {
    if (err instanceof ResponseError) {
      throw err;
    }
    throw new ResponseError('Something went wrong during fetching!');
  }
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    this.name = 'ResponseError';
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
