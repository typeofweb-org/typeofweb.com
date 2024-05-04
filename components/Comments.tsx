import { Giscus } from '@giscus/react';

import { host } from '../constants';

import type { Theme } from '@giscus/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- assertion required for localhost
const theme = `${host}/custom-comments-theme.css` as unknown as Theme;

export const Comments = ({ postTitle }: { readonly postTitle: string }) => {
  return (
    <div className="mt-5 px-3 bg-gray-100 sm:mt-10 sm:px-8 lg:px-12" id="comments">
      <Giscus
        repo="typeofweb-org/typeofweb.com"
        repoId="MDEwOlJlcG9zaXRvcnkzODkwOTc4NjI="
        category="Komentarze"
        categoryId="DIC_kwDOFzEphs4B-pdu"
        mapping="specific"
        term={postTitle}
        reactionsEnabled="1"
        emitMetadata="0"
        theme={theme}
      />
    </div>
  );
};
