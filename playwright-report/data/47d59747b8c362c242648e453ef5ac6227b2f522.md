# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> Navigation >> sidebar navigation items render and link correctly
- Location: e2e/critical-path.spec.ts:274:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('نقطة البيع').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('نقطة البيع').first()

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
  178 |   test("live badge appears", async ({ page }) => {
  179 |     await page.goto("/", { waitUntil: "networkidle" })
  180 |     await page.waitForSelector("#main-content")
  181 | 
  182 |     await expect(page.getByText("مباشر")).toBeVisible()
  183 |   })
  184 | })
  185 | 
  186 | test.describe("POS page", () => {
  187 |   test.beforeEach(async ({ page }) => {
  188 |     await setupAuth(page)
  189 |     // Set up API mocks BEFORE navigating to /pos
  190 |     await mockPosApi(page)
  191 |     await mockCategoriesApi(page)
  192 |     await mockCustomersApi(page)
  193 |   })
  194 | 
  195 |   test("renders product grid and cart panel", async ({ page }) => {
  196 |     await goToDashboardRoute(page, "/pos")
  197 | 
  198 |     // Products rendered
  199 |     await expect(page.getByText("منتج أ").first()).toBeVisible()
  200 |     await expect(page.getByText("منتج ب").first()).toBeVisible()
  201 | 
  202 |     // Cart panel
  203 |     await expect(page.getByText("الفاتورة")).toBeVisible()
  204 |     await expect(page.getByText("الإجمالي")).toBeVisible()
  205 |   })
  206 | 
  207 |   test("adding product to cart updates totals", async ({ page }) => {
  208 |     await goToDashboardRoute(page, "/pos")
  209 | 
  210 |     // Click first product card
  211 |     await page.getByText("منتج أ").first().click()
  212 | 
  213 |     // Cart item count visible
  214 |     await expect(page.getByText(/منتج أ/).first()).toBeVisible()
  215 |   })
  216 | 
  217 |   test("shows error state when products fail to load", async ({ page }) => {
  218 |     // Override products mock with 500 error
  219 |     await page.route("**/api/pos/products*", (route) =>
  220 |       route.fulfill({ status: 500, body: "Server error" }),
  221 |     )
  222 |     await goToDashboardRoute(page, "/pos")
  223 | 
  224 |     await expect(page.getByText(/فشل تحميل المنتجات/i)).toBeVisible()
  225 |   })
  226 | })
  227 | 
  228 | test.describe("Empty states", () => {
  229 |   test("empty dashboard state when no data", async ({ page }) => {
  230 |     await setupAuth(page)
  231 |     await page.route("**/api/dashboard", (route) =>
  232 |       route.fulfill({
  233 |         status: 200,
  234 |         contentType: "application/json",
  235 |         body: JSON.stringify({
  236 |           totalSales: 0, estimatedProfit: 0, productCount: 0,
  237 |           customerCount: 0, totalExpenses: 0, invoiceCount: 0,
  238 |           recentInvoices: [],
  239 |         }),
  240 |       }),
  241 |     )
  242 |     await page.goto("/", { waitUntil: "networkidle" })
  243 |     await page.waitForSelector("#main-content")
  244 | 
  245 |     await expect(page.getByText(/قم بإضافة منتجات/i)).toBeVisible()
  246 |     await expect(page.getByText(/ابدأ بإنشاء فاتورة جديدة/i)).toBeVisible({ timeout: 5000 })
  247 |   })
  248 | })
  249 | 
  250 | test.describe("Responsive", () => {
  251 |   test("sidebar hidden on mobile viewport", async ({ page }) => {
  252 |     await setupAuth(page)
  253 |     await mockDashboardApi(page)
  254 |     await mockCategoriesApi(page)
  255 | 
  256 |     await page.setViewportSize({ width: 375, height: 812 })
  257 |     // (dashboard) sub-route required for sidebar to render
  258 |     await goToDashboardRoute(page, "/pos")
  259 | 
  260 |     const sidebar = page.locator("aside").first()
  261 |     await expect(sidebar).not.toBeVisible()
  262 |     await expect(page.getByLabel("القائمة")).toBeVisible()
  263 |   })
  264 | })
  265 | 
  266 | test.describe("Navigation", () => {
  267 |   test.beforeEach(async ({ page }) => {
  268 |     await setupAuth(page)
  269 |     await mockDashboardApi(page)
  270 |     await mockCategoriesApi(page)
  271 |     await mockPosApi(page)
  272 |   })
  273 | 
  274 |   test("sidebar navigation items render and link correctly", async ({ page }) => {
  275 |     await goToDashboardRoute(page, "/pos")
  276 | 
  277 |     // Sidebar renders inside (dashboard) layout
> 278 |     await expect(page.getByText("نقطة البيع").first()).toBeVisible()
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  279 |     await expect(page.getByText("المنتجات").first()).toBeVisible()
  280 |     await expect(page.getByText("الفواتير").first()).toBeVisible()
  281 |     await expect(page.getByText("التقارير").first()).toBeVisible()
  282 |     await expect(page.getByText("الإعدادات").first()).toBeVisible()
  283 |   })
  284 | 
  285 |   test("navigating to POS via sidebar link works", async ({ page }) => {
  286 |     await goToDashboardRoute(page, "/pos")
  287 | 
  288 |     await page.getByText("نقطة البيع").first().click()
  289 |     await page.waitForURL(/\/pos/)
  290 |     await expect(page.locator("#main-content")).toBeVisible()
  291 |   })
  292 | })
  293 | 
```