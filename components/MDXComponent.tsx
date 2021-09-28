import { MDXRemote } from 'next-mdx-remote';
import Dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { origin, host } from '../constants';
import { typeofwebImageLoader } from '../utils/imageLoader';

import { DemoSimulation } from './SeniorsJuniorsDemoSimulationAsync';
import { LinkUnderlineEffect } from './atoms/LinkUnderlineEffect';
import { Timeline } from './molecules/Timeline';

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

const Img = ({ src, width, height, alt = '', placeholder: _placeholder, ...props }: JSX.IntrinsicElements['img']) => {
  if (width && height && src) {
    console.log({ width, height });
    // const isFull = props.className?.includes('size-full') ?? false;
    // const isLarge = props.className?.includes('size-large') ?? false;
    // const isMedium = props.className?.includes('size-medium') ?? false;

    return (
      <div className={`${props.className ?? ''} img`} style={{ maxWidth: Number(width), maxHeight: Number(height) }}>
        <Image
          {...props}
          width={width}
          height={height}
          src={src}
          alt={alt}
          loading="lazy"
          layout="responsive"
          loader={typeofwebImageLoader}
        />
      </div>
    );
  }
  return <img {...props} width={width} height={height} src={src} alt={alt} loading="lazy" />;
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
  img: Img,
  Img,
  NewsletterForm,
  FacebookPageWidget,
  CodepenWidget,
  Gallery,
  Timeline,
  DemoSimulation,
};
