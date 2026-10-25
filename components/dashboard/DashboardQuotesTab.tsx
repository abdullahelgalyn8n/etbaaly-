"use client";

import React, { useState } from "react";
import { FileText, PlusCircle, Calculator, X } from "lucide-react";
import PrintCalculator from "@/components/PrintCalculator";

export const defaultMockQuotes = [
  {
    id: "QT-9021",
    date: "10 سبتمبر 2026",
    product: "علب هارد بوكس مغناطيسية مخصصة (Rigid Magnetic Box)",
    quantity: 5000,
    specs: "هارد بورد 2 مم + سلوفان مخملي سوفت تاتش + بصمة ذهبي حراري + فوم ليزري مقصوص",
    status: "approved",
    statusLabel: "تم اعتماد عرض السعر وجاري التعاقد",
    totalEstimate: 87500,
  },
  {
    id: "QT-8812",
    date: "04 سبتمبر 2026",
    product: "أكياس ورقية كرافت فاخرة بيد حبل قطني مجدول",
    quantity: 10000,
    specs: "ورق كرافت مقوى 250 جم + طباعة وجهين Full Color CMYK",
    status: "sent",
    statusLabel: "تم إرسال العرض المالي وفي انتظار الموافقة",
    totalEstimate: 42000,
  },
];

export default function DashboardQuotesTab() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Header & Quote Overview Card */}
      <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c93b41]" />
              عروض الأسعار والمقايسات الفنية المخصصة
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              سجل بالمقايسات التي تم حسابها لمشاريع شركتك عبر الآلة الحاسبة وفريق التسعير الهندسي.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="px-4 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all"
          >
            {showCalculator ? (
              <>
                <X className="w-4 h-4" />
                <span>إخفاء الحاسبة</span>
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4" />
                <span>حساب مقايسة وتسعير فوري</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Embedded Interactive Print Calculator (Inside Dashboard / Profile) */}
        {showCalculator && (
          <div className="pt-2 pb-6 border-b border-slate-100 dark:border-white/[0.08] animate-fadeIn">
            <PrintCalculator />
          </div>
        )}

        {/* 3. Quotes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {defaultMockQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-slate-50/70 dark:bg-[#141518] border border-slate-200/80 dark:border-white/[0.06] rounded-2xl p-5 space-y-4 hover:border-[#c93b41]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/[0.05] text-xs font-mono font-bold text-[#c93b41] border border-slate-200/60 dark:border-white/[0.05]">
                    {q.id}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{q.date}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{q.product}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed bg-white/60 dark:bg-white/[0.02] p-2.5 rounded-xl border border-slate-200/40 dark:border-white/[0.04]">
                    {q.specs}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-white/[0.05]">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">الكمية المطلوبة:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{q.quantity.toLocaleString()} قطعة</span>
                  </div>
                  <div className="text-left">
                    <span className="text-slate-500 block text-[10px]">التقدير المالي:</span>
                    <span className="font-mono font-black text-base text-[#c93b41]">
                      {q.totalEstimate.toLocaleString()} <span className="text-[10px] font-sans text-slate-400">ج.م</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      q.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                    }`}
                  >
                    <span>{q.statusLabel}</span>
                  </span>
                  <a
                    href="https://wa.me/201022598473?text=مرحباً، أود مناقشة تفاصيل عرض السعر والمقايسة"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs transition-colors"
                  >
                    <span>اعتماد العرض مع التسعير 💬</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
