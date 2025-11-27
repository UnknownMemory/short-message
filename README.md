# Short Message

## Built With

-   Next.js
-   TanStack Query
-   Drizzle
-   PostgreSQL
-   Zustand
-   Tailwind
-   Redis

## Getting started

### Installation

```bash
git clone https://github.com/UnknownMemory/short-message.git
cd short-message

# Install dependencies
pnpm install
```

### Environment Variables

1. Rename `.env.example` to `.env`
2. Set a value to `ACCESS_TOKEN_SECRET` and `SECRET_TOKEN_SECRET` for the JWT signing.

### Database Setup

```bash
docker compose up -d
pnpm run migrate
```

### Run the app

Development mode

```bash
pnpm run dev
```

Build

```bash
pnpm run build
```

Production mode

```bash
pnpm run start
```
