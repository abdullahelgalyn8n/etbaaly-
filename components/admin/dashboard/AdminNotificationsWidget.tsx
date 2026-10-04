"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  ShoppingBag,
  FileText,
  Sparkles,
  Package,
  Activity,
  ArrowLeft,
  PlusCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  Check,
} from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { NotificationType } from "@/lib/db/types";
import { formatRelativeArabicTime } from "@/components/admin/notifications/notificationUtils";

export default function AdminNotificationsWidget() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    triggerTestNotification,
  } = useAdminNotifications();

  const [filterMode, setFilterMode] = useState<"unread" | "all">("unread");

  const unreadList = notifications.filter((n) => !n.read);
  const displayedNotifications = (
    filterMode === "unread" && unreadList.length > 0 ? unreadList : notifications
  ).slice(0, 4);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "quote":
        return <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "customization":
        return <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case "sample":
        return <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "system":
      default:
        return <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    }
  };

  const getCategoryColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40";
      case "quote":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40";
      case "customization":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/40";
      case "sample":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/40";
      case "system":
      default:
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/40";
    }
  };

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
      {/* Widget Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#c93b41] to-[#ba3239] flex items-center justify-center text-white shadow-xs relative">
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#c93b41] ring-2 ring-white dark:ring-[#242424] animate-ping" />
            )}
          </div>
          <span className="font-black text-slate-900 dark:text-white">
            مركز التنبيهات المباشرة
          </span>
          {unreadCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c93b41] text-white shadow-2xs">
              {unreadCount} جديد
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              مكتمل
            </span>
          )}
        </div>

        <Link
          href="/admin/notifications"
          className="text-[11px] text-[#c93b41] hover:text-[#ba3239] font-black flex items-center gap-1 transition-colors group"
        >
          <span>مركز الإشعارات</span>
          <ChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
        </Link>
      </div>

      {/* Filter Tabs Inside Widget */}
      <div className="px-4 pt-3 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#1a1c20] rounded-xl font-bold">
          <button
            type="button"
            onClick={() => setFilterMode("unread")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              filterMode === "unread"
                ? "bg-white dark:bg-[#252830] text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            غير مقروء ({unreadCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              filterMode === "all"
                ? "bg-white dark:bg-[#252830] text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            الكل ({notifications.length})
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => markAllAsRead()}
            className="text-slate-500 hover:text-[#c93b41] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>قراءة الكل</span>
          </button>
        )}
      </div>

      {/* Widget Body */}
      <div className="p-4 text-xs space-y-2.5">
        {displayedNotifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
              <Bell className="w-5 h-5" />
            </div>
            <p className="font-bold text-xs text-slate-700 dark:text-slate-300">
              {filterMode === "unread"
                ? "لا توجد تنبيهات غير مقروءة حالياً"
                : "سجل الإشعارات فارغ"}
            </p>
            <button
              type="button"
              onClick={() => triggerTestNotification()}
              className="text-xs text-[#c93b41] font-bold hover:underline"
            >
              + محاكاة طلب تجريبي
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {displayedNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`py-3 px-2 rounded-2xl transition-all flex items-start gap-3 group ${
                  !notif.read
                    ? "bg-red-50/40 dark:bg-red-950/15 border-r-3 border-r-[#c93b41]"
                    : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                }`}
              >
                {/* Category Icon */}
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${getCategoryColor(
                    notif.type
                  )}`}
                >
                  {getNotificationIcon(notif.type)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-black text-slate-900 dark:text-white truncate text-xs">
                      {notif.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {formatRelativeArabicTime(notif.createdAt)}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Metadata Chips if available */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px]">
                    {notif.metadata?.trackingCode && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white dark:bg-[#18191c] border border-slate-200 dark:border-white/10 font-mono font-bold text-[#c93b41]">
                        {notif.metadata.trackingCode}
                      </span>
                    )}
                    {notif.metadata?.amount && (
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                        {Number(notif.metadata.amount).toLocaleString()} ج.م
                      </span>
                    )}
                    {notif.metadata?.customer && (
                      <span className="text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                        {notif.metadata.customer}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-1 pt-1 opacity-90 group-hover:opacity-100">
                  {notif.link && (
                    <Link
                      href={notif.link}
                      onClick={() => markAsRead(notif.id, true)}
                      className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-[#c93b41] font-bold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <span>عرض</span>
                      <ChevronLeft className="w-2.5 h-2.5" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => markAsRead(notif.id, !notif.read)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                    title={notif.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Simulation footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>مزامنة تلقائية كل 20 ثانية</span>
          </span>
          <button
            type="button"
            onClick={() => triggerTestNotification()}
            className="text-[#c93b41] hover:text-[#ba3239] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3 h-3" />
            <span>محاكاة إشعار فوري</span>
          </button>
        </div>
      </div>
    </div>
  );
}
