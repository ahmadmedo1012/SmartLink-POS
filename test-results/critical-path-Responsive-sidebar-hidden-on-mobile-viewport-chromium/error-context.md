# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> Responsive >> sidebar hidden on mobile viewport
- Location: e2e/critical-path.spec.ts:251:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3000/pos", waiting until "networkidle"

```

# Test source

```ts
  1   | import { test, expect, Page } from "@playwright/test"
  2   | 
  3   | // ---------------------------------------------------------------------------
  4   | // Helpers
  5   | // ---------------------------------------------------------------------------
  6   | const MOCK_USER = {
  7   |   id: "1", name: "أحمد", email: "admin@pos.com", role: "admin",
  8   | }
  9   | 
  10  | /** Mock next-auth session so all authenticated routes work without a real DB. */
  11  | async function setupAuth(page: Page) {
  12  |   await page.route("**/api/auth/session", (route) =>
  13  |     route.fulfill({
  14  |       status: 200,
  15  |       contentType: "application/json",
  16  |       body: JSON.stringify({
  17  |         user: MOCK_USER,
  18  |         expires: new Date(Date.now() + 86_400_000).toISOString(),
  19  |       }),
  20  |     }),
  21  |   )
  22  | }
  23  | 
  24  | /** Stub dashboard API to return deterministic test data. */
  25  | async function mockDashboardApi(page: Page) {
  26  |   await page.route("**/api/dashboard", (route) =>
  27  |     route.fulfill({
  28  |       status: 200,
  29  |       contentType: "application/json",
  30  |       body: JSON.stringify({
  31  |         totalSales: 15200,
  32  |         estimatedProfit: 4800,
  33  |         productCount: 142,
  34  |         customerCount: 89,
  35  |         totalExpenses: 3200,
  36  |         invoiceCount: 67,
  37  |         recentInvoices: [
  38  |           { id: "inv-1", invoiceNo: 1024, grandTotal: "450.00", createdAt: new Date().toISOString(), user: { name: "أحمد" } },
  39  |           { id: "inv-2", invoiceNo: 1023, grandTotal: "230.00", createdAt: new Date(Date.now() - 86_400_000).toISOString(), user: { name: "سارة" } },
  40  |         ],
  41  |       }),
  42  |     }),
  43  |   )
  44  | }
  45  | 
  46  | /** Stub POS products API. */
  47  | async function mockPosApi(page: Page) {
  48  |   await page.route("**/api/pos/products*", (route) =>
  49  |     route.fulfill({
  50  |       status: 200,
  51  |       contentType: "application/json",
  52  |       body: JSON.stringify([
  53  |         { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
  54  |         { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75, barcode: "222222" },
  55  |         { id: "p3", nameAr: "منتج ت", name: "Product C", price: 15, stock: 0, barcode: "333333" },
  56  |       ]),
  57  |     }),
  58  |   )
  59  | }
  60  | 
  61  | /** Stub categories API. */
  62  | async function mockCategoriesApi(page: Page) {
  63  |   await page.route("**/api/categories", (route) =>
  64  |     route.fulfill({
  65  |       status: 200,
  66  |       contentType: "application/json",
  67  |       body: JSON.stringify([
  68  |         { id: "c1", nameAr: "فئة 1", _count: { products: 5 } },
  69  |         { id: "c2", nameAr: "فئة 2", _count: { products: 3 } },
  70  |       ]),
  71  |     }),
  72  |   )
  73  | }
  74  | 
  75  | /** Stub customers API. */
  76  | async function mockCustomersApi(page: Page) {
  77  |   await page.route("**/api/customers*", (route) =>
  78  |     route.fulfill({
  79  |       status: 200,
  80  |       contentType: "application/json",
  81  |       body: JSON.stringify([
  82  |         { id: "cust1", name: "عميل 1", phone: "0555000001" },
  83  |         { id: "cust2", name: "عميل 2", phone: "0555000002" },
  84  |       ]),
  85  |     }),
  86  |   )
  87  | }
  88  | 
  89  | /** Navigate to a (dashboard) sub-route which renders the sidebar layout with #main-content. */
  90  | async function goToDashboardRoute(page: Page, route = "/pos") {
> 91  |   await page.goto(route, { waitUntil: "networkidle" })
      |              ^ Error: page.goto: Target page, context or browser has been closed
  92  |   await page.waitForSelector("#main-content", { timeout: 10000 })
  93  | }
  94  | 
  95  | // ---------------------------------------------------------------------------
  96  | // Tests
  97  | // ---------------------------------------------------------------------------
  98  | test.describe("Login page", () => {
  99  |   test("renders form with email, password, and submit button", async ({ page }) => {
  100 |     await page.goto("/login")
  101 | 
  102 |     await expect(page.locator("h1")).toContainText("قنوات")
  103 |     await expect(page.locator("#email")).toBeVisible()
  104 |     await expect(page.locator("#password")).toBeVisible()
  105 |     await expect(page.getByRole("button", { name: /تسجيل الدخول/i })).toBeVisible()
  106 |     await expect(page.locator("#email")).toHaveValue("admin@pos.com")
  107 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  108 |   })
  109 | 
  110 |   test("shows error toast on invalid credentials", async ({ page, browser }) => {
  111 |     const ctx = await browser.newContext({ storageState: undefined })
  112 |     const p = await ctx.newPage()
  113 |     await p.goto("/login")
  114 |     await p.locator("#email").fill("wrong@email.com")
  115 |     await p.locator("#password").fill("wrongpass")
  116 |     await p.getByRole("button", { name: /تسجيل الدخول/i }).click()
  117 | 
  118 |     await expect(p.getByText(/البريد الإلكتروني أو كلمة المرور/i)).toBeVisible({ timeout: 8000 })
  119 |     await ctx.close()
  120 |   })
  121 | })
  122 | 
  123 | test.describe("Homepage (landing page)", () => {
  124 |   test("shows landing page for unauthenticated visitors", async ({ browser }) => {
  125 |     const ctx = await browser.newContext({ storageState: undefined })
  126 |     const page = await ctx.newPage()
  127 |     await page.goto("/", { waitUntil: "networkidle" })
  128 |     await expect(page.getByText("نظام متكامل لإدارة المبيعات والمخزون")).toBeVisible({ timeout: 10000 })
  129 |     await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
  130 |     await ctx.close()
  131 |   })
  132 | 
  133 |   test("landing page has CTA linking to login", async ({ browser }) => {
  134 |     const ctx = await browser.newContext({ storageState: undefined })
  135 |     const page = await ctx.newPage()
  136 |     await page.goto("/", { waitUntil: "networkidle" })
  137 |     await expect(page.getByText("ابدأ الآن مجاناً")).toBeVisible()
  138 |   })
  139 | })
  140 | 
  141 | test.describe("Dashboard", () => {
  142 |   test.beforeEach(async ({ page }) => {
  143 |     await setupAuth(page)
  144 |     await mockDashboardApi(page)
  145 |     await mockCategoriesApi(page)
  146 |   })
  147 | 
  148 |   test("renders KPI cards with data", async ({ page }) => {
  149 |     await page.goto("/", { waitUntil: "networkidle" })
  150 |     await page.waitForSelector("#main-content")
  151 | 
  152 |     await expect(page.getByText("لوحة التحكم")).toBeVisible()
  153 |     // Summary items appear in both stat cards + summary list → use .first()
  154 |     await expect(page.getByText("إجمالي المبيعات").first()).toBeVisible()
  155 |     await expect(page.getByText("صافي الربح").first()).toBeVisible()
  156 |     await expect(page.getByText("المنتجات", { exact: true }).first()).toBeVisible()
  157 |     await expect(page.getByText("العملاء").first()).toBeVisible()
  158 |   })
  159 | 
  160 |   test("renders charts (recharts SVGs) on dashboard", async ({ page }) => {
  161 |     await page.goto("/", { waitUntil: "networkidle" })
  162 |     await page.waitForSelector("#main-content")
  163 | 
  164 |     await expect(page.locator(".recharts-wrapper")).toHaveCount(2)
  165 |     await expect(page.locator(".recharts-bar")).toBeVisible()
  166 |     await expect(page.locator(".recharts-pie")).toBeVisible()
  167 |   })
  168 | 
  169 |   test("shows quick action cards and navigates on click", async ({ page }) => {
  170 |     await page.goto("/", { waitUntil: "networkidle" })
  171 |     await page.waitForSelector("#main-content")
  172 | 
  173 |     await expect(page.getByText("نقطة البيع").first()).toBeVisible()
  174 |     await expect(page.getByText("منتج جديد")).toBeVisible()
  175 |     await expect(page.getByText("الفواتير").first()).toBeVisible()
  176 |   })
  177 | 
  178 |   test("live badge appears", async ({ page }) => {
  179 |     await page.goto("/", { waitUntil: "networkidle" })
  180 |     await page.waitForSelector("#main-content")
  181 | 
  182 |     await expect(page.getByText("مباشر")).toBeVisible()
  183 |   })
  184 | })
  185 | 
  186 | test.describe("POS page", () => {
  187 |   test.beforeEach(async ({ page }) => {
  188 |     await setupAuth(page)
  189 |     // Set up API mocks BEFORE navigating to /pos
  190 |     await mockPosApi(page)
  191 |     await mockCategoriesApi(page)
```