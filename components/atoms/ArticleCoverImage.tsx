import Image from 'next/image';

import type { IGetPlaiceholderReturn } from 'plaiceholder';

export type CoverPlaiceholder = {
  readonly blurDataURL: string;
  readonly img: IGetPlaiceholderReturn['img'];
};

export const ArticleCoverImage = ({ cover, wide }: { readonly cover: CoverPlaiceholder; readonly wide: boolean }) => {
  return (
    <div className={`text-[length:0] overflow-hidden ${wide ? `lg:-mx-4 mb-8` : `rounded-t-xl`}`}>
      <Image
        className="duration-[10s] motion-safe:hover:scale-110 transition-transform ease-in hover:ease-out"
        alt=""
        {...cover.img}
        placeholder="blur"
        blurDataURL={cover.blurDataURL}
      />
    </div>
  );
};
