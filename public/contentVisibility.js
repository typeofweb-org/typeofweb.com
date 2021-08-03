// @ts-check
// https://web.dev/content-visibility/
// https://infrequently.org/2020/12/resize-resilient-deferred-rendering/

if (typeof window !== 'undefined') {
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} fuzz
   */
  const eqIsh = (a, b, fuzz = 2) => Math.abs(a - b) <= fuzz;

  /**
   * @param {DOMRectReadOnly} a
   * @param {DOMRectReadOnly} b
   */
  const rectNotEQ = (a, b) => !eqIsh(a.width, b.width) || !eqIsh(a.height, b.height);

  // Keep a map of elements and the dimensions of
  // their place-holders, re-setting the element's
  // intrinsic size when we get updated measurements
  // from observers.
  const spaced = new WeakMap();

  /**
   * @param {HTMLElement} el
   * @param {DOMRectReadOnly} rect
   * @description Only call this when known cheap, post layout
   */
  const reserveSpace = (el, rect = el.getBoundingClientRect()) => {
    const old = spaced.get(el);
    // Set intrinsic size to prevent jumping on un-painting:
    //    https://drafts.csswg.org/css-sizing-4/#intrinsic-size-override
    if (!old || rectNotEQ(old, rect)) {
      spaced.set(el, rect);
      el.attributeStyleMap.set('contain-intrinsic-size', `${rect.width}px ${rect.height}px`);
    }
  };

  const iObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // We don't care if the element is intersecting or
        // has been laid out as our page structure ensures
        // they'll get the right width.
        /**
         * @type any // HTMLElement
         */
        const target = entry.target;
        reserveSpace(target, entry.boundingClientRect);
      });
    },
    { rootMargin: '500px 0px 500px 0px' },
  );

  const rObs = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      /**
       * @type any // HTMLElement
       */
      const target = entry.target;
      reserveSpace(target, entry.contentRect);
    });
  });

  /**
   * @type NodeListOf<HTMLElement>
   */
  const articles = document.querySelectorAll('main > article');

  articles.forEach((el) => {
    iObs.observe(el);
    rObs.observe(el);
  });

  // Workaround for Chrome bug, part 2.
  //
  // Re-enable browser management of rendering for the
  // first article after the first paint. Double-rAF
  // to ensure we get called after a layout.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (articles[0]) {
        articles[0].attributeStyleMap.set('content-visibility', 'auto');
      }
    });
  });
}
