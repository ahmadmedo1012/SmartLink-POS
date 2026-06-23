# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: launch-checks.spec.ts >> Logout >> logout button visible on authenticated pages
- Location: e2e/launch-checks.spec.ts:134:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('تسجيل الخروج')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel('تسجيل الخروج')

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
  42  | 
  43  | test.describe("Launch checks", () => {
  44  |   test("all dashboard routes return 200", async ({ page }) => {
  45  |     await mockSession(page)
  46  | 
  47  |     for (const route of DASHBOARD_ROUTES) {
  48  |       const response = await page.goto(route, {
  49  |         waitUntil: "domcontentloaded",
  50  |         timeout: 15000,
  51  |       })
  52  |       // All routes load without server-side error
  53  |       const status = response?.status() ?? 200
  54  |       expect(status).toBeLessThan(400)
  55  |     }
  56  |   })
  57  | 
  58  |   test("html has dir=rtl for Arabic support", async ({ page }) => {
  59  |     await page.goto("/login")
  60  |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  61  |   })
  62  | 
  63  |   test("html lang is ar", async ({ page }) => {
  64  |     await page.goto("/login")
  65  |     await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  66  |   })
  67  | })
  68  | 
  69  | test.describe("Dark mode", () => {
  70  |   test("toggles to dark mode via localStorage", async ({ page }) => {
  71  |     await page.goto("/login", { waitUntil: "networkidle" })
  72  | 
  73  |     await page.evaluate(() => {
  74  |       localStorage.setItem("theme", "dark")
  75  |     })
  76  |     await page.reload({ waitUntil: "networkidle" })
  77  | 
  78  |     // Wait for ThemeInit useEffect to apply the class
  79  |     await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 })
  80  |   })
  81  | 
  82  |   test("toggles to light mode via localStorage", async ({ page }) => {
  83  |     await page.evaluate(() => {
  84  |       localStorage.setItem("theme", "dark")
  85  |     })
  86  |     await page.goto("/login", { waitUntil: "networkidle" })
  87  | 
  88  |     // Confirm dark is applied
  89  |     await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 })
  90  | 
  91  |     // Switch to light
  92  |     await page.evaluate(() => {
  93  |       localStorage.setItem("theme", "light")
  94  |     })
  95  |     await page.reload({ waitUntil: "networkidle" })
  96  | 
  97  |     // Wait for ThemeInit to remove dark class
  98  |     await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 })
  99  |   })
  100 | })
  101 | 
  102 | test.describe("API health", () => {
  103 |   test("dashboard API returns valid JSON", async ({ page }) => {
  104 |     const response = await page.request.get("/api/dashboard")
  105 |     expect(response.status()).toBe(200)
  106 | 
  107 |     const body = await response.json()
  108 |     expect(body).toHaveProperty("totalSales")
  109 |     expect(body).toHaveProperty("estimatedProfit")
  110 |     expect(body).toHaveProperty("productCount")
  111 |     expect(body).toHaveProperty("customerCount")
  112 |   })
  113 | })
  114 | 
  115 | test.describe("Login flow", () => {
  116 |   test("login page form renders and submits", async ({ page }) => {
  117 |     await mockSession(page)
  118 |     await page.goto("/login", { waitUntil: "networkidle" })
  119 | 
  120 |     await expect(page.locator("#email")).toBeVisible()
  121 |     await expect(page.locator("#password")).toBeVisible()
  122 |     await expect(
  123 |       page.getByRole("button", { name: /تسجيل الدخول/i }),
  124 |     ).toBeVisible()
  125 |   })
  126 | 
  127 |   test("login page shows brand heading", async ({ page }) => {
  128 |     await page.goto("/login")
  129 |     await expect(page.locator("h1")).toContainText("الربط الذكي")
  130 |   })
  131 | })
  132 | 
  133 | test.describe("Logout", () => {
  134 |   test("logout button visible on authenticated pages", async ({ page }) => {
  135 |     await mockSession(page)
  136 |     await page.goto("/pos", { waitUntil: "networkidle" })
  137 | 
  138 |     // Wait for sidebar with logout to render (session fetch is async)
  139 |     await page.waitForSelector("#main-content", { timeout: 10000 })
  140 | 
  141 |     const logoutBtn = page.getByLabel("تسجيل الخروج")
> 142 |     await expect(logoutBtn).toBeVisible()
      |                             ^ Error: expect(locator).toBeVisible() failed
  143 |   })
  144 | })
  145 | 
```