import Image from 'next/image';

export const ArticleCoverImage = ({
  cover,
  wide,
}: {
  readonly cover: { readonly url: string; readonly width: number; readonly height: number };
  readonly wide: boolean;
}) => {
  return (
    <div className={`text-[length:0] overflow-hidden ${wide ? `lg:-mx-4 mb-8` : `rounded-t-xl`}`}>
      <Image
        width={cover.width}
        height={cover.height}
        className="duration-[10s] motion-safe:hover:scale-110 transition-transform ease-in hover:ease-out"
        src={cover.url}
        alt=""
      />
    </div>
  );
};
