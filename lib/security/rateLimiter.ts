/**
 * High-performance In-Memory Rate Limiter for Next.js API Routes & Edge Runtime.
 * Protects endpoints from Brute-force and credential stuffing attacks.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Periodic cleanup of expired records every 10 minutes to prevent memory leaks
let lastCleanup = Date.now();
function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup > 10 * 60 * 1000) {
    lastCleanup = now;
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Check if a given key has exceeded the rate limit
 * @param key Unique key (e.g., `login:${clientIp}`)
 * @param limit Maximum allowed attempts within window
 * @param windowMs Time window in milliseconds (default: 5 minutes)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 5 * 60 * 1000
): RateLimitResult {
  cleanupExpired();
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    return {
      allowed: true,
      limit,
      remaining: limit,
      retryAfterSeconds: 0,
    };
  }

  const remaining = Math.max(0, limit - record.count);
  const allowed = record.count < limit;
  const retryAfterSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    allowed,
    limit,
    remaining,
    retryAfterSeconds,
  };
}

/**
 * Record a failed attempt against the rate limit
 */
export function recordRateLimitAttempt(
  key: string,
  windowMs: number = 5 * 60 * 1000
): void {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
  } else {
    record.count += 1;
  }
}

/**
 * Reset rate limit on successful authentication or action
 */
export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}

/**
 * Helper to extract client IP address from standard headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
