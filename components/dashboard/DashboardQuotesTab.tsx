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
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c93b41]" />
              عروض الأسعار والمقايسات الفنية المخصصة
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              سجل بالمقايسات التي تم حسابها لمشاريع شركتك عبر الآلة الحاسبة وفريق التسعير الهندسي.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="px-4 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md cursor-pointer transition-all"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultMockQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-slate-50 dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#c93b41]">{q.id}</span>
                <span className="text-[11px] text-slate-500">{q.date}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{q.product}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{q.specs}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/[0.06] text-xs">
                <div>
                  <span className="text-slate-500">الكمية: </span>
                  <span className="font-mono font-bold">{q.quantity.toLocaleString()} قطعة</span>
                </div>
                <div>
                  <span className="text-slate-500">التقدير المالي: </span>
                  <span className="font-mono font-bold text-[#c93b41]">
                    {q.totalEstimate.toLocaleString()} ج.م
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 text-xs">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    q.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  }`}
                >
                  {q.statusLabel}
                </span>
                <a
                  href="https://wa.me/201022598473?text=مرحباً، أود مناقشة تفاصيل عرض السعر والمقايسة"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c93b41] hover:underline font-bold text-xs"
                >
                  مناقشة مع مسؤول التسعير 💬
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
