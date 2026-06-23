# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: launch-health.spec.ts >> Launch Health Checks >> login page has brand header
- Location: e2e/launch-health.spec.ts:35:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Smart Link للأعمال')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Smart Link للأعمال')

```

```yaml
- link "تخطى إلى المحتوى الرئيسي":
  - /url: "#main-content"
- img "Smart Link"
- heading "الربط الذكي" [level=1]
- paragraph: نظام متكامل من Smart Link
- paragraph: إدارة المبيعات والمخزون ونقاط البيع — منصة واحدة
- text: البريد الإلكتروني
- textbox "البريد الإلكتروني":
  - /placeholder: admin@pos.com
  - text: admin@pos.com
- text: كلمة المرور
- textbox "كلمة المرور":
  - /placeholder: ••••••••
  - text: admin123
- button "إظهار كلمة المرور"
- button "تسجيل الدخول"
- paragraph:
  - img "Smart Link"
  - text: © 2026 الربط الذكي | Smart Link. جميع الحقوق محفوظة.
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | const BASE = "https://pos-m80w.onrender.com"
  4  | 
  5  | test.describe("Launch Health Checks", () => {
  6  |   test("homepage loads with landing", async ({ page }) => {
  7  |     await page.goto(BASE)
  8  |     await expect(page.getByText("Smart Link للأعمال")).toBeVisible({ timeout: 15000 })
  9  |   })
  10 | 
  11 |   test("login page loads correctly", async ({ page }) => {
  12 |     await page.goto(`${BASE}/login`)
  13 |     await expect(page.locator("#email")).toBeVisible({ timeout: 10000 })
  14 |     await expect(page.locator("#password")).toBeVisible()
  15 |     await expect(page.getByText("تسجيل الدخول")).toBeVisible()
  16 |   })
  17 | 
  18 |   test("favicon exists", async ({ page }) => {
  19 |     await page.goto(BASE)
  20 |     const favicon = page.locator('link[rel="icon"]').first()
  21 |     await expect(favicon).toHaveAttribute("href", /favicon/)
  22 |   })
  23 | 
  24 |   test("page has RT language and direction", async ({ page }) => {
  25 |     await page.goto(BASE)
  26 |     await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  27 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  28 |   })
  29 | 
  30 |   test("landing has feature section", async ({ page }) => {
  31 |     await page.goto(BASE)
  32 |     await expect(page.getByText("مميزات متكاملة")).toBeVisible({ timeout: 10000 })
  33 |   })
  34 | 
  35 |   test("login page has brand header", async ({ page }) => {
  36 |     await page.goto(`${BASE}/login`)
> 37 |     await expect(page.getByText("Smart Link للأعمال")).toBeVisible({ timeout: 10000 })
     |                                                        ^ Error: expect(locator).toBeVisible() failed
  38 |     await expect(page.getByText("الربط الذكي").first()).toBeVisible()
  39 |   })
  40 | })
  41 | 
```