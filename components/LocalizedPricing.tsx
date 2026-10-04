"use client";

import React from "react";
import { useCountry } from "@/context/CountryContext";
import { COUNTRIES } from "@/data/countryData";
import { trackEvent } from "@/lib/fpixel";
import { Check, Sparkles, MessageCircle, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LocalizedPricing() {
  const { country, getWhatsAppUrl } = useCountry();
  const fullCountry = COUNTRIES[country.code] || COUNTRIES.EG;

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-[#15171b]/60 border-y border-slate-200/80 dark:border-white/[0.05]">
      {/* Background Decorative Subtle Accents (GPU-safe) */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-b from-[#c93b41]/10 to-transparent rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-[#c93b41]/10 border border-[#c93b41]/20 text-[#c93b41] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باقات الاستثمار والنمو الرقمي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white mb-4">
            استثمار واضح، شفاف، ومصمم لنمو أرباحك
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            خطط متكاملة تجمع بين البرمجة فائقة السرعة، تصدر نتائج محركات البحث والذكاء الاصطناعي (SEO / AEO)، وتصميم الهويات البصرية المرموقة.
          </p>
        </div>

        {/* Localized Banner Offer */}
        {fullCountry.bannerOffer && (
          <div className="mb-12 rounded-3xl bg-gradient-to-r from-[#c93b41] via-[#c8232c] to-[#991b1b] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-[11px] font-extrabold mb-2 uppercase tracking-wide border border-white/20">
                  {fullCountry.bannerOffer.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mb-2">
                  {fullCountry.bannerOffer.title}
                </h3>
                <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
                  {fullCountry.bannerOffer.description}
                </p>
              </div>

              <Link
                href={getWhatsAppUrl(`مرحباً A.Z، أود الاستفادة من (${fullCountry.bannerOffer.title}).`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("Contact", {
                    offer: fullCountry.bannerOffer.title,
                    country: fullCountry.name,
                    source: "banner_offer",
                  });
                }}
                className="shrink-0 px-6 py-3 rounded-full bg-white text-[#c93b41] font-bold text-xs sm:text-sm hover:bg-red-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>تفعيل العرض عبر واتساب</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {fullCountry.pricingPackages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  pkg.popular
                    ? "bg-white dark:bg-[#1a1c22] border-2 border-[#c93b41] shadow-2xl scale-100 md:-translate-y-2 ring-4 ring-[#c93b41]/10"
                    : "bg-white/80 dark:bg-[#17191e]/80 border border-slate-200 dark:border-white/[0.08] shadow-md hover:shadow-xl hover:border-slate-300 dark:hover:border-white/[0.15]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c93b41] text-white text-[11px] font-black tracking-wider shadow-md">
                    الأكثر طلباً وتفضيلاً
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 min-h-[32px]">
                      {pkg.targetAudience}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
                    <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                      {pkg.price}
                    </span>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>{country.currencySymbol}</span>
                      <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">({pkg.period})</span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        <span className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href={getWhatsAppUrl(pkg.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("Contact", {
                        package_name: pkg.name,
                        price: pkg.price,
                        currency: country.currencySymbol,
                        country: country.name,
                      });
                    }}
                    className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      pkg.popular
                        ? "btn-crimson text-white shadow-lg shadow-[#c93b41]/30 hover:scale-[1.02]"
                        : "bg-slate-100 dark:bg-[#22252c] text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-[#2c3038]"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>{pkg.ctaText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Payment Methods Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#17191e] border border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] text-[#c93b41]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                طرق الدفع والتحويل المعتمدة:
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {fullCountry.paymentMethods.join(" • ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>عقود رسمية وضمان جودة وكفاءة الأداء</span>
          </div>
        </div>
      </div>
    </section>
  );
}
