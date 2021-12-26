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
}>(({ cover }) => {
  const { src, width, height } = cover.img;
  const ratio = width / height;
  const isLayoutFill = ratio < GOLDEN_RATIO;
  const layoutProps = isLayoutFill
    ? ({ layout: 'fill', objectFit: 'cover', objectPosition: 'center center' } as const)
    : ({ layout: 'responsive', width, height } as const);

  return (
    <div
      className={`text-[length:0] relative ${isLayoutFill ? 'min-h-[50vw] md:min-h-[350px]' : ''}
      shadow-lg -mx-6 mt-4 lg:mb-4 mb-2 lg:mt-8 rounded-lg overflow-hidden`}
    >
      <Image
        src={src}
        unoptimized={src.includes('ytimg.com')}
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
        alt=""
        // @todo fix me
        sizes="1536px"
        {...layoutProps}
        placeholder={cover.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={cover.blurDataURL ?? undefined}
        {...(cover.preload ? { loading: 'eager', priority: true } : { loading: 'lazy', priority: false })}
      />
      <meta itemProp="width" content={String(cover.img.width)} />
      <meta itemProp="height" content={String(cover.img.height)} />
    </div>
  );
});
ArticleCoverImage.displayName = 'ArticleCoverImage';
