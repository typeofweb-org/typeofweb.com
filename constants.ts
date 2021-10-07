export const origin = process.env.NEXT_PUBLIC_HOST || process.env.NEXT_PUBLIC_VERCEL_URL || ('typeofweb.com' as const);
export const protocol = process.env.NODE_ENV === 'production' ? 'http' : 'http';
export const host = `${protocol}://${origin}` as const;
export const pageSize = 10 as const;

export const siteName = `Type of Web`;
export const shortDescription = `Blog o programowaniu`;
export const defaultDescription = `Blog o programowaniu. Dla front-end i back-end developerów. Trochę o urokach pracy zdalnej, ale przede wszystkim o: JavaScript, React, Vue, Angular, node.js, TypeScript, HapiJS…`;

export const defaultCover = {
  img: {
    width: 1200,
    height: 628,
    src: `${host}/typeofweb-facebook-image-sharer.png`,
  },
};

export const DELIMITER = ' │ ';
