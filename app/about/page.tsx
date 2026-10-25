import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BrandedImage from "@/components/BrandedImage";
import {
  Sparkles,
  ArrowLeft,
  Printer,
  Package,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Building2,
  Tag,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "من نحن وقصة منصة إطبعلي | الذراع الصناعي والطباعي لـ A.Z Agency",
  description:
    "تعرف على قصة منصة إطبعلي (Etbaaly)، المنصة المتخصصة في الطباعة الفاخرة، تصنيع العلب والتغليف، الأكياس والستيكرات، وتجهيزات المعارض برؤية تجمع بين الحرفية الصناعية والحلول البرمجية الذكية التابعة لوكالة A.Z.",
  alternates: {
    canonical: `${siteConfig.url}/about/`,
  },
  openGraph: {
    title: "من نحن وقصة منصة إطبعلي | Etbaaly - A.Z Agency",
    description:
      "الذراع الصناعي والطباعي المتقدم لوكالة A.Z للحلول الرقمية والإبداعية: دمج حرفية الأوفست الفاخرة بأحدث تقنيات الـ Web-to-Print والأتمتة الذكية.",
    url: `${siteConfig.url}/about/`,
    type: "website",
  },
};

export const dynamic = "force-static";

export default function AboutPage() {
  const pillars = [
    {
      icon: <Printer className="w-6 h-6 text-[#c93b41]" />,
      title: "الحرفية الصناعية ودقة الألوان",
      desc: "نعتمد على خطوط سحب أوفست هايدلبرج ألمانية وماكينات رقمية ومعايرة لونية بانتون دقيقة 100% CMYK مع تشطيبات الفويل والسلوفان المخملي.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#c93b41]" />,
      title: "التكنولوجيا السحابية (Web-to-Print)",
      desc: "ربط العميل مباشرة بالمطبعة عبر حاسبة مقايسات ذكية، واستديو تخصيص المنتجات، وفحص ملفات الطباعة الفوري دون وسطاء أو تأخير.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#c93b41]" />,
      title: "الضمان الماسي للجودة والتسليم",
      desc: "نلتزم بإنتاج عينة ماكيت حقيقية قبل تشغيل الكميات الكبيرة، مع تتبع لحظي للشحنات وضمان إعادة الإنتاج المجاني لأي خطأ فني.",
    },
  ];

  const stats = [
    { label: "قطعة مطبوعة ومصنعة سنوياً", value: "+12,500,000" },
    { label: "علامة تجارية ومتجر وشريك نجاح", value: "+1,850" },
    { label: "محافظة نغطيها بالشحن المباشر", value: "27 محافظة" },
    { label: "نسبة الالتزام بمواعيد التسليم", value: "99.4%" },
  ];

  const manufacturingLines = [
    {
      title: "علب الكرتون وتغليف المنتجات (Packaging & Rigid Boxes)",
      desc: "تصنيع العلب المضلعة E-Flute للشحن، علب الهارد بوكس للعطور والمجوهرات، والسكاكين المخصصة.",
      link: "/services/packaging-boxes/",
    },
    {
      title: "طباعة الأوفست التجارية (Commercial Offset)",
      desc: "سحب الكميات الضخمة من الفلايرات، البروشورات، والكتالوجات بأعلى ثبات لوني وأفضل سعر للنسخة.",
      link: "/services/offset-commercial/",
    },
    {
      title: "مطبوعات الهوية والمستلزمات الرسمية (Corporate Stationery)",
      desc: "كروت شخصية بسلوفان سوفت تاتش وسبوت UV، أوراق مراسلات قطنية، وفولدرات وأظرف مقواة.",
      link: "/services/corporate-stationery/",
    },
    {
      title: "الأكياس الورقية والشنط المعززة (Custom Bags)",
      desc: "أكياس كوشيه وكرافت مستورد بأيادي شريط ستان عريض وقواعد مقواة لحمل حتى 5 كجم.",
      link: "/services/paper-bags/",
    },
    {
      title: "الستيكرات والرول ليبل (Labels & Stickers)",
      desc: "ملصقات بولي بروبيلين مقاومة للماء والزيوت ورطوبة التبريد لماكينات التعبئة الآلية واليدوية.",
      link: "/services/stickers-labels/",
    },
    {
      title: "مطبوعات المعارض والأجنحة (Displays & Booths)",
      desc: "ستاندات رول أب، بوب أب 3×3، بنرات فوتوغرافية، ويونيفورم مطرز ومطبوع بتقنية DTF المتطورة.",
      link: "/services/displays-uniforms/",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "من نحن وقصتنا", url: `${siteConfig.url}/about/` },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-12 md:pt-16 pb-8 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-crimson text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>الذراع الصناعي والطباعي لوكالة A.Z للحلول الرقمية والإبداعية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-6">
          قصة إطبعلي (Etbaaly) ورؤيتنا في إعادة تعريف صناعة الطباعة والتغليف
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
          وُلدت منصة <strong>إطبعلي</strong> كاستجابة حقيقية لتحديات رواد الأعمال وأصحاب المتاجر في الشرق الأوسط: الجمع بين جودة الطباعة الأوفست الفاخرة، وسرعة التسليم الرقمي، والشفافية الكاملة في التسعير والتتبع اللحظي.
        </p>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#c93b41] uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>حرفية المطبعة مع عقلية المنصة الرقمية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white leading-snug">
              من مرحلة التصميم ثلاثي الأبعاد وحتى خروج الكرتونة من خط التجميع
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              تأسست المنصة تحت مظلة <strong>A.Z Agency</strong> لتكون حلقة الوصل المفقودة بين عالم التصميم الإبداعي والإنتاج الصناعي على أرض الواقع. بدلاً من المعاناة مع أخطاء الألوان وهدر الخامات وسوء التقفيل، بنينا نموذج عمل هندسي يبدأ بمراجعة الملفات (Preflight Audit)، واعتماد عينة ماكيت فعلية، ومطابقة الألوان مع دليل بانتون العالمي.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              سواء كنت تطلق متجراً إلكترونياً جديداً يحتاج إلى صناديق شحن مضلعة تمنح عميلك تجربة استلام لا تُنسى، أو شركة كبرى بحاجة إلى مطبوعات رسمية وتجهيزات معارض، فإننا نوفر لك التجربة الشاملة بكل شفافية واحترافية.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-crimson text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <span>استكشف أقسام الخدمات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/offers/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/[0.1] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-900 dark:text-white font-bold text-xs transition-all"
              >
                <span>تصفح الباقات والعروض المخفضة</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#181a1f] border border-slate-200 dark:border-slate-800 shadow-xl">
              <BrandedImage
                src="/images/brand-hero-business.webp"
                alt="فريق وعمليات إطبعلي للحلول الصناعية والطباعة الفاخرة"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                loading="lazy"
                className="object-contain p-2"
              />
            </div>
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#181a1f] border border-slate-200 dark:border-slate-800 shadow-xl">
              <BrandedImage
                src="/images/brand-offer-easel.webp"
                alt="مطابقة الألوان والتشطيبات الفاخرة في إطبعلي"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                loading="lazy"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white dark:bg-[#121417] border border-slate-800 dark:border-white/[0.08] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800 dark:divide-white/[0.08]">
            {stats.map((stat, i) => (
              <div key={i} className="pt-6 lg:pt-0 space-y-2">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#c93b41]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-semibold max-w-[200px] mx-auto">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="bg-slate-100/70 dark:bg-[#07090c] border-y border-slate-200 dark:border-[#1f2533] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
              ركائزنا التشغيلية في خطوط الإنتاج
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              المعايير الهندسية التي تحكم كل أمر شغل يمر عبر ماكينات إطبعلي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 space-y-4 shadow-sm hover:border-[#c93b41]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities / Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            خطوط الإنتاج والتصنيع الرئيسية
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            تغطية شاملة لكافة احتياجات الطباعة والتعبئة والتغليف للمؤسسات والبراندات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manufacturingLines.map((line, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  {line.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {line.desc}
                </p>
              </div>

              <Link
                href={line.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c93b41] hover:underline pt-2 border-t border-slate-100 dark:border-white/[0.06]"
              >
                <span>تفاصيل خط الإنتاج والمواصفات</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Clear Service vs Offers Distinction Callout */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl p-8 bg-slate-50 dark:bg-[#181a1f] border border-slate-200 dark:border-white/[0.08] space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#c93b41] uppercase tracking-wider">
              دليل التنقل في المنصة
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              كيف تختار بين الخدمات العامة والباقات والعروض؟
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-sm">
                <Layers className="w-4 h-4 text-[#c93b41]" />
                <span>أقسام الخدمات الهندسية العامة</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                مخصصة للشركات والطلبات المفتوحة ذات الكميات الكبيرة والمواصفات الحرة. توضح قدرات الماكينات، أنواع الورق والكرتون، مراحل التشغيل، وسابقة الأعمال الميدانية.
              </p>
              <Link
                href="/services/"
                className="text-xs font-bold text-[#c93b41] hover:underline inline-flex items-center gap-1"
              >
                <span>الانتقال لصفحة الخدمات</span>
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-sm">
                <Tag className="w-4 h-4 text-emerald-500" />
                <span>الباقات والعروض الترويجية المخفضة</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                مخصصة لرواد الأعمال والمتاجر الذين يبحثون عن حزم جاهزة ومحددة التكلفة والكمية، تتضمن هدايا مجانية (سكاكين داي-كت، عينات ماكيت، وفحص ملفات) بخصومات سعرية مباشرة.
              </p>
              <Link
                href="/offers/"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>الانتقال لصفحة العروض والباقات</span>
                <ArrowLeft className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-2xl font-black text-slate-950 dark:text-white">
          جاهز للارتقاء بجودة مطبوعات وتغليف علامتك التجارية؟
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
          تواصل مباشرة مع مهندسي الإنتاج لمناقشة مشروعك والحصول على عينة مجانية ودعم فني متكامل.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact/"
            className="px-8 py-3.5 rounded-full btn-crimson text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all hover:scale-105"
          >
            تواصل معنا وابدأ طلبك
          </Link>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-200 dark:hover:bg-white/[0.14] transition-all"
          >
            محادثة واتساب سريعة
          </a>
        </div>
      </section>
    </div>
  );
}
