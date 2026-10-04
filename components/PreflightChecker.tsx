"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  Sparkles,
  Layers,
  FileType,
  Share2,
  MessageSquare,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useCountry } from "@/context/CountryContext";
import { trackEvent } from "@/lib/fpixel";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
    >
      <path d="M13.6,2.33C12.12.83,10.1,0,7.99,0,3.63,0,.07,3.56.06,7.93c0,1.4.37,2.76,1.06,3.96l-1.12,4.11,4.2-1.1c1.16.63,2.47.97,3.79.97h0c4.37,0,7.93-3.56,7.93-7.93,0-2.1-.84-4.12-2.33-5.61h0ZM7.99,14.52c-1.18,0-2.34-.32-3.36-.92l-.24-.14-2.49.65.67-2.43-.16-.25c-.66-1.05-1.01-2.26-1.01-3.51C1.41,4.3,4.36,1.34,8,1.34c1.75,0,3.43.69,4.66,1.93,1.24,1.23,1.93,2.91,1.93,4.66,0,3.64-2.96,6.59-6.59,6.59h0ZM11.61,9.59c-.2-.1-1.17-.58-1.35-.65-.18-.06-.31-.1-.44.1-.13.2-.51.65-.63.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.59-.98-.59-.52-.99-1.18-1.1-1.37-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.07-.13.03-.25-.01-.35-.05-.1-.45-1.08-.61-1.47-.16-.39-.32-.34-.45-.34-.11,0-.25,0-.38,0-.2,0-.39.09-.53.25-.18.2-.69.68-.69,1.65s.71,1.92.81,2.05c.1.13,1.39,2.13,3.38,2.99.47.2.84.33,1.13.42.48.15.9.13,1.25.08.38-.06,1.17-.48,1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23h0Z" />
    </svg>
  );
}

const preflightGuidelines = [
  {
    icon: Layers,
    title: "نظام وتدرج الألوان (Color Profile)",
    tag: "CMYK 100%",
    desc: "يجب تجهيز جميع الملفات بنظام ألوان الطباعة CMYK (FOGRA39 / Coated GRACol). يرجى تحويل أي عناصر RGB لتجنب التغير في درجات الألوان عند السحب الميكانيكي.",
  },
  {
    icon: Sparkles,
    title: "دقة وجودة الصور (Resolution)",
    tag: "300 DPI",
    desc: "يجب ألا تقل دقة الصور والتصميمات المدمجة عن 300 بكسل/بوصة بالمقاس الطبيعي 100%، لضمان أعلى وضوح وتفادي ظهور أي بكسلة أو ضبابية.",
  },
  {
    icon: FileCheck2,
    title: "هوامش القص والتمدد (Bleed & Safety)",
    tag: "+3 مم تمدد خارجي",
    desc: "يرجى إضافة هامش تمدد خارجي للأرضيات والخلفيات بمقدار 3 مم من كل جانب، مع ترك هامش أمان داخلي 4 مم على الأقل للنصوص والشعارات.",
  },
  {
    icon: FileType,
    title: "تضمين وتحويل الخطوط (Font Outlines)",
    tag: "Create Outlines",
    desc: "تحويل جميع التايبوجرافي والخطوط إلى مسارات وفيكتور (Convert to Curves / Outlines) لضمان ثبات الخطوط وعدم تبديلها عند الطباعة.",
  },
];

export default function PreflightChecker() {
  const { country, getWhatsAppUrl } = useCountry();

  const whatsappUrl = getWhatsAppUrl(
    "مرحباً إطبعلي، أرغب في الاستفسار عن إرسال ملفات التصميم للطباعة والمراجعة الفنية مع مهندس ما قبل الطباعة (Preflight)."
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl space-y-8">
      {/* 1. Header Area */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-crimson text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#c93b41]" />
          معايير الجودة الفنية للطباعة (Preflight Standards)
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          دليل ومواصفات تسليم ملفات التصميم المعتمدة
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          نحرص في مطابع إطبعلي على تطبيق أعلى معايير الجودة الدولية. تتم مراجعة وتدقيق ملفات العمل الفنية مباشرة مع مهندسي الطباعة بعد اعتماد أمر الشغل والمقايسة.
        </p>
      </div>

      {/* 2. File Size & WhatsApp Direct Submission Policy Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-slate-900 dark:text-slate-100 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1 text-right">
            <h4 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
              سياسة تسليم الملفات وأوامر الشغل:
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
              نظراً لأن تسليم واعتماد ملفات الطباعة النهائية يتم بعد التعاقد وتأكيد المقايسة الرسمية،{" "}
              <span className="font-bold underline decoration-amber-500 underline-offset-4">
                وإذا كان حجم ملف التصميم يتجاوز 1.5 ميجابايت
              </span>{" "}
              (أو ملفات مفتوحة مثل PDF, AI, PSD, TIFF عالية الدقة)، يرجى التواصل معنا مباشرة عبر الواتساب أو إرسال رابط التخزين السحابي (Google Drive / WeTransfer) للحفاظ على كامل نقاوة الألوان ومنع أي ضغط للملفات.
            </p>
          </div>
        </div>

        {/* WhatsApp Fast Action Box */}
        <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#25d266]" />
            <span>نقبل روابط السحابة المباشرة: Google Drive • WeTransfer • Dropbox • OneDrive</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("Contact", { method: "preflight_whatsapp_direct", country: country.name });
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25d266] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>تواصل مع الإدارة الفنية عبر واتساب</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3. Preflight Technical Checklist Cards */}
      <div className="space-y-3">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-[#c93b41]" />
          <span>المعايير الأربعة الأساسية التي يدققها مهندس الطباعة في ملفك:</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preflightGuidelines.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#262626] border border-slate-200 dark:border-white/[0.08] text-[10px] font-mono font-bold text-[#c93b41]">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Guarantees Strip */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 text-right sm:text-center text-xs text-slate-600 dark:text-slate-300 font-medium">
        <div className="flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>فحص دقيق للسكينة والسبوت UV</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>بروفة ألوان رقمية معتمدة قبل السحب</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>تواصل ومراجعة فورية مع المهندس المختص</span>
        </div>
      </div>
    </div>
  );
}
