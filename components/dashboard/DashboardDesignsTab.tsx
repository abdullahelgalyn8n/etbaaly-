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
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.08]">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#c93b41]" />
            التصاميم والمطبوعات المحفوظة لشركتك
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            نماذج الموك أب والعلب المخصصة الجاهزة لإعادة الطلب بضغطة زر دون إعادة الرفع.
          </p>
        </div>
        <Link
          href="/products/"
          className="px-4 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>طلب منتج جديد</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {defaultMockSavedDesigns.map((d) => (
          <div
            key={d.id}
            className="bg-slate-50 dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-4 hover:border-[#c93b41]/40 transition-all"
          >
            <div className="h-28 rounded-xl bg-slate-200 dark:bg-[#1f2127] flex items-center justify-center text-4xl shadow-inner">
              {d.preview}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{d.title}</h4>
              <div className="text-xs text-slate-500 mt-1">
                {d.type} • {d.color}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{d.date}</span>
              <Link
                href="/products/"
                className="px-3 py-1.5 rounded-lg btn-crimson text-white text-xs font-bold shadow-sm"
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
