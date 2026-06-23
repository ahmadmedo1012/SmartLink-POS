# Smart Link POS — الربط الذكي

نظام إدارة مبيعات ومخزون متكامل مع واجهة عربية كاملة (RTL)، نقطة بيع، فواتير، تقارير، وإدارة العملاء والموردين.

## Tech Stack

| Layer | Stack |
|-------|-------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5, React 19 |
| **Styling** | Tailwind CSS 4, `tw-animate-css` |
| **UI Primitives** | `@base-ui/react` (Dialog, Menu, Popover) |
| **Database** | PostgreSQL (Neon) via Prisma 7 + `@prisma/adapter-pg` |
| **Auth** | next-auth v5 (credentials provider, JWT strategy, bcryptjs) |
| **State** | `@tanstack/react-query` v5 (server), `zustand` v5 (client) |
| **Charts** | recharts |
| **Fonts** | Readex Pro (headings), Noto Sans Arabic (body) |
| **Icons** | lucide-react |
| **PDF** | jspdf + jspdf-autotable |
| **Testing** | Playwright |
| **Hosting** | Render |

## Prerequisites

- **Node.js** 20+
- **PostgreSQL** database (Neon recommended)
- **AUTH_SECRET** — generate with `openssl rand -base64 32`

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env: set DATABASE_URL and AUTH_SECRET

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with demo data (admin user, categories, products)
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

### Default Credentials (after seeding)

| Email | Password | Role |
|-------|----------|------|
| `admin@pos.com` | `admin123` | Admin |

**⚠️ Change these credentials immediately in production.**

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string (Neon pooler URL) |
| `AUTH_SECRET` | ✅ | Random 32+ char string for JWT signing |

## Commands

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npx playwright test  # Run all e2e tests
npx prisma migrate deploy  # Apply migrations
npx tsx prisma/seed.ts     # Seed database
```

## Project Structure

```
src/
  app/
    (auth)/login/       # Login page
    (dashboard)/        # Authenticated pages
      page.tsx              # Dashboard — KPIs, charts, activity
      pos/                  # POS terminal
      products/             # Product management
      invoices/             # Invoice management
      customers/            # Customer management
      suppliers/           # Supplier management
      categories/          # Category management
      expenses/            # Expense tracking
      inventory/           # Inventory management
      returns/             # Returns management
      activity/            # Activity log
      reports/             # Reports & analytics
      settings/            # Settings
    api/                # REST API routes
    layout.tsx          # Root layout (RTL, fonts)
    not-found.tsx       # 404 page
    error.tsx           # Error boundary
  components/
    ui/                 # Design system primitives
    landing/            # Landing page sections
    dashboard/          # Dashboard widgets
    lottie/             # Lottie animations
  lib/
    auth.ts             # next-auth config
    prisma.ts           # Prisma client
    currency.tsx         # Currency context
    pdf.ts              # Invoice PDF generation
prisma/
  schema.prisma         # Database schema
e2e/                    # Playwright tests
```

## Features

- **POS Terminal** — Barcode scanner, product grid with category filter, floating cart, payment dialog
- **Inventory Management** — Real-time stock tracking, low stock alerts
- **Invoicing** — Create, view, print, and export invoices as PDF
- **Reports** — Sales, expenses, profit analysis with charts
- **Customer & Supplier Management** — Contact database with purchase history
- **Expense Tracking** — Categorised expenses with date range filtering
- **Multi-currency** — LYD, USD, EUR, SAR support
- **Activity Log** — Full audit trail of all operations
- **PDF Export** — Professional invoice PDF generation
- **Dark Mode** — System preference detection + manual toggle
- **RTL / Arabic** — Full right-to-left interface

## Deployment

See [DEPLOY.md](./DEPLOY.md) for Render deployment instructions.

## Brand

This project is part of the **الربط الذكي (Smart Link)** ecosystem.
