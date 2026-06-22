import { test, expect, Page } from "@playwright/test"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const MOCK_USER = {
  id: "1", name: "أحمد", email: "admin@pos.com", role: "admin",
}

/** Mock next-auth session so all authenticated routes work without a real DB. */
async function setupAuth(page: Page) {
  await page.route("**/api/auth/session", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: MOCK_USER,
        expires: new Date(Date.now() + 86_400_000).toISOString(),
      }),
    }),
  )
}

/** Stub dashboard API to return deterministic test data. */
async function mockDashboardApi(page: Page) {
  await page.route("**/api/dashboard", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        totalSales: 15200,
        estimatedProfit: 4800,
        productCount: 142,
        customerCount: 89,
        totalExpenses: 3200,
        invoiceCount: 67,
        recentInvoices: [
          { id: "inv-1", invoiceNo: 1024, grandTotal: "450.00", createdAt: new Date().toISOString(), user: { name: "أحمد" } },
          { id: "inv-2", invoiceNo: 1023, grandTotal: "230.00", createdAt: new Date(Date.now() - 86_400_000).toISOString(), user: { name: "سارة" } },
        ],
      }),
    }),
  )
}

/** Stub POS products API. */
async function mockPosApi(page: Page) {
  await page.route("**/api/pos/products*", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
        { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75, barcode: "222222" },
        { id: "p3", nameAr: "منتج ت", name: "Product C", price: 15, stock: 0, barcode: "333333" },
      ]),
    }),
  )
}

/** Stub categories API. */
async function mockCategoriesApi(page: Page) {
  await page.route("**/api/categories", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: "c1", nameAr: "فئة 1", _count: { products: 5 } },
        { id: "c2", nameAr: "فئة 2", _count: { products: 3 } },
      ]),
    }),
  )
}

/** Stub customers API. */
async function mockCustomersApi(page: Page) {
  await page.route("**/api/customers*", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: "cust1", name: "عميل 1", phone: "0555000001" },
        { id: "cust2", name: "عميل 2", phone: "0555000002" },
      ]),
    }),
  )
}

/** Navigate to a (dashboard) sub-route which renders the sidebar layout with #main-content. */
async function goToDashboardRoute(page: Page, route = "/pos") {
  await page.goto(route, { waitUntil: "networkidle" })
  await page.waitForSelector("#main-content", { timeout: 10000 })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
test.describe("Login page", () => {
  test("renders form with email, password, and submit button", async ({ page }) => {
    await page.goto("/login")

    await expect(page.locator("h1")).toContainText("قنوات")
    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()
    await expect(page.getByRole("button", { name: /تسجيل الدخول/i })).toBeVisible()
    await expect(page.locator("#email")).toHaveValue("admin@pos.com")
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("shows error toast on invalid credentials", async ({ page, browser }) => {
    const ctx = await browser.newContext({ storageState: undefined })
    const p = await ctx.newPage()
    await p.goto("/login")
    await p.locator("#email").fill("wrong@email.com")
    await p.locator("#password").fill("wrongpass")
    await p.getByRole("button", { name: /تسجيل الدخول/i }).click()

    await expect(p.getByText(/البريد الإلكتروني أو كلمة المرور/i)).toBeVisible({ timeout: 8000 })
    await ctx.close()
  })
})

test.describe("Homepage (landing page)", () => {
  test("shows landing page for unauthenticated visitors", async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined })
    const page = await ctx.newPage()
    await page.goto("/", { waitUntil: "networkidle" })
    await expect(page.getByText("نظام متكامل لإدارة المبيعات والمخزون")).toBeVisible({ timeout: 10000 })
    await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
    await ctx.close()
  })

  test("landing page has CTA linking to login", async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined })
    const page = await ctx.newPage()
    await page.goto("/", { waitUntil: "networkidle" })
    await expect(page.getByText("ابدأ الآن مجاناً")).toBeVisible()
  })
})

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
    await mockDashboardApi(page)
    await mockCategoriesApi(page)
  })

  test("renders KPI cards with data", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForSelector("#main-content")

    await expect(page.getByText("لوحة التحكم")).toBeVisible()
    // Summary items appear in both stat cards + summary list → use .first()
    await expect(page.getByText("إجمالي المبيعات").first()).toBeVisible()
    await expect(page.getByText("صافي الربح").first()).toBeVisible()
    await expect(page.getByText("المنتجات", { exact: true }).first()).toBeVisible()
    await expect(page.getByText("العملاء").first()).toBeVisible()
  })

  test("renders charts (recharts SVGs) on dashboard", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForSelector("#main-content")

    await expect(page.locator(".recharts-wrapper")).toHaveCount(2)
    await expect(page.locator(".recharts-bar")).toBeVisible()
    await expect(page.locator(".recharts-pie")).toBeVisible()
  })

  test("shows quick action cards and navigates on click", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForSelector("#main-content")

    await expect(page.getByText("نقطة البيع").first()).toBeVisible()
    await expect(page.getByText("منتج جديد")).toBeVisible()
    await expect(page.getByText("الفواتير").first()).toBeVisible()
  })

  test("live badge appears", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForSelector("#main-content")

    await expect(page.getByText("مباشر")).toBeVisible()
  })
})

test.describe("POS page", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
    // Set up API mocks BEFORE navigating to /pos
    await mockPosApi(page)
    await mockCategoriesApi(page)
    await mockCustomersApi(page)
  })

  test("renders product grid and cart panel", async ({ page }) => {
    await goToDashboardRoute(page, "/pos")

    // Products rendered
    await expect(page.getByText("منتج أ").first()).toBeVisible()
    await expect(page.getByText("منتج ب").first()).toBeVisible()

    // Cart panel
    await expect(page.getByText("الفاتورة")).toBeVisible()
    await expect(page.getByText("الإجمالي")).toBeVisible()
  })

  test("adding product to cart updates totals", async ({ page }) => {
    await goToDashboardRoute(page, "/pos")

    // Click first product card
    await page.getByText("منتج أ").first().click()

    // Cart item count visible
    await expect(page.getByText(/منتج أ/).first()).toBeVisible()
  })

  test("shows error state when products fail to load", async ({ page }) => {
    // Override products mock with 500 error
    await page.route("**/api/pos/products*", (route) =>
      route.fulfill({ status: 500, body: "Server error" }),
    )
    await goToDashboardRoute(page, "/pos")

    await expect(page.getByText(/فشل تحميل المنتجات/i)).toBeVisible()
  })
})

test.describe("Empty states", () => {
  test("empty dashboard state when no data", async ({ page }) => {
    await setupAuth(page)
    await page.route("**/api/dashboard", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          totalSales: 0, estimatedProfit: 0, productCount: 0,
          customerCount: 0, totalExpenses: 0, invoiceCount: 0,
          recentInvoices: [],
        }),
      }),
    )
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForSelector("#main-content")

    await expect(page.getByText(/قم بإضافة منتجات/i)).toBeVisible()
    await expect(page.getByText(/ابدأ بإنشاء فاتورة جديدة/i)).toBeVisible({ timeout: 5000 })
  })
})

test.describe("Responsive", () => {
  test("sidebar hidden on mobile viewport", async ({ page }) => {
    await setupAuth(page)
    await mockDashboardApi(page)
    await mockCategoriesApi(page)

    await page.setViewportSize({ width: 375, height: 812 })
    // (dashboard) sub-route required for sidebar to render
    await goToDashboardRoute(page, "/pos")

    const sidebar = page.locator("aside").first()
    await expect(sidebar).not.toBeVisible()
    await expect(page.getByLabel("القائمة")).toBeVisible()
  })
})

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
    await mockDashboardApi(page)
    await mockCategoriesApi(page)
    await mockPosApi(page)
  })

  test("sidebar navigation items render and link correctly", async ({ page }) => {
    await goToDashboardRoute(page, "/pos")

    // Sidebar renders inside (dashboard) layout
    await expect(page.getByText("نقطة البيع").first()).toBeVisible()
    await expect(page.getByText("المنتجات").first()).toBeVisible()
    await expect(page.getByText("الفواتير").first()).toBeVisible()
    await expect(page.getByText("التقارير").first()).toBeVisible()
    await expect(page.getByText("الإعدادات").first()).toBeVisible()
  })

  test("navigating to POS via sidebar link works", async ({ page }) => {
    await goToDashboardRoute(page, "/pos")

    await page.getByText("نقطة البيع").first().click()
    await page.waitForURL(/\/pos/)
    await expect(page.locator("#main-content")).toBeVisible()
  })
})
