import React from "react";
import { Printer, Truck, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

interface DashboardOrderStatsProps {
  orders: any[];
}

export function DashboardOrderStats({ orders }: DashboardOrderStatsProps) {
  const activeCount = orders.filter((o) => o.status !== "delivered").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">أوامر قيد السحب والتشغيل:</span>
          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#c93b41] flex items-center justify-center">
            <Printer className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">
          {activeCount} طلبات
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">شحنات جاري توصيلها:</span>
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">
          {shippedCount} شحنة
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">إجمالي الطلبات المستلمة:</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-2">
          {deliveredCount} طلب
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">الفواتير الإلكترونية:</span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          <span>مطابقة لمنظومة الضرائب المصرية</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardOrderStats;
