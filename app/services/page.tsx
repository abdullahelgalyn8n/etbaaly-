import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Package,
  Printer,
  FileText,
  ShoppingBag,
  Tag,
  Presentation,
  ShieldCheck,
  Truck,
  Calculator,
  ChevronLeft,
  Layers,
  FileCheck2,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import { BreadcrumbSchema } from "@/components/JsonLd";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "خدمات الطباعة والتغليف الفاخر | إطبعلي - Etbaaly",
  description:
    "استكشف خدمات وحلول مطابع إطبعلي المتكاملة: طباعة أوفست تجارية، علب كرتون منتجات، أكياس ورقية، ستيكرات داي-كت، مطبوعات معارض ورول أب، ومطبوعات رسمية للشركات مع تتبع شحنات لحظي.",
  alternates: {
    canonical: `${siteConfig.url}/services/`,
  },
  openGraph: {
    title: "خدمات وحلول الطباعة والتغليف | إطبعلي - Etbaaly",
    description:
      "استكشف خدمات مطابع إطبعلي: طباعة أوفست، علب وتغليف منتجات، كروت شخصية، أكياس ورقية، ومطبوعات معارض مع تتبع الشحنات المباشر.",
    url: `${siteConfig.url}/services/`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "خدمات الطباعة والتغليف", url: `${siteConfig.url}/services/` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-crimson text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>مطابع وحلول طباعة وتغليف متكاملة (Web-to-Print)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-6">
          أقسام وخدمات الطباعة الفاخرة للشركات والعلامات التجارية
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          اختر القسم المطلوب للاطلاع على المواصفات الفنية، أنواع الورق والكرتون المتاحة، التشطيبات الفاخرة، وحساب التكلفة المباشرة لأمر الشغل.
        </p>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Quick Action Tools Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto md:mx-0">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">حاسبة الأسعار الفورية</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                احسب تكلفة الكميات وسعر القطعة مع خصم تلقائي للكميات الكبيرة في ثوانٍ.
              </p>
              <Link href="/dashboard/" className="inline-block text-xs font-bold text-[#c93b41] hover:underline pt-1">
                فتح حاسبة المقايسات ➔
              </Link>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto md:mx-0">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">تتبع الشحنات المباشر</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                تابع حركة خط الإنتاج وموقع مندوب التوصيل لحظة بلحظة حتى باب مقركم.
              </p>
              <Link href="/track/" className="inline-block text-xs font-bold text-[#c93b41] hover:underline pt-1">
                تتبع شحنتك ➔
              </Link>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto md:mx-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">فحص وتجهيز الملفات</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                تأكد من سلامة دقة الألوان والهوامش وهوية مطبوعاتك قبل الإرسال للإنتاج.
              </p>
              <Link href="/#preflight" className="inline-block text-xs font-bold text-[#c93b41] hover:underline pt-1">
                فحص الملف الآن ➔
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
