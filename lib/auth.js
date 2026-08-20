import crypto from "node:crypto";

const SECRET = process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 дни

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = MAX_AGE_SECONDS;

export function createSessionToken() {
  const payloadB64 = Buffer.from(JSON.stringify({ iat: Date.now() })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes(".")) return false;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;

  const expectedSig = crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (!payload.iat || Date.now() - payload.iat > MAX_AGE_SECONDS * 1000) return false;
    return true;
  } catch {
    return false;
  }
}
