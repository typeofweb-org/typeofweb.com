const withTM = require('next-transpile-modules')([
  'unified',
  'unist-util-visit',
  'unist-util-map',
  'bail',
  'is-plain-obj',
  'trough',
]);
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
  loader: 'custom',
  domains: ['v2.typeofweb.com', 'typeofweb.com', 'secure.gravatar.com', 'res.cloudinary.com'],
  deviceSizes: [320, 375, 640, 750, 768, 1024, 1280, 1920],
  imageSizes: [320, 640, 768, 1200, 1536],
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

// config.experimental.optimizeCss = true;
config.experimental.optimizeImages = true;
config.experimental.workerThreads = true;
config.experimental.scrollRestoration = true;
config.experimental.esmExternals = true;
config.experimental.gzipSize = true;
// config.experimental.swcMinify = true;
// config.experimental.swcLoader = true;
// config.experimental.concurrentFeatures = true;

// const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const protocol = 'http';

config.headers = () => {
  return Promise.resolve([
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.NEXT_PUBLIC_HOST || process.env.NEXT_PUBLIC_VERCEL_URL || 'typeofweb.com',
        },
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
        {
          key: 'Content-Security-Policy-Report-Only',
          value: `default-src ${protocol}:; script-src 'self'; script-src-elem 'self' https://www.googletagmanager.com https://cdn.jsdelivr.net 'sha256-febGD3VexJiz6Ye35RFjJ2rvmFwIiJG7n7fwggQoZNI=' 'sha256-ozu8nOUjjKvdqbZExe7VXe1CBhjTzC6jkpjsx+iwDk8=' 'sha256-pphEDUJ47PnT23iMFBEWLh7QnVVib7Al7ZagHbkQix4='; style-src 'self' 'unsafe-inline'; img-src 'self' data: ${protocol}:; report-uri https://typeofweb.report-uri.com/r/d/csp/reportOnly`,
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
      destination: 'https://res.cloudinary.com/type-of-web/wp-content/uploads/:slug',
    },
    {
      source: '/content/images/:slug(.+)',
      destination: 'https://res.cloudinary.com/type-of-web/content/images/:slug',
    },
  ]);
};

config.redirects = () => {
  return Promise.resolve(require('./redirects.js').map((r) => ({ ...r, permanent: false })));
};

module.exports = config;
