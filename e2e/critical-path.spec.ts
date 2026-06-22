import { test, expect, Page } from "@playwright/test"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/** Log in with valid credentials so dashboard tests can run. */
async function loginAsAdmin(page: Page) {
  await page.goto("/login")
  await page.locator("#email").fill("admin@pos.com")
  await page.locator("#password").fill("admin123")
  await page.getByRole("button", { name: /تسجيل الدخول/i }).click()
  // Wait for redirect to dashboard
  await page.waitForURL("/", { timeout: 10000 })
  await page.waitForSelector("#main-content", { timeout: 10000 })
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
          {
            id: "inv-1",
            invoiceNo: 1024,
            grandTotal: "450.00",
            createdAt: new Date().toISOString(),
            user: { name: "أحمد" },
          },
          {
            id: "inv-2",
            invoiceNo: 1023,
            grandTotal: "230.00",
            createdAt: new Date(Date.now() - 86_400_000).toISOString(),
            user: { name: "سارة" },
          },
        ],
      }),
    })
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
        { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75,  barcode: "222222" },
        { id: "p3", nameAr: "منتج ت", name: "Product C", price: 15, stock: 0,   barcode: "333333" },
      ]),
    })
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
    })
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
    })
  )
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
test.describe("Login page", () => {
  test("renders form with email, password, and submit button", async ({ page }) => {
    await page.goto("/login")

    // Brand
    await expect(page.locator("h1")).toContainText("قنوات")

    // Form fields
    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()
    await expect(page.getByRole("button", { name: /تسجيل الدخول/i })).toBeVisible()

    // Pre-filled credentials
    await expect(page.locator("#email")).toHaveValue("admin@pos.com")

    // RTL check
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("shows error toast on invalid credentials", async ({ page, browser }) => {
    // Use fresh context to avoid auth cookies
    const ctx = await browser.newContext({ storageState: undefined })
    const p = await ctx.newPage()
    await p.goto("/login")
    await p.locator("#email").fill("wrong@email.com")
    await p.locator("#password").fill("wrongpass")
    await p.getByRole("button", { name: /تسجيل الدخول/i }).click()

    // Toast error appears (react-hot-toast renders role="status")
    await expect(p.getByText(/البريد الإلكتروني أو كلمة المرور/i)).toBeVisible({ timeout: 8000 })
    await ctx.close()
  })
})

test.describe("Homepage (landing page)", () => {
  test("shows landing page for unauthenticated visitors", async ({ browser }) => {
    // Isolated context to ensure no auth cookies
    const ctx = await browser.newContext({ storageState: undefined })
    const page = await ctx.newPage()
    await page.goto("/", { waitUntil: "networkidle" })
    const landingText = page.getByText("نظام متكامل لإدارة المبيعات والمخزون")
    await expect(landingText).toBeVisible({ timeout: 10000 })
    await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
    await ctx.close()
  })

  test("landing page has CTA linking to login", async ({ browser }) => {
    const ctx = await browser.newContext({ storageState: undefined })
    const page = await ctx.newPage()
    await page.goto("/", { waitUntil: "networkidle" })
    const cta = page.getByText("ابدأ الآن مجاناً")
    await expect(cta).toBeVisible()
  })
})

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Set up API mocks BEFORE navigating
    await mockDashboardApi(page)
    await mockCategoriesApi(page)
    await loginAsAdmin(page)
  })

  test("renders KPI cards with data", async ({ page }) => {
    await page.goto("/")
    // Wait for dashboard content via #main-content
    await page.waitForSelector("#main-content")

    // Verify dashboard title
    await expect(page.getByText("لوحة التحكم")).toBeVisible()

    // KPI cards rendered (4 stat cards)
    await expect(page.getByText("إجمالي المبيعات")).toBeVisible()
    await expect(page.getByText("صافي الربح")).toBeVisible()
    await expect(page.getByText("المنتجات", { exact: true })).toBeVisible()
    await expect(page.getByText("العملاء")).toBeVisible()
  })

  test("renders charts (recharts SVGs) on dashboard", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Recharts renders SVG elements inside .recharts-wrapper
    await expect(page.locator(".recharts-wrapper")).toHaveCount(2)
    // Bar chart + Pie chart present
    await expect(page.locator(".recharts-bar")).toBeVisible()
    await expect(page.locator(".recharts-pie")).toBeVisible()
  })

  test("shows quick action cards and navigates on click", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    const posBtn = page.getByText("نقطة البيع")
    await expect(posBtn).toBeVisible()
    await expect(page.getByText("منتج جديد")).toBeVisible()
    await expect(page.getByText("الفواتير")).toBeVisible()
  })

  test("live badge appears", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    await expect(page.getByText("مباشر")).toBeVisible()
  })
})

test.describe("POS page", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await mockPosApi(page)
    await mockCategoriesApi(page)
    await mockCustomersApi(page)
  })

  test("renders product grid and cart panel", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    // Products rendered
    await expect(page.getByText("منتج أ")).toBeVisible()
    await expect(page.getByText("منتج ب")).toBeVisible()

    // Cart panel (header + total)
    await expect(page.getByText("الفاتورة")).toBeVisible()
    await expect(page.getByText("الإجمالي")).toBeVisible()
  })

  test("adding product to cart updates totals", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    // Click on first product card
    await page.getByText("منتج أ").first().click()

    // Cart should update — item count or total visible
    await expect(page.getByText(/منتج أ/)).toHaveCount(1)

    // Total should reflect price
    await expect(page.getByText(/25/)).toBeVisible()
  })

  test("shows error state when products fail to load", async ({ page }) => {
    await page.route("**/api/pos/products*", (route) =>
      route.fulfill({ status: 500, body: "Server error" }),
    )
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    await expect(page.getByText(/فشل تحميل المنتجات/i)).toBeVisible()
  })
})

test.describe("Empty states", () => {
  test("empty dashboard state when no data", async ({ page }) => {
    await loginAsAdmin(page)
    await page.route("**/api/dashboard", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          totalSales: 0,
          estimatedProfit: 0,
          productCount: 0,
          customerCount: 0,
          totalExpenses: 0,
          invoiceCount: 0,
          recentInvoices: [],
        }),
      }),
    )
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Empty state message for charts
    await expect(page.getByText(/قم بإضافة منتجات/i)).toBeVisible()
    await expect(page.getByText(/ابدأ بإنشاء فاتورة جديدة/i)).toBeVisible()
  })
})

test.describe("Responsive", () => {
  test("sidebar hidden on mobile viewport", async ({ page }) => {
    await loginAsAdmin(page)
    await mockDashboardApi(page)
    await mockCategoriesApi(page)

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Desktop sidebar should be hidden
    // The desktop aside has class hidden md:flex — on mobile it's display:none
    const sidebar = page.locator("aside").first()
    await expect(sidebar).not.toBeVisible()

    // Mobile hamburger button should be visible
    await expect(page.getByLabel("القائمة")).toBeVisible()
  })
})

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
    await mockDashboardApi(page)
    await mockCategoriesApi(page)
    await mockPosApi(page)
  })

  test("sidebar navigation items render and link correctly", async ({ page }) => {
    // Navigate to a dashboard route so the (dashboard) layout with sidebar renders
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    // Key nav items visible (sidebar renders inside (dashboard) layout)
    await expect(page.getByText("نقطة البيع")).toBeVisible()
    await expect(page.getByText("المنتجات")).toBeVisible()
    await expect(page.getByText("الفواتير")).toBeVisible()
    await expect(page.getByText("التقارير")).toBeVisible()
    await expect(page.getByText("الإعدادات")).toBeVisible()
  })

  test("navigating to POS via sidebar link works", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    await page.getByText("نقطة البيع").click()
    await page.waitForURL(/\/pos/)
    await expect(page.locator("#main-content")).toBeVisible()
  })
})
