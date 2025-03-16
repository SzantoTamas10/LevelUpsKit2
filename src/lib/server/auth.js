import { eq } from 'drizzle-orm';
import { createHash, randomBytes } from 'crypto';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateId() {
  return randomBytes(16).toString('base64url');
}

export function generateSessionToken() {
  return randomBytes(32).toString('base64url');
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return `${salt}:${hash}`;
}

export async function verifyPassword(password, hashedPassword) {
  const [salt, hash] = hashedPassword.split(':');
  const computedHash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return hash === computedHash;
}

export async function createUser({ fullName, username, email, password }) {
  const id = generateId();
  const passwordHash = await hashPassword(password);

  await db.insert(table.users).values({
    id,
    fullName,
    username,
    email,
    passwordHash
  });

  return { id };
}

export async function createSession(token, userId) {
  const id = generateId();
  const expiresAt = new Date(Date.now() + 30 * DAY_IN_MS);

  await db.insert(table.sessions).values({
    id,
    userId,
    token,
    expiresAt
  });

  return { id, userId, expiresAt };
}

export async function validateSessionToken(token) {
  if (!token) return { session: null, user: null };

  const session = await db.query.sessions.findFirst({
    where: eq(table.sessions.token, token),
    with: {
      user: true
    }
  });

  if (!session || session.expiresAt <= new Date()) {
    return { session: null, user: null };
  }

  return { session, user: session.user };
}

export async function invalidateSession(sessionId) {
  await db.delete(table.sessions).where(eq(table.sessions.id, sessionId));
}

export function setSessionTokenCookie(event, token, expiresAt) {
  event.cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
}

export function deleteSessionTokenCookie(event) {
  event.cookies.delete(sessionCookieName, {
    path: '/'
  });
}
