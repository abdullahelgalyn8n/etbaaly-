import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Package, PhoneCall, HelpCircle, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة (404) | إطبعلي - Etbaaly",
  description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تصفح كتالوج مطبوعات إطبعلي أو عد للصفحة الرئيسية.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Visual Badge & Code */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black text-slate-200 dark:text-white/[0.06] tracking-widest select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/10 border border-red-500/20 text-[#c93b41] flex items-center justify-center shadow-lg shadow-red-500/5">
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            عفواً، لم نتمكن من العثور على هذه الصفحة!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            يبدو أن الرابط الذي دخلت عليه قد تغيّر أو تم حذفه، ولكن لا تقلق، يمكنك استكشاف منتجاتنا أو العودة للرئيسية بسهولة.
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c93b41] hover:bg-[#b03036] text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          <Link
            href="/products/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#242424] hover:bg-slate-50 dark:hover:bg-[#2d2d2d] text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 transition-all active:scale-95"
          >
            <Package className="w-4 h-4 text-[#c93b41]" />
            تصفح الكتالوج والمنتجات
          </Link>

          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#242424] hover:bg-slate-50 dark:hover:bg-[#2d2d2d] text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#c93b41]" />
            تواصل مع الدعم الفني
          </Link>
        </div>

        {/* Quick Links Suggestions */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08]">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-semibold">
            أو يمكنك تصفح أكثر الأقسام طلباً:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link
              href="/services/packaging-boxes/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:text-[#c93b41] transition-colors"
            >
              علب الكرتون الفاخرة
            </Link>
            <Link
              href="/services/offset-commercial/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:text-[#c93b41] transition-colors"
            >
              طباعة الأوفست التجارية
            </Link>
            <Link
              href="/services/labels-stickers/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:text-[#c93b41] transition-colors"
            >
              الاستيكرات والرول ليبل
            </Link>
            <Link
              href="/track/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:text-[#c93b41] transition-colors"
            >
              تتبع الشحنات والطلبات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
