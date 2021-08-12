import FacebookIcon from '../../images/social/facebook.svg';
import LinkedinIcon from '../../images/social/linkedin.svg';
import TwitterIcon from '../../images/social/twitter.svg';

export const ShareWidget = () => {
  return (
    <ul className="fixed z-30 flex flex-col gap-8 px-3 py-4 w-12 text-pink-500 bg-gray-100 rounded-full shadow-md 2xl:-translate-x-24 animate-appear sm:hidden md:flex md:-translate-x-8 lg:px-4 lg:py-8 lg:w-16 lg:-translate-x-6 xl:-translate-x-20">
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
  );
};
