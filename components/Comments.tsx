import { Giscus } from '@giscus/react';

import { host } from '../constants';

import type { Theme } from '@giscus/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- assertion required for localhost
const theme = `${host}/custom-comments-theme.css` as Theme;

export const Comments = () => {
  return (
    <div className="px-7 bg-gray-100 sm:px-8 lg:px-12" id="comments">
      <h3 className="mb-4 text-xl font-bold">Komentarze</h3>
      <div className="-mt-10">
        <Giscus
          repo="typeofweb/typeofweb.com"
          repoId="MDEwOlJlcG9zaXRvcnkzODkwOTc4NjI="
          category="General"
          categoryId="DIC_kwDOFzEphs4B-pdu"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          theme={theme}
        />
      </div>
    </div>
  );
};
