"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { OrderData, demoSimulationOrders } from "./order-tracker/types";
import { TrackerSearchBar } from "./order-tracker/TrackerSearchBar";
import { TrackerTimeline } from "./order-tracker/TrackerTimeline";
import { TrackerOrderDetails } from "./order-tracker/TrackerOrderDetails";
import { TrackerErrorBanners } from "./order-tracker/TrackerErrorBanners";
import { TrackerAccessBadges } from "./order-tracker/TrackerAccessBadges";
import { useAuth } from "@/context/AuthContext";

export default function OrderTracker({ initialCode = "" }: { initialCode?: string }) {
  const searchParams = useSearchParams();
  const queryCode = searchParams ? searchParams.get("code") : null;

  const { user, isAuthenticated, isAdmin, openAuthModal } = useAuth();

  const [searchCode, setSearchCode] = useState<string>(queryCode || initialCode || "");
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{
    type: "requireAuth" | "forbidden" | "notFound" | "error";
    message: string;
  } | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [userOrders, setUserOrders] = useState<OrderData[]>([]);
  const [authorizedAs, setAuthorizedAs] = useState<"owner" | "admin" | "demo" | null>(null);

  // Fetch logged in user's active orders for quick 1-click tracking
  useEffect(() => {
    async function loadUserOrders() {
      if (!isAuthenticated) {
        setUserOrders([]);
        return;
      }
      try {
        const targetUserId = isAdmin ? "all" : (user?.id || "");
        const res = await fetch(`/api/orders?userId=${encodeURIComponent(targetUserId)}`);
        const data = await res.json();
        if (data.success && data.orders) {
          setUserOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load user orders:", err);
      }
    }
    loadUserOrders();
  }, [isAuthenticated, isAdmin, user?.id]);

  const fetchTracking = useCallback(
    async (codeToSearch: string, forceDemo = false) => {
      const trimmedCode = codeToSearch.trim();
      if (!trimmedCode) {
        setErrorInfo({
          type: "error",
          message: "يرجى كتابة رقم التتبع أولاً أو اختيار أحد النماذج التجريبية.",
        });
        setOrder(null);
        return;
      }

      setLoading(true);
      setErrorInfo(null);
      setAuthorizedAs(null);

      // 1. If it's a known demo code or forceDemo is true, directly show demo simulation
      const normalized = trimmedCode.toUpperCase();
      if (forceDemo || demoSimulationOrders[normalized]) {
        const demoOrder = demoSimulationOrders[normalized] || demoSimulationOrders["DEMO-BOX"];
        setOrder(demoOrder);
        setAuthorizedAs("demo");
        setLoading(false);
        return;
      }

      // 2. Query the secure backend API with user session credentials
      try {
        const params = new URLSearchParams({
          code: trimmedCode,
          userId: user?.id || "",
          userEmail: user?.email || "",
          userPhone: user?.phone || "",
          isAdmin: isAdmin ? "true" : "false",
        });

        const res = await fetch(`/api/orders/track?${params.toString()}`);
        const data = await res.json();

        if (res.status === 401 || data.requireAuth) {
          setErrorInfo({
            type: "requireAuth",
            message:
              data.error ||
              "لتتبع أوامر الشغل الحقيقية وحماية سرية بيانات الشحن، يرجى تسجيل الدخول إلى حسابك.",
          });
          setOrder(null);
        } else if (res.status === 403 || data.forbidden) {
          setErrorInfo({
            type: "forbidden",
            message:
              data.error ||
              "هذا الطلب غير مرتبط بحسابك المسجل. لا يمكنك استعراض أو تتبع بيانات طلبات العملاء الآخرين لأسباب تتعلق بالخصوصية والأمان.",
          });
          setOrder(null);
        } else if (res.status === 404 || data.notFound) {
          setErrorInfo({
            type: "notFound",
            message:
              data.error ||
              "لم يتم العثور على أمر طباعة بهذا الرقم. يرجى التأكد من الكود المكتوب في الإيصال أو رسالة الواتساب.",
          });
          setOrder(null);
        } else if (data.success && data.order) {
          setOrder(data.order);
          setAuthorizedAs(data.isDemo ? "demo" : data.authorizedAs || "owner");
          setErrorInfo(null);
        } else {
          setErrorInfo({
            type: "error",
            message: data.error || "حدث خطأ غير متوقع أثناء معالجة الطلب.",
          });
          setOrder(null);
        }
      } catch (err) {
        console.error("Tracking request error:", err);
        setErrorInfo({
          type: "error",
          message: "تعذر الاتصال بالخادم، يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.",
        });
        setOrder(null);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, user?.email, user?.phone, isAdmin]
  );

  // Initial load
  useEffect(() => {
    const code = queryCode || initialCode;
    if (code) {
      setSearchCode(code);
      fetchTracking(code);
    } else if (!isAuthenticated) {
      // For first-time visitors without a code, show the Demo Box simulation by default
      setSearchCode("DEMO-BOX");
      setOrder(demoSimulationOrders["DEMO-BOX"]);
      setAuthorizedAs("demo");
    }
  }, [queryCode, initialCode, isAuthenticated, fetchTracking]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Search & Action Bar */}
      <TrackerSearchBar
        searchCode={searchCode}
        setSearchCode={setSearchCode}
        loading={loading}
        onSearch={fetchTracking}
        userOrders={userOrders}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        user={user}
        onOpenLogin={() => openAuthModal("login")}
      />

      {/* Error / Auth Required / Forbidden Banners */}
      <TrackerErrorBanners
        errorInfo={errorInfo}
        onOpenLogin={() => openAuthModal("login")}
        onSwitchToDemo={() => {
          setSearchCode("DEMO-BOX");
          fetchTracking("DEMO-BOX", true);
        }}
      />

      {/* Render Order Details and Timeline when successfully loaded */}
      {order && (
        <div className="space-y-6 animate-fadeIn">
          {/* Demo / Admin Access Badges */}
          <TrackerAccessBadges
            authorizedAs={authorizedAs}
            order={order}
            isAuthenticated={isAuthenticated}
            onOpenLogin={() => openAuthModal("login")}
          />

          {/* Stepper Timeline */}
          <TrackerTimeline order={order} />

          {/* Specs and Delivery Details */}
          <TrackerOrderDetails order={order} />
        </div>
      )}
    </div>
  );
}
