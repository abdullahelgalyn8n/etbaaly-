"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Package,
  Building2,
  FileText,
  ShieldCheck,
  Layers,
  ShieldAlert,
  Truck,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOrdersTab from "@/components/dashboard/DashboardOrdersTab";
import DashboardQuotesTab from "@/components/dashboard/DashboardQuotesTab";
import DashboardDesignsTab from "@/components/dashboard/DashboardDesignsTab";
import DashboardProfileTab from "@/components/dashboard/DashboardProfileTab";
import ShippingCalculator from "@/components/ShippingCalculator";
import InvoiceModal from "@/components/dashboard/InvoiceModal";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout, updateProfile, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "shipping" | "designs" | "profile">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrackingCode, setSelectedTrackingCode] = useState<string | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const targetUserId = isAdmin ? "all" : (user?.id || "usr-demo-01");
        const res = await fetch(`/api/orders?userId=${encodeURIComponent(targetUserId)}`);
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user?.id, isAdmin]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Admin Switcher Banner if user is Admin */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-red-950 via-[#261214] to-slate-900 border border-red-500/30 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-red-300">أنت مسجل بصلاحية المشرف العام (Site Admin)</div>
              <div className="text-xs text-slate-300">
                أنت الآن تشاهد المنصة كعميل (Client View). يمكنك التبديل للوحة تحكم إدارة الموقع في أي وقت.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>الذهاب لأدمن الموقع المركزية</span>
            </Link>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <DashboardHeader
        user={user}
        isAdmin={isAdmin}
        switchRole={() => switchRole("admin")}
        ordersCount={orders.length}
      />

      {/* Navigation Tabs for Client Portal */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "orders"
              ? "bg-[#c93b41] text-white shadow-md"
              : "bg-white dark:bg-[#1a1c22] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252830] border border-slate-200 dark:border-white/[0.08]"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>أوامر الطباعة والشحنات ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "quotes"
              ? "bg-[#c93b41] text-white shadow-md"
              : "bg-white dark:bg-[#1a1c22] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252830] border border-slate-200 dark:border-white/[0.08]"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>عروض الأسعار والمقايسات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "shipping"
              ? "bg-[#c93b41] text-white shadow-md"
              : "bg-white dark:bg-[#1a1c22] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252830] border border-slate-200 dark:border-white/[0.08]"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>حاسبة الشحن والتوصيل</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("designs")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "designs"
              ? "bg-[#c93b41] text-white shadow-md"
              : "bg-white dark:bg-[#1a1c22] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252830] border border-slate-200 dark:border-white/[0.08]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>التصاميم المحفوظة</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#c93b41] text-white shadow-md"
              : "bg-white dark:bg-[#1a1c22] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#252830] border border-slate-200 dark:border-white/[0.08]"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>الملف التجاري والضريبي</span>
        </button>
      </div>

      {/* TAB CONTENTS */}
      {activeTab === "orders" && (
        <DashboardOrdersTab
          orders={orders}
          loading={loading}
          selectedTrackingCode={selectedTrackingCode}
          setSelectedTrackingCode={setSelectedTrackingCode}
          setSelectedInvoiceOrder={setSelectedInvoiceOrder}
        />
      )}

      {activeTab === "quotes" && <DashboardQuotesTab />}

      {activeTab === "shipping" && (
        <div className="animate-fadeIn">
          <ShippingCalculator />
        </div>
      )}

      {activeTab === "designs" && <DashboardDesignsTab />}

      {activeTab === "profile" && (
        <DashboardProfileTab user={user} updateProfile={updateProfile} />
      )}

      {/* OFFICIAL VAT INVOICE PREVIEW MODAL */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
        user={user}
      />
    </div>
  );
}
