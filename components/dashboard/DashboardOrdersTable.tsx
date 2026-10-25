import React from "react";
import Link from "next/link";
import { Package, Truck, FileText } from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

interface DashboardOrdersTableProps {
  loading: boolean;
  filteredOrders: any[];
  setSelectedTrackingCode: (code: string | null) => void;
  setSelectedInvoiceOrder: (order: any) => void;
}

export function DashboardOrdersTable({
  loading,
  filteredOrders,
  setSelectedTrackingCode,
  setSelectedInvoiceOrder,
}: DashboardOrdersTableProps) {
  if (loading) {
    return (
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14161a] border border-slate-200/80 dark:border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] text-slate-400 flex items-center justify-center mx-auto">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            لا توجد أوامر مطابقة لخيارات الفلترة الحالية
          </p>
          <p className="text-xs text-slate-400">
            يمكنك بدء تشغيل خط إنتاج جديد لأي نوع من المطبوعات والتغليف الفاخر الآن
          </p>
        </div>
        <Link
          href="/products/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>بدء طلب طباعة جديد</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* Mobile Orders Card View (md:hidden) */}
      <div className="md:hidden space-y-3.5">
        {filteredOrders.map((ord) => {
          const isDelivered = ord.status === "delivered";
          const isShipped = ord.status === "shipped";
          return (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#141518] border border-slate-200/80 dark:border-white/[0.07] space-y-3 shadow-2xs"
            >
              {/* Header: Tracking Code & Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/[0.05] text-[#c93b41] font-mono font-bold text-xs border border-slate-200/60 dark:border-white/[0.06] shadow-2xs">
                  {ord.tracking_code}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                    isDelivered
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : isShipped
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                      : "bg-red-500/10 text-[#c93b41] border-red-500/20"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDelivered
                        ? "bg-emerald-500"
                        : isShipped
                        ? "bg-orange-500 animate-pulse"
                        : "bg-[#c93b41] animate-pulse"
                    }`}
                  />
                  <span>{ord.status_label || ord.status}</span>
                </span>
              </div>

              {/* Product Info */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">
                  {ord.product_name}
                </h4>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                  {ord.service_type || "مواصفات قياسية معتمدة"}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05] text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">الكمية</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                    {Number(ord.quantity).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">الإجمالي</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                    {Number(ord.total_price).toLocaleString()} <span className="text-[9px] text-slate-400 font-sans">ج.م</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">التسليم</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px] truncate block">
                    {ord.estimated_delivery || "خلال 48 ساعة"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTrackingCode(ord.tracking_code)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] active:bg-red-50 dark:active:bg-[#2d1819] text-[#c93b41] font-bold text-xs border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>تتبع الشحنة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(ord)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/20 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>الفاتورة</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Orders Table View (hidden md:block) */}
      <div className="hidden md:block -mx-5 sm:mx-0 overflow-x-auto">
        <table className="w-full text-right text-xs min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <th className="pb-3 pr-4 sm:pr-2">رقم التتبع</th>
              <th className="pb-3">المنتج والمواصفات</th>
              <th className="pb-3 text-center">الكمية</th>
              <th className="pb-3">الإجمالي</th>
              <th className="pb-3">حالة التشغيل</th>
              <th className="pb-3">التسليم المتوقع</th>
              <th className="pb-3 text-left pl-4 sm:pl-2">الإجراءات السريعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
            {filteredOrders.map((ord) => {
              const isDelivered = ord.status === "delivered";
              const isShipped = ord.status === "shipped";
              return (
                <tr
                  key={ord.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-4 pr-4 sm:pr-2 font-mono font-bold">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.05] text-[#c93b41] text-[11px] border border-slate-200/60 dark:border-white/[0.06]">
                      {ord.tracking_code}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#c93b41] transition-colors">
                      {ord.product_name}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                      {ord.service_type || "مواصفات قياسية معتمدة"}
                    </div>
                  </td>
                  <td className="py-4 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#141518]">
                      {Number(ord.quantity).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 font-mono font-bold text-slate-900 dark:text-white">
                    {Number(ord.total_price).toLocaleString()}{" "}
                    <span className="text-[10px] text-slate-400 font-sans">ج.م</span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        isDelivered
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : isShipped
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                          : "bg-red-500/10 text-[#c93b41] border-red-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isDelivered
                            ? "bg-emerald-500"
                            : isShipped
                            ? "bg-orange-500 animate-pulse"
                            : "bg-[#c93b41] animate-pulse"
                        }`}
                      />
                      <span>{ord.status_label || ord.status}</span>
                    </span>
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-400 font-medium text-[11px]">
                    {ord.estimated_delivery || "خلال 48 ساعة"}
                  </td>
                  <td className="py-4 text-left pl-4 sm:pl-2">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedTrackingCode(ord.tracking_code)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-red-50 dark:hover:bg-[#2d1819] text-[#c93b41] font-bold text-[11px] border border-slate-200/80 dark:border-white/[0.08] transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                        title="متابعة خط السير المباشر"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>تتبع الشحنة</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[11px] border border-blue-500/20 transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                        title="عرض وطباعة الفاتورة الضريبية"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>الفاتورة</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardOrdersTable;
