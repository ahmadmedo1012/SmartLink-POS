import type { Metadata } from "next"
import { Readex_Pro, Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const readexPro = Readex_Pro({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
  preload: true,
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
  preload: true,
})

export const metadata: Metadata = {
  title: "الربط الذكي | Smart Link للأعمال",
  description: "نظام إدارة مبيعات ومخزون متكامل من Smart Link — نقطة بيع، مخزون، فواتير، تقارير",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "الربط الذكي | Smart Link للأعمال",
    description: "نظام إدارة مبيعات ومخزون متكامل",
    type: "website",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${readexPro.variable} ${notoSansArabic.variable} h-full`}>
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
