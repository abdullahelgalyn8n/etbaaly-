"use client";

import React, { useState } from "react";
import { Truck, Search } from "lucide-react";
import OrderTracker from "@/components/OrderTracker";
import DashboardOrderStats from "./DashboardOrderStats";
import DashboardOrdersTable from "./DashboardOrdersTable";

interface DashboardOrdersTabProps {
  orders: any[];
  loading: boolean;
  selectedTrackingCode: string | null;
  setSelectedTrackingCode: (code: string | null) => void;
  setSelectedInvoiceOrder: (order: any) => void;
}

export default function DashboardOrdersTab({
  orders,
  loading,
  selectedTrackingCode,
  setSelectedTrackingCode,
  setSelectedInvoiceOrder,
}: DashboardOrdersTabProps) {
  const [orderFilter, setOrderFilter] = useState<"all" | "active" | "shipped" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "active" && o.status === "delivered") return false;
    if (orderFilter === "shipped" && o.status !== "shipped") return false;
    if (orderFilter === "delivered" && o.status !== "delivered") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const codeMatch = (o.tracking_code || "").toLowerCase().includes(q);
      const nameMatch = (o.product_name || "").toLowerCase().includes(q);
      if (!codeMatch && !nameMatch) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Quick Stat Tiles */}
      <DashboardOrderStats orders={orders} />

      {/* Orders Table Container */}
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-4 sm:p-7 shadow-xl">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {(["all", "active", "shipped", "delivered"] as const).map((filter) => {
              const label =
                filter === "all"
                  ? "جميع الأوامر"
                  : filter === "active"
                  ? "قيد التشغيل"
                  : filter === "shipped"
                  ? "في الطريق للشحن"
                  : "المستلمة";
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setOrderFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    orderFilter === filter
                      ? "bg-[#c93b41] text-white shadow-xs"
                      : "bg-slate-100 dark:bg-[#141518] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="بحث برقم التتبع أو اسم المنتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>
        </div>

        <DashboardOrdersTable
          loading={loading}
          filteredOrders={filteredOrders}
          setSelectedTrackingCode={setSelectedTrackingCode}
          setSelectedInvoiceOrder={setSelectedInvoiceOrder}
        />
      </div>

      {/* Embedded Live Tracking Panel */}
      {selectedTrackingCode && (
        <div className="pt-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
            <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#c93b41] shrink-0" />
              <span>شاشة التتبع المباشر لأمر الطباعة:</span>{" "}
              <span className="font-mono text-[#c93b41]">{selectedTrackingCode}</span>
            </h3>
            <button
              type="button"
              onClick={() => setSelectedTrackingCode(null)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer self-start sm:self-auto"
            >
              إخفاء شاشة التتبع ✕
            </button>
          </div>
          <OrderTracker initialCode={selectedTrackingCode} />
        </div>
      )}
    </div>
  );
}
