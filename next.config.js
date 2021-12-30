const withTM = require('next-transpile-modules')([
  'unified',
  'unist-util-visit',
  'unist-util-map',
  'bail',
  'is-plain-obj',
  'trough',
  'd3-shape',
]);
const { withSentryConfig } = require('@sentry/nextjs');
const { withPlaiceholder } = require('@plaiceholder/next');

const withBundleAnalyzer = (
  ({ enabled = true } = {}) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (enabled && !options.isServer) {
          const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: './analyze/client.html',
              excludeAssets: /polyfills-.*\.js/,
              defaultSizes: 'gzip',
            }),
          );
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }
        return config;
      },
    });
  }
)({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type import('next/dist/server/config-shared').NextConfig
 */
const config = withBundleAnalyzer(
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
);

config.images = {
  domains: ['v2.typeofweb.com', 'typeofweb.com', 'secure.gravatar.com', 'res.cloudinary.com', 'i.ytimg.com'],
  deviceSizes: [320, 768, 1024, 1280, 1536],
  imageSizes: [640, 1280, 1536],
  formats: ['image/avif', 'image/webp'],
};

config.excludeDefaultMomentLocales = true;
config.experimental = config.experimental || {};
config.optimizeFonts = true;
config.webpack5 = true;
config.httpAgentOptions = { keepAlive: true };
config.reactStrictMode = true;
config.compress = true;
config.productionBrowserSourceMaps = true;
config.generateEtags = true;
config.poweredByHeader = false;
config.esmExternals = true;
config.swcMinify = true;
config.urlImports = ['https://cdn.skypack.dev'];

// config.experimental.optimizeCss = true;
config.experimental.optimizeImages = true;
config.experimental.workerThreads = true;
config.experimental.scrollRestoration = true;
config.experimental.gzipSize = true;
// config.experimental.concurrentFeatures = true;

// @todo https://github.com/getsentry/sentry-javascript/issues/4103
config.outputFileTracing = false;

const origin = process.env.NEXT_PUBLIC_HOST || process.env.NEXT_PUBLIC_VERCEL_URL || 'typeofweb.com';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const host = `${protocol}://${origin}`;

config.headers = () => {
  return Promise.resolve([
    {
      source: '/(.*)',
      has: [
        {
          type: 'host',
          value: host,
        },
      ],
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: host,
        },
      ],
    },
    {
      source: '/(.*)',
      has: [
        {
          type: 'host',
          value: 'https://giscus.typeofweb.com',
        },
      ],
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://giscus.typeofweb.com',
        },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Expect-CT',
          value: `max-age=0, report-uri="https://typeofweb.report-uri.com/r/d/ct/reportOnly"`,
        },
      ],
    },
  ]);
};

config.rewrites = () => {
  return Promise.resolve([
    { source: '/feed', destination: '/feed.xml' },
    { source: '/config.yml', destination: '/api/admin-config.yml' },
    {
      source: '/wp-content/uploads/:slug(.+)',
      destination: '/assets/wp-content/uploads/:slug',
    },
    {
      source: '/content/images/:slug(.+)',
      destination: '/assets/content/images/:slug',
    },
    {
      source: '/js/script.js',
      destination: 'https://plausible.io/js/plausible.outbound-links.js',
    },
    {
      source: '/api/event',
      destination: 'https://plausible.io/api/event',
    },
  ]);
};

config.redirects = () => {
  return Promise.resolve(require('./redirects.js').map((r) => ({ ...r, permanent: false })));
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(config, SentryWebpackPluginOptions);
