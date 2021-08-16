/* eslint-disable no-param-reassign -- ok */
import { imageConfigDefault } from 'next/dist/server/image-config';

import type { ImageConfig } from 'next/dist/server/image-config';
import type { ImageLoader } from 'next/image';

const { path: root, domains: configDomains } =
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- hack
  (process.env.__NEXT_IMAGE_OPTS as ImageConfig | undefined) || imageConfigDefault;

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src);

/**
 * @see https://github.com/vercel/next.js/blob/12eb812243cfc8e1fc261f794c2b37fa036520b9/packages/next/client/image.tsx#L697-L750
 */
const defaultLoader: ImageLoader = ({ src, width, quality }) => {
  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};

const CLOUDINARY_BASE = 'https://res.cloudinary.com/type-of-web/';

const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params =
    ['f_auto', 'c_limit', 'w_' + String(width), 'q_' + (quality ? quality.toString() : 'auto')].join(',') + '/';
  return `${CLOUDINARY_BASE}${params}${normalizeSrc(src)}`;
};

export const typeofwebImageLoader: ImageLoader = ({ src, width, quality }) => {
  /**
   * @see https://github.com/vercel/next.js/blob/12eb812243cfc8e1fc261f794c2b37fa036520b9/packages/next/client/image.tsx#L697-L750
   */
  if (process.env.NODE_ENV !== 'production') {
    const missingValues = [];
    // these should always be provided but make sure they are
    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');
    if (missingValues.length > 0) {
      throw new Error(
        `Next Image Optimization requires ${missingValues.join(
          ', ',
        )} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify(
          {
            src,
            width,
            quality,
          },
        )}`,
      );
    }
    if (src.startsWith('//')) {
      throw new Error(
        `Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`,
      );
    }
    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;
      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(
          `Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`,
        );
      }
      if (process.env.NODE_ENV !== 'test' && !configDomains.includes(parsedSrc.hostname)) {
        throw new Error(
          `Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` +
            `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`,
        );
      }
    }
  }

  if (src.startsWith(CLOUDINARY_BASE)) {
    return cloudinaryLoader({
      src: src.replace(CLOUDINARY_BASE, '/'),
      width,
      quality,
    });
  } else if (src.startsWith('https://res.cloudinary.com/')) {
    return src;
  } else if (src.startsWith('https://typeofweb.com/wp-content/uploads/')) {
    return cloudinaryLoader({
      src: src.replace('https://typeofweb.com/wp-content/uploads/', '/wp-content/uploads/'),
      width,
      quality,
    });
  } else if (src.startsWith('https://typeofweb.com/content/')) {
    return cloudinaryLoader({
      src: src.replace('https://typeofweb.com/content/', '/content/'),
      width,
      quality,
    });
  }

  return defaultLoader({ src, width, quality });
};