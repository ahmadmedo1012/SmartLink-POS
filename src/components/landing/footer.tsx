"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo-small.png" alt="Smart Link" className="h-8 w-auto" />
              <span className="text-base font-bold text-foreground">
                قنوات <span className="text-primary">|</span> Smart Link
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              نظام متكامل لإدارة المبيعات والمخزون — صمم لتنمية أعمالك بذكاء وكفاءة.
              نقدم حلولاً رقمية مبتكرة للشركات الصغيرة والمتوسطة.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">روابط سريعة</h3>
            <ul className="space-y-2">
              {["المميزات", "الإحصائيات", "تسجيل الدخول", "إنشاء حساب"].map((link) => (
                <li key={link}>
                  <a
                    href={
                      link === "المميزات"
                        ? "#features"
                        : link === "الإحصائيات"
                          ? "#stats"
                          : link === "تسجيل الدخول"
                            ? "/login"
                            : "/register"
                    }
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>البريد: info@smartlink.ly</li>
              <li>الهاتف: 0912345678</li>
              <li>طرابلس، ليبيا</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <img src="/logo-small.png" alt="Smart Link" className="h-3.5 w-auto inline-block" />
            &copy; {new Date().getFullYear()} قنوات | Smart Link للأعمال. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              سياسة الخصوصية
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              شروط الاستخدام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
