/**
 * Input Sanitization and XSS Prevention Utility
 * Cleans string inputs against malicious script tags, event handlers, and injections.
 */

/**
 * Strips dangerous HTML tags and XSS injection vectors from user string inputs
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:\s*/gi, "")
    .trim();
}

/**
 * Validates and normalizes email addresses
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== "string") return "";
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned : "";
}

/**
 * Validates and normalizes phone numbers
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== "string") return "";
  return phone.replace(/[^\d+]/g, "").trim();
}

/**
 * Validates and normalizes username
 */
export function sanitizeUsername(username: unknown): string {
  if (typeof username !== "string") return "";
  return username.trim().toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");
}
