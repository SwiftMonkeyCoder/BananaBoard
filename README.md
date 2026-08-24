<p align="center">
  <img src="public/bananaboard-logo.png" alt="BananaBoard logo" width="128">
</p>

# BananaBoard

**A calm, self-hosted study planner for keeping schoolwork, notes, focus time, and progress in one place.**

[Open BananaBoard](https://app.bananaboard.net) · [Visit the website](https://bananaboard.net) · [Self-hosting guide](#self-hosting)

BananaBoard is a personal study organizer for students who want a quieter, more intentional space to plan their work. Create a private account, track assignments and tests, take rich notes, run focus sessions, and see your progress without handing your study life to a third-party planner.

It is free to run yourself and comes with everything needed to deploy it with Docker and PostgreSQL.

## What you can do

- Plan homework by subject, due date, status, and priority.
- Keep events, tests, and your day-to-day study schedule in a calendar.
- Add one-off or repeating reminders, with optional browser notifications.
- Write rich notes, organize them into notebooks, add highlights, drawings, and images, and link them to assignments.
- Record grades using number, percentage, or letter scales.
- Use a configurable focus timer with study, break, long-break, and custom modes.
- Set goals, monitor completion and focused-time statistics, and keep useful widgets visible throughout the app.
- Make the space yours with themes, accent colours, language preferences, profile photos, and a choice of 12- or 24-hour time.
- Export your complete board to JSON for safekeeping or import a previous export.

## Screens and data

BananaBoard is designed around a single personal workspace: Dashboard, Homework, Calendar, Reminders, Notes, Grades, Study Timer, Statistics, Goals, Subjects, Widgets, and Settings. Data is tied to each account and is persisted in PostgreSQL; uploaded profile and note images are kept in a separate persistent Docker volume.

Accounts use email and password sign-in. Passwords are hashed with Argon2id, sessions use secure HTTP-only cookies, and state-changing requests use CSRF protection.

## Self-hosting

### What you need

- A Linux server or other Docker-capable host.
- Docker Engine with the Docker Compose plugin.
- A domain name and a reverse proxy for HTTPS in production. The included example uses [Caddy](https://caddyserver.com/).

### Quick start

Clone the project on your server and create a production environment file:

```sh
git clone https://github.com/SwiftMonkeyCoder/BananaBoard.git
cd BananaBoard
cp .env.example .env
```

Edit `.env` and set at least the following values. Use unique, long values for the database password and session secret.

```dotenv
NODE_ENV=production
APP_ORIGIN=https://planner.example.com
APP_PORT=3000
POSTGRES_DB=bananaboard
POSTGRES_USER=bananaboard
POSTGRES_PASSWORD=replace-with-a-unique-long-password
SESSION_SECRET=replace-with-a-random-secret-of-at-least-32-characters
```

Generate a session secret, if helpful:

```sh
openssl rand -base64 48
```

Start BananaBoard:

```sh
docker compose pull
docker compose up -d
docker compose ps
```

The production Compose configuration pulls `ghcr.io/swiftmonkeycoder/bananaboard:main`, runs database migrations automatically, and binds the app to `127.0.0.1:3000`. PostgreSQL is intentionally not exposed to the internet.

### Put it behind HTTPS

Point your chosen domain at the server, then configure your reverse proxy to pass traffic to `127.0.0.1:3000`. With Caddy, the essential site block is:

```caddyfile
planner.example.com {
  reverse_proxy 127.0.0.1:3000
}
```

Caddy will obtain and renew the TLS certificate when the domain’s DNS points to the server. The production configuration, including its security header, is in the [Caddy section of DEVELOPMENT.md](DEVELOPMENT.md#caddy).

### Updating

From the BananaBoard directory:

```sh
git pull
docker compose pull
docker compose up -d
```

For a rollback, set `IMAGE_TAG` to a known-good `sha-…` image tag before running `docker compose up -d`.

### Backups

Back up both Docker volumes: `postgres_data` (your accounts and board data) and `bananaboard_uploads` (uploaded images). For a database dump:

```sh
mkdir -p backups
docker compose exec -T db pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "backups/bananaboard-$(date +%F).sql.gz"
```

Store backups away from the server and test restoring them regularly. A database dump does not include uploaded images.

## Architecture

```text
Browser → HTTPS reverse proxy → Fastify application → PostgreSQL
                                     └───────────→ persistent uploads volume
```

The interface is deliberately framework-free JavaScript, served by a Fastify + TypeScript application. The backend uses PostgreSQL with Drizzle ORM and keeps workspace records scoped to individual users. Docker Compose provides both the application and its database.

## Development

For local development, deployment notes, Caddy configuration, GitHub Actions details, and the full operational reference, see [DEVELOPMENT.md](DEVELOPMENT.md).

The quick local path is:

```sh
cp .env.example .env
docker compose -f compose.dev.yml up --build
```

Then open [http://localhost:3000](http://localhost:3000).

## Contributing

Bug reports, focused improvements, and documentation fixes are welcome. Before opening a substantial pull request, start a discussion or issue so the change can be aligned with the project’s direction.

Before submitting a change, run:

```sh
pnpm typecheck
pnpm test
pnpm build
```

## License

BananaBoard is available under the [MIT License](LICENSE).
