import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandedImage from "@/components/BrandedImage";
import { Sparkles, ArrowLeft, HeartHandshake, Zap } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "من نحن وقصتنا | وكالة A.Z للحلول الرقمية والإبداعية",
  description:
    "تعرف على قصة A.Z Agency، رؤيتنا في دمج الإنتاج الإبداعي ثلاثي الأبعاد بالحلول الرقمية والبرمجية الذكية، وأتمتة الأعمال وتحسين محركات البحث.",
  alternates: {
    canonical: `${siteConfig.url}/about/`,
  },
  openGraph: {
    title: "من نحن وقصتنا | وكالة A.Z للحلول الرقمية والإبداعية",
    description:
      "تعرف على قصة A.Z Agency، رؤيتنا في دمج الإنتاج الإبداعي ثلاثي الأبعاد بالحلول الرقمية والبرمجية الذكية.",
    url: `${siteConfig.url}/about/`,
    type: "website",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#c8232c]" />,
      title: "الابتكار البصري والفني",
      desc: "نلتزم بتقديم أعمال موشن جرافيك وهويات بصرية تكسر النمطية وتجذب انتباه الجمهور فوراً.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#c8232c]" />,
      title: "الشراكة والالتزام",
      desc: "نعتبر التعاون مع عملائنا شراكة نجاح طويلة الأمد تبدأ من الفكرة وتستمر حتى تحقيق الأرقام المستهدفة.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#c8232c]" />,
      title: "الهندسة فائقة السرعة",
      desc: "نبني منصات الويب وفق أحدث المعايير السحابية العالمية لتحقيق سرعة 100/100 وصفر تكلفة استضافة.",
    },
  ];

  const sectors = [
    { title: "المتاجر والتجارة الإلكترونية", count: "+60 علامة" },
    { title: "الشركات الناشئة ورواد الأعمال", count: "+45 مشروع" },
    { title: "المؤسسات الخدمية والطبية", count: "+30 هوية" },
    { title: "حملات السوشيال ميديا والإعلانات", count: "+100 فيديو" },
  ];

  return (
    <div className="space-y-20 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "من نحن", url: `${siteConfig.url}/about/` },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-12 md:pt-16 pb-8 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-[#c8232c] dark:text-red-400 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>قصة A.Z Adv Co ورؤيتها</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-6">
          قصة A.Z Adv Co وبداياتها الفريدة
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
          A.Z Adv Co ليست مجرد وكالة تسويق عادية، بل هي بيت إبداع وحلول رقمية متقدمة تتمحور حول صناعة القصص البصرية المؤثرة وبناء المنصات الرقمية الذكية.
        </p>
      </section>

      {/* Story Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              دمج الفن البصري الراقي مع التقنية البرمجية المتطورة
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              بدأت A.Z Adv Co برؤية طموحة لإعادة تعريف صناعة الدعاية والإنتاج الرقمي في مصر والشرق الأوسط، حيث جمعنا خبرات عميقة في الرسوم المتحركة (Motion Graphics 2D/3D)، تصميم الهويات والمطبوعات، وتطوير الويب الحديث.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              نحن نؤمن بأن المحتوى البصري الجذاب هو مفتاح الاستحواذ على انتباه العميل، بينما البنية البرمجية والتحسين التقني (SEO) هما الركيزة الأساسية لتحويل هذا التفاعل إلى مبيعات ونمو مستدام.
            </p>
            <div className="pt-2">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c8232c] hover:bg-[#b81d24] text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all"
              >
                <span>ابدأ رحلة نجاحك معنا</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#181a1f] border border-slate-200 dark:border-slate-800 shadow-xl">
              <BrandedImage
                src="/images/brand-hero-business.webp"
                alt="فريق وعمليات وكالة A.Z للحلول الرقمية والإبداعية وتطوير الهويات"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                loading="lazy"
                className="object-contain"
              />
            </div>
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#181a1f] border border-slate-200 dark:border-slate-800 shadow-xl">
              <BrandedImage
                src="/images/brand-offer-easel.webp"
                alt="الحرفية الرقمية وتطوير الأنظمة والتصميم الإبداعي والسيو - A.Z Agency"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                loading="lazy"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 dark:bg-[#07090c] border-y border-slate-200 dark:border-[#1f2533] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-4">قيمنا الأساسية</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              المبادئ التي تقود كل مشروع إبداعي وهندسي ننفذه لعملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 space-y-4 shadow-sm hover:border-red-500/40 dark:hover:border-red-600/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] flex items-center justify-center shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Served */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-4">القطاعات التي نخدمها</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            حلول مخصصة تلبي طبيعة ومتطلبات كل صناعة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sectors.map((sec, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-2xl p-6 text-center space-y-2 shadow-sm"
            >
              <div className="text-[#c8232c] font-black text-base">{sec.count}</div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">{sec.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
