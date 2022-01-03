import { getPlaiceholder } from 'plaiceholder';

import { videoPageSize } from '../constants';

export async function getAllYouTubeVideos(): Promise<readonly YouTubePostResponse[]> {
  const playlist = await fetchPlaylist();

  if ('error' in playlist) {
    console.log(playlist.error.errors);
    return [];
  }

  return playlist.items.map((item) => {
    return {
      title: item.snippet.title ?? '',
      description: item.snippet.description ?? '',
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- DateISOString
      date: item.snippet.publishedAt as DateISOString,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      thumbnail: item.snippet.thumbnails.maxres || item.snippet.thumbnails.high || item.snippet.thumbnails.default,
    };
  });
}

export async function getYouTubeVideosFor({ page }: { readonly page: number }): Promise<readonly YouTubePost[]> {
  const videos = await getAllYouTubeVideos();
  const startIndex = (page - 1) * videoPageSize;
  const endIndex = startIndex + videoPageSize;
  return Promise.all(
    videos.slice(startIndex, endIndex).map(async (video) => {
      const { base64: blurDataURL = null, img = null } = video.thumbnail
        ? await getPlaiceholder(video.thumbnail.url)
        : {};

      return {
        ...video,
        description: video.description.split(/Linki|00:00|---/i)[0].trim(),
        cover: img ? { img: { ...img, src: img.src }, blurDataURL } : null,
      };
    }),
  );
}

type DateISOString = string & { readonly __tag: 'DateISOString' };

export interface YouTubePost {
  readonly title: string;
  readonly description: string;
  readonly date: DateISOString;
  readonly cover: {
    readonly img: { readonly height: number; readonly width: number; readonly src: string };
    readonly blurDataURL: string | null;
  } | null;
  readonly url: string;
}

interface YouTubePostResponse {
  readonly title: string;
  readonly description: string;
  readonly date: DateISOString;
  readonly thumbnail:
    | {
        readonly url: string;
        readonly width?: number | undefined | null;
        readonly height?: number | undefined | null;
      }
    | null
    | undefined;
  readonly url: string;
}

async function fetchPlaylist(): Promise<PlaylistItemListResponse | YouTubeErrorResponse> {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

interface YouTubeErrorResponse {
  readonly error: {
    readonly code: number;
    readonly message: string;
    readonly errors: readonly {
      readonly message: string;
      readonly domain: string;
      readonly reason: string;
    }[];
    readonly status: string;
  };
}

interface PlaylistItemListResponse {
  readonly etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  readonly eventId?: string | null;
  /**
   * A list of playlist items that match the request criteria.
   */
  readonly items: readonly PlaylistItem[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItemListResponse". Etag of this resource.
   */
  readonly kind?: string | null;
  /**
   * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
   */
  readonly nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  readonly pageInfo: PageInfo;
}

interface PageInfo {
  /**
   * The number of results included in the API response.
   */
  readonly resultsPerPage?: number | null;
  /**
   * The total number of results in the result set.
   */
  readonly totalResults?: number | null;
}

interface PlaylistItem {
  /**
   * Etag of this resource.
   */
  readonly etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the playlist item.
   */
  readonly id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem".
   */
  readonly kind?: string | null;
  /**
   * The snippet object contains basic details about the playlist item, such as its title and position in the playlist.
   */
  readonly snippet: PlaylistItemSnippet;
}

interface PlaylistItemSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the user that added the item to the playlist.
   */
  readonly channelId?: string | null;
  /**
   * Channel title for the channel that the playlist item belongs to.
   */
  readonly channelTitle?: string | null;
  /**
   * The item's description.
   */
  readonly description?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.
   */
  readonly playlistId?: string | null;
  /**
   * The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.
   */
  readonly position?: number | null;
  /**
   * The date and time that the item was added to the playlist.
   */
  readonly publishedAt: string | null;
  /**
   * The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item.
   */
  readonly resourceId: ResourceId;
  /**
   * A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  readonly thumbnails: ThumbnailDetails;
  /**
   * The item's title.
   */
  readonly title?: string | null;
  /**
   * Channel id for the channel this video belongs to.
   */
  readonly videoOwnerChannelId?: string | null;
  /**
   * Channel title for the channel this video belongs to.
   */
  readonly videoOwnerChannelTitle?: string | null;
}

interface ResourceId {
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel.
   */
  readonly channelId?: string | null;
  /**
   * The type of the API resource.
   */
  readonly kind?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist.
   */
  readonly playlistId?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video.
   */
  readonly videoId: string;
}

interface ThumbnailDetails {
  /**
   * The default image for this resource.
   */
  readonly default?: Thumbnail;
  /**
   * The high quality image for this resource.
   */
  readonly high?: Thumbnail;
  /**
   * The maximum resolution quality image for this resource.
   */
  readonly maxres?: Thumbnail;
  /**
   * The medium quality image for this resource.
   */
  readonly medium?: Thumbnail;
  /**
   * The standard quality image for this resource.
   */
  readonly standard?: Thumbnail;
}

interface Thumbnail {
  /**
   * (Optional) Height of the thumbnail image.
   */
  readonly height?: number | null;
  /**
   * The thumbnail image's URL.
   */
  readonly url: string;
  /**
   * (Optional) Width of the thumbnail image.
   */
  readonly width?: number | null;
}
