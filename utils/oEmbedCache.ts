import Fsa from 'fs/promises';

import OembedParser from 'oembed-parser';
const { extract, setProviderList } = OembedParser;
import Providers from 'oembed-parser/src/utils/providers.json';

import { host } from '../constants';

import { tryCatch } from './fns';

import type { LinkTypeData, PhotoTypeData, VideoTypeData, RichTypeData } from 'oembed-parser';

setProviderList([
  ...Providers,
  {
    provider_name: 'Type of Web',
    provider_url: `${host}/`,
    endpoints: [
      {
        schemes: [`${host}/*`, `https://typeofweb.com/*`],
        url: `${host}/api/oembed`,
        discovery: true,
      },
    ],
  },
]);

export type OembedData = LinkTypeData | PhotoTypeData | VideoTypeData | RichTypeData;

interface CachedOEmbed {
  readonly [url: string]: {
    readonly data: OembedData | null;
    readonly updatedAt: number; // timestamp in ms
  };
}

// const STALE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export async function getOEmbed(
  url: string,
  {
    updateCache = false,
    force = false,
  }: {
    readonly updateCache?: boolean;
    readonly force?: boolean;
  },
) {
  const cache = await readJson('./oEmbedCache.json');
  console.log({ updateCache, force, url, 'url in cache': url in cache });

  if (!force && url in cache) {
    return cache[url].data;
  }

  if (!updateCache && !force) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- custom OembedType
  const result = (await tryCatch(() => extract(url))) as OembedData | Error;
  const data = result instanceof Error ? null : result;

  if (!data) {
    console.log(result);
  }

  if (updateCache) {
    const newCache: CachedOEmbed = {
      ...(await readJson('./oEmbedCache.json')),
      [url]: {
        data,
        updatedAt: Date.now(),
      },
    };
    await Fsa.writeFile('./oEmbedCache.json', JSON.stringify(newCache, null, 2));
  }

  return data;
}

async function readJson(path: string): Promise<CachedOEmbed> {
  const content = await Fsa.readFile(path, 'utf8');
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}
