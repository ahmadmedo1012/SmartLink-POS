# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> Navigation >> navigating to POS via sidebar link works
- Location: e2e/critical-path.spec.ts:285:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('نقطة البيع').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "تخطى إلى المحتوى الرئيسي" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e4]:
    - generic [ref=e5]:
      - img "Smart Link" [ref=e7]
      - heading "الربط الذكي" [level=1] [ref=e8]
      - paragraph [ref=e9]: نظام متكامل من Smart Link
      - paragraph [ref=e10]: إدارة المبيعات والمخزون ونقاط البيع — منصة واحدة
    - generic [ref=e13]:
      - generic [ref=e14]:
        - text: البريد الإلكتروني
        - generic [ref=e15]:
          - img
          - textbox "البريد الإلكتروني" [ref=e16]:
            - /placeholder: admin@pos.com
            - text: admin@pos.com
      - generic [ref=e17]:
        - text: كلمة المرور
        - generic [ref=e18]:
          - img
          - textbox "كلمة المرور" [ref=e19]:
            - /placeholder: ••••••••
            - text: admin123
          - button "إظهار كلمة المرور" [ref=e20]:
            - img [ref=e21]
      - button "تسجيل الدخول" [ref=e24] [cursor=pointer]
    - paragraph [ref=e25]:
      - img "Smart Link" [ref=e26]
      - text: © 2026 الربط الذكي | Smart Link. جميع الحقوق محفوظة.
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]:
    - img [ref=e33]
  - alert [ref=e36]
```

# Test source

```ts
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
  278 |     await expect(page.getByText("نقطة البيع").first()).toBeVisible()
  279 |     await expect(page.getByText("المنتجات").first()).toBeVisible()
  280 |     await expect(page.getByText("الفواتير").first()).toBeVisible()
  281 |     await expect(page.getByText("التقارير").first()).toBeVisible()
  282 |     await expect(page.getByText("الإعدادات").first()).toBeVisible()
  283 |   })
  284 | 
  285 |   test("navigating to POS via sidebar link works", async ({ page }) => {
  286 |     await goToDashboardRoute(page, "/pos")
  287 | 
> 288 |     await page.getByText("نقطة البيع").first().click()
      |                                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  289 |     await page.waitForURL(/\/pos/)
  290 |     await expect(page.locator("#main-content")).toBeVisible()
  291 |   })
  292 | })
  293 | 
```