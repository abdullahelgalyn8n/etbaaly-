"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, ExternalLink } from "lucide-react";
import { OrderData } from "./types";

interface TrackerAccessBadgesProps {
  authorizedAs: "owner" | "admin" | "demo" | null;
  order: OrderData;
  isAuthenticated: boolean;
  onOpenLogin: () => void;
}

export function TrackerAccessBadges({
  authorizedAs,
  order,
  isAuthenticated,
  onOpenLogin,
}: TrackerAccessBadgesProps) {
  if (!authorizedAs || authorizedAs === "owner") return null;

  return (
    <>
      {/* Demo Mode Notice Badge */}
      {authorizedAs === "demo" && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-300 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              أنت تشاهد الآن نموذج محاكاة توضيحي ({order.tracking_code}) لفهم مراحل الإنتاج والتتبع.
            </span>
          </div>
          {!isAuthenticated && (
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-xl btn-crimson text-white font-bold cursor-pointer shrink-0 shadow-xs"
            >
              تسجيل الدخول لتتبع طلباتك الحقيقية
            </button>
          )}
        </div>
      )}

      {/* Admin Mode Badge */}
      {authorizedAs === "admin" && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#c93b41] font-bold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              معاينة إدارية (Admin View): تم العثور على الطلب لحساب العميل: {order.customer_name} ({order.customer_phone})
            </span>
          </div>
          <Link
            href="/admin/orders/"
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 transition-all"
          >
            <span>تعديل حالة الطلب في لوحة التحكم</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </>
  );
}
