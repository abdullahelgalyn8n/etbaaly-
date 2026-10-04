"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Layers, ShoppingBag, BookOpen, Clock, FileSpreadsheet, Bell } from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";

interface AdminGlanceWidgetProps {
  stats: any;
  productsCount: number;
  ordersCount: number;
}

export default function AdminGlanceWidget({
  stats,
  productsCount,
  ordersCount,
}: AdminGlanceWidgetProps) {
  const { unreadCount, notifications } = useAdminNotifications();

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
        <span className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#c93b41]">
            <LayoutDashboard className="w-3.5 h-3.5" />
          </div>
          <span>لمحة سريعة <bdi dir="ltr" className="text-slate-400 font-normal text-[11px]">(At a Glance)</bdi></span>
        </span>
        <span className="text-[11px] text-slate-400 font-normal">محدث لحظياً</span>
      </div>

      <div className="p-5 text-xs space-y-4">
        <div className="grid grid-cols-3 gap-2.5 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
          <Link
            href="/admin/products"
            className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#1a1c20] border border-slate-100 dark:border-white/[0.05] flex flex-col sm:flex-row items-center sm:items-start gap-2.5 hover:border-[#c93b41]/30 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#c93b41] flex items-center justify-center font-bold shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-slate-900 dark:text-white text-sm font-mono">
                {productsCount}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-[#c93b41]">
                منتجات وقوالب
              </div>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#1a1c20] border border-slate-100 dark:border-white/[0.05] flex flex-col sm:flex-row items-center sm:items-start gap-2.5 hover:border-orange-500/30 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-600 flex items-center justify-center font-bold shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-slate-900 dark:text-white text-sm font-mono">
                {ordersCount}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-orange-600">
                أوامر تشغيل
              </div>
            </div>
          </Link>

          <Link
            href="/admin/notifications"
            className="p-3 rounded-xl bg-slate-50/70 dark:bg-[#1a1c20] border border-slate-100 dark:border-white/[0.05] flex flex-col sm:flex-row items-center sm:items-start gap-2.5 hover:border-red-500/30 transition-colors group relative"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#c93b41] flex items-center justify-center font-bold shrink-0 relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c93b41]" />
              )}
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-[#c93b41] text-sm font-mono">
                {unreadCount > 0 ? `${unreadCount} جديد` : notifications.length}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-[#c93b41]">
                تنبيهات وإشعارات
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-slate-500 dark:text-slate-400 text-xs">
          <Link href="/admin/posts" className="hover:text-[#c93b41] flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>57 مقال في المدونة</span>
          </Link>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>إصدار المنصة: <bdi dir="ltr">v2.6 (Next.js + Supabase)</bdi></span>
          </div>
        </div>
      </div>
    </div>
  );
}
