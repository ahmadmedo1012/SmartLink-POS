# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: Empty states >> POS cart empty state has descriptive text
- Location: e2e/accessibility.spec.ts:323:7

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
- alert
- heading "قنوات" [level=1]
- paragraph: Smart Link للأعمال
- paragraph: نظام متكامل لإدارة المبيعات والمخزون ونقاط البيع
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
- paragraph: © 2026 قنوات | Smart Link. جميع الحقوق محفوظة.
```

# Test source

```ts
  245 |     await page.goto("/login")
  246 | 
  247 |     const heading = page.locator("h1")
  248 |     await expect(heading).toBeVisible()
  249 | 
  250 |     // Check body background
  251 |     const bodyBg = await page.evaluate(() =>
  252 |       getComputedStyle(document.body).backgroundColor,
  253 |     )
  254 |     // Should be some light color (not transparent/black)
  255 |     expect(bodyBg).not.toBe("transparent")
  256 |     expect(bodyBg).not.toBe("rgb(0, 0, 0)")
  257 |   })
  258 | 
  259 |   test("text is visible in dark mode", async ({ page }) => {
  260 |     // Force dark mode
  261 |     await page.addInitScript(() => {
  262 |       localStorage.setItem("theme", "dark")
  263 |     })
  264 |     await page.goto("/login")
  265 |     await page.waitForSelector("html.dark")
  266 | 
  267 |     const heading = page.locator("h1")
  268 |     await expect(heading).toBeVisible()
  269 |   })
  270 | })
  271 | 
  272 | test.describe("Accessibility: POS page ARIA", () => {
  273 |   test.beforeEach(async ({ page }) => {
  274 |     await mockSession(page)
  275 |     await page.route("**/api/pos/products*", (route) =>
  276 |       route.fulfill({
  277 |         status: 200,
  278 |         contentType: "application/json",
  279 |         body: JSON.stringify([
  280 |           { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
  281 |           { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75,  barcode: "222222" },
  282 |         ]),
  283 |       }),
  284 |     )
  285 |     await mockCategoriesApi(page)
  286 |     await page.route("**/api/customers*", (route) =>
  287 |       route.fulfill({
  288 |         status: 200,
  289 |         contentType: "application/json",
  290 |         body: JSON.stringify([]),
  291 |       }),
  292 |     )
  293 |   })
  294 | 
  295 |   test("customer name input has aria-label", async ({ page }) => {
  296 |     await page.goto("/pos")
  297 |     await page.waitForSelector("#main-content")
  298 | 
  299 |     await expect(page.getByLabel("اسم العميل")).toBeVisible()
  300 |   })
  301 | 
  302 |   test("paid amount input has aria-label", async ({ page }) => {
  303 |     await page.goto("/pos")
  304 |     await page.waitForSelector("#main-content")
  305 | 
  306 |     await expect(page.getByLabel("المبلغ المدفوع")).toBeVisible()
  307 |   })
  308 | 
  309 |   test("add to cart quantity controls have aria-labels", async ({ page }) => {
  310 |     await page.goto("/pos")
  311 |     await page.waitForSelector("#main-content")
  312 | 
  313 |     // Add item to cart first
  314 |     await page.getByText("منتج أ").first().click()
  315 | 
  316 |     // Now increment/decrement buttons should exist
  317 |     await expect(page.getByLabel("زيادة الكمية")).toBeVisible()
  318 |     await expect(page.getByLabel("تقليل الكمية")).toBeVisible()
  319 |   })
  320 | })
  321 | 
  322 | test.describe("Accessibility: Empty states", () => {
  323 |   test("POS cart empty state has descriptive text", async ({ page }) => {
  324 |     await mockSession(page)
  325 |     await page.route("**/api/pos/products*", (route) =>
  326 |       route.fulfill({
  327 |         status: 200,
  328 |         contentType: "application/json",
  329 |         body: JSON.stringify([]),
  330 |       }),
  331 |     )
  332 |     await mockCategoriesApi(page)
  333 |     await page.route("**/api/customers*", (route) =>
  334 |       route.fulfill({
  335 |         status: 200,
  336 |         contentType: "application/json",
  337 |         body: JSON.stringify([]),
  338 |       }),
  339 |     )
  340 | 
  341 |     await page.goto("/pos")
  342 |     await page.waitForSelector("#main-content")
  343 | 
  344 |     // Cart empty state
> 345 |     await expect(page.getByText("الفاتورة فارغة")).toBeVisible()
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  346 |     await expect(page.getByText("امسح أو اختر المنتجات للإضافة")).toBeVisible()
  347 |   })
  348 | })
  349 | 
```