const withTM = require('next-transpile-modules')([
  'unified',
  'unist-util-visit',
  'unist-util-map',
  'bail',
  'is-plain-obj',
  'trough',
]);

const { withPlaiceholder } = require('@plaiceholder/next');

const config = withPlaiceholder(
  withTM({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.(js|ts)x?$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
  }),
);

config.images = {
  domains: ['typeofweb.com'],
};

module.exports = config;
