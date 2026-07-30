export const TV_DURATION_STORAGE_KEY = 'sesc_tv_duration_ms';
export const TV_DURATION_DEFAULT_MS = 7000;
export const TV_DURATION_MIN_SECONDS = 3;
export const TV_DURATION_MAX_SECONDS = 60;
export const TV_POLL_INTERVAL_MS = 15000;

export function getTvDurationMs(): number {
  if (typeof window === 'undefined') {
    return TV_DURATION_DEFAULT_MS;
  }

  const stored = window.localStorage.getItem(TV_DURATION_STORAGE_KEY);
  if (!stored) {
    return TV_DURATION_DEFAULT_MS;
  }

  const parsed = Number(stored);
  if (!Number.isFinite(parsed) || parsed < TV_DURATION_MIN_SECONDS * 1000) {
    return TV_DURATION_DEFAULT_MS;
  }

  const maxMs = TV_DURATION_MAX_SECONDS * 1000;
  return Math.min(parsed, maxMs);
}

export function setTvDurationSeconds(seconds: number): void {
  const clamped = Math.min(
    Math.max(seconds, TV_DURATION_MIN_SECONDS),
    TV_DURATION_MAX_SECONDS,
  );
  window.localStorage.setItem(TV_DURATION_STORAGE_KEY, String(clamped * 1000));
}
