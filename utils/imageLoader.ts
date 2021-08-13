/* eslint-disable no-param-reassign -- ok */
import type { ImageLoader } from 'next/image';

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src);

export const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  if (src.startsWith('https://secure.gravatar.com/')) {
    return src;
  }

  if (src.startsWith('https://typeofweb.com/wp-content/uploads/')) {
    src = src.replace('https://typeofweb.com/wp-content/uploads/', '/wp-content/uploads/');
  } else if (src.startsWith('https://typeofweb.com/content/')) {
    src = src.replace('https://typeofweb.com/content/', '/content/');
  }

  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params =
    ['f_auto', 'c_limit', 'w_' + String(width), 'q_' + (quality ? quality.toString() : 'auto')].join(',') + '/';
  return `https://res.cloudinary.com/type-of-web/${params}${normalizeSrc(src)}`;
};
