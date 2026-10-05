import React from "react";
import type { Metadata } from "next";
import PODProductsGallery from "@/components/PODProductsGallery";
import { Sparkles, Palette, Truck, ShieldCheck, Layers } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "معرض منتجات الطباعة عند الطلب واليونيفورم | إطبعلي - Etbaaly",
  description: "تصفح كتالوج منتجات الطباعة عند الطلب: تيشيرتات قطن، هودي شتوي، مجات حرارية، توت باج، كابات مطرزة، ستيكرات ونوت بوك جاهزة للطلب الفوري وبدء التنفيذ.",
  alternates: {
    canonical: `${siteConfig.url}/products/`,
  },
  openGraph: {
    title: "معرض منتجات الطباعة عند الطلب واليونيفورم | إطبعلي - Etbaaly",
    description: "تصفح كتالوج منتجات الطباعة عند الطلب: تيشيرتات قطن، هودي شتوي، مجات حرارية، توت باج، كابات مطرزة، ستيكرات ونوت بوك جاهزة للطلب الفوري وبدء التنفيذ.",
    url: `${siteConfig.url}/products/`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/brand-hero-business.webp`,
        width: 1200,
        height: 630,
        alt: "معرض منتجات إطبعلي للطباعة والتغليف",
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: `${siteConfig.url}/` },
          { name: "المنتجات والكتالوج", url: `${siteConfig.url}/products/` },
        ]}
      />
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-crimson text-xs font-bold">
          <Palette className="w-4 h-4 text-[#c93b41]" />
          كتالوج ومنتجات الطباعة عند الطلب (Print on Demand Catalog)
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          اختر منتجك وابدأ <span className="text-[#c93b41]">التصميم والطباعة فوراً</span>
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          خامات فاخرة، بدون حد أدنى للكميات (ابتداءً من قطعة واحدة وحتى آلاف القطع)، مع شحن سريع لكافة المحافظات وتوليد فوري لملفات الطباعة 300 DPI.
        </p>
      </div>

      {/* Gallery */}
      <PODProductsGallery />

      {/* Benefits Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">بدون حد أدنى للكمية</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            اطبع قطعة واحدة كعينة لبراندك أو آلاف القطع بأسعار الجملة المخفضة.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">طباعة ديجيتال DTF و Ultra HD</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            أعلى درجات ثبات الألوان ومقاومة الغسيل المتكرر والاحتكاك اليومي.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">تجهيز وشحن خلال 24 - 48 ساعة</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            شحن وتوصيل فوري لباب منزلك أو مقر شركتك في كافة محافظات مصر.
          </p>
        </div>
      </div>
    </div>
  );
}
