import { createHash, randomBytes, randomUUID } from 'node:crypto';
import argon2 from 'argon2';
import { and, eq, gt, lt } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { config } from './config.js';
import { db } from './db.js';
import { sessions, users, type User } from './schema.js';

const SESSION_COOKIE = 'bananaboard_session';
const CSRF_COOKIE = 'bananaboard_csrf';
const sessionLifetimeMs = 30 * 24 * 60 * 60 * 1000;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

export async function hashPassword(password: string) {
  return argon2.hash(password, { type: argon2.argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 });
}

export async function verifyPassword(passwordHash: string, password: string) {
  return argon2.verify(passwordHash, password);
}

export function csrfToken(request: FastifyRequest, reply: FastifyReply) {
  const existing = request.cookies[CSRF_COOKIE];
  if (existing && /^[A-Za-z0-9_-]{32,}$/.test(existing)) return existing;
  const token = randomBytes(32).toString('base64url');
  reply.setCookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: config.isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(sessionLifetimeMs / 1000)
  });
  return token;
}

export function requestHasValidCsrf(request: FastifyRequest) {
  const token = request.headers['x-csrf-token'];
  const origin = request.headers.origin;
  if (typeof token !== 'string' || token !== request.cookies[CSRF_COOKIE]) return false;
  if (!origin) return true;

  // The configured origin remains the primary allowlist entry. Also accept the
  // origin Caddy forwarded for this request so a stale deployment environment
  // setting cannot reject the app's own same-origin form submissions.
  const host = request.headers.host;
  if (!host) return origin === config.appOrigin;
  try {
    const requestOrigin = new URL(`${request.protocol}://${host}`).origin;
    return origin === config.appOrigin || origin === requestOrigin;
  } catch {
    return false;
  }
}

export async function createSession(reply: FastifyReply, userId: string) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + sessionLifetimeMs);
  await db.insert(sessions).values({ id: randomUUID(), userId, tokenHash: hashToken(token), expiresAt, lastSeenAt: new Date() });
  reply.setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(sessionLifetimeMs / 1000)
  });
}

export function clearSession(reply: FastifyReply) {
  reply.clearCookie(SESSION_COOKIE, { httpOnly: true, secure: config.isProduction, sameSite: 'lax', path: '/' });
}

export async function currentUser(request: FastifyRequest): Promise<User | null> {
  const token = request.cookies[SESSION_COOKIE];
  if (!token) return null;
  const now = new Date();
  await db.delete(sessions).where(lt(sessions.expiresAt, now));
  const [row] = await db.select({ user: users, sessionId: sessions.id })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, hashToken(token)), gt(sessions.expiresAt, now)))
    .limit(1);
  if (!row) return null;
  void db.update(sessions).set({ lastSeenAt: now }).where(eq(sessions.id, row.sessionId));
  return row.user;
}

export async function destroyCurrentSession(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies[SESSION_COOKIE];
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
  clearSession(reply);
}
