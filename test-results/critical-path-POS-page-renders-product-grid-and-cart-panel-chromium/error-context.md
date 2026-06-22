# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> POS page >> renders product grid and cart panel
- Location: e2e/critical-path.spec.ts:195:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('منتج أ').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('منتج أ').first()

```

```yaml
- link "تخطى إلى المحتوى الرئيسي":
  - /url: "#main-content"
- alert
- img "Smart Link"
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
- paragraph:
  - img "Smart Link"
  - text: © 2026 قنوات | Smart Link. جميع الحقوق محفوظة.
```

# Test source

```ts
  99  |   test("renders form with email, password, and submit button", async ({ page }) => {
  100 |     await page.goto("/login")
  101 | 
  102 |     await expect(page.locator("h1")).toContainText("قنوات")
  103 |     await expect(page.locator("#email")).toBeVisible()
  104 |     await expect(page.locator("#password")).toBeVisible()
  105 |     await expect(page.getByRole("button", { name: /تسجيل الدخول/i })).toBeVisible()
  106 |     await expect(page.locator("#email")).toHaveValue("admin@pos.com")
  107 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  108 |   })
  109 | 
  110 |   test("shows error toast on invalid credentials", async ({ page, browser }) => {
  111 |     const ctx = await browser.newContext({ storageState: undefined })
  112 |     const p = await ctx.newPage()
  113 |     await p.goto("/login")
  114 |     await p.locator("#email").fill("wrong@email.com")
  115 |     await p.locator("#password").fill("wrongpass")
  116 |     await p.getByRole("button", { name: /تسجيل الدخول/i }).click()
  117 | 
  118 |     await expect(p.getByText(/البريد الإلكتروني أو كلمة المرور/i)).toBeVisible({ timeout: 8000 })
  119 |     await ctx.close()
  120 |   })
  121 | })
  122 | 
  123 | test.describe("Homepage (landing page)", () => {
  124 |   test("shows landing page for unauthenticated visitors", async ({ browser }) => {
  125 |     const ctx = await browser.newContext({ storageState: undefined })
  126 |     const page = await ctx.newPage()
  127 |     await page.goto("/", { waitUntil: "networkidle" })
  128 |     await expect(page.getByText("نظام متكامل لإدارة المبيعات والمخزون")).toBeVisible({ timeout: 10000 })
  129 |     await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
  130 |     await ctx.close()
  131 |   })
  132 | 
  133 |   test("landing page has CTA linking to login", async ({ browser }) => {
  134 |     const ctx = await browser.newContext({ storageState: undefined })
  135 |     const page = await ctx.newPage()
  136 |     await page.goto("/", { waitUntil: "networkidle" })
  137 |     await expect(page.getByText("ابدأ الآن مجاناً")).toBeVisible()
  138 |   })
  139 | })
  140 | 
  141 | test.describe("Dashboard", () => {
  142 |   test.beforeEach(async ({ page }) => {
  143 |     await setupAuth(page)
  144 |     await mockDashboardApi(page)
  145 |     await mockCategoriesApi(page)
  146 |   })
  147 | 
  148 |   test("renders KPI cards with data", async ({ page }) => {
  149 |     await page.goto("/", { waitUntil: "networkidle" })
  150 |     await page.waitForSelector("#main-content")
  151 | 
  152 |     await expect(page.getByText("لوحة التحكم")).toBeVisible()
  153 |     // Summary items appear in both stat cards + summary list → use .first()
  154 |     await expect(page.getByText("إجمالي المبيعات").first()).toBeVisible()
  155 |     await expect(page.getByText("صافي الربح").first()).toBeVisible()
  156 |     await expect(page.getByText("المنتجات", { exact: true }).first()).toBeVisible()
  157 |     await expect(page.getByText("العملاء").first()).toBeVisible()
  158 |   })
  159 | 
  160 |   test("renders charts (recharts SVGs) on dashboard", async ({ page }) => {
  161 |     await page.goto("/", { waitUntil: "networkidle" })
  162 |     await page.waitForSelector("#main-content")
  163 | 
  164 |     await expect(page.locator(".recharts-wrapper")).toHaveCount(2)
  165 |     await expect(page.locator(".recharts-bar")).toBeVisible()
  166 |     await expect(page.locator(".recharts-pie")).toBeVisible()
  167 |   })
  168 | 
  169 |   test("shows quick action cards and navigates on click", async ({ page }) => {
  170 |     await page.goto("/", { waitUntil: "networkidle" })
  171 |     await page.waitForSelector("#main-content")
  172 | 
  173 |     await expect(page.getByText("نقطة البيع").first()).toBeVisible()
  174 |     await expect(page.getByText("منتج جديد")).toBeVisible()
  175 |     await expect(page.getByText("الفواتير").first()).toBeVisible()
  176 |   })
  177 | 
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
> 199 |     await expect(page.getByText("منتج أ").first()).toBeVisible()
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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
  288 |     await page.getByText("نقطة البيع").first().click()
  289 |     await page.waitForURL(/\/pos/)
  290 |     await expect(page.locator("#main-content")).toBeVisible()
  291 |   })
  292 | })
  293 | 
```