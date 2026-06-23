# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: launch-health.spec.ts >> Launch Health Checks >> favicon exists
- Location: e2e/launch-health.spec.ts:18:7

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('link[rel="icon"]').first()
Expected pattern: /logo/
Received string:  "/favicon.ico?favicon.2vob68tjqpejf.ico"
Timeout: 5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('link[rel="icon"]').first()
    12 × locator resolved to <link rel="icon" sizes="256x256" type="image/x-icon" href="/favicon.ico?favicon.2vob68tjqpejf.ico"/>
       - unexpected value "/favicon.ico?favicon.2vob68tjqpejf.ico"

```

```yaml
- link "تخطى إلى المحتوى الرئيسي":
  - /url: "#main-content"
- banner:
  - navigation:
    - link "Smart Link الربط الذكي | Smart Link":
      - /url: /
      - img "Smart Link"
      - text: الربط الذكي | Smart Link
    - link "المميزات":
      - /url: "#features"
    - link "إحصائيات":
      - /url: "#stats"
    - link "الخطط والأسعار":
      - /url: "#cta"
    - link "تسجيل الدخول":
      - /url: /login
- text: مدعوم من الربط الذكي
- heading "Smart Link للأعمال من Smart Link — حل متكامل لإدارة المبيعات والمخزون" [level=1]
- paragraph: منصة واحدة تجمع بين إدارة نقاط البيع، تتبع المخزون، الفوترة الإلكترونية، والتقارير التحليلية — لتنمية أعمالك بذكاء وكفاءة.
- link "ابدأ الآن مجاناً":
  - /url: /login
- button "شاهد العرض التقديمي"
- link "اكتشف المميزات":
  - /url: "#features"
- text: لا يحتاج بطاقة بنكية بياناتك مشفرة دعم فني 24/7 منصة الربط الذكي مميزات متكاملة
- heading "كل ما تحتاجه لإدارة أعمالك في منصة واحدة" [level=2]
- paragraph: أدوات احترافية مصممة خصيصاً لتلبية احتياجات الشركات الصغيرة والمتوسطة
- heading "نظام نقاط البيع" [level=3]
- paragraph: واجهة سريعة وبديهية لإدارة المبيعات، دعم الفواتير النقدية والآجلة، طباعة الإيصالات، وتكامل مع الطابعات الحرارية.
- heading "إدارة المخزون" [level=3]
- paragraph: تتبع المخزون في الوقت الفعلي، تنبيهات انخفاض المخزون، إدارة المستودعات المتعددة، وجرد دوري آلي.
- heading "الفوترة الإلكترونية" [level=3]
- paragraph: إنشاء فواتير احترافية، إرسالها للعملاء عبر البريد الإلكتروني أو WhatsApp، ومطابقتها مع الأنظمة المحاسبية.
- heading "التقارير والتحليلات" [level=3]
- paragraph: لوحات تحليلية متقدمة، تقارير المبيعات والأرباح، تحليل أداء المنتجات، ورسوم بيانية تفاعلية تدعم قراراتك.
- heading "سرعة فائقة" [level=4]
- paragraph: أداء عالي في معالجة المبيعات والمخزون
- heading "آمن وموثوق" [level=4]
- paragraph: تشفير كامل ونسخ احتياطي تلقائي
- heading "دعم فني متميز" [level=4]
- paragraph: فريق دعم متواجد على مدار الساعة
- heading "أرقام تتحدث عن نفسها" [level=2]
- paragraph: ثقة آلاف العملاء هي الدافع الأكبر لتقديم الأفضل
- text: 0 مستخدم نشط 0 معاملة يومياً 0 منتج مُدار 0 سنوات خبرة ابدأ الآن مجاناً
- heading "جهز أعمالك للانطلاق مع Smart Link" [level=2]
- paragraph: انضم إلى مئات الشركات التي تثق بـ الربط الذكي. نظام متكامل يدير مبيعاتك، مخزونك، فواتيرك، وتقاريرك — كل ذلك في منصة واحدة.
- link "ابدأ الآن مجاناً":
  - /url: /login
- link "اكتشف المميزات":
  - /url: "#features"
- text: لا يحتاج بطاقة بنكية إلغاء في أي وقت دعم فني 24/7 تحديثات مستمرة
- contentinfo:
  - link "Smart Link الربط الذكي | Smart Link":
    - /url: /
    - img "Smart Link"
    - text: الربط الذكي | Smart Link
  - paragraph: نظام متكامل لإدارة المبيعات والمخزون — صمم لتنمية أعمالك بذكاء وكفاءة. نقدم حلولاً رقمية مبتكرة للشركات الصغيرة والمتوسطة.
  - heading "روابط سريعة" [level=3]
  - list:
    - listitem:
      - link "المميزات":
        - /url: "#features"
    - listitem:
      - link "الإحصائيات":
        - /url: "#stats"
    - listitem:
      - link "تسجيل الدخول":
        - /url: /login
    - listitem:
      - link "إنشاء حساب":
        - /url: /register
  - heading "تواصل معنا" [level=3]
  - list:
    - listitem: "البريد: info@smartlink.ly"
    - listitem: "الهاتف: 0912345678"
    - listitem: طرابلس، ليبيا
  - img "Smart Link"
  - text: مدعوم من الربط الذكي
  - paragraph:
    - img "Smart Link"
    - text: © 2026 الربط الذكي | Smart Link للأعمال. جميع الحقوق محفوظة.
  - link "سياسة الخصوصية":
    - /url: "#"
  - link "شروط الاستخدام":
    - /url: "#"
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | const PROD = "https://pos-m80w.onrender.com"
  4  | 
  5  | test.describe("Launch Health Checks", () => {
  6  |   test("homepage loads with landing", async ({ page, baseURL }) => {
  7  |     await page.goto(baseURL || PROD)
  8  |     await expect(page.getByRole("heading", { name: /Smart Link/ })).toBeVisible({ timeout: 15000 })
  9  |   })
  10 | 
  11 |   test("login page loads correctly", async ({ page, baseURL }) => {
  12 |     await page.goto(`${baseURL || PROD}/login`)
  13 |     await expect(page.locator("#email")).toBeVisible({ timeout: 10000 })
  14 |     await expect(page.locator("#password")).toBeVisible()
  15 |     await expect(page.getByText("تسجيل الدخول")).toBeVisible()
  16 |   })
  17 | 
  18 |   test("favicon exists", async ({ page, baseURL }) => {
  19 |     await page.goto(baseURL || PROD)
  20 |     const favicon = page.locator('link[rel="icon"]').first()
> 21 |     await expect(favicon).toHaveAttribute("href", /logo/)
     |                           ^ Error: expect(locator).toHaveAttribute(expected) failed
  22 |   })
  23 | 
  24 |   test("page has RT language and direction", async ({ page, baseURL }) => {
  25 |     await page.goto(baseURL || PROD)
  26 |     await expect(page.locator("html")).toHaveAttribute("lang", "ar")
  27 |     await expect(page.locator("html")).toHaveAttribute("dir", "rtl")
  28 |   })
  29 | 
  30 |   test("landing has feature section", async ({ page, baseURL }) => {
  31 |     await page.goto(baseURL || PROD)
  32 |     await expect(page.getByText("مميزات متكاملة")).toBeVisible({ timeout: 10000 })
  33 |   })
  34 | 
  35 |   test("login page has brand header", async ({ page, baseURL }) => {
  36 |     await page.goto(`${baseURL || PROD}/login`)
  37 |     await expect(page.getByRole("heading", { name: /الربط الذكي/ })).toBeVisible({ timeout: 10000 })
  38 |     await expect(page.getByText("Smart Link للأعمال").first()).toBeVisible()
  39 |   })
  40 | })
  41 | 
```