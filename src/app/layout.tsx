import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-tajawal",
  preload: true, // ponytail: preload Arabic font — it's critical for FCP
})

export const metadata: Metadata = {
  title: "قنوات | Smart Link للأعمال",
  description: "نظام إدارة مبيعات ومخزون متكامل من Smart Link — نقطة بيع، مخزون، فواتير، تقارير",
  icons: { icon: "/favicon.ico" },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full`}>
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          تخطى إلى المحتوى الرئيسي
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
