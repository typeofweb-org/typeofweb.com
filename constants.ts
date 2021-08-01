export const origin = process.env.NEXT_PUBLIC_VERCEL_URL || ('typeofweb.com' as const);
export const protocol = process.env.NODE_ENV === 'production' ? 'https' : ('http' as const);
export const host = `${protocol}://${origin}` as const;
export const pageSize = 10 as const;
