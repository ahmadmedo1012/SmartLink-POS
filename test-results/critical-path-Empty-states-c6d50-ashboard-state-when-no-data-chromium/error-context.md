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
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]:
          - heading "لوحة التحكم" [level=1] [ref=e9]
          - generic [ref=e10]: مباشر
        - generic [ref=e13]:
          - paragraph [ref=e14]: نظرة عامة على أداء المنظومة
          - generic [ref=e15]: · آخر تحديث ٠٧:٢٨ م
      - button "تحديث" [ref=e17] [cursor=pointer]
    - generic [ref=e19]:
      - img [ref=e21]
      - generic [ref=e25]:
        - heading "مرحباً بك في الربط الذكي!" [level=2] [ref=e26]
        - paragraph [ref=e27]: ابدأ بإضافة منتجاتك الأولى، ثم أنشئ فاتورة بيع. يمكنك أيضاً تصفح لوحة التحكم والتعرف على المؤشرات والتقارير.
        - generic [ref=e28]:
          - link "إضافة منتجات" [ref=e29] [cursor=pointer]:
            - /url: /products
            - img [ref=e30]
            - text: إضافة منتجات
          - link "تجربة نقطة البيع" [ref=e34] [cursor=pointer]:
            - /url: /pos
            - img [ref=e35]
            - text: تجربة نقطة البيع
          - link "إضافة عملاء" [ref=e39] [cursor=pointer]:
            - /url: /customers
            - img [ref=e40]
            - text: إضافة عملاء
    - generic [ref=e45]:
      - generic [ref=e48]: إجراءات سريعة
      - generic [ref=e50]:
        - button "نقطة البيع فاتورة جديدة" [ref=e51] [cursor=pointer]:
          - img [ref=e53]
          - generic [ref=e57]:
            - generic [ref=e58]: نقطة البيع
            - generic [ref=e59]: فاتورة جديدة
        - button "منتج جديد إضافة منتج" [ref=e60] [cursor=pointer]:
          - img [ref=e62]
          - generic [ref=e66]:
            - generic [ref=e67]: منتج جديد
            - generic [ref=e68]: إضافة منتج
        - button "الفواتير عرض الفواتير" [ref=e69] [cursor=pointer]:
          - img [ref=e71]
          - generic [ref=e74]:
            - generic [ref=e75]: الفواتير
            - generic [ref=e76]: عرض الفواتير
    - generic [ref=e77]:
      - generic [ref=e80]: المؤشرات الرئيسية
      - generic [ref=e82]:
        - generic [ref=e84]:
          - generic [ref=e85]:
            - generic [ref=e86]: إجمالي المبيعات
            - img [ref=e88]
          - generic [ref=e90]: ‏0,00 د.ل.‏
        - generic [ref=e92]:
          - generic [ref=e93]:
            - generic [ref=e94]: صافي الربح
            - img [ref=e96]
          - generic [ref=e99]: ‏0,00 د.ل.‏
        - generic [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: المنتجات
            - img [ref=e105]
          - generic [ref=e109]: "0"
          - generic [ref=e110]: في المخزون
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]: العملاء
            - img [ref=e116]
          - generic [ref=e121]: "0"
          - generic [ref=e122]: مسجلون
    - generic [ref=e123]:
      - generic [ref=e126]: التحليلات
      - generic [ref=e128]:
        - generic [ref=e129]:
          - heading "المبيعات اليومية" [level=3] [ref=e131]: المبيعات اليومية
          - generic [ref=e134]:
            - img [ref=e135]
            - paragraph [ref=e139]: قم بإضافة منتجات وبدء البيع لرؤية الإحصائيات
            - paragraph [ref=e140]: ستظهر المبيعات هنا عند إنشاء أول فاتورة
            - button "فتح نقطة البيع" [ref=e141] [cursor=pointer]
        - generic [ref=e142]:
          - heading "توزيع الإيرادات" [level=3] [ref=e144]: توزيع الإيرادات
          - generic [ref=e147]:
            - img [ref=e148]
            - paragraph [ref=e150]: ابدأ بإنشاء فاتورة جديدة
            - paragraph [ref=e151]: يظهر التوزيع عند توفر مبيعات ومصروفات
            - button "فتح نقطة البيع" [ref=e152] [cursor=pointer]
    - generic [ref=e153]:
      - generic [ref=e156]: النشاط
      - generic [ref=e158]:
        - generic [ref=e160]:
          - generic [ref=e161]:
            - heading "آخر النشاطات" [level=3] [ref=e162]
            - img [ref=e163]
          - generic [ref=e166]:
            - img [ref=e167]
            - paragraph [ref=e170]: لا توجد نشاطات بعد
        - generic [ref=e172]:
          - generic [ref=e173]:
            - heading "أفضل المنتجات مبيعاً" [level=3] [ref=e174]
            - img [ref=e175]
          - generic [ref=e178]:
            - img [ref=e179]
            - paragraph [ref=e183]: لا توجد منتجات بعد
    - generic [ref=e184]:
      - generic [ref=e187]: ملخص
      - generic [ref=e189]:
        - generic [ref=e191]:
          - generic [ref=e193]:
            - heading "آخر الفواتير" [level=3] [ref=e194]
            - button "عرض الكل" [ref=e195] [cursor=pointer]
          - generic [ref=e197]:
            - img [ref=e198]
            - paragraph [ref=e201]: ابدأ بإنشاء فاتورة جديدة
            - paragraph [ref=e202]: أنشئ فاتورة جديدة من نقطة البيع لعرضها هنا
            - button "فتح نقطة البيع" [ref=e203] [cursor=pointer]
        - generic [ref=e205]:
          - heading "ملخص سريع" [level=3] [ref=e206]
          - generic [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - img [ref=e210]
                - generic [ref=e213]: إجمالي المبيعات
              - generic [ref=e214]: ‏0,00 د.ل.‏
            - generic [ref=e215]:
              - generic [ref=e216]:
                - img [ref=e217]
                - generic [ref=e220]: الربح المقدر
              - generic [ref=e221]: ‏0,00 د.ل.‏
            - generic [ref=e222]:
              - generic [ref=e223]:
                - img [ref=e224]
                - generic [ref=e227]: المصروفات
              - generic [ref=e228]: ‏0,00 د.ل.‏
            - generic [ref=e229]:
              - generic [ref=e230]:
                - img [ref=e231]
                - generic [ref=e235]: الفواتير
              - generic [ref=e236]: "0"
            - generic [ref=e237]:
              - generic [ref=e238]:
                - img [ref=e239]
                - generic [ref=e243]: المنتجات
              - generic [ref=e244]: "0"
            - generic [ref=e245]:
              - generic [ref=e246]:
                - img [ref=e247]
                - generic [ref=e252]: العملاء
              - generic [ref=e253]: "0"
        - generic [ref=e255]:
          - heading "مبيعات اليوم" [level=3] [ref=e256]: مبيعات اليوم
          - generic [ref=e258]:
            - generic [ref=e259]: ‏0,00 د.ل.‏
            - generic [ref=e260]:
              - img [ref=e261]
              - generic [ref=e264]: 0% هامش ربح
            - generic [ref=e265]:
              - generic [ref=e266]:
                - generic [ref=e267]: الفواتير
                - generic [ref=e268]: "0"
              - generic [ref=e269]:
                - generic [ref=e270]: المصروفات
                - generic [ref=e271]: ‏0,00 د.ل.‏
  - button "Open Next.js Dev Tools" [ref=e277] [cursor=pointer]:
    - img [ref=e278]
  - alert [ref=e281]
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