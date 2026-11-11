import React from "react";
import type { Metadata } from "next";
import { Sparkles, Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "تواصل مع مطابع إطبعلي | طلب تسعير طباعة وتغليف",
  description:
    "تواصل مع فريق مطابع إطبعلي (Etbaaly) لطلب عرض سعر للعلب الكرتون، الأكياس الورقية، الستيكرات، ومطبوعات الشركات مع معاينة عينات مجانية.",
  alternates: {
    canonical: `${siteConfig.url}/contact/`,
  },
  openGraph: {
    title: "تواصل مع مطابع إطبعلي | Etbaaly",
    description:
      "احصل على عرض سعر مخصص لمطبوعات شركتك، علب التغليف، الأكياس الورقية، والستيكرات مع شحن وتوصيل لجميع محافظات مصر.",
    url: `${siteConfig.url}/contact/`,
    type: "website",
    images: [
      {
        url: "/images/brand-hero-business.webp",
        width: 1200,
        height: 630,
        alt: "تواصل مع مطابع إطبعلي | Etbaaly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل مع مطابع إطبعلي | Etbaaly",
    description:
      "احصل على عرض سعر مخصص لمطبوعات شركتك، علب التغليف، الأكياس الورقية، والستيكرات.",
    images: ["/images/brand-hero-business.webp"],
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: `${siteConfig.url}/` },
          { name: "اتصل بنا", url: `${siteConfig.url}/contact/` },
        ]}
      />

      {/* Header */}
      <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-[#c8232c] dark:text-red-400 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>مكتب المبيعات والمقايسات الفورية - إطبعلي</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-4">
          تواصل مع فريق إطبعلي لطباعة وتغليف علامتك التجارية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          أرسل مواصفات الكميات والخامات والمقاسات المطلوبة عبر النموذج أدناه أو تواصل مباشرة عبر الواتساب للحصول على تسعيرة مخصصة وبوكس عينات معتمد.
        </p>
      </section>

      {/* Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Cards Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 space-y-6 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">معلومات الاتصال المباشرة</h2>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">etbaaly / @azagency.eg</span>
              </div>

              <div className="space-y-6 font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 flex items-center justify-center shrink-0 text-[#c8232c]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">الهاتف والواتساب</h3>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-base font-bold text-slate-950 dark:text-white hover:text-[#c8232c] dark:hover:text-red-400 transition-colors block mt-1"
                      dir="ltr"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/50 flex items-center justify-center shrink-0 text-[#c8232c]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">البريد الإلكتروني</h3>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-base font-bold text-slate-950 dark:text-white hover:text-[#c8232c] dark:hover:text-red-400 transition-colors block mt-1"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">المقر الرئيسي</h3>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mt-1">{siteConfig.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">أوقات العمل</h3>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mt-1">السبت - الخميس: 9:00 ص - 9:00 م</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-[#1f2533]">
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>محادثة واتساب فورية:</span>
                  <span dir="ltr" className="font-mono tracking-wide font-bold">{siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Printing & Quote Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              كيف تتم معالجة طلبك في مطابع إطبعلي؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              سواء كنت تطلب علب كرتون بمقاسات مخصصة، أكياس تسوق، ستيكرات رول مقاومة للماء، أو باقة مطبوعات مكتبية للشركات، يمر طلبك بثلاث خطوات واضحة:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] space-y-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">1. المراجعة الهندسية وفحص الملفات</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                يراجع مهندسو الإنتاج المقاسات، الخامة (دوبلكس، كرافت، كوشيه، أو فينيل)، الهوامش الآمنة، وألوان CMYK قبل اعتماد المقايسة النهائية.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] space-y-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">2. بروفة الطباعة أو بوكس العينات</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                نوفر بروفة رقمية معتمدة أو بوكس عينات خامات وتقفيلات فعلية (سلوفان مخملي، سبوت UV، وبصمة فويل) للتأكد التام قبل التشغيل الكمي.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] space-y-2">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">3. الإنتاج السريع والشحن لجميع المحافظات</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                تنطلق خطوط الأوفست والديجيتال والداي-كت فور الاعتماد مع كود تتبع مباشر لشحنتك حتى التسليم الآمن في القاهرة والمحافظات.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
