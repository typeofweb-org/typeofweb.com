import * as Fetch from 'node-fetch';
const fetch = Fetch.default;

interface CommentsCountCacheRow {
  readonly title: string;
  readonly updated_at: string;
  readonly count: number;
}

export async function getCachedCommentsCount(title: string): Promise<number> {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return 0;
  }

  const params = new URLSearchParams({
    select: '*',
    title: `eq.${title}`,
  });
  const url = `${SUPABASE_URL}/rest/v1/comments_count_cache?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/vnd.pgrst.object+json',
      Range: '0',
    },
  });

  if (!response.ok) {
    return 0;
  }

  const { count } = (await response.json()) as CommentsCountCacheRow;

  return count;
}

export async function setCachedCommentsCount(title: string, count: number) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return;
  }

  const params = new URLSearchParams({
    title: `eq.${title}`,
  });
  const url = `${SUPABASE_URL}/rest/v1/comments_count_cache?${params.toString()}`;

  const body: CommentsCountCacheRow = {
    title,
    count,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/vnd.pgrst.object+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}
