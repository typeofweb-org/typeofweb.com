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
    <div className={`text-[length:0] overflow-hidden ${wide ? `lg:-mx-4 mb-8` : `rounded-t-xl`}`}>
      <Image
        {...cover.img}
        className="duration-[10s] motion-safe:hover:scale-110 transition-transform ease-in hover:ease-out"
        alt=""
        sizes="(min-width: 768px) 768px, 100vw"
        layout="responsive"
        placeholder="blur"
        blurDataURL={cover.blurDataURL}
        {...(cover.preload ? { loading: 'eager', priority: true } : { loading: 'lazy', priority: false })}
      />
    </div>
  );
});
ArticleCoverImage.displayName = 'ArticleCoverImage';
