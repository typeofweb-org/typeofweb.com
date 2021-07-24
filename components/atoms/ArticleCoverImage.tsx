import Image from 'next/image';

export const ArticleCoverImage = ({ coverUrl, wide }: { readonly coverUrl: string; readonly wide: boolean }) => {
  return (
    <div className={`text-[length:0] overflow-hidden ${wide ? `md:-mx-4 mb-8` : `rounded-t-xl`}`}>
      <Image
        width={800}
        height={450}
        className="duration-[10s] motion-safe:hover:scale-110 transition-transform ease-in hover:ease-out"
        src={coverUrl}
        alt=""
      />
    </div>
  );
};
