import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Box, PackageCheck, Truck, ArrowUpRight } from "lucide-react";

export function HomeHeroSection() {
  return (
    <section className="relative pt-4 md:pt-10 pb-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[radial-gradient(circle,rgba(201,59,65,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[radial-gradient(circle,rgba(138,28,35,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-crimson text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مطابع وحلول تغليف متكاملة • A.Z Agency</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.25] tracking-tight">
            كل احتياجات الطباعة والتغليف <br className="hidden sm:inline" />
            <span className="text-[#c93b41]">بأعلى جودة وأسهل تجربة</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            علب منتجات فاخرة، ستيكرات داي-كت، كروت شخصية، ومطبوعات تجارية مخصصة لعلامتك التجارية مع معاينة فورية وشحن سريع لباب شركتك.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/products/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-crimson text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] shadow-lg group"
            >
              <Box className="w-5 h-5 text-red-100" />
              <span>تصفح المنتجات والأسعار</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] hover:border-[#c93b41] text-slate-900 dark:text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>طلب عرض سعر خاص / كميات</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#c93b41]" />
            </Link>
          </div>

          {/* Value Props Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-[#242424]/70 border border-slate-200/60 dark:border-white/[0.05]">
              <PackageCheck className="w-4 h-4 text-[#c93b41] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">بروفة قبل اعتماد الطباعة</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-[#242424]/70 border border-slate-200/60 dark:border-white/[0.05]">
              <Truck className="w-4 h-4 text-[#c93b41] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">شحن سريع وتتبع مباشر</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-[#242424]/70 border border-slate-200/60 dark:border-white/[0.05]">
              <ShieldCheck className="w-4 h-4 text-[#c93b41] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">ضمان جودة الألوان والخامات</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-[#242424]/70 border border-slate-200/60 dark:border-white/[0.05]">
              <Sparkles className="w-4 h-4 text-[#c93b41] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">خصومات فورية للكميات</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSection;
