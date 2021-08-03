const withTM = require('next-transpile-modules')([
  'unified',
  'unist-util-visit',
  'unist-util-map',
  'bail',
  'is-plain-obj',
  'trough',
]);

const { withPlaiceholder } = require('@plaiceholder/next');

/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
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
  domains: ['typeofweb.com', 'secure.gravatar.com'],
  deviceSizes: [320, 640, 768, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 320],
};

config.rewrites = () => [
  { source: '/feed', destination: '/api/feed' },
  { source: '/feed.json', destination: '/api/feed.json' },
];

config.excludeDefaultMomentLocales = true;
config.experimental = config.experimental || {};
config.experimental.optimizeCss = true;
config.experimental.optimizeImages = true;

// config.reactStrictMode = true;

module.exports = config;
