import React from "react";
import type { Metadata } from "next";
import { Sparkles, Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "اتصل بنا | حجز استشارة إبداعية وتقنية مجانية",
  description:
    "تواصل مع فريق A.Z Agency لمناقشة مشروعك في الموشن جرافيك، تصميم الهويات والطباعة، تحسين SEO التقني، أو تطوير الويب الحديث.",
  alternates: {
    canonical: `${siteConfig.url}/contact/`,
  },
  openGraph: {
    title: "اتصل بنا | A.Z Agency",
    description:
      "تواصل مع فريق A.Z Agency لمناقشة مشروعك وحجز استشارة مجانية في الحلول الرقمية والإبداعية.",
    url: `${siteConfig.url}/contact/`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "اتصل بنا", url: `${siteConfig.url}/contact/` },
        ]}
      />

      {/* Header */}
      <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-[#c8232c] dark:text-red-400 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>تواصل مباشر وسريع</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-4">
          اتصل بنا وابدأ مشروعك القادم
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          للتواصل معنا، يرجى ملء النموذج أدناه أو استخدام قنوات الاتصال المباشرة وسيقوم فريقنا بالتواصل معك في أقرب وقت.
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
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">/ azagency.eg</span>
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
    </div>
  );
}
