import React from "react";
import { Printer, Truck, CheckCircle2, ShieldCheck } from "lucide-react";

interface DashboardOrderStatsProps {
  orders: any[];
}

export function DashboardOrderStats({ orders }: DashboardOrderStatsProps) {
  const activeCount = orders.filter((o) => o.status !== "delivered").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const totalSpend = orders.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-[#c93b41]/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">أوامر قيد التشغيل والطباعة</span>
          <div className="w-9 h-9 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center">
            <Printer className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {activeCount}
          </span>
          <span className="text-xs text-slate-500">أمر نشط</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>في خطوط الإنتاج والقص الآن</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-orange-500/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">شحنات في طريق التوصيل</span>
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {shippedCount}
          </span>
          <span className="text-xs text-slate-500">شحنة جارية</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-orange-600 dark:text-orange-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          <span>مع مندوب الشحن للتسليم</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">شحنات تم تسليمها واعتمادها</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {deliveredCount}
          </span>
          <span className="text-xs text-slate-500">أمر مكتمل</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>مطابقة لجودة الألوان والمواصفات</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-blue-500/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">إجمالي تعاملات الحساب</span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {totalSpend.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 font-bold">ج.م</span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>فواتير ضريبية إلكترونية معتمدة</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardOrderStats;
