# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility: Keyboard navigation >> tab through login form fields
- Location: e2e/accessibility.spec.ts:171:7

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByLabel('إظهار كلمة المرور')
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByLabel('إظهار كلمة المرور')
    14 × locator resolved to <button type="button" tabindex="-1" aria-label="إظهار كلمة المرور" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">…</button>
       - unexpected value "inactive"

```

```yaml
- button "إظهار كلمة المرور"
```

# Test source

```ts
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
> 184 |     await expect(page.getByLabel("إظهار كلمة المرور")).toBeFocused()
      |                                                        ^ Error: expect(locator).toBeFocused() failed
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
```