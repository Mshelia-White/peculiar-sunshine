import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "ps_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// The password lives only in Vercel's environment variables (ADMIN_PASSWORD).
export function adminPasswordIsSet() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 8);
}

function sessionToken() {
  return createHash("sha256").update(`peculiar-admin:${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(candidate: string) {
  if (!adminPasswordIsSet()) return false;
  return safeEqual(candidate, process.env.ADMIN_PASSWORD as string);
}

export function newSessionValue() {
  return sessionToken();
}

export function sessionIsValid(value: string | undefined) {
  if (!value || !adminPasswordIsSet()) return false;
  return safeEqual(value, sessionToken());
}
