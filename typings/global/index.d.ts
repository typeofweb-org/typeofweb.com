declare interface Window {
  // eslint-disable-next-line functional/prefer-readonly-type -- it's mutable
  dataLayer: any[];
}

// eslint-disable-next-line no-var -- needed for a global var
declare var getCommentsCountCache: Record<string, number>;
