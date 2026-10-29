"use client";

import React from "react";
import Link from "next/link";
import { Building2, PlusCircle, Sparkles, LogOut, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/data/siteConfig";

interface DashboardHeaderProps {
  user: any;
  isAdmin: boolean;
  switchRole: () => void;
  ordersCount: number;
}

export default function DashboardHeader({
  user,
  isAdmin,
  ordersCount,
}: DashboardHeaderProps) {
  const { logout } = useAuth();
  const displayName = user?.company_name || user?.full_name || "عميل إطبعلي";
  const userInitial = (displayName.trim()[0] || "ع").toUpperCase();

  return (
    <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#c93b41]/10 via-[#c93b41]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 dark:bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* User Info & Identity */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c93b41] to-[#991b1b] text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0 border-2 border-white/20">
            {userInitial}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 dark:bg-red-950/40 text-[#c93b41] border border-red-200 dark:border-red-900/40">
                <Building2 className="w-3 h-3" />
                <span>شريك أعمال B2B</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>حساب موثق</span>
              </span>

              {isAdmin && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                  صلاحية مشرف
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              أهلاً بك، {displayName} 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl line-clamp-2">
              متابعة فورية ومباشرة لخطوط إنتاج الطباعة، عروض الأسعار والمقايسات، وتتبع الشحنات المعتمدة ضريبياً.
            </p>
          </div>
        </div>

        {/* Action Controls & Key Account Rep */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.05]">
          {/* Dedicated Account Manager Button */}
          <a
            href={`${siteConfig.social.whatsapp}?text=${encodeURIComponent("مرحباً، أود التواصل مع مسؤول حساب شركتي بخصوص أمر تشغيل")}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 transition-colors shadow-2xs"
            title="تواصل مباشر مع مدير الحساب المخصص لمؤسستك"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">مدير حسابك:</span>
            <span>واتساب فوري</span>
          </a>

          {/* New Order Button */}
          <Link
            href="/products/"
            className="btn-crimson text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>طلب تشغيل جديد</span>
          </Link>

          {/* Admin Switcher */}
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs hover:opacity-90 transition-all cursor-pointer"
            >
              <span>لوحة الإدارة ⚡</span>
            </Link>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            className="px-3 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 dark:bg-white/[0.05] hover:dark:bg-red-950/30 text-slate-600 hover:text-red-600 dark:text-slate-400 hover:dark:text-red-400 border border-slate-200/80 dark:border-white/[0.08] transition-colors cursor-pointer"
            title="تسجيل الخروج من الحساب"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
}