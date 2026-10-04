import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";
import PolicyHeader from "@/components/legal/PolicyHeader";
import PolicyTabsNav from "@/components/legal/PolicyTabsNav";
import StrictClauseAlert from "@/components/legal/StrictClauseAlert";
import PolicyFaqSection, { PolicyFaqItem } from "@/components/legal/PolicyFaqSection";
import {
  FileText,
  RotateCcw,
  Shield,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Building2,
  PhoneCall,
  Clock,
  Printer,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "المركز القانوني ودليل السياسات واللوائح التنظيمية | إطبعلي - Etbaaly",
  description:
    "المركز القانوني الشامل لمنصة إطبعلي التابعة لـ A.Z Agency. يضم الشروط والأحكام وعقود التوريد، سياسة الاسترجاع والإلغاء وفق قانون حماية المستهلك المصري، وسياسة حماية البيانات والخصوصية.",
  alternates: {
    canonical: `${siteConfig.url}/policy/`,
  },
  openGraph: {
    title: "المركز القانوني ودليل السياسات واللوائح | إطبعلي",
    description:
      "اللوائح التنظيمية والقانونية الصارمة لخدمات الطباعة والتصنيع بمصر: الشروط، الاسترجاع، والخصوصية.",
    url: `${siteConfig.url}/policy/`,
    type: "website",
  },
};

const generalFaqs: PolicyFaqItem[] = [
  {
    q: "ما هو المرجع القانوني المنظم لكافة المعاملات في منصة إطبعلي؟",
    a: "تخضع جميع المعاملات والعقود وأوامر التوريد الصادرة عن إطبعلي لأحكام القانون المدني المصري، وقانون التجارة رقم 17 لسنة 1999، وقانون حماية المستهلك رقم 181 لسنة 2018، وقانون حماية البيانات الشخصية رقم 151 لسنة 2020، وينعقد الاختصاص القضائي لمحاكم القاهرة الاقتصادية.",
    tag: "الإسناد القانوني",
  },
  {
    q: "هل تصدر إطبعلي فواتير إلكترونية معتمدة لضريبة القيمة المضافة؟",
    a: "نعم، بصفتنا شركة مسجلة رسمياً تحت مظلة A.Z Agency، نصدر فواتير إلكترونية معتمدة عبر منظومة مصلحة الضرائب المصرية لجميع الشركات والمؤسسات والمصانع التي تقدم بطاقتها الضريبية وسجلها التجاري الساري.",
    tag: "الضرائب والفواتير",
  },
  {
    q: "كيف تحمي منصة إطبعلي العميل من التلاعب أو عيوب الصناعة؟",
    a: "نلتزم بنظام فحص جودة متعدد المراحل (Preflight Check)، ومطابقة دقيقة للبروفات الفنية قبل خروج أي شحنة، بالإضافة إلى التزامنا بإعادة تصنيع أي كمية يثبت فيها عيب صناعي جسيم صريح وفق بروتوكول المعاينة الرسمي.",
    tag: "ضمان الجودة",
  },
];

export default function PolicyHubPage() {
  const documents = [
    {
      title: "الشروط والأحكام وعقد التوريد",
      badge: "الميثاق التعاقدي الأساسي",
      description:
        "تنظم التزامات الأطراف، إلزامية اعتماد البروفة الفنية، المسؤولية الحصرية عن الأخطاء الإملائية، شروط السداد والعربون، وتخزين البضائع ورسوم الأرضيات.",
      href: "/terms/",
      icon: FileText,
      color: "border-[#c93b41]/40 text-[#c93b41]",
      keyPoints: [
        "إقرار الاعتماد النهائي (Proof Approval) لا رجعة فيه.",
        "سداد دفعة مقدمة 50% كحد أدنى قبل بدء التشغيل.",
        "حظر تام لطباعة العلامات المقلدة والمنتجات غير المرخصة.",
      ],
    },
    {
      title: "سياسة الاسترجاع والإلغاء وضمان الجودة",
      badge: "المادة 17 حماية المستهلك",
      description:
        "القواعد المحددة لإلغاء الطلبات ومصادرة العربون بعد بدء التجهيز، تفاوت ألوان الطباعة CMYK عن الشاشات، ونسب الهالك الصناعي وبروتوكول فحص الـ 48 ساعة بالفيديو.",
      href: "/refund/",
      icon: RotateCcw,
      color: "border-amber-500/40 text-amber-600 dark:text-amber-400",
      keyPoints: [
        "السلع المطبوعة خصيصاً لا تقبل الاسترجاع بموجب القانون.",
        "شاشات الهواتف ليست مرجعاً لألوان أحبار الطباعة.",
        "إلزامية فيديو المعاينة والشكوى خلال 48 ساعة فقط.",
      ],
    },
    {
      title: "سياسة الخصوصية وسرية التصاميم",
      badge: "قانون 151 لسنة 2020",
      description:
        "تعهد صارم بحماية بيانات العميل وسرية ملفات الهوية البصرية والقوالب الهندسية (Die-cuts) وعدم بيعها أو مشاركتها مع أي جهة أو منافس بالسوق المصري.",
      href: "/privacy/",
      icon: Shield,
      color: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
      keyPoints: [
        "حظر مشاركة أو استخدام قوالب العميل لأي طرف ثالث.",
        "تشفير كامل لكافة الملفات على خوادم سحابية محمية.",
        "بوابات دفع إلكتروني معتمدة من البنك المركزي المصري.",
      ],
    },
  ];

  const strictRules = [
    {
      num: "01",
      title: "البروفة المعتمدة ملزمة ونهائية",
      desc: "أي نص، رقم هاتف، كيو آر كود، أو تفصيلة اعتمدتها على البروفة هي مسؤوليتك وحدك بنسبة 100%.",
    },
    {
      num: "02",
      title: "المادة 17 حماية المستهلك",
      desc: "المنتجات المصنعة بمواصفاتك الشخصية لا ترد ولا تستبدل بعد خروجها مطابقة للبروفة.",
    },
    {
      num: "03",
      title: "شاشتك ليست مرجعاً للألوان",
      desc: "فارق الإضاءة بين شاشات RGB وأحبار CMYK الطبيعية في حدود 5% إلى 10% هو معيار دولي معتمد.",
    },
    {
      num: "04",
      title: "هالك تشغيل أوفست طبيعي",
      desc: "تخضع الكميات لتفاوت تشغيل هندسي ±5% إلى 7% وتسوى الحسابات على الكمية الفعلية المفرزة.",
    },
    {
      num: "05",
      title: "فيديو الفحص خلال 48 ساعة",
      desc: "لا تقبل أي شكوى بعيب صناعة دون فيديو فتح الكرتونة الأصلي (Unboxing) فور الاستلام.",
    },
    {
      num: "06",
      title: "أرضيات التخزين بعد 14 يوماً",
      desc: "تُمنح 14 يوماً لاستلام بضاعتك من المخازن، وبعد 30 يوماً يتصرف المصنع بالبضاعة المهملة.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المركز القانوني", url: `${siteConfig.url}/policy/` },
        ]}
      />

      {/* Header */}
      <PolicyHeader
        title="المركز القانوني ودليل السياسات واللوائح التنظيمية"
        badge="الإطار القانوني الموحد - جمهورية مصر العربية"
        description="دليلك الشامل لمعرفة حقوقك والتزاماتك التعاقدية في إطبعلي (A.Z Agency). صُممت هذه اللوائح لحماية استثماراتك في الطباعة والتغليف وضمان أعلى معايير الجودة والشفافية التامة."
        lastUpdated="أكتوبر 2026"
        readTime="5 دقائق"
      />

      {/* Tabs Navigation */}
      <PolicyTabsNav />

      {/* General Alert */}
      <StrictClauseAlert
        type="info"
        title="الشفافية المطلقة: أساس التعاون الصناعي والتجاري"
        description="نحن في إطبعلي نؤمن بأن العلاقات التجارية الناجحة تبنى على الشفافية والوضوح المسبق. لا نترك مجالاً للمفاجآت أو التقديرات العشوائية؛ فكل مرحلة من مراحل الطباعة والتغليف محكومة بمعايير هندسية ولوائح قانونية صارمة لضمان رضاك وحماية حقوق الطرفين."
        referenceLaw="قوانين التجارة وحماية المستهلك وحماية البيانات بجمهورية مصر العربية"
      />

      {/* 3 Main Documents Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#c93b41]" />
            <span>الوثائق القانونية المعتمدة للمنصة</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">3 وثائق رئيسية</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all hover:border-[#c93b41]/40 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center ${doc.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {doc.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#c93b41] transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                    {doc.keyPoints.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <Link
                    href={doc.href}
                    prefetch={false}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-[#c93b41] hover:text-white text-slate-900 dark:text-white transition-all group/btn"
                  >
                    <span>قراءة الوثيقة الكاملة</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The 6 Non-Negotiable Egyptian Market Ground Rules */}
      <div className="rounded-3xl bg-slate-900 text-white border border-white/10 p-6 sm:p-10 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff767c] px-3 py-1 rounded-full bg-[#c93b41]/20 border border-[#c93b41]/30">
            <AlertTriangle className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>دستور التشغيل الصارم</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white">
            القواعد الـ 6 الحاسمة لعملاء الطباعة في مصر
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            نقاط جوهرية تحسم 99% من النزاعات الشائعة في قطاع الطباعة والتغليف المصري لضمان وضوح تام بين العميل والمطبعة:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {strictRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#c93b41]/50 transition-colors space-y-2 relative overflow-hidden"
            >
              <span className="text-2xl font-black text-[#c93b41]/30 font-mono block">
                {rule.num}
              </span>
              <h4 className="text-sm font-bold text-white">{rule.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* B2B Contracting and Legal Contact Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Building2 className="w-4 h-4" />
            <span>التعاقدات الرسمية للشركات والجهات الحكومية</span>
          </div>
          <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
            هل تحتاج إلى عقد توريد مطبوعات سنوي مخصص أو مناقصة؟
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            يسعد فريق الشؤون القانونية والمالية في A.Z Agency تقديم عقود توريد سنوية مخصصة، وفواتير إلكترونية معتمدة، وتسهيلات دفع وفق سجل الملاءة المالية للمؤسسات.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>تواصل مع الإدارة القانونية</span>
          </a>
          <Link
            href="/contact/"
            prefetch={false}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <span>طلب معاينة أو عينات</span>
          </Link>
        </div>
      </div>

      {/* General FAQs */}
      <PolicyFaqSection items={generalFaqs} />
    </div>
  );
}
