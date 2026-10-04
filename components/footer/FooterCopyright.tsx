"use client";

import React from "react";
import Link from "next/link";
import AZLogo from "@/components/AZLogo";

export default function FooterCopyright() {
  return (
    <div className="pt-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 dark:text-slate-300 font-medium">
      <div className="flex items-center gap-2">
        <AZLogo className="w-4 h-3 text-[#c93b41]" />
        <span>
          © {new Date().getFullYear()} إطبعلي | Etbaaly. جميع الحقوق محفوظة لـ{" "}
          <a
            href="https://azagency.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c93b41] font-bold hover:underline"
          >
            A.Z Agency
          </a>
          .
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
        <Link href="/terms/" prefetch={false} className="hover:text-[#c93b41] dark:hover:text-white transition-colors">
          الشروط والأحكام
        </Link>
        <span className="text-slate-300 dark:text-white/20">•</span>
        <Link href="/refund/" prefetch={false} className="hover:text-[#c93b41] dark:hover:text-white transition-colors">
          سياسة الاسترجاع
        </Link>
        <span className="text-slate-300 dark:text-white/20">•</span>
        <Link href="/privacy/" prefetch={false} className="hover:text-[#c93b41] dark:hover:text-white transition-colors">
          الخصوصية والبيانات
        </Link>
        <span className="text-slate-300 dark:text-white/20">•</span>
        <Link href="/about/" prefetch={false} className="hover:text-[#c93b41] dark:hover:text-white transition-colors">
          عن إطبعلي
        </Link>
        <span className="text-slate-300 dark:text-white/20">•</span>
        <Link href="/track/" prefetch={false} className="hover:text-[#c93b41] dark:hover:text-white transition-colors">
          تتبع الشحنة
        </Link>
      </div>
    </div>
  );
}
