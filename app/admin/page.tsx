"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Check } from "lucide-react";
import AdminWelcomePanel from "@/components/admin/dashboard/AdminWelcomePanel";
import AdminGlanceWidget from "@/components/admin/dashboard/AdminGlanceWidget";
import AdminActivityWidget from "@/components/admin/dashboard/AdminActivityWidget";
import AdminQuickDraftWidget from "@/components/admin/dashboard/AdminQuickDraftWidget";
import AdminSystemHealthWidget from "@/components/admin/dashboard/AdminSystemHealthWidget";
import AdminQuotesTable from "@/components/admin/dashboard/AdminQuotesTable";
import AdminClientsTable from "@/components/admin/dashboard/AdminClientsTable";
import AdminAccessRestricted from "@/components/admin/dashboard/AdminAccessRestricted";
import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminNotificationsWidget from "@/components/admin/dashboard/AdminNotificationsWidget";

function WPAdminDashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { isAuthenticated, isAdmin, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(tabParam || "dashboard");
  const [showWelcomePanel, setShowWelcomePanel] = useState(true);

  const [stats, setStats] = useState<any>({
    totalSales: 0,
    totalOrders: 0,
    activeOrders: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalProducts: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    } else {
      setActiveTab("dashboard");
    }
  }, [tabParam]);

  const fetchData = async () => {
    try {
      const [statsRes, prodRes, ordRes] = await Promise.all([
        fetch("/api/admin/stats", { credentials: "include" }).then((r) => r.json()).catch(() => null),
        fetch("/api/admin/products", { credentials: "include" }).then((r) => r.json()).catch(() => null),
        fetch("/api/admin/orders", { credentials: "include" }).then((r) => r.json()).catch(() => null),
      ]);

      if (statsRes?.success && statsRes.stats) setStats(statsRes.stats);
      if (prodRes?.success && prodRes.products) setProducts(prodRes.products);
      if (ordRes?.success && ordRes.orders) setOrders(ordRes.orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const statusLabels: Record<string, string> = {
        received: "تم استلام الطلب وتأكيد المواصفات",
        preflight: "الفحص الفني واعتماد البروفة (Preflight)",
        printing: "جاري الطباعة والسحب على الماكينات",
        finishing: "مرحلة التشطيب والسكينة والسلوفان (Finishing)",
        packaging: "فحص الجودة والتعبئة والتغليف (Packaging)",
        shipped: "مع مندوب التوصيل وفي الطريق للعميل",
        delivered: "تم التسليم بنجاح للعميل",
      };

      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          status: newStatus,
          statusLabel: statusLabels[newStatus] || newStatus,
        }),
      });

      if (res.ok) {
        setOrders(
          orders.map((o) =>
            o.id === orderId
              ? { ...o, status: newStatus, status_label: statusLabels[newStatus] }
              : o
          )
        );
        setStatusNotice(`تم تحديث حالة الطلب (${orderId}) إلى: ${statusLabels[newStatus] || newStatus}`);
        setTimeout(() => setStatusNotice(null), 4000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return <AdminAccessRestricted onLoginAsAdmin={() => switchRole("admin")} />;
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* 1. TOP TITLE & SCREEN OPTIONS / HELP TABS */}
      <AdminDashboardHeader
        showWelcomePanel={showWelcomePanel}
        setShowWelcomePanel={setShowWelcomePanel}
      />

      {/* Status Notice */}
      {statusNotice && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 shadow-xs rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5 font-bold">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{statusNotice}</span>
          </div>
          <button
            onClick={() => setStatusNotice(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. WELCOME PANEL */}
      {showWelcomePanel && <AdminWelcomePanel onClose={() => setShowWelcomePanel(false)} />}

      {/* SUB-TABS CONTENT */}
      {activeTab === "quotes" && <AdminQuotesTable onBack={() => setActiveTab("dashboard")} />}
      {activeTab === "clients" && <AdminClientsTable onBack={() => setActiveTab("dashboard")} />}

      {/* 3. WIDGETS GRID */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <AdminGlanceWidget
              stats={stats}
              productsCount={products.length}
              ordersCount={orders.length}
            />
            <AdminActivityWidget
              orders={orders}
              updatingOrderId={updatingOrderId}
              handleStatusChange={handleStatusChange}
            />
          </div>

          <div className="space-y-5">
            <AdminNotificationsWidget />
            <AdminQuickDraftWidget />
            <AdminSystemHealthWidget />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500 font-bold">
          جاري تحميل لوحة التحكم المركزية...
        </div>
      }
    >
      <WPAdminDashboardContent />
    </Suspense>
  );
}
