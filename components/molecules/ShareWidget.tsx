import FacebookIcon from '../../images/social/facebook.svg';
import LinkedinIcon from '../../images/social/linkedin.svg';
import TwitterIcon from '../../images/social/twitter.svg';

export const ShareWidget = () => {
  return (
    <div className="animate-delay-1000 fixed z-30 left-0 top-28 py-3 w-8 bg-gray-100 rounded-2xl rounded-bl-none rounded-tl-none shadow-md animate-appear lg:py-4 lg:w-11 xl:left-auto xl:py-4 xl:w-12 xl:rounded-3xl xl:-translate-x-full">
      <small
        lang="en_GB"
        className="block text-center text-gray-600 text-xs tracking-tighter -translate-y-1/4 uppercase lg:text-sm"
        aria-hidden
      >
        Share
      </small>
      <ul className="flex flex-col gap-6 pl-1 pr-1.5 text-pink-500 lg:pl-2 lg:pr-3 xl:pl-3 xl:pr-3">
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            className="block w-full hover:text-green-500 transition-colors"
            title="Udostępnij na Facebooku"
            aria-label="Udostępnij na Facebooku"
          >
            <FacebookIcon className="fill-current" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
              document.title,
            )}&hashtags=typeofweb`}
            className="block w-full hover:text-green-500 transition-colors"
            title="Udostępnij na Twitterze"
            aria-label="Udostępnij na Twitterze"
          >
            <TwitterIcon className="fill-current" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
            className="block w-full hover:text-green-500 transition-colors"
            title="Udostępnij na Linkedinie"
            aria-label="Udostępnij na Linkedinie"
          >
            <LinkedinIcon className="fill-current" />
          </a>
        </li>
      </ul>
    </div>
  );
};
