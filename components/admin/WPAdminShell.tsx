"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminTopBar } from "./shell/AdminTopBar";
import { AdminSidebar } from "./shell/AdminSidebar";
import { AdminNotificationProvider } from "@/context/AdminNotificationContext";
import { NotificationToast } from "./notifications/NotificationToast";

export default function WPAdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeOrdersCount, setActiveOrdersCount] = useState(3);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.replace(`/login/?redirect=${encodeURIComponent(pathname || "/admin/")}`);
    }
  }, [isLoading, isAuthenticated, isAdmin, pathname, router]);

  useEffect(() => {
    if (!isAdmin) return;
    // Load active orders count for the WooCommerce-style badge
    fetch("/api/admin/stats/")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.stats?.activeOrders !== undefined) {
          setActiveOrdersCount(data.stats.activeOrders);
        }
      })
      .catch(() => {});
  }, [isAdmin]);

  if (isLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-[#1d1d1d] gap-3">
        <div className="w-8 h-8 border-3 border-[#c93b41] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-500">جاري التحقق والتوجيه لصفحة تسجيل الدخول...</span>
      </div>
    );
  }

  // If viewing the Visual Product Configurator Studio, render standalone fullscreen
  const isFullscreenStudio =
    pathname?.startsWith("/admin/products/configurator") ||
    pathname?.includes("/studio");

  if (isFullscreenStudio) {
    return <>{children}</>;
  }

  return (
    <AdminNotificationProvider>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#1d1d1d] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
        {/* 1. TOP WP ADMIN BAR */}
        <AdminTopBar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          user={user}
          logout={logout}
        />

        {/* 2. BODY WITH WP-STYLE SIDEBAR + MAIN WORKSPACE */}
        <div className="flex-1 flex relative">
          <AdminSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            activeOrdersCount={activeOrdersCount}
          />

          {/* Backdrop for mobile */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}

          {/* 3. MAIN WP CONTENT WORKSPACE */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
            {children}
          </main>
        </div>

        {/* Live Notification Toast Banner */}
        <NotificationToast />
      </div>
    </AdminNotificationProvider>
  );
}
