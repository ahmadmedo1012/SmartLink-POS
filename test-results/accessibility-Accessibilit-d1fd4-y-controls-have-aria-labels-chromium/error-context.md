# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: POS page ARIA >> add to cart quantity controls have aria-labels
- Location: e2e/accessibility.spec.ts:309:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('منتج أ').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "تخطى إلى المحتوى الرئيسي" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - button "Open Next.js Dev Tools" [ref=e8] [cursor=pointer]:
    - img [ref=e9]
  - alert [ref=e12]
  - generic [ref=e14]:
    - generic [ref=e15]:
      - img [ref=e17]
      - heading "قنوات" [level=1] [ref=e21]
      - paragraph [ref=e22]: Smart Link للأعمال
      - paragraph [ref=e23]: نظام متكامل لإدارة المبيعات والمخزون ونقاط البيع
    - generic [ref=e26]:
      - generic [ref=e27]:
        - text: البريد الإلكتروني
        - generic [ref=e28]:
          - img
          - textbox "البريد الإلكتروني" [ref=e29]:
            - /placeholder: admin@pos.com
            - text: admin@pos.com
      - generic [ref=e30]:
        - text: كلمة المرور
        - generic [ref=e31]:
          - img
          - textbox "كلمة المرور" [ref=e32]:
            - /placeholder: ••••••••
            - text: admin123
          - button "إظهار كلمة المرور" [ref=e33]:
            - img [ref=e34]
      - button "تسجيل الدخول" [ref=e37] [cursor=pointer]
    - paragraph [ref=e38]: © 2026 قنوات | Smart Link. جميع الحقوق محفوظة.
```

# Test source

```ts
  214 |   test("quick action cards are keyboard accessible (focusable)", async ({ page }) => {
  215 |     await page.goto("/")
  216 |     await page.waitForSelector("#main-content")
  217 | 
  218 |     // Quick action cards are motion buttons — check they're focusable
  219 |     const posButton = page.getByText("نقطة البيع")
  220 |     await posButton.focus()
  221 |     await expect(posButton).toBeFocused()
  222 |   })
  223 | })
  224 | 
  225 | test.describe("Accessibility: Image alt text", () => {
  226 |   test("no alt text issues on login page", async ({ page }) => {
  227 |     await page.goto("/login")
  228 | 
  229 |     // Verify no images missing alt text — Lottie icons use CSS/SVG not <img>
  230 |     const imgs = page.locator("img")
  231 |     const count = await imgs.count()
  232 |     // All images must have alt attribute
  233 |     for (let i = 0; i < count; i++) {
  234 |       await expect(imgs.nth(i)).toHaveAttribute("alt", /.*/)
  235 |     }
  236 |   })
  237 | })
  238 | 
  239 | test.describe("Accessibility: Color contrast (visual checks)", () => {
  240 |   test("text is visible in light mode", async ({ page }) => {
  241 |     // Force light mode
  242 |     await page.addInitScript(() => {
  243 |       localStorage.setItem("theme", "light")
  244 |     })
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
> 314 |     await page.getByText("منتج أ").first().click()
      |                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  345 |     await expect(page.getByText("الفاتورة فارغة")).toBeVisible()
  346 |     await expect(page.getByText("امسح أو اختر المنتجات للإضافة")).toBeVisible()
  347 |   })
  348 | })
  349 | 
```