# BananaBoard

BananaBoard is a free, self-hostable study organizer for homework, calendars, reminders, A4-style notebooks, study timers, goals, widgets, grades, subjects, and personal statistics.

The web app lives at `app.bananaboard.net`; the public landing page is published from `landing/` to `bananaboard.net` through GitHub Pages.

## What is in this repository

- A Fastify + TypeScript server that serves the existing BananaBoard interface.
- PostgreSQL persistence for users, sessions, workspace records, and uploads.
- Email/password accounts with editable case-sensitive display names.
- Secure, HTTP-only session cookies; Argon2id password hashes; CSRF checks; same-origin API; rate limits on sign-in endpoints; and security headers.
- Authenticated image uploads stored on a persistent Docker volume on the VPS.
- Docker Compose files for local development and production.
- GitHub Actions for verification, GitHub Container Registry publishing, and GitHub Pages.

The original browser-only `localStorage` persistence has been replaced with account-scoped server synchronization. Existing local browser data is intentionally **not** migrated.

## Architecture

```text
Browser
  └─ HTTPS / Caddy ──> BananaBoard app container (Fastify)
                              ├─ PostgreSQL container
                              └─ persistent uploads Docker volume
```

The UI is still deliberately framework-free. It is served by the Fastify app and synchronizes the same workspace shape it already uses. The database stores workspace settings separately from typed record collections, which keeps every item user-scoped and makes future collection-level APIs or relational tables possible without rewriting the interface.

## Local development on macOS

The Docker path is the recommended one. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) or OrbStack, then:

```sh
cp .env.example .env
docker compose -f compose.dev.yml up --build
```

Open [http://localhost:3000](http://localhost:3000). The app server watches source changes, while PostgreSQL and uploaded files live in named development volumes.

To run the server directly instead, install Node.js 22 LTS and pnpm:

```sh
brew install node@22 pnpm
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

You still need PostgreSQL running locally; the development Compose file is the simplest way to provide it.

Useful commands:

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm db:migrate
```

## Production deployment

The app image is published to:

```text
ghcr.io/swiftmonkeycoder/bananaboard:main
```

On the VPS, create a dedicated directory, copy `compose.yml`, and create a production `.env` from the template:

```sh
mkdir -p /opt/bananaboard
cd /opt/bananaboard
curl -O https://raw.githubusercontent.com/SwiftMonkeyCoder/BananaBoard/main/compose.yml
curl -o .env https://raw.githubusercontent.com/SwiftMonkeyCoder/BananaBoard/main/.env.example
```

Edit `.env` before starting. At minimum, set all of these values:

```dotenv
NODE_ENV=production
APP_ORIGIN=https://app.bananaboard.net
APP_PORT=3000
POSTGRES_DB=bananaboard
POSTGRES_USER=bananaboard
POSTGRES_PASSWORD=use-a-unique-long-password
SESSION_SECRET=use-a-long-random-secret-at-least-32-characters
```

Generate a secure session secret with:

```sh
openssl rand -base64 48
```

Start or upgrade the service:

```sh
docker compose pull
docker compose up -d
docker compose ps
```

The app automatically applies the versioned SQL migrations before it starts serving requests. PostgreSQL is never exposed to the Internet; the app listens only on `127.0.0.1:3000` for Caddy.

### Caddy

Add the contents of [Caddyfile.example](Caddyfile.example) to the VPS Caddy configuration, then reload Caddy. Caddy handles TLS and proxies to `127.0.0.1:3000`.

### GitHub Container Registry visibility

The first successful publish creates the GHCR package. In the package settings, confirm that `ghcr.io/swiftmonkeycoder/bananaboard` is public. A public package lets the VPS pull updates without a registry token.

### GitHub Pages landing page

In the repository settings, set **Pages → Source** to **GitHub Actions**. The Pages workflow deploys `landing/`, including its `CNAME` for `bananaboard.net`.

In Cloudflare, point `bananaboard.net` and `www.bananaboard.net` to GitHub Pages according to GitHub’s custom-domain instructions. Keep `app.bananaboard.net` pointed at the VPS.

### Komodo daily updates

Create a Komodo Compose stack using this repository’s production `compose.yml` and your VPS `.env`. Configure it to pull and redeploy the `main` image once a day. Keep the `sha-…` image tags shown in GitHub Packages for a quick rollback:

```sh
IMAGE_TAG=sha-REPLACE_WITH_A_KNOWN_GOOD_SHA docker compose up -d
```

## Backups

The `postgres_data` and `bananaboard_uploads` Docker volumes are application data. Back up both, preferably to storage outside the VPS.

A PostgreSQL dump can be created from the deployment directory with:

```sh
mkdir -p backups
docker compose exec -T db pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "backups/bananaboard-$(date +%F).sql.gz"
```

Schedule this with a daily system timer or your backup tool, copy the result off-server, and periodically test a restore on a non-production database. Also back up the uploads volume; a database dump alone does not contain profile pictures or note images.

## Account behavior

- Login uses the account email address, normalized case-insensitively.
- Display names are case-sensitive and can be changed at any time in **Settings → Account**.
- Changing an email address or password requires the current password.
- Password recovery is intentionally not included in v1. Users should retain their passwords carefully.
- Friends/discoverability is not yet implemented as a server feature.

## Development workflow

Pull requests and pushes to `main` run type checking, unit tests, and a production TypeScript build. Pushes to `main` also build and publish the Docker image. Version tags beginning with `v` publish a tagged release image as well.

Before merging or deploying a change, run:

```sh
pnpm typecheck && pnpm test && pnpm build
```

## License

This project is open source. Add your chosen license file before inviting outside contributions.
