# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Next.js 16 — this is NOT the Next.js you know.** APIs, conventions,
> and file structure differ from earlier versions. Read the relevant guides
> in `node_modules/next/dist/docs/` before writing code. Heed deprecation
> notices.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Production server
npx playwright test                              # All e2e tests
npx playwright test e2e/launch-checks.spec.ts    # Single test file
npx playwright test --headed                     # Visible browser
npx prisma generate       # Regenerate Prisma client after schema changes
npx prisma migrate dev    # Create & apply a new migration
npx prisma migrate deploy # Apply pending migrations
npx tsx prisma/seed.ts    # Seed database
```

## Stack

- **Framework**: Next.js 16 (App Router, `@base-ui/react` 1.6 for headless primitives)
- **Language**: TypeScript 5, React 19, `tailwindcss` 4
- **Database**: PostgreSQL via Prisma 7 (`@prisma/adapter-pg`), schema in `prisma/schema.prisma`
- **Auth**: `next-auth` 5 (credentials provider, JWT strategy, bcryptjs)
- **State**: `@tanstack/react-query` 5 (server state), `zustand` 5 (client state)
- **UI Utilities**: `framer-motion` 12 (page animations), `recharts` (charts), `lucide-react` (icons), `react-hook-form` + `zod` (forms), `react-hot-toast` (notifications)
- **PDF**: `jspdf` + `jspdf-autotable` + `html2canvas`
- **Testing**: `@playwright/test` 1.61, locale `ar-SA`

## Project Structure

```
src/
  app/
    globals.css            # Tailwind 4 + design tokens (amber brand, Smart Menu)
    layout.tsx             # Root layout — Readex Pro (headings) + Noto Sans Arabic (body)
    providers.tsx          # SessionProvider, QueryClient, CurrencyProvider, Toaster
    proxy.ts               # Middleware — route protection via authjs session cookie
    page.tsx               # Landing page (public)
    (auth)/login/page.tsx  # Login page
    (dashboard)/
      layout.tsx           # Authenticated layout — sidebar nav
      _components/sidebar.tsx  # Nav: 13 routes, collapsible desktop + mobile overlay
      page.tsx             # Dashboard — KPI cards, charts, activity feed, top products
      pos/
        page.tsx           # POS terminal — three-panel: product grid + barcode + cart
        _components/       # barcode-input.tsx, cart-panel.tsx, product-grid.tsx
      products/, invoices/, customers/, categories/, suppliers/,
      expenses/, inventory/, returns/, activity/, reports/, settings/
    api/                   # REST routes — all server-side via Prisma
      auth/[...nextauth]/, categories/, customers/, dashboard/, expenses/,
      inventory/, invoices/, pos/products/, products/, reports/, returns/,
      seed/, suppliers/, users/, activity/
  components/
    ui/                    # shadcn/ui-styled primitives on @base-ui/react
      button.tsx, card.tsx, badge.tsx, input.tsx, table.tsx,
      dialog.tsx, dropdown-menu.tsx, popover.tsx, separator.tsx
    dashboard/             # ActivityFeed, LowStockBanner, TopProducts
    landing/               # Public landing page sections
    lottie/                # Lottie animation player + animated icons
    remotion/              # Remotion video presentation
    page-shell.tsx         # PageShell wrapper + PageHeader component
    empty-state.tsx        # Empty state with icon + action
    animated-counter.tsx   # Number animation component
  lib/
    prisma.ts              # Singleton PrismaClient with PrismaPg adapter
    auth.ts                # next-auth v5 config
    currency.tsx           # Multi-currency context (LYD/USD/EUR/SAR)
    pdf.ts                 # Invoice PDF generation (jspdf)
    csv.ts                 # CSV export utility
    sounds.ts              # Click/success/error sound effects
    utils.ts               # cn() helper
prisma/
  schema.prisma            # 9 models: User, Category, Product, Customer, Supplier,
                           # Invoice, InvoiceItem, Return, ReturnItem, Expense, ActivityLog
  seed.ts                  # DB seed — admin user, categories, products
  migrations/              # 4 migrations from init
e2e/
  launch-checks.spec.ts    # Page load, CRUD flows, auth
  accessibility.spec.ts    # a11y audit via Axe
  critical-path.spec.ts    # Core business flows
  launch-health.spec.ts    # Server health checks
```

## Architecture

### RTL-first (Arabic)
- Root `<html lang="ar" dir="rtl">` — all pages RTL by default
- Sidebar layout uses `border-l` / `right-*` / `left-*` correctly
- `ltr:mr-auto` / `ltr:ml-auto` utilities for mixed-direction content

### Authentication
- NextAuth 5 with **credentials provider** only (email + bcrypt password)
- JWT session strategy, `pages.signIn: "/login"`
- Middleware (`proxy.ts`) protects all dashboard routes via cookie check
- Redirects to `/login` if no valid token

### API Pattern
- Every route is `export async function GET/POST/PUT/DELETE(req: NextRequest)` in `app/api/`
- All routes destructure `params` from the second argument: `{ params }: { params: { id: string } }`
- Input validated at boundary, return `Response.json()` with error status codes
- Lightweight — most routes are 20-40 lines, inline query logic, no service layer

### POS Terminal (`/pos`)
- Three-panel layout: product grid (filterable by category), barcode scanner input, floating cart
- Cart managed via **zustand** store
- Payment dialog with cash/card options
- Prints receipt + creates invoice in one POST

### Dashboard (`/`)
- 4 KPI stat cards, 3 quick-action buttons, bar chart, pie chart, activity feed, recent invoices
- Auto-refreshes every 15s via `refetchInterval`
- Skeleton loading states for all data sections
- Error state with retry button

### Design System
- Custom Smart Menu brand (amber): `--page-background: #FBF6F0`, `--primary: #E78C08`
- Radius tokens: sm=12px, md=17px, lg=22px, xl=42px
- Fonts: Readex Pro (headings), Noto Sans Arabic (body)
- Components use **@base-ui/react** primitives (not Radix) for dialog, menu, popover
- `cn()` from `tailwind-merge` + `clsx` for conditional class merging

### Database Schema
- 9 models, PostgreSQL, auto-increment invoice numbers
- Products have bilingual names (`name` + `nameAr`), optional barcode
- Invoices snapshot item prices at sale time
- ActivityLog records all CRUD operations per user
- Decimal fields use `@db.Decimal(10, 2)` for currency precision
- Database connection via `PrismaPg` adapter (not the default Prisma driver)

## Seed
```bash
npx tsx prisma/seed.ts
```
Creates admin user (credentials: admin@example.com / admin123), sample categories, and 30+ products with bilingual names, barcodes, and realistic pricing.
