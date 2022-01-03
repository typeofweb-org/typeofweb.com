declare interface Window {
  // eslint-disable-next-line functional/prefer-readonly-type -- it's mutable
  dataLayer: any[];

  readonly aa: import('react-instantsearch-core').InsightsClient;
}
