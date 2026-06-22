# POS System — UI/UX Pro Max Upgrade

## Goal
ترقية شاملة لواجهة نظام البيع والمخزون مع إصلاح المشاكل الموجودة — بدون إضافة مكتبات جديدة أو refactoring كبير.

## Scope

### 1. شاشة البيع (POS) — نقلة نوعية

| الميزة | الوصف | التنفيذ |
|--------|-------|---------|
| اختصارات لوحة المفاتيح | F1-ركز بحث, F2-منتجات, F3-سلة, F4-إتمام, Escape-إلغاء | `useEffect` keyboard listener |
| دعم باركود سكانر | Input دائم في الفوكس, Submit on Enter يضيف المنتج مباشرة | Auto-focus input + form submit |
| حركات السلة | إضافة/إزالة منتج بأنيميشن framer-motion | `AnimatePresence` + `motion.div` |
| Cart محسّن | إظمال المجموع, رسوم متوسطة, أيقونات المخزون | تحسين البطاقات |
| Barcode indicator | منتج ممسوح ضوئياً يظهر indicator أخضر | Badge على cart item |

### 2. طباعة الفواتير

| الميزة | الوصف |
|--------|-------|
| jsPDF موجود | زر "طباعة" في صفحة الفاتورة |
| محتوى PDF | Company name, address, phone, items table, total |
| حفظ PDF | Auto-download مع رقم الفاتورة |

### 3. الإعدادات — تعبئة الصفحة

| الميزة | الوصف |
|--------|-------|
| بيانات الشركة | الاسم, العنوان, الهاتف, الرقم الضريبي |
| إعدادات الطباعة | حجم الورق, عدد النسخ |
| إدارة المستخدمين | قائمة بسيطة بالخدامين وأدوارهم (admin/cashier) |
| حفظ في localStorage | Persist settings |

### 4. تحسين Dashboard

| المشكلة | الحل |
|---------|------|
| 3 طلبات API (dashboard + profit + reports) | دمج profit مع dashboard endpoint |
| بدون نظام الثيم | إضافة احترام system preference + localStorage persistence |

### 5. الـ Empty states — توحيد

| الحالة | المكون |
|--------|--------|
| لا توجد بيانات | EmptyState component موحد عبر كل الصفحات |
| خطأ تحميل | ErrorState مع زر إعادة المحاولة |
| تحميل | Skeleton loading موحد |

### 6. Pagination — للجداول

| الصفحة | التنفيذ |
|--------|---------|
| المنتجات | API: skip/take — Frontend: pagination controls |
| الفواتير | API: skip/take — Frontend: pagination controls |

### 7. Animations & Micro-interactions

| الموقع | النوع |
|--------|-------|
| Page transitions | framer-motion `motion.div` لكل الصفحات |
| Sidebar | hover/active transitions محسّنة |
| أزرار | Scale on click |
| بطاقات | Hover lift مع shadow transition |

## Non-goals
- No new npm packages
- No database schema changes
- No refactoring of existing API routes beyond merging dashboard+profit
- No rewriting of existing components

## Files affected

| الملف | التغيير |
|-------|---------|
| `src/app/(dashboard)/pos/page.tsx` | Keyboard shortcuts, barcode, animations, cart UX |
| `src/app/(dashboard)/invoices/[id]/page.tsx` | Print button + PDF generation |
| `src/app/(dashboard)/settings/page.tsx` | Company info, print settings, user management |
| `src/app/(dashboard)/page.tsx` | تحديث بعد دمج API |
| `src/app/api/dashboard/route.ts` | دمج profit data |
| `src/app/api/profit/route.ts` | إلغاء (دمج مع dashboard) |
| `src/app/api/products/route.ts` | Pagination |
| `src/app/api/invoices/route.ts` | Pagination |
| `src/app/(dashboard)/products/page.tsx` | Pagination controls |
| `src/app/(dashboard)/invoices/page.tsx` | Pagination controls |
| `src/app/layout.tsx` | Dark mode class |

## Architecture decisions
- Keyboard shortcuts: vanilla JS listener (لا مكتبات)
- PDF generation: jsPDF موجود — no change
- Animations: framer-motion موجود — no change
- Pagination: cursor-based? No — skip/take أبسط (page numbers)
- Settings storage: localStorage (لا DB, لا API)
- Empty states: inline component (لا ملف منفصل — لتقليل imports)

## Security notes
- Input validation: POS quantity لا يتجاوز المخزون (موجود)
- منع بيع منتجات بدون مخزون (موجود)
- Print: client-side only PDF (لا data leaks)
