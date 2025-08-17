ts-fastify-prisma-api

A minimal, fast, and typed REST API starter using Fastify, TypeScript, and Prisma. Built for quick bootstrapping of production-ready services with a clean structure and developer-friendly DX.

Tech stack

Fastify for high-performance HTTP

TypeScript for type safety

Prisma as the data access layer (e.g., PostgreSQL)

Zod/Ajv or similar validation (optional, depending on your setup)

Prerequisites

Node.js 18+ (LTS recommended)

A PostgreSQL database (local or Docker)

PNPM/Yarn/NPM (any is fine)

Getting started

# 1) Clone
git clone https://github.com/Moongazing/ts-fastify-prisma-api.git
cd ts-fastify-prisma-api

# 2) Install deps
# pick one:
pnpm install
# or
yarn
# or
npm install

# 3) Configure environment
cp .env.example .env
# then set DATABASE_URL in .env, e.g.
# DATABASE_URL="postgresql://user:password@localhost:5432/appdb?schema=public"

# 4) Prisma setup
npx prisma generate
npx prisma migrate dev --name init

# 5) Run in dev
pnpm dev   # or yarn dev / npm run dev


The server will start on http://localhost:3000 by default.


Useful commands

# run prisma studio (GUI for your DB)
npx prisma studio

# format & lint (if configured)
pnpm format && pnpm lint
# or yarn format && yarn lint
# or npm run format && npm run lint

# build & run
pnpm build && pnpm start
# or yarn build && yarn start
# or npm run build && npm start


Environment variables

DATABASE_URL – Prisma connection string
Example:postgresql://postgres:postgres@localhost:5432/ts_fastify?schema=public


Project structure (example)
src/
  app.ts            # Fastify instance and plugins
  routes/           # Route definitions
  plugins/          # Fastify plugins (e.g., cors, swagger)
  modules/          # Feature modules (controllers/services/schemas)
prisma/
  schema.prisma     # Prisma schema
.env.example


API docs


If Swagger/OpenAPI is enabled in your setup, open:

http://localhost:3000/docs(or /documentation depending on your config)

Docker (optional)

If a docker-compose.yml is included, you can spin up Postgres quickly

docker compose up -d
Update DATABASE_URL accordingly, then run Prisma commands and start the app.

License

MIT. Use it freely in your projects.
