import type { PropsWithChildren } from 'react';

interface SectionTitleProps {
  readonly size?: 'small' | 'large';
  readonly level: 1 | 2 | 'none';
}

export const SectionTitle = ({ children, level, size = 'large' }: PropsWithChildren<SectionTitleProps>) => {
  const textSize = size === 'large' ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-3xl';

  const El = level === 'none' ? 'span' : (`h${level}` as const);

  return (
    <El
      className={`relative z-auto block text-center px-1 lg:px-4 text-gray-900 font-sans hover:text-gray-700 transition-colors ${textSize} font-semibold leading-tight lg:leading-tight`}
    >
      {children}
    </El>
  );
};
