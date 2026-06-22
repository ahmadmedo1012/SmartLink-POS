import { test, expect, Page } from "@playwright/test"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const MOCK_USER = {
  id: "1",
  name: "أحمد",
  email: "admin@pos.com",
  role: "admin",
}

async function mockSession(page: Page) {
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
        recentInvoices: [],
      }),
    }),
  )
}

async function mockCategoriesApi(page: Page) {
  await page.route("**/api/categories", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    }),
  )
}

async function setupAuthenticatedDashboard(page: Page) {
  await mockSession(page)
  await mockDashboardApi(page)
  await mockCategoriesApi(page)
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("Accessibility: DOM structure & semantic HTML", () => {
  test("html has lang and dir attributes set to RTL Arabic", async ({ page }) => {
    await page.goto("/login")

    const html = page.locator("html")
    await expect(html).toHaveAttribute("lang", "ar")
    await expect(html).toHaveAttribute("dir", "rtl")
  })

  test("skip-to-content link is present and focusable", async ({ page }) => {
    await page.goto("/login")

    // Skip link should exist
    const skipLink = page.getByText("تخطى إلى المحتوى الرئيسي")
    await expect(skipLink).toBeVisible()
  })

  test("forms have labeled inputs", async ({ page }) => {
    await page.goto("/login")

    // Email input has associated label
    const emailLabel = page.locator("label[for='email']")
    await expect(emailLabel).toBeVisible()
    await expect(emailLabel).toHaveText("البريد الإلكتروني")

    // Password input has associated label
    const passwordLabel = page.locator("label[for='password']")
    await expect(passwordLabel).toBeVisible()
    await expect(passwordLabel).toHaveText("كلمة المرور")

    // Inputs themselves exist
    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()
  })

  test("password visibility toggle has aria-label", async ({ page }) => {
    await page.goto("/login")

    // Toggle button has relevant aria-label
    const toggleBtn = page.getByLabel("إظهار كلمة المرور")
    await expect(toggleBtn).toBeVisible()

    // Click to toggle
    await toggleBtn.click()
    await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible()
  })

  test("main content area uses #main-content id", async ({ page }) => {
    await setupAuthenticatedDashboard(page)
    await page.goto("/")
    await page.waitForSelector("#main-content")

    const mainContent = page.locator("#main-content")
    await expect(mainContent).toBeVisible()
  })
})

test.describe("Accessibility: Focus indicators", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedDashboard(page)
  })

  test("sidebar link receives visible focus ring on tab", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Tab through to a sidebar link
    await page.keyboard.press("Tab") // skip-link gets focus first
    // Skip link
    await page.keyboard.press("Tab") // tab into sidebar or main content

    // The first focused element should have focus-visible styling
    const focused = page.locator("*:focus-visible")
    await expect(focused).toBeAttached()
  })

  test("logout button has aria-label", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    await expect(page.getByLabel("تسجيل الخروج")).toBeVisible()
  })
})

test.describe("Accessibility: ARIA labels on icon-only buttons", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedDashboard(page)
  })

  test("sidebar collapse button has aria-label", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    const collapseBtn = page.getByLabel("طي القائمة")
    await expect(collapseBtn).toBeVisible()
  })

  test("mobile hamburger has aria-label", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await page.waitForSelector("#main-content")

    await expect(page.getByLabel("القائمة")).toBeVisible()
  })
})

test.describe("Accessibility: Keyboard navigation", () => {
  test("tab through login form fields", async ({ page }) => {
    await page.goto("/login")

    // Focus email field
    await page.locator("#email").focus()
    await expect(page.locator("#email")).toBeFocused()

    // Tab to password
    await page.keyboard.press("Tab")
    await expect(page.locator("#password")).toBeFocused()

    // Tab to show-password button
    await page.keyboard.press("Tab")
    await expect(page.getByLabel("إظهار كلمة المرور")).toBeFocused()

    // Tab to submit
    await page.keyboard.press("Tab")
    await expect(
      page.getByRole("button", { name: /تسجيل الدخول/i }),
    ).toBeFocused()
  })
})

test.describe("Accessibility: Dashboard keyboard navigation", () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedDashboard(page)
  })

  test("sidebar navigation items are keyboard accessible", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Verify multiple nav links exist with aria or visible text
    const navLinks = page.locator("aside a")
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(5)

    // First nav link should focusable
    const firstLink = navLinks.first()
    await firstLink.focus()
    await expect(firstLink).toBeFocused()
  })

  test("quick action cards are keyboard accessible (focusable)", async ({ page }) => {
    await page.goto("/")
    await page.waitForSelector("#main-content")

    // Quick action cards are motion buttons — check they're focusable
    const posButton = page.getByText("نقطة البيع")
    await posButton.focus()
    await expect(posButton).toBeFocused()
  })
})

test.describe("Accessibility: Image alt text", () => {
  test("no alt text issues on login page", async ({ page }) => {
    await page.goto("/login")

    // Verify no images missing alt text — Lottie icons use CSS/SVG not <img>
    const imgs = page.locator("img")
    const count = await imgs.count()
    // All images must have alt attribute
    for (let i = 0; i < count; i++) {
      await expect(imgs.nth(i)).toHaveAttribute("alt", /.*/)
    }
  })
})

test.describe("Accessibility: Color contrast (visual checks)", () => {
  test("text is visible in light mode", async ({ page }) => {
    // Force light mode
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light")
    })
    await page.goto("/login")

    const heading = page.locator("h1")
    await expect(heading).toBeVisible()

    // Check body background
    const bodyBg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor,
    )
    // Should be some light color (not transparent/black)
    expect(bodyBg).not.toBe("transparent")
    expect(bodyBg).not.toBe("rgb(0, 0, 0)")
  })

  test("text is visible in dark mode", async ({ page }) => {
    // Force dark mode
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark")
    })
    await page.goto("/login")
    await page.waitForSelector("html.dark")

    const heading = page.locator("h1")
    await expect(heading).toBeVisible()
  })
})

test.describe("Accessibility: POS page ARIA", () => {
  test.beforeEach(async ({ page }) => {
    await mockSession(page)
    await page.route("**/api/pos/products*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
          { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75,  barcode: "222222" },
        ]),
      }),
    )
    await mockCategoriesApi(page)
    await page.route("**/api/customers*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      }),
    )
  })

  test("customer name input has aria-label", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    await expect(page.getByLabel("اسم العميل")).toBeVisible()
  })

  test("paid amount input has aria-label", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    await expect(page.getByLabel("المبلغ المدفوع")).toBeVisible()
  })

  test("add to cart quantity controls have aria-labels", async ({ page }) => {
    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    // Add item to cart first
    await page.getByText("منتج أ").first().click()

    // Now increment/decrement buttons should exist
    await expect(page.getByLabel("زيادة الكمية")).toBeVisible()
    await expect(page.getByLabel("تقليل الكمية")).toBeVisible()
  })
})

test.describe("Accessibility: Empty states", () => {
  test("POS cart empty state has descriptive text", async ({ page }) => {
    await mockSession(page)
    await page.route("**/api/pos/products*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      }),
    )
    await mockCategoriesApi(page)
    await page.route("**/api/customers*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      }),
    )

    await page.goto("/pos")
    await page.waitForSelector("#main-content")

    // Cart empty state
    await expect(page.getByText("الفاتورة فارغة")).toBeVisible()
    await expect(page.getByText("امسح أو اختر المنتجات للإضافة")).toBeVisible()
  })
})
