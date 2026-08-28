import { createWriteStream } from 'node:fs';
import { access, mkdir, rename, stat, unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import staticFiles from '@fastify/static';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { clearSession, createSession, csrfToken, currentUser, destroyCurrentSession, hashPassword, normalizeEmail, requestHasValidCsrf, verifyPassword } from './auth.js';
import { config } from './config.js';
import { closeDatabase, db, sql } from './db.js';
import { applyMigrations } from './migrate.js';
import { attachments, users, type User } from './schema.js';
import { createWorkspace, loadWorkspace, saveWorkspace } from './workspace.js';

const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));
const sessionUser = async (request: FastifyRequest, reply: FastifyReply): Promise<User | null> => {
  const user = await currentUser(request);
  if (!user) reply.code(401).send({ error: 'Please sign in to continue.' });
  return user;
};

const registrationSchema = z.object({
  email: z.string().trim().email().max(320),
  displayName: z.string().trim().min(1, 'Display name is required.').max(40),
  password: z.string().min(12, 'Use at least 12 characters for your password.').max(256)
});
const loginSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(256)
});
const accountSchema = z.object({
  displayName: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(320),
  currentPassword: z.string().max(256).optional().default(''),
  newPassword: z.string().max(256).optional().default('')
});
const workspaceSchema = z.object({ data: z.record(z.string(), z.unknown()) });

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']);
const maxUploadBytes = 8 * 1024 * 1024;

function noStore(reply: FastifyReply) {
  reply.header('Cache-Control', 'no-store');
}

function rejectCsrf(request: FastifyRequest, reply: FastifyReply) {
  if (!requestHasValidCsrf(request)) {
    reply.code(403).send({ error: 'Your session check failed. Refresh the page and try again.' });
    return true;
  }
  return false;
}

async function removeFileSilently(filePath: string) {
  await unlink(filePath).catch(() => undefined);
}

export function buildServer() {
  const app = Fastify({ logger: true, trustProxy: config.isProduction, bodyLimit: 25 * 1024 * 1024 });

  app.register(cookie);
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'blob:'],
        fontSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
        // Helmet enables this directive by default. It is right for the HTTPS
        // deployment, but it upgrades every local asset request to HTTPS.
        // Our direct development server deliberately runs over HTTP.
        upgradeInsecureRequests: config.isProduction ? [] : null
      }
    },
    strictTransportSecurity: config.isProduction ? {} : false,
    crossOriginEmbedderPolicy: false
  });
  app.register(rateLimit, { global: false });
  app.register(multipart, { limits: { files: 1, fileSize: maxUploadBytes, fields: 5 } });
  app.register(staticFiles, { root: publicDirectory, prefix: '/static/', index: false, cacheControl: true, maxAge: 0 });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    if ((error as { code?: string }).code === '23505') return reply.code(409).send({ error: 'That email address is already registered.' });
    if ((error as { code?: string }).code === 'FST_REQ_FILE_TOO_LARGE') return reply.code(413).send({ error: 'Images must be 8 MB or smaller.' });
    return reply.code(500).send({ error: 'Something went wrong. Please try again.' });
  });

  app.get('/healthz', async (_request, reply) => {
    await sql`SELECT 1`;
    reply.send({ status: 'ok' });
  });

  app.get('/', async (request, reply) => {
    const user = await currentUser(request);
    if (!user) return reply.redirect('/auth');
    noStore(reply);
    return reply.sendFile('index.html', { cacheControl: false });
  });

  app.get('/auth', async (request, reply) => {
    const user = await currentUser(request);
    if (user) return reply.redirect('/');
    csrfToken(request, reply);
    noStore(reply);
    return reply.sendFile('auth.html', { cacheControl: false });
  });

  app.get('/api/csrf', async (request, reply) => {
    noStore(reply);
    return reply.send({ token: csrfToken(request, reply) });
  });

  app.post('/api/auth/register', { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    const parsed = registrationSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: parsed.error.issues[0]?.message || 'Please check the registration details.' });
    const email = normalizeEmail(parsed.data.email);
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (existing) return reply.code(409).send({ error: 'That email address is already registered.' });
    const user: User = {
      id: randomUUID(),
      email,
      displayName: parsed.data.displayName,
      passwordHash: await hashPassword(parsed.data.password),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await db.insert(users).values(user);
    await createWorkspace(user);
    await createSession(reply, user.id);
    return reply.code(201).send({ user: { email: user.email, displayName: user.displayName } });
  });

  app.post('/api/auth/login', { config: { rateLimit: { max: 8, timeWindow: '1 minute' } } }, async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'Enter your email address and password.' });
    const email = normalizeEmail(parsed.data.email);
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user || !(await verifyPassword(user.passwordHash, parsed.data.password))) {
      return reply.code(401).send({ error: 'Email address or password is incorrect.' });
    }
    await createSession(reply, user.id);
    return reply.send({ user: { email: user.email, displayName: user.displayName } });
  });

  app.post('/api/auth/logout', async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    await destroyCurrentSession(request, reply);
    return reply.code(204).send();
  });

  app.get('/api/me', async (request, reply) => {
    noStore(reply);
    const user = await sessionUser(request, reply);
    if (!user) return;
    return reply.send({ user: { email: user.email, displayName: user.displayName } });
  });

  app.put('/api/account', async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    const user = await sessionUser(request, reply);
    if (!user) return;
    const parsed = accountSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: parsed.error.issues[0]?.message || 'Please check your account details.' });
    const displayName = parsed.data.displayName;
    const email = normalizeEmail(parsed.data.email);
    const emailChanged = email !== user.email;
    const passwordChanged = Boolean(parsed.data.newPassword);
    if (passwordChanged && parsed.data.newPassword.length < 12) return reply.code(400).send({ error: 'Use at least 12 characters for your new password.' });
    if ((emailChanged || passwordChanged) && !parsed.data.currentPassword) return reply.code(400).send({ error: 'Enter your current password to make this security change.' });
    if ((emailChanged || passwordChanged) && !(await verifyPassword(user.passwordHash, parsed.data.currentPassword))) return reply.code(401).send({ error: 'Your current password is incorrect.' });
    if (emailChanged) {
      const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
      if (existing && existing.id !== user.id) return reply.code(409).send({ error: 'That email address is already registered.' });
    }
    const update: Partial<typeof users.$inferInsert> = { displayName, email, updatedAt: new Date() };
    if (passwordChanged) update.passwordHash = await hashPassword(parsed.data.newPassword);
    await db.update(users).set(update).where(eq(users.id, user.id));
    return reply.send({ user: { email, displayName } });
  });

  app.get('/api/workspace', async (request, reply) => {
    noStore(reply);
    const user = await sessionUser(request, reply);
    if (!user) return;
    return reply.send({ data: await loadWorkspace(user) });
  });

  app.put('/api/workspace', async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    const user = await sessionUser(request, reply);
    if (!user) return;
    const parsed = workspaceSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'The workspace data is not valid.' });
    const data = await saveWorkspace(user, parsed.data.data);
    return reply.send({ data });
  });

  app.post('/api/uploads', async (request, reply) => {
    noStore(reply);
    if (rejectCsrf(request, reply)) return;
    const user = await sessionUser(request, reply);
    if (!user) return;
    const part = await request.file();
    if (!part) return reply.code(400).send({ error: 'Choose an image to upload.' });
    if (!allowedImageTypes.has(part.mimetype)) {
      part.file.resume();
      return reply.code(400).send({ error: 'Use a PNG, JPEG, WebP, GIF, HEIC, or HEIF image.' });
    }
    const attachmentId = randomUUID();
    const directory = path.join(config.uploadDir, user.id);
    const storageKey = `${user.id}/${attachmentId}`;
    const target = path.join(config.uploadDir, storageKey);
    const temporary = `${target}.uploading`;
    await mkdir(directory, { recursive: true });
    try {
      await pipeline(part.file, createWriteStream(temporary, { flags: 'wx' }));
      if (part.file.truncated) throw Object.assign(new Error('Images must be 8 MB or smaller.'), { statusCode: 413 });
      const fileInfo = await stat(temporary);
      if (fileInfo.size === 0) throw new Error('The selected image is empty.');
      await rename(temporary, target);
      await db.insert(attachments).values({
        id: attachmentId,
        userId: user.id,
        originalName: path.basename(part.filename || 'image').slice(0, 160),
        mimeType: part.mimetype,
        byteSize: fileInfo.size,
        storageKey
      });
      return reply.code(201).send({ id: attachmentId, url: `/api/attachments/${attachmentId}` });
    } catch (error) {
      await removeFileSilently(temporary);
      await removeFileSilently(target);
      throw error;
    }
  });

  app.get('/api/attachments/:id', async (request, reply) => {
    noStore(reply);
    const user = await sessionUser(request, reply);
    if (!user) return;
    const attachmentId = z.string().uuid().safeParse((request.params as { id?: string }).id);
    if (!attachmentId.success) return reply.code(404).send({ error: 'Image not found.' });
    const [attachment] = await db.select().from(attachments).where(and(eq(attachments.id, attachmentId.data), eq(attachments.userId, user.id))).limit(1);
    if (!attachment) return reply.code(404).send({ error: 'Image not found.' });
    const filePath = path.join(config.uploadDir, attachment.storageKey);
    try {
      await access(filePath);
      reply.type(attachment.mimeType).header('X-Content-Type-Options', 'nosniff');
      return reply.sendFile(attachment.storageKey, config.uploadDir);
    } catch {
      return reply.code(404).send({ error: 'Image not found.' });
    }
  });

  return app;
}

async function start() {
  await applyMigrations();
  const app = buildServer();
  const close = async () => {
    await app.close();
    await closeDatabase();
  };
  process.once('SIGTERM', () => void close());
  process.once('SIGINT', () => void close());
  await app.listen({ port: config.port, host: '0.0.0.0' });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start().catch(async error => {
    console.error(error);
    await closeDatabase();
    process.exitCode = 1;
  });
}
