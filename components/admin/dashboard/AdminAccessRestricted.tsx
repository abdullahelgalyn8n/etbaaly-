"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

interface AdminAccessRestrictedProps {
  onLoginAsAdmin: () => void;
}

export default function AdminAccessRestricted({ onLoginAsAdmin }: AdminAccessRestrictedProps) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xl p-6 sm:p-8 rounded-3xl space-y-4 text-center">
        <div className="w-14 h-14 bg-red-50 dark:bg-red-950/30 text-[#c93b41] rounded-2xl flex items-center justify-center mx-auto border border-red-200 dark:border-red-900/40">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          منطقة الإدارة المركزية (لوحة المشرف)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          يجب تسجيل الدخول بصلاحيات مدير الموقع للوصول إلى أدوات التحكم في خطوط الإنتاج والطباعة واستوديو القوالب.
        </p>
        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/login/?redirect=/admin/"
            className="btn-crimson w-full py-3 px-4 text-white text-xs font-bold rounded-xl shadow-md text-center"
          >
            الانتقال إلى صفحة تسجيل الدخول
          </Link>
          <Link
            href="/dashboard"
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c20] dark:hover:bg-[#202227] text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors text-center"
          >
            الذهاب إلى بوابة العميل (/dashboard)
          </Link>
        </div>
      </div>
    </div>
  );
}
