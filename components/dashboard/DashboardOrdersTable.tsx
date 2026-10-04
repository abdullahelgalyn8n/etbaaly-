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
      <div className="py-16 text-center space-y-3">
        <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
        <p className="text-xs sm:text-sm text-slate-500 font-bold">
          لا توجد أوامر مطابقة لخيارات الفلترة الحالية.
        </p>
        <Link
          href="/products/"
          className="inline-block px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold"
        >
          بدء طلب طباعة جديد
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-right text-xs">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 font-bold">
            <th className="pb-3 pr-2">رقم التتبع</th>
            <th className="pb-3">المنتج والتفاصيل الفنية</th>
            <th className="pb-3">الكمية</th>
            <th className="pb-3">الإجمالي (ج.م)</th>
            <th className="pb-3">حالة التشغيل الحالية</th>
            <th className="pb-3">التسليم المتوقع</th>
            <th className="pb-3 text-left pl-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {filteredOrders.map((ord) => (
            <tr
              key={ord.id}
              className="hover:bg-slate-50 dark:hover:bg-[#16171b] transition-colors"
            >
              <td className="py-4 pr-2 font-mono font-bold text-[#c93b41]">
                {ord.tracking_code}
              </td>
              <td className="py-4 font-bold text-slate-900 dark:text-white">
                <div>{ord.product_name}</div>
                <div className="text-[11px] text-slate-500 font-normal">
                  {ord.service_type}
                </div>
              </td>
              <td className="py-4 font-mono font-bold">
                {Number(ord.quantity).toLocaleString()}
              </td>
              <td className="py-4 font-mono font-bold text-slate-900 dark:text-white">
                {Number(ord.total_price).toLocaleString()} ج.م
              </td>
              <td className="py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                    ord.status === "delivered"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : ord.status === "shipped"
                      ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                      : "bg-red-500/10 text-[#c93b41] border-red-500/20"
                  }`}
                >
                  {ord.status_label || ord.status}
                </span>
              </td>
              <td className="py-4 text-slate-600 dark:text-slate-300 font-medium">
                {ord.estimated_delivery || "خلال 48 ساعة"}
              </td>
              <td className="py-4 text-left pl-2 space-x-1.5 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedTrackingCode(ord.tracking_code)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#141518] hover:bg-red-50 dark:hover:bg-[#2d1819] text-[#c93b41] font-bold text-[11px] border border-slate-200 dark:border-white/[0.08] transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <Truck className="w-3 h-3" />
                  <span>تتبع</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(ord)}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[11px] border border-blue-500/20 transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>الفاتورة</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardOrdersTable;
