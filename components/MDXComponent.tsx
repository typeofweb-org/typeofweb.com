import { MDXRemote } from 'next-mdx-remote';
import Dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';

import { origin, host } from '../constants';

import { LinkUnderlineEffect } from './atoms/LinkUnderlineEffect';

import type { CodepenWidgetProps } from './molecules/CodepenWidget';

type MDXRemoteProps = Parameters<typeof MDXRemote>[0];

export const MDXComponent = memo<Omit<MDXRemoteProps, 'components'>>((props) => {
  return <MDXRemote {...props} components={components} />;
});
MDXComponent.displayName = 'MDXComponent';

const warned: Partial<Record<keyof typeof components, boolean>> = {};

const isLocalUrl = (href: string) => {
  try {
    return new URL(href, host).hostname === origin;
  } catch {
    return false;
  }
};

const A = ({ href, ...props }: Omit<JSX.IntrinsicElements['a'], 'href'> & { readonly href: string }) => {
  return isLocalUrl(href) ? (
    <Link href={href} passHref={true}>
      <LinkUnderlineEffect>
        <a {...props} />
      </LinkUnderlineEffect>
    </Link>
  ) : (
    <LinkUnderlineEffect>
      <a href={href} {...props} />
    </LinkUnderlineEffect>
  );
};

const NewsletterForm = Dynamic<{}>(() =>
  import(/* webpackChunkName: "NewsletterForm" */ './molecules/NewsletterForm').then((m) => m.NewsletterForm),
);

const FacebookPageWidget = () => {
  if (!warned['FacebookPageWidget']) {
    console.warn(`Not implemented: FacebookPageWidget`);
    warned['FacebookPageWidget'] = true;
  }
  return null;
};

const CodepenWidget = Dynamic<CodepenWidgetProps>(
  () => import(/* webpackChunkName: "CodepenWidget" */ './molecules/CodepenWidget').then((m) => m.CodepenWidget),
  { ssr: false },
);

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
