"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

interface AdminActivityWidgetProps {
  orders: any[];
  updatingOrderId: string | null;
  handleStatusChange: (orderId: string, status: string) => void;
}

export default function AdminActivityWidget({
  orders,
  updatingOrderId,
  handleStatusChange,
}: AdminActivityWidgetProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
        <span className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#c93b41]">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span>النشاط الأخير وأوامر التشغيل</span>
        </span>
        <Link href="/admin/orders" className="text-[11px] text-[#c93b41] hover:underline font-bold">
          عرض جميع الطلبات ⬅
        </Link>
      </div>

      <div className="p-5 text-xs space-y-3">
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
          تم النشر مؤخراً على خطوط الإنتاج:
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {orders.slice(0, 4).map((ord) => (
            <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#c93b41] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 px-2 py-0.5 rounded-md text-xs">
                    {ord.tracking_code}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {ord.customer_name}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {ord.product_name} •{" "}
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    {Number(ord.total_price).toLocaleString()} ج.م
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={ord.status}
                  disabled={updatingOrderId === ord.id}
                  onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                  className="text-xs font-bold py-1.5 px-3 bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 transition-all"
                >
                  <option value="received">1. تم الاستلام</option>
                  <option value="preflight">2. فحص وبروفة</option>
                  <option value="printing">3. جاري الطباعة</option>
                  <option value="finishing">4. التشطيب</option>
                  <option value="packaging">5. التعبئة</option>
                  <option value="shipped">6. مع المندوب</option>
                  <option value="delivered">7. تم التسليم</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
