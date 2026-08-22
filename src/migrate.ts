import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { sql, closeDatabase } from './db.js';

const migrationsDirectory = fileURLToPath(new URL('../db', import.meta.url));

export async function applyMigrations() {
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  const applied = new Set((await sql<{ name: string }[]>`SELECT name FROM schema_migrations`).map(row => row.name));
  const files = (await readdir(migrationsDirectory)).filter(name => name.endsWith('.sql')).sort();
  for (const name of files) {
    if (applied.has(name)) continue;
    const migration = await readFile(`${migrationsDirectory}/${name}`, 'utf8');
    await sql.begin(async transaction => {
      await transaction.unsafe(migration);
      await transaction`INSERT INTO schema_migrations (name) VALUES (${name})`;
    });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  applyMigrations()
    .then(() => {
      console.log('Database migrations are up to date.');
      return closeDatabase();
    })
    .catch(async error => {
      console.error(error);
      await closeDatabase();
      process.exitCode = 1;
    });
}
