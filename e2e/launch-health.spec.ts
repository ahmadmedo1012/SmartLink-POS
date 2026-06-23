import { test, expect } from "@playwright/test"

const PROD = "https://pos-m80w.onrender.com"

test.describe("Launch Health Checks", () => {
  test("homepage loads with landing", async ({ page, baseURL }) => {
    await page.goto(baseURL || PROD)
    await expect(page.getByRole("heading", { name: /Smart Link/ })).toBeVisible({ timeout: 15000 })
  })

  test("login page loads correctly", async ({ page, baseURL }) => {
    await page.goto(`${baseURL || PROD}/login`)
    await expect(page.locator("#email")).toBeVisible({ timeout: 10000 })
    await expect(page.locator("#password")).toBeVisible()
    await expect(page.getByText("تسجيل الدخول")).toBeVisible()
  })

  test("favicon exists", async ({ page, baseURL }) => {
    await page.goto(baseURL || PROD)
    const favicon = page.locator('link[rel="icon"]').first()
    await expect(favicon).toHaveAttribute("href", /logo/)
  })

  test("page has RT language and direction", async ({ page, baseURL }) => {
    await page.goto(baseURL || PROD)
    await expect(page.locator("html")).toHaveAttribute("lang", "ar")
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  })

  test("landing has feature section", async ({ page, baseURL }) => {
    await page.goto(baseURL || PROD)
    await expect(page.getByText("مميزات متكاملة")).toBeVisible({ timeout: 10000 })
  })

  test("login page has brand header", async ({ page, baseURL }) => {
    await page.goto(`${baseURL || PROD}/login`)
    await expect(page.getByRole("heading", { name: /الربط الذكي/ })).toBeVisible({ timeout: 10000 })
    await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
  })
})
