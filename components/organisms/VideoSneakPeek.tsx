import Link from 'next/link';
import React, { memo } from 'react';

import YouTubeLogo from '../../images/youtube-logo.svg';
import { ArticleCoverImage } from '../atoms/ArticleCoverImage';
import { wisząceSpójniki } from '../atoms/ArticleTitle';
import { Card } from '../atoms/Card';
import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { SectionTitle } from '../atoms/SectionTitle';

import type { YouTubePost } from '../../utils/youtube';

interface VideoSneakPeekProps {
  readonly video: YouTubePost;
}
export const VideoSneakPeek = memo<VideoSneakPeekProps>(({ video }) => {
  return (
    <Card as="article" className="pt-4" itemScope itemType="http://schema.org/Video">
      <header>
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-4 flex flex-row`}>
          <div className="order-2 flex items-center -mt-7">
            <Link href={video.url}>
              <a className="inline-block" itemProp="mainEntityOfPage" rel="bookmark">
                <SectionTitle size="medium" level={2} itemProp="headline">
                  {wisząceSpójniki(video.title)}
                </SectionTitle>
              </a>
            </Link>
          </div>
          {video.cover && (
            <div className="order-1 w-full max-w-[9rem] ml-6 mr-10 -mt-2 lg:-mt-6">
              <Link href={video.url}>
                <a tabIndex={-1} aria-hidden="true" target="_blank" className="block">
                  <ArticleCoverImage
                    cover={{
                      blurDataURL: video.cover.blurDataURL,
                      img: video.cover.img,
                      preload: true,
                    }}
                  />
                </a>
              </Link>
              <div className="flex -ml-6">
                <Link href={video.url}>
                  <a target="_blank">
                    <YouTubeLogo width="100" />
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="pb-12 px-7 text-gray-900 font-serif text-lg border-b-2 sm:px-8 lg:px-12">
        <p className="!indent-0 whitespace-pre-line">
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
