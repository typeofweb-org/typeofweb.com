const withPreact = require('next-plugin-preact');
const withTM = require('next-transpile-modules')([
  'unified',
  'unist-util-visit',
  'unist-util-map',
  'bail',
  'is-plain-obj',
  'trough',
]);
const { withPlaiceholder } = require('@plaiceholder/next');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type import('next/dist/next-server/server/config-shared').NextConfig
 */
const config = withPreact(
  withBundleAnalyzer(
    withPlaiceholder(
      withTM({
        webpack(config, { isServer }) {
          config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|ts)x?$/,
            use: ['@svgr/webpack'],
          });

          return config;
        },
      }),
    ),
  ),
);

config.images = {
  domains: ['typeofweb.com', 'secure.gravatar.com'],
  deviceSizes: [320, 640, 768, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 320],
};

config.excludeDefaultMomentLocales = true;
config.experimental = config.experimental || {};
// config.experimental.optimizeCss = true;
config.experimental.optimizeImages = true;
config.experimental.scrollRestoration = true;
config.reactStrictMode = true;

config.rewrites = () => {
  return Promise.resolve([{ source: '/feed', destination: '/feed.xml' }]);
};

module.exports = config;
