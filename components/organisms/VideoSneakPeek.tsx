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
        <div className={`px-7 sm:px-8 lg:px-12 bg-gray-100 pb-9 flex flex-row items-start sm:items-center`}>
          <div className="order-2 flex items-center mt-1.5 sm:mt-0 relative">
            <a
              href={video.url}
              target="_blank"
              className="inline-block"
              itemProp="mainEntityOfPage"
              rel="bookmark noreferrer"
            >
              <SectionTitle size="medium" level={2} itemProp="headline">
                {wisząceSpójniki(video.title)}
              </SectionTitle>
            </a>
          </div>
          {video.cover && (
            <div className="order-1 w-full max-w-[9rem]m min-w-[4rem] ml-6 mr-10 -mt-2 lg:-mt-6 relative">
              <a href={video.url} target="_blank" tabIndex={-1} aria-hidden="true" className="block" rel="noreferrer">
                <ArticleCoverImage
                  cover={{
                    blurDataURL: video.cover.blurDataURL,
                    img: video.cover.img,
                    preload: true,
                  }}
                />
              </a>
              <div className="flex -ml-6 absolute left-0">
                <a href={video.url} target="_blank" rel="noreferrer">
                  <YouTubeLogo className="h-5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="pb-12 px-7 text-gray-900 font-serif text-lg border-b-2 sm:px-8 lg:px-12">
        <p className="!indent-0 whitespace-pre-line">
          {video.description}{' '}
          <span className="ml-2">
            <LinkUnderlineEffect>
              <a href={video.url} target="_blank" className="text-blue-500 font-bold tracking-wider" rel="noreferrer">
                Obejrzyj na YouTube <span className="sr-only">filmik {video.title}</span>…
              </a>
            </LinkUnderlineEffect>
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
