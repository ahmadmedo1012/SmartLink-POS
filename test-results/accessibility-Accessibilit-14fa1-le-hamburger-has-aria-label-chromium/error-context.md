# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: ARIA labels on icon-only buttons >> mobile hamburger has aria-label
- Location: e2e/accessibility.spec.ts:161:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#main-content') to be visible

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
          - generic [ref=e25]: · آخر تحديث ١٠:٢٢ م
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
          - generic [ref=e70]: ‏15.200,00 د.ل.‏
        - generic [ref=e71]:
          - generic [ref=e72]:
            - generic [ref=e73]: صافي الربح
            - img [ref=e75]
          - generic [ref=e78]: ‏4.800,00 د.ل.‏
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]: المنتجات
            - img [ref=e83]
          - generic [ref=e87]: "142"
          - generic [ref=e88]: في المخزون
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: العملاء
            - img [ref=e93]
          - generic [ref=e98]: "89"
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
          - application [ref=e119]:
            - generic [ref=e132]:
              - generic [ref=e135]: المبيعات
              - generic [ref=e138]: المصروفات
              - generic [ref=e141]: الأرباح
    - generic [ref=e142]:
      - generic [ref=e145]: النشاط
      - generic [ref=e146]:
        - generic [ref=e148]:
          - generic [ref=e149]:
            - heading "آخر النشاطات" [level=3] [ref=e150]
            - img [ref=e151]
          - generic [ref=e154]:
            - img [ref=e155]
            - paragraph [ref=e158]: لا توجد نشاطات بعد
        - generic [ref=e160]:
          - generic [ref=e161]:
            - heading "أفضل المنتجات مبيعاً" [level=3] [ref=e162]
            - img [ref=e163]
          - generic [ref=e166]:
            - img [ref=e167]
            - paragraph [ref=e171]: لا توجد منتجات بعد
    - generic [ref=e172]:
      - generic [ref=e175]: ملخص
      - generic [ref=e176]:
        - generic [ref=e178]:
          - generic [ref=e179]:
            - heading "آخر الفواتير" [level=3] [ref=e180]
            - button "عرض الكل" [ref=e181] [cursor=pointer]
          - generic [ref=e182]:
            - img [ref=e183]
            - paragraph [ref=e186]: ابدأ بإنشاء فاتورة جديدة
            - paragraph [ref=e187]: أنشئ فاتورة جديدة من نقطة البيع لعرضها هنا
            - button "فتح نقطة البيع" [ref=e188] [cursor=pointer]
        - generic [ref=e190]:
          - heading "ملخص سريع" [level=3] [ref=e191]
          - generic [ref=e192]:
            - generic [ref=e193]:
              - generic [ref=e194]:
                - img [ref=e195]
                - generic [ref=e198]: إجمالي المبيعات
              - generic [ref=e199]: ‏15.200,00 د.ل.‏
            - generic [ref=e200]:
              - generic [ref=e201]:
                - img [ref=e202]
                - generic [ref=e205]: الربح المقدر
              - generic [ref=e206]: ‏4.800,00 د.ل.‏
            - generic [ref=e207]:
              - generic [ref=e208]:
                - img [ref=e209]
                - generic [ref=e212]: المصروفات
              - generic [ref=e213]: ‏3.200,00 د.ل.‏
            - generic [ref=e214]:
              - generic [ref=e215]:
                - img [ref=e216]
                - generic [ref=e220]: الفواتير
              - generic [ref=e221]: "67"
            - generic [ref=e222]:
              - generic [ref=e223]:
                - img [ref=e224]
                - generic [ref=e228]: المنتجات
              - generic [ref=e229]: "142"
            - generic [ref=e230]:
              - generic [ref=e231]:
                - img [ref=e232]
                - generic [ref=e237]: العملاء
              - generic [ref=e238]: "89"
        - generic [ref=e240]:
          - heading "مبيعات اليوم" [level=3] [ref=e241]
          - generic [ref=e242]:
            - generic [ref=e243]: ‏15.200,00 د.ل.‏
            - generic [ref=e244]:
              - img [ref=e245]
              - generic [ref=e248]: 0% هامش ربح
            - generic [ref=e249]:
              - generic [ref=e250]:
                - generic [ref=e251]: الفواتير
                - generic [ref=e252]: "67"
              - generic [ref=e253]:
                - generic [ref=e254]: المصروفات
                - generic [ref=e255]: ‏3.200,00 د.ل.‏
```

# Test source

```ts
  64  | test.describe("Accessibility: DOM structure & semantic HTML", () => {
  65  |   test("html has lang and dir attributes set to RTL Arabic", async ({ page }) => {
  66  |     await page.goto("/login")
  67  | 
  68  |     const html = page.locator("html")
  69  |     await expect(html).toHaveAttribute("lang", "ar")
  70  |     await expect(html).toHaveAttribute("dir", "rtl")
  71  |   })
  72  | 
  73  |   test("skip-to-content link is present and focusable", async ({ page }) => {
  74  |     await page.goto("/login")
  75  | 
  76  |     // Skip link should exist
  77  |     const skipLink = page.getByText("تخطى إلى المحتوى الرئيسي")
  78  |     await expect(skipLink).toBeVisible()
  79  |   })
  80  | 
  81  |   test("forms have labeled inputs", async ({ page }) => {
  82  |     await page.goto("/login")
  83  | 
  84  |     // Email input has associated label
  85  |     const emailLabel = page.locator("label[for='email']")
  86  |     await expect(emailLabel).toBeVisible()
  87  |     await expect(emailLabel).toHaveText("البريد الإلكتروني")
  88  | 
  89  |     // Password input has associated label
  90  |     const passwordLabel = page.locator("label[for='password']")
  91  |     await expect(passwordLabel).toBeVisible()
  92  |     await expect(passwordLabel).toHaveText("كلمة المرور")
  93  | 
  94  |     // Inputs themselves exist
  95  |     await expect(page.locator("#email")).toBeVisible()
  96  |     await expect(page.locator("#password")).toBeVisible()
  97  |   })
  98  | 
  99  |   test("password visibility toggle has aria-label", async ({ page }) => {
  100 |     await page.goto("/login")
  101 | 
  102 |     // Toggle button has relevant aria-label
  103 |     const toggleBtn = page.getByLabel("إظهار كلمة المرور")
  104 |     await expect(toggleBtn).toBeVisible()
  105 | 
  106 |     // Click to toggle
  107 |     await toggleBtn.click()
  108 |     await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible()
  109 |   })
  110 | 
  111 |   test("main content area uses #main-content id", async ({ page }) => {
  112 |     await setupAuthenticatedDashboard(page)
  113 |     await page.goto("/")
  114 |     await page.waitForSelector("#main-content")
  115 | 
  116 |     const mainContent = page.locator("#main-content")
  117 |     await expect(mainContent).toBeVisible()
  118 |   })
  119 | })
  120 | 
  121 | test.describe("Accessibility: Focus indicators", () => {
  122 |   test.beforeEach(async ({ page }) => {
  123 |     await setupAuthenticatedDashboard(page)
  124 |   })
  125 | 
  126 |   test("sidebar link receives visible focus ring on tab", async ({ page }) => {
  127 |     await page.goto("/")
  128 |     await page.waitForSelector("#main-content")
  129 | 
  130 |     // Tab through to a sidebar link
  131 |     await page.keyboard.press("Tab") // skip-link gets focus first
  132 |     // Skip link
  133 |     await page.keyboard.press("Tab") // tab into sidebar or main content
  134 | 
  135 |     // The first focused element should have focus-visible styling
  136 |     const focused = page.locator("*:focus-visible")
  137 |     await expect(focused).toBeAttached()
  138 |   })
  139 | 
  140 |   test("logout button has aria-label", async ({ page }) => {
  141 |     await page.goto("/")
  142 |     await page.waitForSelector("#main-content")
  143 | 
  144 |     await expect(page.getByLabel("تسجيل الخروج")).toBeVisible()
  145 |   })
  146 | })
  147 | 
  148 | test.describe("Accessibility: ARIA labels on icon-only buttons", () => {
  149 |   test.beforeEach(async ({ page }) => {
  150 |     await setupAuthenticatedDashboard(page)
  151 |   })
  152 | 
  153 |   test("sidebar collapse button has aria-label", async ({ page }) => {
  154 |     await page.goto("/")
  155 |     await page.waitForSelector("#main-content")
  156 | 
  157 |     const collapseBtn = page.getByLabel("طي القائمة")
  158 |     await expect(collapseBtn).toBeVisible()
  159 |   })
  160 | 
  161 |   test("mobile hamburger has aria-label", async ({ page }) => {
  162 |     await page.setViewportSize({ width: 375, height: 812 })
  163 |     await page.goto("/")
> 164 |     await page.waitForSelector("#main-content")
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  165 | 
  166 |     await expect(page.getByLabel("القائمة")).toBeVisible()
  167 |   })
  168 | })
  169 | 
  170 | test.describe("Accessibility: Keyboard navigation", () => {
  171 |   test("tab through login form fields", async ({ page }) => {
  172 |     await page.goto("/login")
  173 | 
  174 |     // Focus email field
  175 |     await page.locator("#email").focus()
  176 |     await expect(page.locator("#email")).toBeFocused()
  177 | 
  178 |     // Tab to password
  179 |     await page.keyboard.press("Tab")
  180 |     await expect(page.locator("#password")).toBeFocused()
  181 | 
  182 |     // Tab to show-password button
  183 |     await page.keyboard.press("Tab")
  184 |     await expect(page.getByLabel("إظهار كلمة المرور")).toBeFocused()
  185 | 
  186 |     // Tab to submit
  187 |     await page.keyboard.press("Tab")
  188 |     await expect(
  189 |       page.getByRole("button", { name: /تسجيل الدخول/i }),
  190 |     ).toBeFocused()
  191 |   })
  192 | })
  193 | 
  194 | test.describe("Accessibility: Dashboard keyboard navigation", () => {
  195 |   test.beforeEach(async ({ page }) => {
  196 |     await setupAuthenticatedDashboard(page)
  197 |   })
  198 | 
  199 |   test("sidebar navigation items are keyboard accessible", async ({ page }) => {
  200 |     await page.goto("/")
  201 |     await page.waitForSelector("#main-content")
  202 | 
  203 |     // Verify multiple nav links exist with aria or visible text
  204 |     const navLinks = page.locator("aside a")
  205 |     const count = await navLinks.count()
  206 |     expect(count).toBeGreaterThan(5)
  207 | 
  208 |     // First nav link should focusable
  209 |     const firstLink = navLinks.first()
  210 |     await firstLink.focus()
  211 |     await expect(firstLink).toBeFocused()
  212 |   })
  213 | 
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
```