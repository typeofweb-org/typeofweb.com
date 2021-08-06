/* eslint-disable functional/no-this-expression -- it's a class */
/* eslint-disable functional/prefer-readonly-type -- it's a class */
export const useBodyFix = () => {
  return fixBodyService;
};

class FixBodyService {
  private windowOffsetY: number = 0;
  private scrollbarWidth: number = 0;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    requestAnimationFrame(() => this.setScrollbarWidth());
  }

  fixBody() {
    if (typeof window === 'undefined') {
      return;
    }

    this.windowOffsetY = window.pageYOffset;
    document.body.classList.add('not-scrollable');
    document.body.style.top = `-${this.windowOffsetY}px`;
    document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    document.body.style.marginLeft = `-${this.scrollbarWidth / 2}px`;
    const menu = document.querySelector<HTMLDivElement>('#main-menu-button');
    if (menu) {
      menu.style.marginRight = `${this.scrollbarWidth}px`;
    }
  }

  unfixBody() {
    if (typeof window === 'undefined') {
      return;
    }

    document.body.classList.remove('not-scrollable');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    document.body.style.marginLeft = '';
    const menu = document.querySelector<HTMLDivElement>('#main-menu-button');
    if (menu) {
      menu.style.marginRight = '';
    }

    requestAnimationFrame(() => window.scrollTo(0, this.windowOffsetY));
  }

  private setScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    // outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);
    requestAnimationFrame(() => {
      const widthNoScroll = outer.offsetWidth;
      // force scrollbars
      outer.style.overflow = 'scroll';

      // add innerdiv
      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      const widthWithScroll = inner.offsetWidth;

      // remove divs
      outer.parentNode?.removeChild(outer);

      this.scrollbarWidth = widthNoScroll - widthWithScroll;
    });
  }
}
const fixBodyService = new FixBodyService();
