/**
 * Cloudflare & Edge Cache Utility for Next.js / OpenNext
 * Handles Cache-Control headers and cache invalidation.
 */

export const CACHE_PROFILES = {
  // Public static/semi-static content: products, catalog, blog posts
  PUBLIC_READ: {
    'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'max-age=600',
    'Cloudflare-CDN-Cache-Control': 'max-age=600',
  },
  // Long-lived assets or rarely changed items (e.g., config templates, constants)
  IMMUTABLE_READ: {
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=604800',
    'CDN-Cache-Control': 'max-age=3600',
    'Cloudflare-CDN-Cache-Control': 'max-age=3600',
  },
  // Dynamic or authenticated data that MUST NOT be cached on CDN
  NO_STORE: {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'CDN-Cache-Control': 'no-store',
    'Cloudflare-CDN-Cache-Control': 'no-store',
  },
};

/**
 * Purge specific URLs or tags from Cloudflare Cache via Cloudflare API.
 * Uses CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN if set in environment.
 */
export async function purgeCloudflareCache(urls: string[]) {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!zoneId || !apiToken || urls.length === 0) {
    return { skipped: true, reason: 'Missing credentials or empty URLs' };
  }

  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: urls }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (error) {
    console.error('Failed to purge Cloudflare cache:', error);
    return { success: false, error };
  }
}
