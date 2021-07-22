import type { PropsWithChildren } from 'react';

interface CardProps {
  readonly as?: 'article' | 'div' | 'form' | 'section';
  readonly roundAllCorners?: boolean;
  readonly moreSpace?: boolean;
  readonly className?: string;
}

export const Card = ({
  children,
  as: As = 'article',
  className,
  roundAllCorners,
  moreSpace,
  ...props
}: PropsWithChildren<CardProps>) => {
  const rounded = roundAllCorners ? 'rounded-xl' : 'rounded-b-xl';
  const p = moreSpace ? 'py-8' : 'pb-8';
  return (
    <As {...props} className={`mb-4 ${p} bg-gray-100 ${rounded} shadow-md ${className ?? ''} sm:mb-8`}>
      {children}
    </As>
  );
};
