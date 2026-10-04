"use client";

import React from "react";
import { Sparkles, Check, ArrowLeft, ShieldCheck, Clock, Zap, MessageCircle } from "lucide-react";
import { ServicePackage } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";

interface Props {
  packages: ServicePackage[];
  serviceTitle: string;
}

export default function ServicePackages({ packages, serviceTitle }: Props) {
  if (!packages || packages.length === 0) return null;

  return (
    <section id="packages" className="space-y-8 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-crimson text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>عروض وباقات الأسعار المخصصة (B2B & Private Label)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white">
          اختر باقة التصنيع والطباعة الأنسب لعلامتك التجارية
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          أسعار تنافسية مباشرة من خط الإنتاج بدون وسطاء، تشمل أجود خامات القطن الميلتون المصري والطباعة والتجهيز الكامل.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {packages.map((pkg) => {
          const isPopular = !!pkg.popular;
          const waMessage = encodeURIComponent(
            `مرحباً مطابع إطبعلي، أود الاستفسار وطلب "${pkg.name}" ضمن خدمة ${serviceTitle} (الكمية: ${pkg.quantityRange}).`
          );
          const waUrl = `${siteConfig.social.whatsapp}?text=${waMessage}`;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                isPopular
                  ? "bg-slate-900 text-white dark:bg-[#1a1314] border-2 border-[#c93b41] shadow-2xl dark:shadow-[0_10px_35px_rgba(201,59,65,0.25)] scale-[1.02]"
                  : "bg-white dark:bg-[#242424] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 shadow-sm hover:shadow-xl"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black shadow-md ${
                      isPopular
                        ? "bg-[#c93b41] text-white"
                        : "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {isPopular && <Sparkles className="w-3 h-3 text-white" />}
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-black">{pkg.name}</h3>
                  <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-300">
                    الكمية: {pkg.quantityRange}
                  </div>
                </div>

                <div className="border-t border-b border-slate-100 dark:border-white/[0.08] py-4 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#c93b41]">
                      {pkg.pricePerUnit}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      / للقطعة شاملة
                    </span>
                  </div>
                  {pkg.totalEstimate && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      الإجمالي التقديري: <span className="font-bold">{pkg.totalEstimate}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block">المواصفة والخامة:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{pkg.fabricSpecs}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block">تقنية الطباعة:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{pkg.printTechnique}</p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block">المميزات والملحقات:</span>
                    <ul className="space-y-1.5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
                          <span className="leading-tight text-slate-700 dark:text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-3 border-t border-slate-100 dark:border-white/[0.08] mt-6">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#c93b41]" />
                  <span>مدة التنفيذ: {pkg.turnaround}</span>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isPopular
                      ? "btn-crimson text-white hover:scale-105"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white"
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{pkg.ctaText || "طلب عرض سعر فوري"}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
