"use client";

import React from "react";
import { Package, Truck, MapPin, ShieldCheck, Phone } from "lucide-react";
import { OrderData } from "./types";

interface TrackerOrderDetailsProps {
  order: OrderData;
}

export function TrackerOrderDetails({ order }: TrackerOrderDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Print Specifications */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#c93b41]" />
          مواصفات أمر الطباعة
        </h4>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-700 dark:text-slate-300 font-medium">الكمية الإجمالية:</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {order.quantity.toLocaleString()} قطعة
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-700 dark:text-slate-300 font-medium">القسم والنوع:</span>
            <span className="font-bold text-slate-900 dark:text-white">{order.service_type}</span>
          </div>
          {order.specs &&
            Object.entries(order.specs).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/[0.05]"
              >
                <span className="text-slate-700 dark:text-slate-300 capitalize font-medium">{k}:</span>
                <span className="font-bold text-slate-900 dark:text-white text-left">{v}</span>
              </div>
            ))}
          <div className="flex items-center justify-between py-2 pt-3">
            <span className="text-slate-700 dark:text-slate-300 font-bold">إجمالي الفاتورة:</span>
            <span className="text-base font-extrabold text-[#c93b41] font-mono">
              {order.total_price.toLocaleString()} ج.م
            </span>
          </div>
        </div>
      </div>

      {/* Delivery & Courier Information */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#c93b41]" />
            بيانات الشحن والتسليم
          </h4>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-700 dark:text-slate-300 block text-[11px] font-bold">عنوان الاستلام:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {order.shipping_address} ({order.shipping_city})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-700 dark:text-slate-300 block text-[11px] font-bold">طريقة الشحن:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {order.shipping_method}
                </span>
              </div>
            </div>

            {order.courier_name && order.courier_name !== "--" && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 block font-bold">مندوب الشحنة:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {order.courier_name}
                  </span>
                </div>
                {order.courier_phone && order.courier_phone !== "--" && (
                  <a
                    href={`tel:${order.courier_phone}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span dir="ltr">{order.courier_phone}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action: WhatsApp Support on this order */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.05]">
          <a
            href={`https://wa.me/201022598473?text=${encodeURIComponent(
              `مرحباً، أستفسر عن حالة طلبي رقم ${order.tracking_code} (${order.product_name})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#1a1a1a] hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>تواصل مع الدعم الفني بخصوص هذا الطلب</span>
          </a>
        </div>
      </div>
    </div>
  );
}
