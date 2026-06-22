# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> Empty states >> empty dashboard state when no data
- Location: e2e/critical-path.spec.ts:229:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/ابدأ بإنشاء فاتورة جديدة/i)
Expected: visible
Error: strict mode violation: getByText(/ابدأ بإنشاء فاتورة جديدة/i) resolved to 2 elements:
    1) <p class="text-sm font-medium">ابدأ بإنشاء فاتورة جديدة</p> aka getByText('ابدأ بإنشاء فاتورة جديدة').first()
    2) <p class="text-sm font-medium">ابدأ بإنشاء فاتورة جديدة</p> aka getByText('ابدأ بإنشاء فاتورة جديدة').nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/ابدأ بإنشاء فاتورة جديدة/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "تخطى إلى المحتوى الرئيسي" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - button "Open Next.js Dev Tools" [ref=e8] [cursor=pointer]:
    - img [ref=e9]
  - alert [ref=e12]
  - generic [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - heading "لوحة التحكم" [level=1] [ref=e19]
          - generic [ref=e20]: مباشر
        - generic [ref=e23]:
          - paragraph [ref=e24]: نظرة عامة على أداء المنظومة
          - generic [ref=e25]: · آخر تحديث ١١:٤٦ م
      - button "تحديث" [ref=e27] [cursor=pointer]
    - generic [ref=e28]:
      - generic [ref=e31]: إجراءات سريعة
      - generic [ref=e32]:
        - button "نقطة البيع فاتورة جديدة" [ref=e33] [cursor=pointer]:
          - img [ref=e35]
          - generic [ref=e39]:
            - generic [ref=e40]: نقطة البيع
            - generic [ref=e41]: فاتورة جديدة
        - button "منتج جديد إضافة منتج" [ref=e42] [cursor=pointer]:
          - img [ref=e44]
          - generic [ref=e48]:
            - generic [ref=e49]: منتج جديد
            - generic [ref=e50]: إضافة منتج
        - button "الفواتير عرض الفواتير" [ref=e51] [cursor=pointer]:
          - img [ref=e53]
          - generic [ref=e56]:
            - generic [ref=e57]: الفواتير
            - generic [ref=e58]: عرض الفواتير
    - generic [ref=e59]:
      - generic [ref=e62]: المؤشرات الرئيسية
      - generic [ref=e63]:
        - generic [ref=e64]:
          - generic [ref=e65]:
            - generic [ref=e66]: إجمالي المبيعات
            - img [ref=e68]
          - generic [ref=e70]: ‏0,00 د.ل.‏
        - generic [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]: صافي الربح
            - img [ref=e75]
          - generic [ref=e78]: ‏0,00 د.ل.‏
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]: المنتجات
            - img [ref=e83]
          - generic [ref=e87]: "0"
          - generic [ref=e88]: في المخزون
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: العملاء
            - img [ref=e93]
          - generic [ref=e98]: "0"
          - generic [ref=e99]: مسجلون
    - generic [ref=e100]:
      - generic [ref=e103]: التحليلات
      - generic [ref=e104]:
        - generic [ref=e105]:
          - heading "المبيعات اليومية" [level=3] [ref=e106]
          - generic [ref=e107]:
            - img [ref=e108]
            - paragraph [ref=e112]: قم بإضافة منتجات وبدء البيع لرؤية الإحصائيات
            - paragraph [ref=e113]: ستظهر المبيعات هنا عند إنشاء أول فاتورة
            - button "فتح نقطة البيع" [ref=e114] [cursor=pointer]
        - generic [ref=e115]:
          - heading "توزيع الإيرادات" [level=3] [ref=e116]
          - generic [ref=e117]:
            - img [ref=e118]
            - paragraph [ref=e120]: ابدأ بإنشاء فاتورة جديدة
            - paragraph [ref=e121]: يظهر التوزيع عند توفر مبيعات ومصروفات
            - button "فتح نقطة البيع" [ref=e122] [cursor=pointer]
    - generic [ref=e123]:
      - generic [ref=e126]: النشاط
      - generic [ref=e127]:
        - generic [ref=e129]:
          - generic [ref=e130]:
            - heading "آخر النشاطات" [level=3] [ref=e131]
            - img [ref=e132]
          - generic [ref=e135]:
            - img [ref=e136]
            - paragraph [ref=e139]: لا توجد نشاطات بعد
        - generic [ref=e141]:
          - generic [ref=e142]:
            - heading "أفضل المنتجات مبيعاً" [level=3] [ref=e143]
            - img [ref=e144]
          - generic [ref=e148]:
            - img [ref=e150]
            - generic [ref=e152]:
              - paragraph [ref=e153]: منتج 1
              - generic [ref=e157]: "2"
            - generic [ref=e158]: ‏100,00 د.ل.‏
    - generic [ref=e159]:
      - generic [ref=e162]: ملخص
      - generic [ref=e163]:
        - generic [ref=e165]:
          - generic [ref=e166]:
            - heading "آخر الفواتير" [level=3] [ref=e167]
            - button "عرض الكل" [ref=e168] [cursor=pointer]
          - generic [ref=e169]:
            - img [ref=e170]
            - paragraph [ref=e173]: ابدأ بإنشاء فاتورة جديدة
            - paragraph [ref=e174]: أنشئ فاتورة جديدة من نقطة البيع لعرضها هنا
            - button "فتح نقطة البيع" [ref=e175] [cursor=pointer]
        - generic [ref=e177]:
          - heading "ملخص سريع" [level=3] [ref=e178]
          - generic [ref=e179]:
            - generic [ref=e180]:
              - generic [ref=e181]:
                - img [ref=e182]
                - generic [ref=e185]: إجمالي المبيعات
              - generic [ref=e186]: ‏0,00 د.ل.‏
            - generic [ref=e187]:
              - generic [ref=e188]:
                - img [ref=e189]
                - generic [ref=e192]: الربح المقدر
              - generic [ref=e193]: ‏0,00 د.ل.‏
            - generic [ref=e194]:
              - generic [ref=e195]:
                - img [ref=e196]
                - generic [ref=e199]: المصروفات
              - generic [ref=e200]: ‏0,00 د.ل.‏
            - generic [ref=e201]:
              - generic [ref=e202]:
                - img [ref=e203]
                - generic [ref=e207]: الفواتير
              - generic [ref=e208]: "0"
            - generic [ref=e209]:
              - generic [ref=e210]:
                - img [ref=e211]
                - generic [ref=e215]: المنتجات
              - generic [ref=e216]: "0"
            - generic [ref=e217]:
              - generic [ref=e218]:
                - img [ref=e219]
                - generic [ref=e224]: العملاء
              - generic [ref=e225]: "0"
        - generic [ref=e227]:
          - heading "مبيعات اليوم" [level=3] [ref=e228]
          - generic [ref=e229]:
            - generic [ref=e230]: ‏0,00 د.ل.‏
            - generic [ref=e231]:
              - img [ref=e232]
              - generic [ref=e235]: 0% هامش ربح
            - generic [ref=e236]:
              - generic [ref=e237]:
                - generic [ref=e238]: الفواتير
                - generic [ref=e239]: "0"
              - generic [ref=e240]:
                - generic [ref=e241]: المصروفات
                - generic [ref=e242]: ‏0,00 د.ل.‏
```

# Test source

```ts
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
> 246 |     await expect(page.getByText(/ابدأ بإنشاء فاتورة جديدة/i)).toBeVisible({ timeout: 5000 })
      |                                                               ^ Error: expect(locator).toBeVisible() failed
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