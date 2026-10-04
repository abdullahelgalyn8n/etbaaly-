"use client";

import React from "react";
import Link from "next/link";
import { Lock, Sparkles, ShieldAlert, PhoneCall, PackageX, Info } from "lucide-react";

interface TrackerErrorBannersProps {
  errorInfo: {
    type: "requireAuth" | "forbidden" | "notFound" | "error";
    message: string;
  } | null;
  onOpenLogin: () => void;
  onSwitchToDemo: () => void;
}

export function TrackerErrorBanners({
  errorInfo,
  onOpenLogin,
  onSwitchToDemo,
}: TrackerErrorBannersProps) {
  if (!errorInfo) return null;

  return (
    <>
      {/* 1. Require Auth Banner (401) */}
      {errorInfo.type === "requireAuth" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-800/50 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-200">
                تسجيل الدخول مطلوب لتتبع أمر الشغل الحقيقي
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                {errorInfo.message}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>تسجيل الدخول بحسابك الآن</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToDemo}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.1] text-xs font-bold hover:border-[#c93b41] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#c93b41]" />
              <span>مشاهدة نموذج محاكاة تجريبي بدلاً من ذلك</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Forbidden / Access Denied Banner (403) */}
      {errorInfo.type === "forbidden" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800/50 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-[#c93b41] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-base sm:text-lg font-black text-red-900 dark:text-red-200 flex items-center gap-2">
                <span>عفواً، لا تملك صلاحية الوصول لهذا الطلب</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-200 dark:bg-red-900/60 text-red-800 dark:text-red-200">
                  حماية الخصوصية
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-red-800/90 dark:text-red-300/90 leading-relaxed">
                {errorInfo.message}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-red-200 dark:border-red-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-slate-600 dark:text-slate-400">
              يمكنك استعراض ومتابعة طلباتك المعتمدة من خلال{" "}
              <Link href="/dashboard" className="font-bold text-[#c93b41] hover:underline">
                بوابة العميل (/dashboard)
              </Link>
            </div>
            <a
              href="https://wa.me/201022598473?text=مرحباً، لدي استفسار حول كود تتبع طلبي"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-800 dark:text-red-200 font-bold flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>تواصل مع الدعم الفني</span>
            </a>
          </div>
        </div>
      )}

      {/* 3. Not Found Banner (404) */}
      {errorInfo.type === "notFound" && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.08] shadow-lg flex items-center gap-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-[#2b2b2b] text-slate-500 flex items-center justify-center shrink-0">
            <PackageX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">لم يتم العثور على الطلب</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {errorInfo.message}
            </p>
          </div>
        </div>
      )}

      {/* 4. General Error Banner */}
      {errorInfo.type === "error" && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs sm:text-sm flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0" />
          <span>{errorInfo.message}</span>
        </div>
      )}
    </>
  );
}
