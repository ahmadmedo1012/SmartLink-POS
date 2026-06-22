# Smart Link POS API Reference

All endpoints are `http://localhost:3000/api/...`. Admin routes require authentication (session cookie). Responses are JSON unless noted.

---

### 1. Auth
```
POST /api/auth/[...nextauth]
```
next-auth v5 catch-all. Sign in, sign out, session fetch via next-auth standard protocol.

**Auth**: No (handled by next-auth)

---

### 2. Dashboard
```
GET /api/dashboard
```

**Response:**
```json
{
  "totalSales": "Decimal",
  "invoiceCount": 0,
  "productCount": 0,
  "totalStock": 0,
  "customerCount": 0,
  "recentInvoices": [...],
  "totalDiscounts": "Decimal",
  "totalTax": "Decimal",
  "totalExpenses": "Decimal",
  "estimatedProfit": "Number",
  "margin": 0
}
```

**Auth**: Yes

---

### 3. Products
```
GET /api/products
```
**Query params**: `search`, `categoryId`, `page` (default 1), `pageSize` (default 20, max 100), `top=true` (top 5 best-sellers)

**Response**: `{ products, total, page, pageSize, pages }` or `{ products: [...] }` for top=true

```
POST /api/products
```
**Body**: `{ name, nameAr?, barcode?, description?, price, cost?, stock?, minStock?, categoryId? }`

**Auth**: Yes

```
PUT /api/products
```
**Body**: `{ id, ...fields to update }`

**Auth**: Yes

---

### 4. Categories
```
GET /api/categories
```
**Response**: All categories with `_count.products`

```
POST /api/categories
```
**Body**: `{ name, nameAr?, description? }`

**Auth**: Yes

---

### 5. Invoices
```
GET /api/invoices
```
**Query params**: `page` (default 1), `pageSize` (default 20, max 100)

**Response**: `{ invoices, total, page, pageSize, pages }`

```
POST /api/invoices
```
**Body**: `{ userId, customerId?, total, discount, tax, grandTotal, paid, notes?, items: [{ productId, quantity, price, total }] }`

Decrements stock in a transaction.

**Auth**: Yes

---

### 6. Invoice Detail
```
GET /api/invoices/[id]
```
**Response**: Full invoice with user, customer, items, product details

**Auth**: Yes

---

### 7. Invoice PDF
```
GET /api/invoices/pdf?id=<invoiceId>
```
**Response**: PDF file (`application/pdf`)

**Auth**: Yes

---

### 8. Customers
```
GET /api/customers
```
**Query params**: `search` (filters by name or phone, returns top 10)

**Response**: Array of customers (max 100 without search, 10 with search)

```
POST /api/customers
```
**Body**: `{ name, phone?, email?, address? }`

**Auth**: Yes

---

### 9. Suppliers
```
GET /api/suppliers
```

```
POST /api/suppliers
```
**Body**: `{ name, phone?, email?, address? }`

**Auth**: Yes

---

### 10. Returns
```
GET /api/returns
```
**Query params**: `page` (default 1), `pageSize` (default 20, max 100)

**Response**: `{ returns, total, page, pageSize, pages }`

```
POST /api/returns
```
**Body**: `{ invoiceId, userId, reason?, items: [{ productId, quantity, price, total }] }`

Increments stock in a transaction.

**Auth**: Yes

---

### 11. Expenses
```
GET /api/expenses
```

```
POST /api/expenses
```
**Body**: `{ description, amount, category? }`

**Auth**: Yes

---

### 12. Inventory
```
GET /api/inventory
```
**Response**: `{ lowStock: [...], totalProducts, activeProducts, outOfStock }`

**Auth**: Yes

---

### 13. Reports
```
GET /api/reports
```
**Response**: Last 500 invoices with `grandTotal`, `createdAt`, `status`

**Auth**: Yes

---

### 14. Activity Log
```
GET /api/activity
```
**Query params**: `page` (default 1), `limit` (default 20, max 50), `entity`, `search`

**Response**: `{ data: [...], total, page, limit, totalPages }`

**Auth**: Yes

---

### 15. Users
```
GET /api/users
```
**Response**: `{ id, name, email, role, isActive, createdAt }[]`

```
PUT /api/users
```
**Body**: `{ id, name?, email?, role?, isActive?, passwordHash? }`

```
DELETE /api/users
```
**Body**: `{ id }` — soft-deactivates (sets isActive=false)

**Auth**: Yes

---

### 16. POS Products
```
GET /api/pos/products
```
**Query params**: `categoryId` (optional filter)

**Response**: All active products with category (no pagination — for POS terminal)

**Auth**: No

---

### 17. Seed
```
POST /api/seed
```
Seeds admin user (admin@pos.com / admin123), 1 category, 3 products. Idempotent (upsert).

**Auth**: No

---

## Auth Requirement Summary

| Endpoint | Auth Required |
|----------|---------------|
| `/api/auth/[...nextauth]` | No |
| `/api/dashboard` | Yes |
| `/api/products` | Yes |
| `/api/categories` | Yes |
| `/api/invoices` | Yes |
| `/api/invoices/[id]` | Yes |
| `/api/invoices/pdf` | Yes |
| `/api/customers` | Yes |
| `/api/suppliers` | Yes |
| `/api/returns` | Yes |
| `/api/expenses` | Yes |
| `/api/inventory` | Yes |
| `/api/reports` | Yes |
| `/api/activity` | Yes |
| `/api/users` | Yes |
| `/api/pos/products` | No |
| `/api/seed` | No |
