# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-path.spec.ts >> Dashboard >> live badge appears
- Location: e2e/critical-path.spec.ts:196:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
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
          - generic [ref=e25]: · آخر تحديث ١٠:٢٥ م
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
          - application [ref=e109]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - generic [ref=e126]: ٢٢‏/٦‏/٢٠٢٦
                - generic [ref=e128]: ٢١‏/٦‏/٢٠٢٦
              - generic [ref=e129]:
                - generic [ref=e131]: "0"
                - generic [ref=e133]: "150"
                - generic [ref=e135]: "300"
                - generic [ref=e137]: "450"
                - generic [ref=e139]: "600"
        - generic [ref=e140]:
          - heading "توزيع الإيرادات" [level=3] [ref=e141]
          - application [ref=e144]:
            - generic [ref=e157]:
              - generic [ref=e160]: المبيعات
              - generic [ref=e163]: المصروفات
              - generic [ref=e166]: الأرباح
    - generic [ref=e167]:
      - generic [ref=e170]: النشاط
      - generic [ref=e171]:
        - generic [ref=e173]:
          - generic [ref=e174]:
            - heading "آخر النشاطات" [level=3] [ref=e175]
            - img [ref=e176]
          - generic [ref=e179]:
            - img [ref=e180]
            - paragraph [ref=e183]: لا توجد نشاطات بعد
        - generic [ref=e185]:
          - generic [ref=e186]:
            - heading "أفضل المنتجات مبيعاً" [level=3] [ref=e187]
            - img [ref=e188]
          - generic [ref=e191]:
            - img [ref=e192]
            - paragraph [ref=e196]: لا توجد منتجات بعد
    - generic [ref=e197]:
      - generic [ref=e200]: ملخص
      - generic [ref=e201]:
        - generic [ref=e203]:
          - generic [ref=e204]:
            - heading "آخر الفواتير" [level=3] [ref=e205]
            - button "عرض الكل" [ref=e206] [cursor=pointer]
          - generic [ref=e207]:
            - 'button "فاتورة #1024 أحمد • ٢٢‏/٦‏/٢٠٢٦ ‏450,00 د.ل.‏" [ref=e208] [cursor=pointer]':
              - generic [ref=e209]:
                - img [ref=e211]
                - generic [ref=e215]:
                  - generic [ref=e216]: "فاتورة #1024"
                  - generic [ref=e217]: أحمد • ٢٢‏/٦‏/٢٠٢٦
              - generic [ref=e218]: ‏450,00 د.ل.‏
            - 'button "فاتورة #1023 سارة • ٢١‏/٦‏/٢٠٢٦ ‏230,00 د.ل.‏" [ref=e219] [cursor=pointer]':
              - generic [ref=e220]:
                - img [ref=e222]
                - generic [ref=e226]:
                  - generic [ref=e227]: "فاتورة #1023"
                  - generic [ref=e228]: سارة • ٢١‏/٦‏/٢٠٢٦
              - generic [ref=e229]: ‏230,00 د.ل.‏
        - generic [ref=e231]:
          - heading "ملخص سريع" [level=3] [ref=e232]
          - generic [ref=e233]:
            - generic [ref=e234]:
              - generic [ref=e235]:
                - img [ref=e236]
                - generic [ref=e239]: إجمالي المبيعات
              - generic [ref=e240]: ‏15.200,00 د.ل.‏
            - generic [ref=e241]:
              - generic [ref=e242]:
                - img [ref=e243]
                - generic [ref=e246]: الربح المقدر
              - generic [ref=e247]: ‏4.800,00 د.ل.‏
            - generic [ref=e248]:
              - generic [ref=e249]:
                - img [ref=e250]
                - generic [ref=e253]: المصروفات
              - generic [ref=e254]: ‏3.200,00 د.ل.‏
            - generic [ref=e255]:
              - generic [ref=e256]:
                - img [ref=e257]
                - generic [ref=e261]: الفواتير
              - generic [ref=e262]: "67"
            - generic [ref=e263]:
              - generic [ref=e264]:
                - img [ref=e265]
                - generic [ref=e269]: المنتجات
              - generic [ref=e270]: "142"
            - generic [ref=e271]:
              - generic [ref=e272]:
                - img [ref=e273]
                - generic [ref=e278]: العملاء
              - generic [ref=e279]: "89"
        - generic [ref=e281]:
          - heading "مبيعات اليوم" [level=3] [ref=e282]
          - generic [ref=e283]:
            - generic [ref=e284]: ‏15.200,00 د.ل.‏
            - generic [ref=e285]:
              - img [ref=e286]
              - generic [ref=e289]: 0% هامش ربح
            - generic [ref=e290]:
              - generic [ref=e291]:
                - generic [ref=e292]: الفواتير
                - generic [ref=e293]: "67"
              - generic [ref=e294]:
                - generic [ref=e295]: المصروفات
                - generic [ref=e296]: ‏3.200,00 د.ل.‏
  - generic [ref=e297]: "0"
```

# Test source

```ts
  1   | import { test, expect, Page } from "@playwright/test"
  2   | 
  3   | // ---------------------------------------------------------------------------
  4   | // Helpers
  5   | // ---------------------------------------------------------------------------
  6   | /** Log in with valid credentials so dashboard tests can run. */
  7   | async function loginAsAdmin(page: Page) {
  8   |   await page.goto("/login")
  9   |   await page.locator("#email").fill("admin@pos.com")
  10  |   await page.locator("#password").fill("admin123")
  11  |   await page.getByRole("button", { name: /تسجيل الدخول/i }).click()
  12  |   // Wait for redirect to dashboard
  13  |   await page.waitForURL("/", { timeout: 10000 })
> 14  |   await page.waitForSelector("#main-content", { timeout: 10000 })
      |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  15  | }
  16  | 
  17  | /** Stub dashboard API to return deterministic test data. */
  18  | async function mockDashboardApi(page: Page) {
  19  |   await page.route("**/api/dashboard", (route) =>
  20  |     route.fulfill({
  21  |       status: 200,
  22  |       contentType: "application/json",
  23  |       body: JSON.stringify({
  24  |         totalSales: 15200,
  25  |         estimatedProfit: 4800,
  26  |         productCount: 142,
  27  |         customerCount: 89,
  28  |         totalExpenses: 3200,
  29  |         invoiceCount: 67,
  30  |         recentInvoices: [
  31  |           {
  32  |             id: "inv-1",
  33  |             invoiceNo: 1024,
  34  |             grandTotal: "450.00",
  35  |             createdAt: new Date().toISOString(),
  36  |             user: { name: "أحمد" },
  37  |           },
  38  |           {
  39  |             id: "inv-2",
  40  |             invoiceNo: 1023,
  41  |             grandTotal: "230.00",
  42  |             createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  43  |             user: { name: "سارة" },
  44  |           },
  45  |         ],
  46  |       }),
  47  |     })
  48  |   )
  49  | }
  50  | 
  51  | /** Stub POS products API. */
  52  | async function mockPosApi(page: Page) {
  53  |   await page.route("**/api/pos/products*", (route) =>
  54  |     route.fulfill({
  55  |       status: 200,
  56  |       contentType: "application/json",
  57  |       body: JSON.stringify([
  58  |         { id: "p1", nameAr: "منتج أ", name: "Product A", price: 25, stock: 100, barcode: "111111" },
  59  |         { id: "p2", nameAr: "منتج ب", name: "Product B", price: 50, stock: 75,  barcode: "222222" },
  60  |         { id: "p3", nameAr: "منتج ت", name: "Product C", price: 15, stock: 0,   barcode: "333333" },
  61  |       ]),
  62  |     })
  63  |   )
  64  | }
  65  | 
  66  | /** Stub categories API. */
  67  | async function mockCategoriesApi(page: Page) {
  68  |   await page.route("**/api/categories", (route) =>
  69  |     route.fulfill({
  70  |       status: 200,
  71  |       contentType: "application/json",
  72  |       body: JSON.stringify([
  73  |         { id: "c1", nameAr: "فئة 1", _count: { products: 5 } },
  74  |         { id: "c2", nameAr: "فئة 2", _count: { products: 3 } },
  75  |       ]),
  76  |     })
  77  |   )
  78  | }
  79  | 
  80  | /** Stub customers API. */
  81  | async function mockCustomersApi(page: Page) {
  82  |   await page.route("**/api/customers*", (route) =>
  83  |     route.fulfill({
  84  |       status: 200,
  85  |       contentType: "application/json",
  86  |       body: JSON.stringify([
  87  |         { id: "cust1", name: "عميل 1", phone: "0555000001" },
  88  |         { id: "cust2", name: "عميل 2", phone: "0555000002" },
  89  |       ]),
  90  |     })
  91  |   )
  92  | }
  93  | 
  94  | // ---------------------------------------------------------------------------
  95  | // Tests
  96  | // ---------------------------------------------------------------------------
  97  | test.describe("Login page", () => {
  98  |   test("renders form with email, password, and submit button", async ({ page }) => {
  99  |     await page.goto("/login")
  100 | 
  101 |     // Brand
  102 |     await expect(page.locator("h1")).toContainText("قنوات")
  103 | 
  104 |     // Form fields
  105 |     await expect(page.locator("#email")).toBeVisible()
  106 |     await expect(page.locator("#password")).toBeVisible()
  107 |     await expect(page.getByRole("button", { name: /تسجيل الدخول/i })).toBeVisible()
  108 | 
  109 |     // Pre-filled credentials
  110 |     await expect(page.locator("#email")).toHaveValue("admin@pos.com")
  111 | 
  112 |     // RTL check
  113 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  114 |   })
```