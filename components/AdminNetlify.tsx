// // @ts-expect-error
// import Cloudinary from 'netlify-cms-media-library-cloudinary';
import { useEffect, useState, useRef, useCallback } from 'react';

import { DELIMITER } from '../constants';

import Style from './adminNetlify.module.scss';

import type { PreviewTemplateComponentProps } from 'netlify-cms-core';
import type { RefCallback } from 'react';

export function AdminNetlify() {
  const deps = useRef<{
    readonly Slugify: typeof import('slugify');
    readonly CMS: typeof import('netlify-cms-app').default;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Slugify = import(/* webpackChunkName: "Slugify" */ 'slugify');
    const Katex = import(/* webpackChunkName: "Katex" */ 'katex/dist/contrib/auto-render');
    const CMS = import(/* webpackChunkName: "CMS" */ 'netlify-cms-app');

    void Promise.all([Slugify, Katex, CMS]).then(([Slugify, Katex, CMS]) => {
      deps.current = { Slugify, CMS: CMS.default };
      // @ts-expect-error
      window.Katex = Katex.default;
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!deps.current || isLoading) {
      return;
    }
    const { Slugify, CMS } = deps.current;

    // CMS.registerMediaLibrary(Cloudinary);
    CMS.registerPreviewTemplate('legacy_posts', PreviewComponent);
    CMS.registerPreviewTemplate('posts', PreviewComponent);
    CMS.registerPreviewTemplate('pages', PreviewComponent);
    CMS.registerPreviewTemplate('authors', HidePreview);

    CMS.registerEventListener({
      name: 'preSave',
      handler: ({ entry }) => {
        const collectionsWithPermalink = ['posts', 'pages', 'legacy_posts'];
        const collection = entry.get('collection');
        if (collectionsWithPermalink.includes(collection)) {
          const title = entry.getIn(['data', 'title']);
          return entry
            .setIn(['data', 'permalink'], Slugify.default(title, { lower: true, trim: true, locale: 'pl' }))
            .get('data');
        }
        if (collection === 'settings' && entry.get('slug') === 'authors') {
          /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- kill me */
          return entry
            .updateIn(['data', 'authors'], (value: any) =>
              value.map((v: any) =>
                v.set(
                  'displayName',
                  [v.getIn(['meta', 'first_name'], ''), v.getIn(['meta', 'last_name'], '')].filter(Boolean).join(' '),
                ),
              ),
            )
            .get('data');
          /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
        }
      },
    });

    CMS.init();
  }, [isLoading]);

  const containerRef = useCallback<RefCallback<HTMLDivElement>>((el) => {
    if (!el) {
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      const l = mutationsList
        .flatMap((m) => Array.from(m.addedNodes))
        .filter((n): n is HTMLElement => n instanceof HTMLElement)
        .flatMap((el) => Array.from(el.querySelectorAll('[class*="CardsGrid"] [class*="ListCardTitle"]')));
      l.forEach((el) => {
        const textToParse = el.textContent;
        if (!textToParse) {
          return;
        }
        const parts = textToParse.split(DELIMITER);
        const row = parts
          .map(parsePart)
          .map((p) => `<span>${p}</span>`)
          .join('');
        el.innerHTML = parts.length === 1 ? `<div style="width: max-content;">${row}</div>` : row; // lgtm [js/xss-through-dom]
      });
    });

    observer.observe(el, { characterDataOldValue: true, childList: true, subtree: true });
  }, []);

  return (
    <div ref={containerRef}>
      <div id="nc-root" className={Style.ncRoot} />
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

function HidePreview() {
  useEffect(() => {
    const preview = document.querySelector('.Pane.vertical.Pane2');
    const hideBtn = document.querySelector<HTMLButtonElement>('[title="Toggle preview"]');
    if (preview && hideBtn) {
      hideBtn.click();
    }
  }, []);
  return null;
}

const DATE_PATTERN = /^"(\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ)"$/;
const IMG_PATTERN = /^(https?:\/\/.*?(?:jpg|jpeg|png))$/;

function parsePart(part: string): string {
  const p = part.trim();
  if (!p) {
    return '';
  }
  if (DATE_PATTERN.test(p)) {
    const [_, date] = DATE_PATTERN.exec(p) ?? [];
    if (date) {
      return new Date(date).toLocaleString('pl');
    }
  }
  if (IMG_PATTERN.test(p)) {
    const [src] = IMG_PATTERN.exec(p) ?? [];
    if (src) {
      return `<img class=${Style.coverThumb} src="${encodeURI(src)}" alt="" />`;
    }
  }
  try {
    const data = JSON.parse(p);
    if (Array.isArray(data)) {
      return data.join(', ');
    } else if (typeof data === 'object') {
      return JSON.stringify(data, null, 2);
    } else {
      return data;
    }
  } catch (err) {}
  return p;
}
