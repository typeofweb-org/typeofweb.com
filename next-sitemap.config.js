const origin = process.env.NEXT_PUBLIC_HOST || process.env.NEXT_PUBLIC_VERCEL_URL || 'typeofweb.com';
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const host = `${protocol}://${origin}`;

module.exports = {
  siteUrl: host,
  generateRobotsTxt: true,
  exclude: ['/admin'],
};
