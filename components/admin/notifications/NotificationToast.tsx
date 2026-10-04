"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  FileText,
  Sparkles,
  Package,
  Activity,
  X,
  ArrowLeft,
  BellRing,
} from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { NotificationType } from "@/lib/db/types";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "order":
      return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    case "quote":
      return <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    case "customization":
      return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    case "sample":
      return <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    case "system":
    default:
      return <Activity className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
  }
}

function getBgColor(type: NotificationType) {
  switch (type) {
    case "order":
      return "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200/80 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300";
    case "quote":
      return "bg-amber-50 dark:bg-amber-950/50 border-amber-200/80 dark:border-amber-800/40 text-amber-700 dark:text-amber-300";
    case "customization":
      return "bg-purple-50 dark:bg-purple-950/50 border-purple-200/80 dark:border-purple-800/40 text-purple-700 dark:text-purple-300";
    case "sample":
      return "bg-blue-50 dark:bg-blue-950/50 border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-blue-300";
    case "system":
    default:
      return "bg-rose-50 dark:bg-rose-950/50 border-rose-200/80 dark:border-rose-800/40 text-rose-700 dark:text-rose-300";
  }
}

export function NotificationToast() {
  const { latestToast, dismissToast, markAsRead } = useAdminNotifications();
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!latestToast) return;
    setProgress(100);

    const startTime = Date.now();
    const duration = 7000;

    const interval = setInterval(() => {
      if (isPaused) return;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        dismissToast();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [latestToast, isPaused, dismissToast]);

  if (!latestToast) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 max-w-sm sm:max-w-md w-full animate-slideUp duration-300 pointer-events-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white/95 dark:bg-[#1f2125]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/15 dark:shadow-black/50 overflow-hidden relative ring-1 ring-black/5 dark:ring-white/5">
        {/* Animated Countdown Progress Bar */}
        <div
          className="h-1 bg-gradient-to-r from-[#c93b41] via-red-500 to-amber-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />

        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            {/* Type Icon with Glow */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${getBgColor(
                latestToast.type
              )}`}
            >
              {getNotificationIcon(latestToast.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-0.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c93b41] animate-ping" />
                  <span className="text-[11px] font-black text-[#c93b41] dark:text-red-400">
                    تنبيه تشغيلي فوري
                  </span>
                </div>
                <button
                  type="button"
                  onClick={dismissToast}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate mt-1">
                {latestToast.title}
              </h4>

              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                {latestToast.message}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 mt-3.5 pt-2.5 border-t border-slate-100 dark:border-white/5 text-xs">
                {latestToast.link ? (
                  <Link
                    href={latestToast.link}
                    onClick={() => {
                      markAsRead(latestToast.id, true);
                      dismissToast();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c93b41] hover:bg-[#ba3239] text-white font-bold transition-all shadow-sm shadow-red-500/25"
                  >
                    <span>فتح أمر الشغل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => {
                    markAsRead(latestToast.id, true);
                    dismissToast();
                  }}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-[11px] font-bold cursor-pointer"
                >
                  تحديد كمقروء وإغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
