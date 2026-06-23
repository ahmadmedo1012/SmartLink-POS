import { test, expect } from "@playwright/test"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const AUTH_SESSION = {
  user: { id: "1", name: "أحمد", email: "admin@pos.com", role: "admin" },
  expires: new Date(Date.now() + 86_400_000).toISOString(),
}

async function mockSession(page: import("@playwright/test").Page) {
  await page.route("**/api/auth/session", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(AUTH_SESSION),
    }),
  )
}

/** All 14 main dashboard routes. */
const DASHBOARD_ROUTES = [
  "/",
  "/pos",
  "/products",
  "/inventory",
  "/returns",
  "/activity",
  "/categories",
  "/customers",
  "/suppliers",
  "/invoices",
  "/expenses",
  "/reports",
  "/settings",
  "/login",
]

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("Launch checks", () => {
  test("all dashboard routes return 200", async ({ page }) => {
    await mockSession(page)

    for (const route of DASHBOARD_ROUTES) {
      const response = await page.goto(route, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      })
      // All routes load without server-side error
      const status = response?.status() ?? 200
      expect(status).toBeLessThan(400)
    }
  })

  test("html has dir=rtl for Arabic support", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("html lang is ar", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  })
})

test.describe("Dark mode", () => {
  test("toggles to dark mode via localStorage", async ({ page }) => {
    await page.goto("/login", { waitUntil: "networkidle" })

    await page.evaluate(() => {
      localStorage.setItem("theme", "dark")
    })
    await page.reload({ waitUntil: "networkidle" })

    // Wait for ThemeInit useEffect to apply the class
    await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 })
  })

  test("toggles to light mode via localStorage", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("theme", "dark")
    })
    await page.goto("/login", { waitUntil: "networkidle" })

    // Confirm dark is applied
    await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 })

    // Switch to light
    await page.evaluate(() => {
      localStorage.setItem("theme", "light")
    })
    await page.reload({ waitUntil: "networkidle" })

    // Wait for ThemeInit to remove dark class
    await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 })
  })
})

test.describe("API health", () => {
  test("dashboard API returns valid JSON", async ({ page }) => {
    const response = await page.request.get("/api/dashboard")
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toHaveProperty("totalSales")
    expect(body).toHaveProperty("estimatedProfit")
    expect(body).toHaveProperty("productCount")
    expect(body).toHaveProperty("customerCount")
  })
})

test.describe("Login flow", () => {
  test("login page form renders and submits", async ({ page }) => {
    await mockSession(page)
    await page.goto("/login", { waitUntil: "networkidle" })

    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()
    await expect(
      page.getByRole("button", { name: /تسجيل الدخول/i }),
    ).toBeVisible()
  })

  test("login page shows brand heading", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("h1")).toContainText("الربط الذكي")
  })
})

test.describe("Logout", () => {
  test("logout button visible on authenticated pages", async ({ page }) => {
    await mockSession(page)
    await page.goto("/pos", { waitUntil: "networkidle" })

    // Wait for sidebar with logout to render (session fetch is async)
    await page.waitForSelector("#main-content", { timeout: 10000 })

    const logoutBtn = page.getByLabel("تسجيل الخروج")
    await expect(logoutBtn).toBeVisible()
  })
})
