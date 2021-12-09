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
import type { PropsWithChildren } from 'react';

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
          priority={false}
          layout="responsive"
          loader={typeofwebImageLoader}
        />
      </div>
    );
  }
  // console.warn(`[MDX] Image ${src} has no width and height.`);
  return <img {...props} width={width} height={height} src={src} alt={alt} loading="lazy" />;
};

const NewsletterForm = Dynamic<{ readonly utmSource?: string }>(() =>
  import(/* webpackChunkName: "NewsletterForm" */ './molecules/NewsletterForm').then((m) => m.NewsletterForm),
);

const FacebookPageWidget = () => {
  if (!warned['FacebookPageWidget']) {
    console.warn(`Not implemented: FacebookPageWidget`);
    warned['FacebookPageWidget'] = true;
  }
  return <div />;
};

const CodepenWidget = Dynamic<CodepenWidgetProps>(
  () => import(/* webpackChunkName: "CodepenWidget" */ './molecules/CodepenWidget').then((m) => m.CodepenWidget),
  { ssr: false },
);

type MdxChild = React.ReactElement<
  PropsWithChildren<{ readonly originalType?: string; readonly mdxType?: string; readonly src?: string }>
>;

const groupByImagesAndDescriptions = (children: readonly MdxChild[]) => {
  const imgStartIndexes = children.flatMap((child, index) => {
    if (child.props.originalType === 'img' || child.props.mdxType === 'img') {
      return [index];
    }
    return [];
  });
  const imgEndIndexes = imgStartIndexes.slice(1);
  const groups = imgStartIndexes.map((startIndex, idx) =>
    children.slice(startIndex, startIndex + imgEndIndexes[idx] || Infinity),
  );

  return groups;
};

const splitDescriptionIntoLines = (description: MdxChild) => {
  if (
    (description.props.mdxType === 'p' || description.props.originalType === 'p') &&
    (typeof description.props.children === 'string' ||
      (Array.isArray(description.props.children) && description.props.children.every((s) => typeof s === 'string')))
  ) {
    return [description.props.children]
      .flat()
      .join('')
      .trim()
      .split('\n')
      .filter((line) => !!line.trim())
      .map((line, idx) => <p key={String(idx) + line}>{line}</p>);
  }
  console.log(description.props);
  return description;
};

const Gallery = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- @todo
  columns = '2',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- @todo
  link = 'none',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- @todo
  size = 'medium',
  children,
}: {
  readonly columns: '1' | '2' | '3';
  readonly link: 'file' | 'none';
  readonly size: 'medium' | 'large' | 'full';
  readonly children: readonly MdxChild[];
}) => {
  const groups = groupByImagesAndDescriptions(children);

  return (
    <div
      className={`md:grid ${
        columns === '1' ? 'md:grid-cols-1' : columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-3'
      } md:-mx-16`}
    >
      {groups.map(([img, ...descriptions], idx) => {
        return (
          <figure key={String(idx) + (img.props.src || '')} className="w-full">
            {img}
            <figcaption>{descriptions.flatMap((d) => splitDescriptionIntoLines(d))}</figcaption>
          </figure>
        );
      })}
    </div>
  );
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
