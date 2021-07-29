import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';

import { LinkUnderlineEffect } from './atoms/LinkUnderlineEffect';

type MDXRemoteProps = Parameters<typeof MDXRemote>[0];

export const MDXComponent = (props: Omit<MDXRemoteProps, 'components'>) => {
  return <MDXRemote {...props} components={components} />;
};

const warned: Partial<Record<keyof typeof components, boolean>> = {};

const A = ({ href, ...props }: Omit<JSX.IntrinsicElements['a'], 'href'> & { readonly href: string }) => {
  return (
    <Link href={href} passHref={true}>
      <LinkUnderlineEffect>
        <a {...props} />
      </LinkUnderlineEffect>
    </Link>
  );
};

const NewsletterForm = () => {
  if (!warned['NewsletterForm']) {
    console.warn(`Not implemented: NewsletterForm`);
    warned['NewsletterForm'] = true;
  }
  return null;
};

const FacebookPageWidget = () => {
  if (!warned['FacebookPageWidget']) {
    console.warn(`Not implemented: FacebookPageWidget`);
    warned['FacebookPageWidget'] = true;
  }
  return null;
};

const CodepenWidget = (_props: {
  readonly height?: `${number}`;
  readonly themeId?: string;
  readonly slugHash?: string;
  readonly defaultTab?: string;
  readonly user?: string;
  readonly embedVersion?: string;
  readonly penTitle?: string;
}) => {
  if (!warned['CodepenWidget']) {
    console.warn(`Not implemented: CodepenWidget`);
    warned['CodepenWidget'] = true;
  }
  return null;
};

const Gallery = (_props: {
  readonly columns?: '1' | '2' | '3';
  readonly link: 'file' | 'none';
  readonly size: 'medium' | 'large' | 'full';
}) => {
  if (!warned['Gallery']) {
    console.warn(`Not implemented: Gallery`);
    warned['Gallery'] = true;
  }
  return null;
};

const components = {
  a: A,
  NewsletterForm,
  FacebookPageWidget,
  CodepenWidget,
  Gallery,
};
