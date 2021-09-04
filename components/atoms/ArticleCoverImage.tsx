import Image from 'next/image';
import { memo } from 'react';

import { typeofwebImageLoader } from '../../utils/imageLoader';

import type { IGetPlaiceholderReturn } from 'plaiceholder';

export type CoverPlaiceholder = {
  readonly blurDataURL: string | null;
  readonly img: IGetPlaiceholderReturn['img'];
  readonly preload: boolean;
};

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export const ArticleCoverImage = memo<{
  readonly cover: CoverPlaiceholder;
  readonly wide: boolean;
}>(({ cover, wide }) => {
  const { src, width, height } = cover.img;
  const ratio = width / height;
  const isLayoutFill = ratio < GOLDEN_RATIO;
  const layoutProps = isLayoutFill
    ? ({ layout: 'fill', objectFit: 'cover', objectPosition: 'center center' } as const)
    : ({ layout: 'responsive', width, height } as const);

  return (
    <div
      className={`text-[length:0] relative ${isLayoutFill ? 'min-h-[55vw] md:min-h-[450px]' : ''} overflow-hidden ${
        wide ? `-mx-1 lg:-mx-4 mb-8 rounded-xl` : `rounded-t-xl`
      }`}
    >
      <Image
        loader={typeofwebImageLoader}
        src={src}
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
        className="duration-[10s] motion-safe:hover:scale-110 bg-gray-200 transition-transform ease-in hover:ease-out"
        alt=""
        // sizes="320px, (min-width: 320px) 640px, (min-width: 640px) 1280px, (min-width: 768px) 1536px"
        // @todo fix me
        sizes="1536px"
        {...layoutProps}
        placeholder="blur"
        blurDataURL={cover.blurDataURL ?? undefined}
        {...(cover.preload ? { loading: 'eager', priority: true } : { loading: 'lazy', priority: false })}
      />
      <meta itemProp="width" content={String(cover.img.width)} />
      <meta itemProp="height" content={String(cover.img.height)} />
    </div>
  );
});
ArticleCoverImage.displayName = 'ArticleCoverImage';
