"use client";

import React from "react";
import Link from "next/link";
import { Layers, PlusCircle } from "lucide-react";

export const defaultMockSavedDesigns = [
  {
    id: "dsg-101",
    title: "مج سيراميك فاخر بشعار الشركة السنوي",
    type: "طباعة حرارية Sublimation",
    color: "أسود ملكي مطفي",
    date: "08 سبتمبر 2026",
    preview: "☕",
  },
  {
    id: "dsg-102",
    title: "علبة إلكترونيات وتغليف كابلات B2B",
    type: "علبة كرتون دوبلكس 350 جم",
    color: "أبيض مع سبوت UV لامع",
    date: "01 سبتمبر 2026",
    preview: "📦",
  },
];

export default function DashboardDesignsTab() {
  return (
    <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#c93b41]" />
            التصاميم والمطبوعات المحفوظة لشركتك
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            نماذج الموك أب والعلب المخصصة الجاهزة لإعادة الطلب بضغطة زر دون الحاجة لإعادة الرفع والضبط.
          </p>
        </div>
        <Link
          href="/products/"
          className="px-4 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>طلب منتج وتصميم جديد</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {defaultMockSavedDesigns.map((d) => (
          <div
            key={d.id}
            className="bg-slate-50/70 dark:bg-[#141518] border border-slate-200/80 dark:border-white/[0.06] rounded-2xl p-5 space-y-4 hover:border-[#c93b41]/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="h-32 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1b1d24] dark:to-[#121316] flex items-center justify-center text-5xl shadow-2xs group-hover:scale-[1.02] transition-transform">
                {d.preview}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{d.title}</h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                  <span>{d.type}</span>
                  <span>•</span>
                  <span>{d.color}</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/[0.05] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">{d.date}</span>
              <Link
                href="/products/"
                className="px-3.5 py-1.5 rounded-lg btn-crimson text-white text-xs font-bold shadow-2xs hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                إعادة طلب سريعة
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
