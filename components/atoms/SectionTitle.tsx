import type { PropsWithChildren } from 'react';

interface SectionTitleProps {
  readonly size?: 'small' | 'large';
}

export const SectionTitle = ({ children, size = 'large' }: PropsWithChildren<SectionTitleProps>) => {
  const textSize = size === 'large' ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl';
  return (
    <h2
      className={`relative z-auto inline-block text-center text-gray-900 font-sans hover:text-gray-700 transition-colors ${textSize} font-semibold leading-tight lg:leading-tight`}
    >
      {children}
    </h2>
  );
};
