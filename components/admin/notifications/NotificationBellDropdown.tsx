"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Volume2,
  VolumeX,
  RotateCw,
  ShoppingBag,
  FileText,
  Sparkles,
  Package,
  Activity,
  Trash2,
  Check,
  ExternalLink,
  PlusCircle,
  Inbox,
  Clock,
  ArrowLeft,
  X,
  ChevronLeft,
} from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { AdminNotification, NotificationType } from "@/lib/db/types";
import { formatRelativeArabicTime } from "./notificationUtils";

export function NotificationBellDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "unread" | "order" | "quote"
  >("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    isRefreshing,
    audioEnabled,
    toggleAudio,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    triggerTestNotification,
    refresh,
  } = useAdminNotifications();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Tab counts
  const orderCount = notifications.filter((n) => n.type === "order").length;
  const quoteCount = notifications.filter((n) => n.type === "quote" || n.type === "sample").length;

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === "unread") return !notif.read;
    if (selectedFilter === "order") return notif.type === "order";
    if (selectedFilter === "quote") return notif.type === "quote" || notif.type === "sample";
    return true;
  });

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-black rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            عاجل 🔥
          </span>
        );
      case "high":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            أولوية ⚡
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center ${
          isOpen
            ? "bg-[#c93b41]/10 text-[#c93b41] ring-2 ring-[#c93b41]/30"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08]"
        }`}
        title="مركز الإشعارات والتنبيهات المباشرة"
        aria-label="الإشعارات"
      >
        <Bell
          className={`w-4 h-4 transition-transform ${
            unreadCount > 0 ? "animate-wiggle" : "group-hover:rotate-12"
          }`}
        />

        {/* Unread badge & pulsing dot */}
        {unreadCount > 0 && (
          <>
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-gradient-to-r from-[#c93b41] to-[#e04b4f] text-[9px] font-mono font-black text-white shadow-md shadow-red-500/30 ring-2 ring-white dark:ring-[#18191c]">
              {unreadCount > 99 ? "+99" : unreadCount}
            </span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-[#c93b41] opacity-75" />
          </>
        )}
      </button>

      {/* Popover Dropdown (Positioned safely: left-0 so it expands towards the center of screen without clipping!) */}
      {isOpen && (
        <div
          className="fixed inset-x-3 top-13 max-w-[94vw] sm:max-w-none sm:inset-x-auto sm:left-0 sm:right-auto sm:absolute sm:top-full sm:mt-2 w-auto sm:w-[410px] bg-white/98 dark:bg-[#1f2125]/98 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 rounded-3xl shadow-2xl z-50 text-xs overflow-hidden animate-fadeIn duration-200 ring-1 ring-black/5 dark:ring-white/5"
          style={{ maxHeight: "calc(100vh - 70px)" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c93b41] to-[#ba3239] flex items-center justify-center text-white shadow-sm shadow-red-500/25">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      مركز الإشعارات
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      مباشر
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {unreadCount > 0
                      ? `${unreadCount} تنبيهات غير مقروءة بانتظار اتخاذ إجراء`
                      : "كافة التنبيهات مقروءة ومحدثة"}
                  </div>
                </div>
              </div>

              {/* Action tools */}
              <div className="flex items-center gap-1 bg-white dark:bg-[#18191c] p-1 rounded-xl border border-slate-200/80 dark:border-white/5 shadow-2xs">
                {/* Audio toggle */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    audioEnabled
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  }`}
                  title={audioEnabled ? "كتم التنبيه الصوتي" : "تفعيل التنبيه الصوتي"}
                >
                  {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Refresh */}
                <button
                  type="button"
                  onClick={() => refresh()}
                  disabled={isRefreshing}
                  className={`p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer ${
                    isRefreshing ? "animate-spin text-[#c93b41]" : ""
                  }`}
                  title="مزامنة الإشعارات"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                {/* Mark all as read */}
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => markAllAsRead()}
                    className="p-1.5 text-slate-400 hover:text-[#c93b41] dark:hover:text-[#e04b4f] hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                    title="تحديد الكل كمقروء"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Close modal on mobile */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
                  aria-label="إغلاق"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Segmented Filter Control (Clean compact tabs that never overflow) */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 dark:bg-[#141518] rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                  selectedFilter === "all"
                    ? "bg-white dark:bg-[#252830] text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                الكل ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("unread")}
                className={`py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                  selectedFilter === "unread"
                    ? "bg-[#c93b41] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                جديد ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("order")}
                className={`py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                  selectedFilter === "order"
                    ? "bg-white dark:bg-[#252830] text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                طلبات ({orderCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("quote")}
                className={`py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                  selectedFilter === "quote"
                    ? "bg-white dark:bg-[#252830] text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                مقايسات ({quoteCount})
              </button>
            </div>
          </div>

          {/* Notifications Scroll Area */}
          <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 p-2 space-y-1.5">
            {isLoading ? (
              <div className="py-12 text-center text-slate-400">
                <RotateCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#c93b41]" />
                <span className="font-bold">جاري تحديث التنبيهات...</span>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="py-10 text-center text-slate-400 space-y-2">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="font-bold text-xs text-slate-700 dark:text-slate-300">
                  لا توجد إشعارات في هذا التصنيف
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  تظهر هنا أوامر الشغل الجديدة وعروض الأسعار فور إرسالها من العملاء.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-2xl transition-all relative group ${
                    !notif.read
                      ? "bg-red-50/40 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 border-r-3 border-r-[#c93b41] shadow-2xs"
                      : "bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-100/70 dark:hover:bg-white/[0.04] border border-slate-100 dark:border-white/5"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Category Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 shadow-2xs ${getCategoryColor(
                        notif.type
                      )}`}
                    >
                      {getNotificationIcon(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h4 className="font-bold text-slate-900 dark:text-white truncate text-xs">
                            {notif.title}
                          </h4>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#c93b41] shrink-0" />
                          )}
                        </div>
                        {getPriorityBadge(notif.priority)}
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Metadata Chips if available */}
                      {notif.metadata && (notif.metadata.trackingCode || notif.metadata.amount) && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {notif.metadata.trackingCode && (
                            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#18191c] border border-slate-200 dark:border-white/10 font-mono text-[10px] font-bold text-[#c93b41]">
                              {notif.metadata.trackingCode}
                            </span>
                          )}
                          {notif.metadata.amount && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
                              {Number(notif.metadata.amount).toLocaleString()} ج.م
                            </span>
                          )}
                          {notif.metadata.customer && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] truncate max-w-[120px]">
                              {notif.metadata.customer}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer Info & Quick Actions */}
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{formatRelativeArabicTime(notif.createdAt)}</span>
                        </div>

                        {/* Actions buttons */}
                        <div className="flex items-center gap-1.5">
                          {notif.link && (
                            <Link
                              href={notif.link}
                              onClick={() => {
                                markAsRead(notif.id, true);
                                setIsOpen(false);
                              }}
                              className="px-2 py-0.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-[#c93b41] font-bold flex items-center gap-1 transition-colors"
                            >
                              <span>معاينة</span>
                              <ChevronLeft className="w-2.5 h-2.5" />
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={() => markAsRead(notif.id, !notif.read)}
                            className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-md hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
                            title={notif.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
                          >
                            <Check className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
                            title="حذف الإشعار"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between">
            <Link
              href="/admin/notifications"
              onClick={() => setIsOpen(false)}
              className="text-[#c93b41] hover:text-[#ba3239] font-bold flex items-center gap-1 transition-colors group"
            >
              <span>مركز الإشعارات الكامل</span>
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => triggerTestNotification()}
              className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 hover:text-[#c93b41] bg-white dark:bg-[#18191c] border border-slate-200 dark:border-white/10 hover:border-[#c93b41]/40 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer font-bold shadow-2xs"
              title="محاكاة وصول طلب جديد لاختبار الصوت وظهور الإشعار"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#c93b41]" />
              <span>إشعار تجريبي 🔔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
