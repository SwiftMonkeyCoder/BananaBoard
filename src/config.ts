import { z } from 'zod';

const rawConfig = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().default('postgres://bananaboard:bananaboard@db:5432/bananaboard'),
  SESSION_SECRET: z.string().min(32).default('development-only-secret-change-me-123456'),
  APP_ORIGIN: z.string().url().default('http://localhost:3000'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  UPLOAD_DIR: z.string().min(1).default('/app/data/uploads')
}).parse(process.env);

if (rawConfig.NODE_ENV === 'production' && rawConfig.SESSION_SECRET === 'development-only-secret-change-me-123456') {
  throw new Error('SESSION_SECRET must be changed before running BananaBoard in production.');
}

export const config = {
  nodeEnv: rawConfig.NODE_ENV,
  isProduction: rawConfig.NODE_ENV === 'production',
  databaseUrl: rawConfig.DATABASE_URL,
  sessionSecret: rawConfig.SESSION_SECRET,
  appOrigin: rawConfig.APP_ORIGIN.replace(/\/$/, ''),
  port: rawConfig.PORT,
  uploadDir: rawConfig.UPLOAD_DIR
};
