import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildServer } from './server.js';

describe('development security headers', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildServer();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('does not force local HTTP assets to HTTPS', async () => {
    const response = await app.inject({ method: 'GET', url: '/auth' });

    expect(response.headers['strict-transport-security']).toBeUndefined();
    expect(response.headers['content-security-policy']).not.toContain('upgrade-insecure-requests');
  });
});
