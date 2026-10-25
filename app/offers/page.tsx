import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldCheck, Tag, Layers, CheckCircle2, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { offersData } from "@/data/offersData";
import { BreadcrumbSchema } from "@/components/JsonLd";
import OfferCard from "@/components/offers/OfferCard";

export const metadata: Metadata = {
  title: "عروض وباقات الطباعة والتغليف للشركات والمتاجر | إطبعلي - Etbaaly",
  description:
    "تصفح أقوى باقات وعروض إطبعلي المخفضة لرواد الأعمال والعلامات التجارية: علب شحن وتغليف المتاجر، علب هارد بوكس، مطبوعات الشركات، رول ليبل مقاوم، وأكياس فاخرة بأسعار تصنيع مباشرة.",
  alternates: {
    canonical: `${siteConfig.url}/offers/`,
  },
  openGraph: {
    title: "عروض وباقات الطباعة والتغليف | إطبعلي - Etbaaly",
    description:
      "باقات متكاملة بأسعار مخفضة وخصومات كميات مباشرة للمتاجر والشركات مع عينات مجانية وضمان مطابقة الألوان.",
    url: `${siteConfig.url}/offers/`,
    type: "website",
  },
};

export const dynamic = "force-static";

export default function OffersPage() {
  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "العروض والباقات المخفضة", url: `${siteConfig.url}/offers/` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-crimson text-xs font-bold mb-6 shadow-sm">
          <Tag className="w-3.5 h-3.5" />
          <span>باقات وحزم إنتاجية بأسعار المصنع المباشرة (All-in-One Packages)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-6">
          عروض وباقات الطباعة والتغليف المخصصة للشركات والبراندات
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          جمعنا لك أفضل الباقات الإنتاجية التي تلبي احتياجات انطلاقة متجرك أو شركتك، بأسعار مخفضة ومواصفات واضحة، تشمل التجهيز، الفحص، والضمان الذهبي للتسليم.
        </p>

        {/* Clear Service vs Offer Distinction Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 max-w-2xl mx-auto flex items-start sm:items-center gap-3 text-right">
          <Layers className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed font-medium">
            <strong>ملاحظة تنظيمية:</strong> هذه الصفحة مخصصة لـ <strong>الباقات والعروض الترويجية الجاهزة</strong> ذات الكميات والأسعار المحددة. إذا كنت تبحث عن مواصفات هندسية مفتوحة أو كميات ضخمة خارج الباقات، يمكنك تصفح{" "}
            <Link href="/services/" className="text-[#c93b41] font-bold underline hover:opacity-80">
              أقسام الخدمات العامة
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {offersData.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Why Our Offers Deliver More Value (Hormozi / Value Equation Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white dark:bg-[#111215] border border-slate-800 dark:border-white/[0.08] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ميثاق إطبعلي في تصميم العروض</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              لماذا باقاتنا هي الاستثمار الأوفر والأكثر أماناً لمشروعك؟
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              نحن لا نقدم خصومات صورية على خامات رديئة. كل باقة تشتمل على خامات مستوردة معتمدة، وقوالب سكاكين داي-كت مخصصة بدون رسوم إضافية، وضمان إعادة الطباعة المجانية في حال حدوث أي خطأ فني أو لوني.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>عينة حقيقية قبل بدء التشغيل الكامل</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>مطابقة ألوان الهوية 100% CMYK/PMS</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تتبع الشحنة لحظياً حتى باب مقرك</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Service Transition CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">
          هل تحتاج إلى عرض سعر مخصص خارج هذه الباقات؟
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          يمكن لمهندسي الإنتاج لدينا إعداد مقايسة فنية تفصيلية وفق مواصفاتك الخاصة خلال 60 دقيقة فقط.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/services/"
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/[0.1] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-900 dark:text-white font-bold text-xs transition-all"
          >
            تصفح جميع أقسام الخدمات
          </Link>
          <Link
            href="/contact/"
            className="px-5 py-2.5 rounded-xl btn-crimson text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>طلب مقايسة خاصة</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
