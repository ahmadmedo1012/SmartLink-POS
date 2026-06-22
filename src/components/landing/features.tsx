"use client"

import { ShoppingCart, Package, FileText, BarChart3, Zap, Shield, HeadphonesIcon } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const features = [
  {
    icon: ShoppingCart,
    title: "نظام نقاط البيع",
    description:
      "واجهة سريعة وبديهية لإدارة المبيعات، دعم الفواتير النقدية والآجلة، طباعة الإيصالات، وتكامل مع الطابعات الحرارية.",
    gradient: "from-amber-500 to-orange-500",
    gradientBg: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
  },
  {
    icon: Package,
    title: "إدارة المخزون",
    description:
      "تتبع المخزون في الوقت الفعلي، تنبيهات انخفاض المخزون، إدارة المستودعات المتعددة، وجرد دوري آلي.",
    gradient: "from-emerald-500 to-teal-500",
    gradientBg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
  },
  {
    icon: FileText,
    title: "الفوترة الإلكترونية",
    description:
      "إنشاء فواتير احترافية، إرسالها للعملاء عبر البريد الإلكتروني أو WhatsApp، ومطابقتها مع الأنظمة المحاسبية.",
    gradient: "from-violet-500 to-purple-500",
    gradientBg: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
  },
  {
    icon: BarChart3,
    title: "التقارير والتحليلات",
    description:
      "لوحات تحليلية متقدمة، تقارير المبيعات والأرباح، تحليل أداء المنتجات، ورسوم بيانية تفاعلية تدعم قراراتك.",
    gradient: "from-sky-500 to-blue-500",
    gradientBg: "from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-amber-50/40 to-white dark:from-stone-950 dark:via-stone-900/40 dark:to-stone-950" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full border border-amber-200/60 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-800/40 dark:bg-amber-900/30 dark:text-amber-300">
              مميزات متكاملة
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              كل ما تحتاجه لإدارة أعمالك في{" "}
              <span className="text-gradient-amber">منصة واحدة</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              أدوات احترافية مصممة خصيصاً لتلبية احتياجات الشركات الصغيرة والمتوسطة
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <ScrollReveal key={feat.title} delay={i * 0.1}>
                <div className="group relative h-full cursor-pointer">
                  <div className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-border hover:shadow-hover dark:bg-stone-900/80 dark:hover:bg-stone-900/90">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feat.gradientBg} ring-1 ring-border/40`}
                    >
                      <Icon className={`h-6 w-6 bg-gradient-to-br ${feat.gradient} bg-clip-text text-transparent`} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{feat.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feat.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <div
                        className={`h-0.5 w-0 rounded-full bg-gradient-to-r ${feat.gradient} transition-all duration-300 group-hover:w-full`}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 grid gap-4 rounded-2xl border border-border/60 bg-white/50 p-6 backdrop-blur-sm dark:bg-stone-900/50 sm:grid-cols-3">
            {[
              { icon: Zap, title: "سرعة فائقة", desc: "أداء عالي في معالجة المبيعات والمخزون" },
              { icon: Shield, title: "آمن وموثوق", desc: "تشفير كامل ونسخ احتياطي تلقائي" },
              { icon: HeadphonesIcon, title: "دعم فني متميز", desc: "فريق دعم متواجد على مدار الساعة" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
