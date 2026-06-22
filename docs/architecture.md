# Smart Link POS Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.9 |
| Language | TypeScript | ^5 |
| ORM | Prisma | ^7.8.0 |
| Database | PostgreSQL | >= 14 |
| Auth | next-auth (v5 beta) | ^5.0.0-beta.31 |
| Styling | Tailwind CSS | ^4 |
| UI Primitives | @base-ui/react | ^1.6.0 |
| Forms | react-hook-form + zod | ^7.80 / ^4.4.3 |
| State | zustand | ^5.0.14 |
| Server State | @tanstack/react-query | ^5.101.0 |
| Charts | recharts | ^3.8.1 |
| PDF | jspdf + jspdf-autotable | ^4.2.1 |
| PDF Render | remotion | ^4.0.482 |
| Font | Tajawal (next/font/google) | - |
| Icons | lucide-react | ^1.21.0 |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing / redirect
│   ├── layout.tsx                        # Root layout (RTL, Tajawal font)
│   ├── providers.tsx                     # React Query + Session providers
│   ├── (auth)/
│   │   └── login/page.tsx                # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx                    # Dashboard layout + sidebar
│   │   ├── page.tsx                      # Dashboard home (stats)
│   │   ├── _components/sidebar.tsx       # Sidebar navigation
│   │   ├── pos/
│   │   │   ├── page.tsx                  # POS terminal
│   │   │   └── _components/
│   │   │       ├── product-grid.tsx
│   │   │       ├── cart-panel.tsx
│   │   │       └── barcode-input.tsx
│   │   ├── products/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── invoices/page.tsx
│   │   ├── invoices/[id]/page.tsx        # Invoice detail
│   │   ├── customers/page.tsx
│   │   ├── suppliers/page.tsx
│   │   ├── returns/page.tsx
│   │   ├── expenses/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── activity/page.tsx
│   │   └── settings/page.tsx
│   └── api/                              # API routes (see api.md)
└── lib/
    ├── auth.ts                           # NextAuth config (credentials provider)
    ├── prisma.ts                         # Prisma client singleton
    ├── pdf.ts                            # PDF generation
    ├── csv.ts                            # CSV export
    ├── currency.tsx                      # Currency formatting component
    ├── sounds.ts                         # POS sound effects
    └── utils.ts                          # Shared utilities
```

## Route Structure

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Authentication |
| `/` (dashboard) | Dashboard home with KPI cards |
| `/pos` | POS terminal (cashier interface) |
| `/products` | Product management |
| `/categories` | Category management |
| `/invoices` | Invoice list |
| `/invoices/[id]` | Invoice detail view |
| `/customers` | Customer management |
| `/suppliers` | Supplier management |
| `/returns` | Returns processing |
| `/expenses` | Expense tracking |
| `/inventory` | Inventory / low-stock dashboard |
| `/reports` | Sales reports |
| `/activity` | Activity log |
| `/settings` | User / system settings |

## Auth Flow

- **Provider**: next-auth v5 with **credentials** strategy
- **Strategy**: JWT (no database sessions)
- **Flow**: email/password → bcrypt verify → JWT with role+id claims
- **Token enrichment**: `jwt` callback adds `role` and `id`; `session` callback exposes them on `session.user`
- **Middleware**: checks for `authjs.session-token` cookie on protected routes (`/pos`, `/products`, `/invoices`, `/customers`, `/reports`, `/settings`)
- **Pages**: custom login page at `/login`

## Database Schema

9 models: `User`, `Category`, `Product`, `Customer`, `Supplier`, `Invoice`, `InvoiceItem`, `Return`, `ReturnItem`, `Expense`, `ActivityLog`.

See `prisma/schema.prisma` for full schema.

## Middleware

- Protects dashboard routes `/pos`, `/products`, `/invoices`, `/customers`, `/reports`, `/settings` and their sub-paths
- Redirects unauthenticated requests to `/login`
