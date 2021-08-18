/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare interface Window {
  // eslint-disable-next-line functional/prefer-readonly-type -- it's mutable
  dataLayer: any[];
}
