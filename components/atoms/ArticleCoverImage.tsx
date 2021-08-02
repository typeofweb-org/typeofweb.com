import Image from 'next/image';
import { memo } from 'react';

import type { IGetPlaiceholderReturn } from 'plaiceholder';

export type CoverPlaiceholder = {
  readonly blurDataURL: string;
  readonly img: IGetPlaiceholderReturn['img'];
  readonly preload: boolean;
};

export const ArticleCoverImage = memo<{
  readonly cover: CoverPlaiceholder;
  readonly wide: boolean;
}>(({ cover, wide }) => {
  return (
    <div className={`text-[length:0] overflow-hidden ${wide ? `lg:-mx-4 mb-8 rounded-xl` : `rounded-t-xl`}`}>
      <Image
        {...cover.img}
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
        className="duration-[10s] motion-safe:hover:scale-110 transition-transform ease-in hover:ease-out"
        alt=""
        sizes="(min-width: 768px) 768px, 100vw"
        layout="responsive"
        placeholder="blur"
        blurDataURL={cover.blurDataURL}
        {...(cover.preload ? { loading: 'eager', priority: true } : { loading: 'lazy', priority: false })}
      />
      <meta itemProp="width" content={String(cover.img.width)} />
      <meta itemProp="height" content={String(cover.img.height)} />
    </div>
  );
});
ArticleCoverImage.displayName = 'ArticleCoverImage';
