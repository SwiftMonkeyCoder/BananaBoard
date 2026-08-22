import { describe, expect, it } from 'vitest';
import type { FastifyRequest } from 'fastify';
import { requestHasValidCsrf } from './auth.js';

const csrfToken = 'csrf-token-for-tests';

function request(overrides: Partial<FastifyRequest> = {}) {
  return {
    cookies: { bananaboard_csrf: csrfToken },
    headers: {
      'x-csrf-token': csrfToken,
      origin: 'https://app.bananaboard.net',
      host: 'app.bananaboard.net'
    },
    protocol: 'https',
    ...overrides
  } as FastifyRequest;
}

describe('CSRF validation', () => {
  it('accepts a valid request from the host serving the app', () => {
    expect(requestHasValidCsrf(request())).toBe(true);
  });

  it('rejects a request from a different origin', () => {
    expect(requestHasValidCsrf(request({
      headers: { 'x-csrf-token': csrfToken, origin: 'https://attacker.example', host: 'app.bananaboard.net' }
    }))).toBe(false);
  });

  it('rejects a mismatched CSRF token', () => {
    expect(requestHasValidCsrf(request({
      headers: { 'x-csrf-token': 'incorrect-token', origin: 'https://app.bananaboard.net', host: 'app.bananaboard.net' }
    }))).toBe(false);
  });
});
