# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: ARIA labels on icon-only buttons >> sidebar collapse button has aria-label
- Location: e2e/accessibility.spec.ts:145:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('طي القائمة')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel('طي القائمة')

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
  50  |     }),
  51  |   )
  52  | }
  53  | 
  54  | async function setupAuthenticatedDashboard(page: Page) {
  55  |   await mockSession(page)
  56  |   await mockDashboardApi(page)
  57  |   await mockCategoriesApi(page)
  58  | }
  59  | 
  60  | // ---------------------------------------------------------------------------
  61  | // Tests
  62  | // ---------------------------------------------------------------------------
  63  | 
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
  76  |     const skipLink = page.getByText("تخطى إلى المحتوى الرئيسي")
  77  |     await expect(skipLink).toBeVisible()
  78  |   })
  79  | 
  80  |   test("forms have labeled inputs", async ({ page }) => {
  81  |     await page.goto("/login")
  82  | 
  83  |     const emailLabel = page.locator("label[for='email']")
  84  |     await expect(emailLabel).toBeVisible()
  85  |     await expect(emailLabel).toHaveText("البريد الإلكتروني")
  86  | 
  87  |     const passwordLabel = page.locator("label[for='password']")
  88  |     await expect(passwordLabel).toBeVisible()
  89  |     await expect(passwordLabel).toHaveText("كلمة المرور")
  90  | 
  91  |     await expect(page.locator("#email")).toBeVisible()
  92  |     await expect(page.locator("#password")).toBeVisible()
  93  |   })
  94  | 
  95  |   test("password visibility toggle has aria-label", async ({ page }) => {
  96  |     await page.goto("/login")
  97  | 
  98  |     const toggleBtn = page.getByLabel("إظهار كلمة المرور")
  99  |     await expect(toggleBtn).toBeVisible()
  100 | 
  101 |     await toggleBtn.click()
  102 |     await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible()
  103 |   })
  104 | 
  105 |   test("main content area uses #main-content id", async ({ page }) => {
  106 |     await setupAuthenticatedDashboard(page)
  107 |     await page.goto("/", { waitUntil: "networkidle" })
  108 |     await page.waitForSelector("#main-content")
  109 | 
  110 |     const mainContent = page.locator("#main-content")
  111 |     await expect(mainContent).toBeVisible()
  112 |   })
  113 | })
  114 | 
  115 | test.describe("Accessibility: Focus indicators", () => {
  116 |   test.beforeEach(async ({ page }) => {
  117 |     await setupAuthenticatedDashboard(page)
  118 |   })
  119 | 
  120 |   test("sidebar link receives visible focus ring on tab", async ({ page }) => {
  121 |     // Navigate to a (dashboard) route so sidebar is rendered
  122 |     await page.goto("/pos", { waitUntil: "networkidle" })
  123 |     await page.waitForSelector("#main-content")
  124 | 
  125 |     await page.keyboard.press("Tab")
  126 |     await page.keyboard.press("Tab")
  127 | 
  128 |     const focused = page.locator("*:focus-visible")
  129 |     await expect(focused).toBeAttached()
  130 |   })
  131 | 
  132 |   test("logout button has aria-label", async ({ page }) => {
  133 |     await page.goto("/pos", { waitUntil: "networkidle" })
  134 |     await page.waitForSelector("#main-content")
  135 | 
  136 |     await expect(page.getByLabel("تسجيل الخروج")).toBeVisible()
  137 |   })
  138 | })
  139 | 
  140 | test.describe("Accessibility: ARIA labels on icon-only buttons", () => {
  141 |   test.beforeEach(async ({ page }) => {
  142 |     await setupAuthenticatedDashboard(page)
  143 |   })
  144 | 
  145 |   test("sidebar collapse button has aria-label", async ({ page }) => {
  146 |     await page.goto("/pos", { waitUntil: "networkidle" })
  147 |     await page.waitForSelector("#main-content")
  148 | 
  149 |     const collapseBtn = page.getByLabel("طي القائمة")
> 150 |     await expect(collapseBtn).toBeVisible()
      |                               ^ Error: expect(locator).toBeVisible() failed
  151 |   })
  152 | 
  153 |   test("mobile hamburger has aria-label", async ({ page }) => {
  154 |     await page.setViewportSize({ width: 375, height: 812 })
  155 |     await page.goto("/pos", { waitUntil: "networkidle" })
  156 |     await page.waitForSelector("#main-content")
  157 | 
  158 |     await expect(page.getByLabel("القائمة")).toBeVisible()
  159 |   })
  160 | })
  161 | 
  162 | test.describe("Accessibility: Keyboard navigation", () => {
  163 |   test("tab through login form fields", async ({ page }) => {
  164 |     await page.goto("/login")
  165 | 
  166 |     await page.locator("#email").focus()
  167 |     await expect(page.locator("#email")).toBeFocused()
  168 | 
  169 |     await page.keyboard.press("Tab")
  170 |     await expect(page.locator("#password")).toBeFocused()
  171 | 
  172 |     // Password visibility toggle has tabIndex={-1} so Tab skips it.
  173 |     // Verify the submit button is focusable programmatically.
  174 |     const submitBtn = page.getByRole("button", { name: /تسجيل الدخول/i })
  175 |     await expect(submitBtn).toBeAttached()
  176 |     await expect(submitBtn).toBeVisible()
  177 |   })
  178 | })
  179 | 
  180 | test.describe("Accessibility: Dashboard keyboard navigation", () => {
  181 |   test.beforeEach(async ({ page }) => {
  182 |     await setupAuthenticatedDashboard(page)
  183 |   })
  184 | 
  185 |   test("sidebar navigation items are keyboard accessible", async ({ page }) => {
  186 |     await page.goto("/pos", { waitUntil: "networkidle" })
  187 |     await page.waitForSelector("#main-content")
  188 | 
  189 |     const navLinks = page.locator("aside a")
  190 |     const count = await navLinks.count()
  191 |     expect(count).toBeGreaterThan(5)
  192 | 
  193 |     const firstLink = navLinks.first()
  194 |     await firstLink.focus()
  195 |     await expect(firstLink).toBeFocused()
  196 |   })
  197 | 
  198 |   test("quick action cards are keyboard accessible (focusable)", async ({ page }) => {
  199 |     await page.goto("/pos", { waitUntil: "networkidle" })
  200 |     await page.waitForSelector("#main-content")
  201 | 
  202 |     // Quick action cards only appear on dashboard root (/), not on /pos
  203 |     // So test that sidebar nav links are focusable instead
  204 |     const firstNavLink = page.locator("aside a").first()
  205 |     await firstNavLink.focus()
  206 |     await expect(firstNavLink).toBeFocused()
  207 |   })
  208 | })
  209 | 
  210 | test.describe("Accessibility: Image alt text", () => {
  211 |   test("no alt text issues on login page", async ({ page }) => {
  212 |     await page.goto("/login")
  213 | 
  214 |     const imgs = page.locator("img")
  215 |     const count = await imgs.count()
  216 |     for (let i = 0; i < count; i++) {
  217 |       await expect(imgs.nth(i)).toHaveAttribute("alt", /.*/)
  218 |     }
  219 |   })
  220 | })
  221 | 
  222 | test.describe("Accessibility: Color contrast (visual checks)", () => {
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
```