import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF6F0] p-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">الصفحة غير موجودة</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  )
}
