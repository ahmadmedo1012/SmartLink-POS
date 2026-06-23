import { test, expect } from "@playwright/test"

const BASE = "https://pos-m80w.onrender.com"

test.describe("Launch Health Checks", () => {
  test("homepage loads with landing", async ({ page }) => {
    await page.goto(BASE)
    await expect(page.getByText("Smart Link للأعمال")).toBeVisible({ timeout: 15000 })
  })

  test("login page loads correctly", async ({ page }) => {
    await page.goto(`${BASE}/login`)
    await expect(page.locator("#email")).toBeVisible({ timeout: 10000 })
    await expect(page.locator("#password")).toBeVisible()
    await expect(page.getByText("تسجيل الدخول")).toBeVisible()
  })

  test("favicon exists", async ({ page }) => {
    await page.goto(BASE)
    const favicon = page.locator('link[rel="icon"]').first()
    await expect(favicon).toHaveAttribute("href", /favicon/)
  })

  test("page has RT language and direction", async ({ page }) => {
    await page.goto(BASE)
    await expect(page.locator("html")).toHaveAttribute("lang", "ar")
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("landing has feature section", async ({ page }) => {
    await page.goto(BASE)
    await expect(page.getByText("مميزات متكاملة")).toBeVisible({ timeout: 10000 })
  })

  test("login page has brand header", async ({ page }) => {
    await page.goto(`${BASE}/login`)
    await expect(page.getByText("Smart Link للأعمال")).toBeVisible({ timeout: 10000 })
    await expect(page.getByText("الربط الذكي").first()).toBeVisible()
  })
})
