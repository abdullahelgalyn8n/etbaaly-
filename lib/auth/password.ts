/**
 * Cryptographic Password Hashing and Verification
 * Powered by Web Crypto API (PBKDF2 with SHA-256)
 * Compatible with Node.js 18+, Edge Runtime, and Cloudflare Workers.
 */

const ITERATIONS = 100_000;
const KEY_LEN = 32; // 256 bits
const SALT_LEN = 16; // 128 bits

function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Constant-time equality comparison to prevent timing attacks
 */
function constantTimeEquals(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

/**
 * Hash a plain password with a cryptographically secure random salt using PBKDF2
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    passwordKey,
    KEY_LEN * 8
  );

  const saltHex = bufferToHex(salt);
  const hashHex = bufferToHex(derivedBits);

  return `pbkdf2:${ITERATIONS}:${saltHex}:${hashHex}`;
}

/**
 * Verify a plain password against a stored hash
 * Supports PBKDF2 hashes and legacy plain text fallback for transition safety.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!password || !storedHash) return false;

  // Modern PBKDF2 format: pbkdf2:iterations:saltHex:hashHex
  if (storedHash.startsWith("pbkdf2:")) {
    const parts = storedHash.split(":");
    if (parts.length !== 4) return false;

    const iterations = parseInt(parts[1], 10);
    const salt = hexToBuffer(parts[2]);
    const expectedHash = hexToBuffer(parts[3]);

    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt as any,
        iterations: iterations,
        hash: "SHA-256",
      },
      passwordKey,
      KEY_LEN * 8
    );

    return constantTimeEquals(new Uint8Array(derivedBits), expectedHash);
  }

  // Fallback for legacy plain text passwords (with constant-time comparison)
  const encoder = new TextEncoder();
  const a = encoder.encode(password);
  const b = encoder.encode(storedHash);
  return constantTimeEquals(a, b);
}

/**
 * Validate password strength against security best practices:
 * - Minimum 8 characters
 * - Contains at least one letter and at least one number
 */
export function validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: "كلمة المرور يجب ألا تقل عن 8 خانات كحد أدنى لحماية حسابك.",
    };
  }

  const hasLetter = /[a-zA-Z\u0600-\u06FF]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (!hasLetter || !hasDigit) {
    return {
      isValid: false,
      message: "كلمة المرور يجب أن تحتوي على حروف وأرقام معاً لتعزيز أمان الحساب.",
    };
  }

  return { isValid: true };
}
