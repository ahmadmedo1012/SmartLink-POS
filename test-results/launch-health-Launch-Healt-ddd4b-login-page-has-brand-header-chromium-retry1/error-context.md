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

Locator: getByText('Smart Link للأعمال').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Smart Link للأعمال').first()

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
  3  | const PROD = "https://pos-m80w.onrender.com"
  4  | 
  5  | test.describe("Launch Health Checks", () => {
  6  |   test("homepage loads with landing", async ({ page, baseURL }) => {
  7  |     await page.goto(baseURL || PROD)
  8  |     await expect(page.getByRole("heading", { name: /Smart Link/ })).toBeVisible({ timeout: 15000 })
  9  |   })
  10 | 
  11 |   test("login page loads correctly", async ({ page, baseURL }) => {
  12 |     await page.goto(`${baseURL || PROD}/login`)
  13 |     await expect(page.locator("#email")).toBeVisible({ timeout: 10000 })
  14 |     await expect(page.locator("#password")).toBeVisible()
  15 |     await expect(page.getByText("تسجيل الدخول")).toBeVisible()
  16 |   })
  17 | 
  18 |   test("favicon exists", async ({ page, baseURL }) => {
  19 |     await page.goto(baseURL || PROD)
  20 |     const favicon = page.locator('link[rel="icon"]').first()
  21 |     await expect(favicon).toHaveAttribute("href", /logo/)
  22 |   })
  23 | 
  24 |   test("page has RT language and direction", async ({ page, baseURL }) => {
  25 |     await page.goto(baseURL || PROD)
  26 |     await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  27 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  28 |   })
  29 | 
  30 |   test("landing has feature section", async ({ page, baseURL }) => {
  31 |     await page.goto(baseURL || PROD)
  32 |     await expect(page.getByText("مميزات متكاملة")).toBeVisible({ timeout: 10000 })
  33 |   })
  34 | 
  35 |   test("login page has brand header", async ({ page, baseURL }) => {
  36 |     await page.goto(`${baseURL || PROD}/login`)
  37 |     await expect(page.getByRole("heading", { name: /الربط الذكي/ })).toBeVisible({ timeout: 10000 })
> 38 |     await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
     |                                                                ^ Error: expect(locator).toBeVisible() failed
  39 |   })
  40 | })
  41 | 
```