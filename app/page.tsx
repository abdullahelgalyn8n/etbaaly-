import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Truck,
  Sparkles,
  Layers,
  CheckCircle2,
  Package,
  FileCheck,
  ArrowRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import { faqsData } from "@/data/faqsData";
import FAQAccordion from "@/components/FAQAccordion";
import { FAQSchema, WebSiteSchema } from "@/components/JsonLd";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeTestimonialsSection from "@/components/home/HomeTestimonialsSection";
import PODProductsGallery from "@/components/PODProductsGallery";

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      <WebSiteSchema />
      <FAQSchema items={faqsData} />

      {/* 1. HERO SECTION */}
      <HomeHeroSection />

      {/* 2. CORE PRODUCTS & CATEGORIES */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>كتالوج المنتجات والطباعة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              اختر نوع المطبوعات والتغليف
            </h2>
          </div>
          <Link
            href="/products/"
            className="text-sm font-bold text-[#c93b41] hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>عرض كافة المنتجات والأسعار</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery with category filter */}
        <PODProductsGallery />
      </section>

      {/* 3. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>خطوات بسيطة وسريعة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              كيف تطلب مطبوعاتك من إطبعلي؟
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              نوفر لك تجربة سلسة من لحظة اختيار المواصفات حتى استلام الشحنة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-[#1d1d1d] border border-slate-200/80 dark:border-white/[0.05] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c93b41] text-white font-black text-lg flex items-center justify-center shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                حدد المنتج والمواصفات
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                اختر نوع الورق، المقاسات، نوع السلوفان أو البصمة، والكمية المطلوبة لتحصل على السعر فورياً.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-[#1d1d1d] border border-slate-200/80 dark:border-white/[0.05] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c93b41] text-white font-black text-lg flex items-center justify-center shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                ارفع تصميمك أو صمم معنا
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                ارفع ملفك الجاهز للطباعة أو اطلب من فريق التصميم إعداد بروفة احترافية ومراجعتها قبل التشغيل.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-[#1d1d1d] border border-slate-200/80 dark:border-white/[0.05] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c93b41] text-white font-black text-lg flex items-center justify-center shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                استلم طلبك مع تتبع مباشر
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                نقوم بالطباعة والتغليف والتسليم لباب شركتك مع إمكانية متابعة خط سير الشحنة لحظة بلحظة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAMPLE BOX & QUICK TOOLS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sample Box Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#c93b41] via-[#ba3239] to-[#8a1c23] text-white shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                <Package className="w-3.5 h-3.5" />
                <span>عينة قبل الإنتاج</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                مش متأكد من الخامات والتشطيبات؟
              </h3>
              <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                اطلب بوكس عينات الخامات المجاني لعلامتك التجارية للمس أنواع الكرتون، الورق الفاخر، الورنيش، والبصمة بنفسك.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact/?type=sample-box"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#c93b41] font-bold text-sm hover:bg-red-50 transition-colors shadow-md"
              >
                <span>طلب بوكس العينات</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Tracking & Custom Quote Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>خدمات سريعة</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                تتبع شحنتك أو اطلب تسعيرة خاصة
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                تابع حالة أمر الشغل الخاص بك أو تواصل مع مستشاري الطباعة للكميات الكبرى والمواصفات الخاصة.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/track/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#1d1d1d] hover:bg-slate-200 dark:hover:bg-[#2b2b2b] text-slate-900 dark:text-white font-bold text-sm transition-colors border border-slate-200 dark:border-white/[0.08]"
              >
                <Truck className="w-4 h-4 text-[#c93b41]" />
                <span>تتبع الشحنة الآن</span>
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-crimson text-white font-bold text-sm transition-colors"
              >
                <span>استشارة وتسعير مخصص</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <HomeTestimonialsSection />

      {/* 6. FAQS */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة الشائعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            كل ما يهمك معرفته قبل الطباعة
          </h2>
        </div>

        <FAQAccordion items={faqsData} />
      </section>
    </div>
  );
}
