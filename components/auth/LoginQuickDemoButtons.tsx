"use client";

import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck } from "lucide-react";

interface LoginQuickDemoButtonsProps {
  loading: boolean;
  activeRole: "client" | "admin";
  onQuickClientLogin: () => void;
  onQuickAdminLogin: () => void;
}

export function LoginQuickDemoButtons({
  loading,
  activeRole,
  onQuickClientLogin,
  onQuickAdminLogin,
}: LoginQuickDemoButtonsProps) {
  return (
    <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] space-y-2.5 relative z-10">
      <div className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider">
        تجربة فورية بضغطة زر واحدة (Demo Quick Access)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onQuickClientLogin}
          disabled={loading}
          className="py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-blue-500/20 cursor-pointer"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>دخول كعميل (لوحة العميل)</span>
        </button>

        <button
          type="button"
          onClick={onQuickAdminLogin}
          disabled={loading}
          className="py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#c93b41] dark:text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-red-500/20 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>دخول كأدمن (لوحة الموقع)</span>
        </button>
      </div>

      <div className="pt-3 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
        {activeRole === "client" ? (
          <span>
            ليس لديك حساب لشركتك بعد؟{" "}
            <Link href="/register" className="text-[#c93b41] font-bold hover:underline">
              فتح حساب شركة مجاناً
            </Link>
          </span>
        ) : (
          <span>
            هل تواجه مشكلة في صلاحيات الإدارة؟{" "}
            <Link href="/contact" className="text-[#c93b41] font-bold hover:underline">
              التواصل مع المسؤول التقني
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
