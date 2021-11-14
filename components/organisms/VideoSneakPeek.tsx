import Link from 'next/link';
import React, { memo } from 'react';

import YouTubeLogo from '../../images/youtube-logo.svg';
import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { ArticleTitle } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';

import type { YouTubePost } from '../../utils/youtube';

interface VideoSneakPeekProps {
  readonly video: YouTubePost;
}
export const VideoSneakPeek = memo<VideoSneakPeekProps>(({ video }) => {
  return (
    <Card
      as="article"
      itemScope
      itemType="http://schema.org/Video"
      roundAllCorners={!video.cover}
      moreSpace={!video.cover}
    >
      <header className="bg-gray-200">
        {video.cover && (
          <Link href={video.url}>
            <a tabIndex={-1} aria-hidden="true" target="_blank">
              <ArticleCoverImage
                cover={{
                  blurDataURL: video.cover.blurDataURL,
                  img: video.cover.img,
                  preload: true,
                }}
                wide={false}
              />
            </a>
          </Link>
        )}
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 ${video.cover ? 'pt-6' : ''}`}>
          <ArticleTitle title={video.title} href={video.url} level={2} />
          <div className="flex items-center justify-center mt-3">
            <Link href={video.url}>
              <a target="_blank">
                <YouTubeLogo width="100" />
              </a>
            </Link>
          </div>
        </div>
      </header>
      <div className="pb-2 px-7 text-gray-700 font-serif text-lg sm:px-8 lg:px-12">
        <p className="!indent-0">
          {video.description}{' '}
          <span className="ml-2">
            <Link href={video.url} passHref>
              <LinkUnderlineEffect>
                <a className="text-blue-500 font-bold tracking-wider" target="_blank">
                  Obejrzyj na YouTube <span className="sr-only">filmik {video.title}</span>…
                </a>
              </LinkUnderlineEffect>
            </Link>
          </span>
        </p>
      </div>
      <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
          <meta itemProp="url" content="/wp-content/uploads/2020/04/logo_kwadrat11.png" />
        </span>
        <meta itemProp="name" content="Type of Web" />
      </span>
      <link itemProp="mainEntityOfPage" href={video.url} />
    </Card>
  );
});
VideoSneakPeek.displayName = 'VideoSneakPeek';
