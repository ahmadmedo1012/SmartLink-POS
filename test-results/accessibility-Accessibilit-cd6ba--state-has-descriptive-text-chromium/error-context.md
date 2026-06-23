# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: Empty states >> POS cart empty state has descriptive text
- Location: e2e/accessibility.spec.ts:302:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('الفاتورة فارغة')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('الفاتورة فارغة')

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
  223 |   test("text is visible in light mode", async ({ page }) => {
  224 |     await page.addInitScript(() => {
  225 |       localStorage.setItem("theme", "light")
  226 |     })
  227 |     await page.goto("/login")
  228 | 
  229 |     const heading = page.locator("h1")
  230 |     await expect(heading).toBeVisible()
  231 | 
  232 |     const bodyBg = await page.evaluate(() =>
  233 |       getComputedStyle(document.body).backgroundColor,
  234 |     )
  235 |     expect(bodyBg).not.toBe("transparent")
  236 |     expect(bodyBg).not.toBe("rgb(0, 0, 0)")
  237 |   })
  238 | 
  239 |   test("text is visible in dark mode", async ({ page }) => {
  240 |     await page.addInitScript(() => {
  241 |       localStorage.setItem("theme", "dark")
  242 |     })
  243 |     await page.goto("/login")
  244 |     await page.waitForSelector("html.dark")
  245 | 
  246 |     const heading = page.locator("h1")
  247 |     await expect(heading).toBeVisible()
  248 |   })
  249 | })
  250 | 
  251 | test.describe("Accessibility: POS page ARIA", () => {
  252 |   test.beforeEach(async ({ page }) => {
  253 |     await mockSession(page)
  254 |     await page.route("**/api/pos/products*", (route) =>
  255 |       route.fulfill({
  256 |         status: 200,
  257 |         contentType: "application/json",
  258 |         body: JSON.stringify([
  259 |           { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
  260 |           { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75, barcode: "222222" },
  261 |         ]),
  262 |       }),
  263 |     )
  264 |     await mockCategoriesApi(page)
  265 |     await page.route("**/api/customers*", (route) =>
  266 |       route.fulfill({
  267 |         status: 200,
  268 |         contentType: "application/json",
  269 |         body: JSON.stringify([]),
  270 |       }),
  271 |     )
  272 |   })
  273 | 
  274 |   test("customer name input has aria-label", async ({ page }) => {
  275 |     await page.goto("/pos", { waitUntil: "networkidle" })
  276 |     await page.waitForSelector("#main-content")
  277 | 
  278 |     await expect(page.getByLabel("اسم العميل")).toBeVisible()
  279 |   })
  280 | 
  281 |   test("paid amount input has aria-label", async ({ page }) => {
  282 |     await page.goto("/pos", { waitUntil: "networkidle" })
  283 |     await page.waitForSelector("#main-content")
  284 | 
  285 |     await expect(page.getByLabel("المبلغ المدفوع")).toBeVisible()
  286 |   })
  287 | 
  288 |   test("add to cart quantity controls have aria-labels", async ({ page }) => {
  289 |     await page.goto("/pos", { waitUntil: "networkidle" })
  290 |     await page.waitForSelector("#main-content")
  291 | 
  292 |     // Add item to cart first
  293 |     await page.getByText("منتج أ").first().click()
  294 | 
  295 |     // Now increment/decrement buttons should exist
  296 |     await expect(page.getByLabel("زيادة الكمية")).toBeVisible()
  297 |     await expect(page.getByLabel("تقليل الكمية")).toBeVisible()
  298 |   })
  299 | })
  300 | 
  301 | test.describe("Accessibility: Empty states", () => {
  302 |   test("POS cart empty state has descriptive text", async ({ page }) => {
  303 |     await mockSession(page)
  304 |     await page.route("**/api/pos/products*", (route) =>
  305 |       route.fulfill({
  306 |         status: 200,
  307 |         contentType: "application/json",
  308 |         body: JSON.stringify([]),
  309 |       }),
  310 |     )
  311 |     await mockCategoriesApi(page)
  312 |     await page.route("**/api/customers*", (route) =>
  313 |       route.fulfill({
  314 |         status: 200,
  315 |         contentType: "application/json",
  316 |         body: JSON.stringify([]),
  317 |       }),
  318 |     )
  319 | 
  320 |     await page.goto("/pos", { waitUntil: "networkidle" })
  321 |     await page.waitForSelector("#main-content")
  322 | 
> 323 |     await expect(page.getByText("الفاتورة فارغة")).toBeVisible()
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  324 |     await expect(page.getByText("امسح أو اختر المنتجات للإضافة")).toBeVisible()
  325 |   })
  326 | })
  327 | 
```