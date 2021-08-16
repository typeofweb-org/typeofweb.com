// @ts-expect-error
import Cloudinary from 'netlify-cms-media-library-cloudinary';
import { useEffect, useState, useRef } from 'react';

import type { PreviewTemplateComponentProps } from 'netlify-cms-core';

export function AdminNetlify() {
  const deps = useRef<{
    readonly GithubSlugger: typeof import('github-slugger');
    readonly CMS: typeof import('netlify-cms-app').default;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GithubSlugger = import(/* webpackChunkName: "GithubSlugger" */ 'github-slugger');
    const Katex = import(/* webpackChunkName: "Katex" */ 'katex/dist/contrib/auto-render');
    const CMS = import(/* webpackChunkName: "CMS" */ 'netlify-cms-app');

    void Promise.all([GithubSlugger, Katex, CMS]).then(([GithubSlugger, Katex, CMS]) => {
      deps.current = { GithubSlugger: GithubSlugger.default, CMS: CMS.default };
      // @ts-expect-error
      window.Katex = Katex.default;
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!deps.current || isLoading) {
      return;
    }
    const { GithubSlugger, CMS } = deps.current;
    CMS.registerMediaLibrary(Cloudinary);
    CMS.registerPreviewTemplate('legacy_posts', PreviewComponent);
    CMS.registerPreviewTemplate('posts', PreviewComponent);

    CMS.registerEventListener({
      name: 'preSave',
      handler: ({ entry }) => {
        const title = entry.getIn(['data', 'title']);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- ImmutableJS
        return entry.get('data').set('permalink', GithubSlugger.slug(title));
      },
    });

    CMS.init();
  }, [isLoading]);
  return (
    <div>
      <div id="nc-root" style={{ marginTop: '-4rem' }} />
    </div>
  );
}

function PreviewComponent({ collection, fields, widgetFor }: PreviewTemplateComponentProps) {
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('#preview-pane');
    if (!iframe || !iframe.contentDocument) {
      return;
    }

    const styles = document.querySelectorAll('style,link[rel="stylesheet"],script[src]');

    iframe.contentDocument.documentElement.className += ' fonts-loaded';
    iframe.contentDocument.body.style.backgroundColor = 'white';
    styles.forEach((s) => iframe.contentDocument?.body?.appendChild(s.cloneNode(true)));

    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- ok
    Katex(iframe.contentDocument.body, { strict: false });
  }, []);

  if (!collection || !fields) {
    return null;
  }

  const isVisible = (
    f: undefined | import('immutable').Map<string, unknown>,
  ): f is import('immutable').Map<string, unknown> => f?.get('widget') !== 'hidden';

  return (
    <div style={{ paddingTop: '2rem' }}>
      {fields.filter(isVisible).map((field) => {
        return (
          <div
            key={field?.get('name')}
            className={['body', 'title'].includes(field?.get('name')) ? 'prose prose-xl' : ''}
          >
            {widgetFor(field?.get('name'))}
          </div>
        );
      })}
    </div>
  );
}
