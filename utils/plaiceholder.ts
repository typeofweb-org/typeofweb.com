import Fs from 'fs';

import { getPlaiceholder } from 'plaiceholder';

export const getPlaiceholder2 = async (
  data?:
    | {
        readonly url: string;
        readonly width?: number | null | undefined;
        readonly height?: number | null | undefined;
      }
    | undefined,
): Promise<{
  readonly base64?: null | undefined | string;
  readonly img?: null | undefined | { readonly src: string; readonly width: number; readonly height: number };
}> => {
  if (!data) {
    return {};
  }

  const path = data.url.replace(/^\/public\//, '/');
  if (!Fs.existsSync(`${process.cwd()}${data.url}`) || process.env.NODE_ENV !== 'production') {
    return {
      base64: null,
      img: {
        height: data.height ?? 320,
        width: data.width ?? 320,
        src: path,
      },
    };
  }

  try {
    return await getPlaiceholder(path);
  } catch (err) {
    console.error(data.url, err);
    return {};
  }
};
