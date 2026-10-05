"use client";

import React from "react";
import Link from "next/link";
import { Building2, PlusCircle, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  return (
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c93b41]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/40 text-[#c93b41] border border-red-200 dark:border-red-900/40">
              <Building2 className="w-3.5 h-3.5" />
              <span>بوابة حسابات الشركات والعملاء B2B</span>
            </span>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                صلاحية مشرف
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            مرحباً، {user?.company_name || user?.full_name || "شريك نجاح إطبعلي"} 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl">
            متابعة فورية ومباشرة لجميع أوامر الطباعة، عروض الأسعار، مسودات التصاميم، والفواتير
            الضريبية الإلكترونية المعتمدة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <Link
            href="/products/"
            className="btn-crimson text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>طلب طباعة جديد</span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md transition-all cursor-pointer"
            >
              <span>لوحة الإدارة ⚡</span>
            </Link>
          )}

          <button
            type="button"
            onClick={logout}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 transition-colors cursor-pointer"
            title="تسجيل الخروج من الحساب"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );
}
