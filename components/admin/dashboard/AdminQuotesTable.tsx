"use client";

import React from "react";
import { FileText } from "lucide-react";

export const defaultMockAdminQuotes = [
  {
    id: "QT-9021",
    company: "شركة النور للحلول المتكاملة",
    contact: "م. أحمد عبد الرحمن",
    product: "علب هارد بوكس مغناطيسية (5,000 علبة)",
    estimate: 87500,
    status: "معتمد - جاري التجهيز",
    date: "10 سبتمبر 2026",
    phone: "01012345678",
  },
  {
    id: "QT-8812",
    company: "مجموعة الأندلس للتوزيع",
    contact: "أ. محمود شاكر",
    product: "أكياس كرافت مقوى مع طباعة ملونة (10,000 كيس)",
    estimate: 42000,
    status: "في انتظار الموافقة",
    date: "04 سبتمبر 2026",
    phone: "01122334455",
  },
  {
    id: "QT-7640",
    company: "سلسلة مطاعم كرم الشام",
    contact: "م. حسام الدين",
    product: "صناديق وجبات كرتون دوبلكس مقوى (25,000 كرتونة)",
    estimate: 112500,
    status: "تم توقيع العقد",
    date: "28 أغسطس 2026",
    phone: "01099887744",
  },
];

interface AdminQuotesTableProps {
  onBack: () => void;
}

export default function AdminQuotesTable({ onBack }: AdminQuotesTableProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 shadow-xs space-y-4 rounded-3xl animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#c93b41]" />
          عروض الأسعار والمقايسات الواردة من الشركات (B2B Quotes)
        </h3>
        <button
          onClick={onBack}
          className="text-xs text-[#c93b41] hover:underline font-bold cursor-pointer"
        >
          العودة للوحة التحكم الرئيسية ↩
        </button>
      </div>

      <div className="space-y-3">
        {defaultMockAdminQuotes.map((q) => (
          <div
            key={q.id}
            className="p-4 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200/80 dark:border-white/[0.06] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs hover:border-[#c93b41]/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span className="font-mono text-[#c93b41] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 px-2 py-0.5 rounded-md">
                  {q.id}
                </span>
                <span>- {q.company}</span>
                <span className="text-slate-400 font-normal">({q.contact})</span>
              </div>
              <div className="text-slate-600 dark:text-slate-400 mt-1">{q.product}</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                الهاتف: {q.phone} • التاريخ: {q.date} • الحالة: {q.status}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-mono font-black text-slate-900 dark:text-white text-sm">
                {q.estimate.toLocaleString()} ج.م
              </div>
              <a
                href={`https://wa.me/2${q.phone}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>واتساب العميل 💬</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
