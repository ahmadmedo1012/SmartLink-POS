# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: DOM structure & semantic HTML >> password visibility toggle has aria-label
- Location: e2e/accessibility.spec.ts:95:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('إخفاء كلمة المرور')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel('إخفاء كلمة المرور')

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
  2   | 
  3   | // ---------------------------------------------------------------------------
  4   | // Helpers
  5   | // ---------------------------------------------------------------------------
  6   | const MOCK_USER = {
  7   |   id: "1",
  8   |   name: "أحمد",
  9   |   email: "admin@pos.com",
  10  |   role: "admin",
  11  | }
  12  | 
  13  | async function mockSession(page: Page) {
  14  |   await page.route("**/api/auth/session", (route) =>
  15  |     route.fulfill({
  16  |       status: 200,
  17  |       contentType: "application/json",
  18  |       body: JSON.stringify({
  19  |         user: MOCK_USER,
  20  |         expires: new Date(Date.now() + 86_400_000).toISOString(),
  21  |       }),
  22  |     }),
  23  |   )
  24  | }
  25  | 
  26  | async function mockDashboardApi(page: Page) {
  27  |   await page.route("**/api/dashboard", (route) =>
  28  |     route.fulfill({
  29  |       status: 200,
  30  |       contentType: "application/json",
  31  |       body: JSON.stringify({
  32  |         totalSales: 15200,
  33  |         estimatedProfit: 4800,
  34  |         productCount: 142,
  35  |         customerCount: 89,
  36  |         totalExpenses: 3200,
  37  |         invoiceCount: 67,
  38  |         recentInvoices: [],
  39  |       }),
  40  |     }),
  41  |   )
  42  | }
  43  | 
  44  | async function mockCategoriesApi(page: Page) {
  45  |   await page.route("**/api/categories", (route) =>
  46  |     route.fulfill({
  47  |       status: 200,
  48  |       contentType: "application/json",
  49  |       body: JSON.stringify([]),
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
> 102 |     await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible()
      |                                                        ^ Error: expect(locator).toBeVisible() failed
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
  150 |     await expect(collapseBtn).toBeVisible()
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
```