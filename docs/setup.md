# Smart Link POS Setup Guide

## Prerequisites

- **Node.js** >= 18
- **PostgreSQL** >= 14
- **Redis** (optional, for session caching)

## Environment

Copy `.env.example` or create `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pos_system
# optional:
# REDIS_URL=redis://localhost:6379
# NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
# NEXTAUTH_URL=http://localhost:3000
```

## Database

```bash
# Install deps
npm install

# Generate Prisma client and run migrations
npx prisma migrate dev

# (Optional) seed with demo data
# Visit: http://localhost:3000/api/seed
#   Admin: admin@pos.com / admin123
#   3 sample products, 1 category
```

## Run

```bash
npm run dev
```

Open http://localhost:3000. Login page redirects to dashboard on auth.

## Build for Production

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production |
| `npm run lint` | ESLint check |
