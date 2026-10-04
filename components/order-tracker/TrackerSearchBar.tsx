"use client";

import React from "react";
import { Search, Sparkles, RefreshCw, Lock, ShieldCheck, UserCheck, PackageCheck } from "lucide-react";
import { demoCodes, OrderData } from "./types";
import { UserProfile } from "@/context/AuthContext";

interface TrackerSearchBarProps {
  searchCode: string;
  setSearchCode: (code: string) => void;
  loading: boolean;
  onSearch: (code: string, isDemo?: boolean) => void;
  userOrders?: OrderData[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: UserProfile | null;
  onOpenLogin: () => void;
}

export function TrackerSearchBar({
  searchCode,
  setSearchCode,
  loading,
  onSearch,
  userOrders = [],
  isAuthenticated,
  isAdmin,
  user,
  onOpenLogin,
}: TrackerSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchCode);
  };

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl space-y-5">
      {/* Top Status Banner */}
      {isAuthenticated ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold">
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              متصل باسم: {user?.full_name} {user?.company_name ? `(${user.company_name})` : ""}
            </span>
          </div>
          {isAdmin ? (
            <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-[#c93b41] border border-red-500/20 font-bold self-start sm:self-auto flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>صلاحية مشرف: بحث شامل في كل الطلبات</span>
            </span>
          ) : (
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              محمي بنظام الخصوصية: متاح فقط تتبع طلباتك المعتمدة
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              أنت في وضع العرض التوضيحي (Interactive Demo) — استكشف محاكاة مراحل الإنتاج بالأسفل.
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenLogin}
            className="px-3 py-1.5 rounded-xl btn-crimson text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>تسجيل الدخول لتتبع طلبك الحقيقي</span>
          </button>
        </div>
      )}

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder={
              isAuthenticated
                ? "اكتب كود طلبك (مثال: ETB-8841)..."
                : "جرب كود تجريبي (مثل DEMO-BOX) أو كود طلبك..."
            }
            className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] rounded-xl sm:rounded-2xl py-3.5 pr-12 pl-4 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c93b41] transition-all text-right font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl sm:rounded-2xl btn-crimson text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all shrink-0 shadow-md"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>جاري الفحص...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>تتبع الشحنة الآن</span>
            </>
          )}
        </button>
      </form>

      {/* Authenticated User Orders Chips */}
      {isAuthenticated && userOrders.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] space-y-2">
          <div className="text-xs text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
            <PackageCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>طلباتك المسجلة المتاحة للتتبع الفوري (اضغط للتتبع المباشر):</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {userOrders.map((ord) => (
              <button
                key={ord.id || ord.tracking_code}
                type="button"
                onClick={() => {
                  setSearchCode(ord.tracking_code);
                  onSearch(ord.tracking_code);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 dark:bg-[#1f1f1f] dark:hover:bg-[#2e1819] text-slate-800 dark:text-slate-200 hover:text-[#c93b41] border border-slate-200 dark:border-white/[0.08] hover:border-red-300 dark:hover:border-red-900/40 transition-all cursor-pointer flex items-center gap-2 text-xs font-medium"
              >
                <span className="font-mono font-bold text-[#c93b41]">{ord.tracking_code}</span>
                <span className="truncate max-w-[180px] text-slate-600 dark:text-slate-400">
                  {ord.product_name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#2a2a2a] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.05]">
                  {ord.status_label || ord.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Demo Presets Section */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#c93b41]" />
          نماذج محاكاة تفاعلية (Demo Previews):
        </span>
        {demoCodes.map((demo) => (
          <button
            key={demo.code}
            type="button"
            onClick={() => {
              setSearchCode(demo.code);
              onSearch(demo.code, true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] hover:bg-red-50 dark:hover:bg-[#2e1819] text-slate-700 dark:text-slate-300 hover:text-[#c93b41] border border-slate-200 dark:border-white/[0.08] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="font-mono font-bold text-[#c93b41]">{demo.code}</span>
            <span className="opacity-80">({demo.label})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
