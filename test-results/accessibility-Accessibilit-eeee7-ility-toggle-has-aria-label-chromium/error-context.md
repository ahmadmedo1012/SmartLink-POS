# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: DOM structure & semantic HTML >> password visibility toggle has aria-label
- Location: e2e/accessibility.spec.ts:99:7

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
> 108 |     await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible()
      |                                                        ^ Error: expect(locator).toBeVisible() failed
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
  164 |     await page.waitForSelector("#main-content")
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
```