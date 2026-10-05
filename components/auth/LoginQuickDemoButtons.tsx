"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, ShieldCheck } from "lucide-react";

interface LoginQuickDemoButtonsProps {
  loading: boolean;
  activeRole: "client" | "admin";
  onQuickClientLogin: () => void;
  onQuickAdminLogin: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginQuickDemoButtons({
  loading,
  activeRole,
  onQuickClientLogin,
  onQuickAdminLogin,
  onSwitchToRegister,
}: LoginQuickDemoButtonsProps) {
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    // Only show demo buttons if running locally in development or on localhost
    const isLocal =
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local") ||
          window.location.search.includes("dev_demo=true")));

    setIsLocalDev(Boolean(isLocal));
  }, []);

  return (
    <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] space-y-2.5 relative z-10">
      {/* Show Demo Quick Access ONLY in local development / testing */}
      {isLocalDev && (
        <div className="p-3 mb-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-dashed border-amber-300 dark:border-amber-700/50 space-y-2">
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 text-center uppercase tracking-wider">
            تجربة فورية بضغطة زر واحدة (Local Dev Demo Only)
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
        </div>
      )}

      <div className="pt-3 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
        {activeRole === "client" ? (
          <span>
            ليس لديك حساب بعد؟{" "}
            {onSwitchToRegister ? (
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#c93b41] font-bold hover:underline cursor-pointer"
              >
                إنشاء حساب عميل أو شركة جديدة مجاناً
              </button>
            ) : (
              <Link href="/register/" className="text-[#c93b41] font-bold hover:underline">
                إنشاء حساب مجاناً
              </Link>
            )}
          </span>
        ) : (
          <span>
            هل تواجه مشكلة في صلاحيات الإدارة؟{" "}
            <Link href="/contact/" className="text-[#c93b41] font-bold hover:underline">
              التواصل مع المسؤول التقني
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
