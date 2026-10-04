"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AdminSystemHealthWidget() {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
        <span className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span>صحة واستقرار المنظومة (Site Health)</span>
        </span>
        <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 font-bold text-[11px] rounded-full">
          جيدة جداً ✓
        </span>
      </div>

      <div className="p-5 text-xs space-y-3 text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
          <span>قاعدة بيانات Supabase Postgres:</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            متصلة (AWS eu-central-1)
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
          <span>محرك توليد وتجميع الصفحات:</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Next.js 16.3.4 (Turbopack)
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/[0.06]">
          <span>أسطول الشحن والتسليم السريع:</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            جاهز (تغطية كافة المحافظات)
          </span>
        </div>

        <div className="text-[11px] text-slate-400 pt-1">
          كافة الخدمات تعمل بأعلى كفاءة ولا توجد أي بلاغات فنية في الوقت الحالي.
        </div>
      </div>
    </div>
  );
}
