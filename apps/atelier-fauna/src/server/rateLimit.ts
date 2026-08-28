/**
 * In-memory fixed-window rate limiter. Enough to stop a single client
 * hammering the public inquiry endpoints; it resets on deploy and does
 * not coordinate across instances. Swap for a shared store (Redis, or
 * the platform's own limiter) before running more than one instance —
 * see docs/BACKEND.md.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

// Bound memory growth: drop expired entries periodically rather than
// letting the map accumulate one key per IP forever.
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key);
    }
  }, WINDOW_MS);
  timer.unref?.();
}
