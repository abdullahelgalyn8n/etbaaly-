"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Search,
  ExternalLink,
  Phone,
  MapPin,
  RefreshCw,
  Layers,
  FileCheck,
  PackageCheck,
  Filter,
  Eye,
  X,
} from "lucide-react";
import { PRINT_SHOP_STAGES } from "@/lib/constants/orderStages";

interface OrderItem {
  id: string;
  tracking_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_type: string;
  product_name: string;
  specs?: Record<string, any>;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  status_label?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_method?: string;
  estimated_delivery?: string;
  timeline?: any[];
  notes?: string;
  created_at?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStageFilter, setActiveStageFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const stageMeta = PRINT_SHOP_STAGES[newStatus];
    const statusLabel = stageMeta ? stageMeta.label : newStatus;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId, status: newStatus, statusLabel }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId || o.tracking_code === orderId
              ? { ...o, status: newStatus, status_label: statusLabel }
              : o
          )
        );
        if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.tracking_code === orderId)) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus, status_label: statusLabel } : null));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStageBadgeColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "preflight":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "printing":
        return "bg-red-500/10 text-[#c93b41] dark:text-red-400 border-red-500/30";
      case "finishing":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
      case "packaging":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30";
      case "shipped":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30";
      case "delivered":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30";
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesStage = activeStageFilter === "all" || ord.status === activeStageFilter;
      if (!matchesStage) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        ord.tracking_code.toLowerCase().includes(q) ||
        ord.customer_name.toLowerCase().includes(q) ||
        ord.customer_phone.includes(q) ||
        ord.product_name.toLowerCase().includes(q) ||
        (ord.shipping_city && ord.shipping_city.toLowerCase().includes(q))
      );
    });
  }, [orders, activeStageFilter, searchQuery]);

  // Stage counts for badges
  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    Object.keys(PRINT_SHOP_STAGES).forEach((k) => {
      counts[k] = orders.filter((o) => o.status === k).length;
    });
    return counts;
  }, [orders]);

  return (
    <div className="space-y-6 select-none">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#c93b41]" />
            أوامر الشغل وخطوط إنتاج المطبعة (Orders & Production)
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            إدارة كافة مراحل التصنيع السبعة: من استلام الطلب وفحص البروفة (Preflight) إلى الطباعة، التشطيب، والتسليم.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-[#c93b41] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#c93b41] ${loading ? "animate-spin" : ""}`} />
          <span>تحديث السجل</span>
        </button>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث برقم التتبع، اسم العميل، الهاتف، أو المنتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] shadow-xs"
          />
        </div>

        {/* 7 Lifecycle Stage Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveStageFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900"
            }`}
          >
            <span>كافة الأوامر</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100">
              {stageCounts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("received")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "received"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>1. تم الاستلام</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-900 dark:text-amber-100">
              {stageCounts.received || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("preflight")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "preflight"
                ? "bg-blue-500 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>2. فحص وبروفة</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-900 dark:text-blue-100">
              {stageCounts.preflight || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("printing")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "printing"
                ? "bg-[#c93b41] text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>3. سحب وطباعة</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500/20 text-white">
              {stageCounts.printing || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("finishing")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "finishing"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. تشطيب وسلوفان</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/20 text-purple-900 dark:text-purple-100">
              {stageCounts.finishing || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("packaging")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "packaging"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>5. فحص وتغليف</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/20 text-indigo-900 dark:text-indigo-100">
              {stageCounts.packaging || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("shipped")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "shipped"
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>6. مع المندوب</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-orange-500/20 text-orange-900 dark:text-orange-100">
              {stageCounts.shipped || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStageFilter("delivered")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeStageFilter === "delivered"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>7. تم التسليم</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-900 dark:text-emerald-100">
              {stageCounts.delivered || 0}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Orders Table */}
      <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl overflow-x-auto">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-xs font-medium flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-[#c93b41] border-t-transparent rounded-full animate-spin" />
            <span>جاري تحميل أوامر الشغل...</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs font-bold">
            لا توجد أوامر شغل تطابق معايير التصفية المحددة.
          </div>
        ) : (
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 font-bold">
                <th className="pb-3 pr-2">رقم التتبع</th>
                <th className="pb-3">العميل والهاتف</th>
                <th className="pb-3">المنتج والمواصفات</th>
                <th className="pb-3">الكمية والإجمالي</th>
                <th className="pb-3">المرحلة الحالية</th>
                <th className="pb-3 text-left pl-2">تحديث خط الإنتاج</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-[#191a1e] transition-colors">
                  {/* Tracking Code */}
                  <td className="py-4 pr-2 font-mono font-bold text-[#c93b41]">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/track/?code=${ord.tracking_code}`}
                        target="_blank"
                        className="hover:underline flex items-center gap-1"
                        title="فتح صفحة تتبع العميل المباشرة"
                      >
                        <span>{ord.tracking_code}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 hover:text-[#c93b41]" />
                      </Link>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="py-4 font-bold text-slate-900 dark:text-white">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="hover:text-[#c93b41] text-right cursor-pointer"
                    >
                      {ord.customer_name}
                    </button>
                    <span dir="ltr" className="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-medium block">
                      {ord.customer_phone}
                    </span>
                  </td>

                  {/* Product */}
                  <td className="py-4 font-medium text-slate-900 dark:text-white max-w-xs">
                    <div className="font-bold truncate">{ord.product_name}</div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                      {ord.shipping_city || "القاهرة"} • {ord.shipping_method || "توصيل قياسي"}
                    </span>
                  </td>

                  {/* Quantity & Total */}
                  <td className="py-4">
                    <div className="font-mono font-bold">{ord.quantity.toLocaleString()} قطعة</div>
                    <span className="text-xs font-mono font-black text-[#c93b41]">
                      {ord.total_price.toLocaleString()} ج.م
                    </span>
                  </td>

                  {/* Stage Badge */}
                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border inline-block ${getStageBadgeColor(
                        ord.status
                      )}`}
                    >
                      {ord.status_label || ord.status}
                    </span>
                  </td>

                  {/* Stage Dropdown (7 Stages) */}
                  <td className="py-4 text-left pl-2">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={ord.status}
                        disabled={updatingId === ord.id}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
                      >
                        <option value="received">1. تم الاستلام</option>
                        <option value="preflight">2. فحص وبروفة (Preflight)</option>
                        <option value="printing">3. جاري الطباعة والسحب</option>
                        <option value="finishing">4. التشطيب والسلوفان</option>
                        <option value="packaging">5. التعبئة وفحص الجودة</option>
                        <option value="shipped">6. مع مندوب التوصيل</option>
                        <option value="delivered">7. تم التسليم بنجاح</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 hover:text-[#c93b41] transition-colors cursor-pointer"
                        title="معاينة تفاصيل أمر الشغل"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 4. Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.1] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto select-none">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-[#c93b41] bg-red-500/10 px-2.5 py-1 rounded-xl border border-red-500/20">
                  {selectedOrder.tracking_code}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${getStageBadgeColor(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status_label || selectedOrder.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">اسم المنتج:</span>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  {selectedOrder.product_name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#151619] border border-slate-100 dark:border-white/[0.05]">
                <div>
                  <span className="text-slate-400 font-bold block">العميل:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedOrder.customer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">الهاتف:</span>
                  <span dir="ltr" className="font-mono font-bold text-slate-900 dark:text-white block">
                    {selectedOrder.customer_phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">الكمية:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedOrder.quantity.toLocaleString()} قطعة
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">الإجمالي:</span>
                  <span className="font-mono font-black text-[#c93b41]">
                    {selectedOrder.total_price.toLocaleString()} ج.م
                  </span>
                </div>
              </div>

              {selectedOrder.shipping_address && (
                <div>
                  <span className="text-slate-400 font-bold block">عنوان الشحن والتسليم:</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-medium">
                    {selectedOrder.shipping_city} - {selectedOrder.shipping_address}
                  </p>
                </div>
              )}

              {selectedOrder.specs && Object.keys(selectedOrder.specs).length > 0 && (
                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">مواصفات وتفاصيل أمر الشغل:</span>

                  {Array.isArray(selectedOrder.specs.items) && selectedOrder.specs.items.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 block">
                        منتجات السلة ({selectedOrder.specs.items.length}):
                      </span>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {selectedOrder.specs.items.map((it: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-100 dark:border-white/[0.05] text-[11px] space-y-1"
                          >
                            <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                              <span>{it.title}</span>
                              <span className="font-mono text-[#c93b41]">
                                {it.quantity} × {it.price} ج.م
                              </span>
                            </div>
                            {it.selectedColor && it.selectedColor !== "افتراضي" && (
                              <div className="text-slate-500 text-[10px]">اللون: {it.selectedColor}</div>
                            )}
                            {it.selectedOptions && (
                              <div className="text-slate-500 text-[10px]">
                                {Object.entries(it.selectedOptions)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(" | ")}
                              </div>
                            )}
                            {it.customNotes && (
                              <div className="text-slate-500 text-[10px] italic">{it.customNotes}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other metadata specs */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#151619] border border-slate-100 dark:border-white/[0.05] space-y-1 font-mono text-[11px]">
                    {Object.entries(selectedOrder.specs)
                      .filter(([k]) => k !== "items")
                      .map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-slate-500">{k}:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {typeof v === "object" ? JSON.stringify(v) : String(v)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <span className="text-slate-400 font-bold block">ملاحظات العميل:</span>
                  <p className="p-2.5 rounded-xl bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/20 text-xs">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Stage Update Inside Modal */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <label className="text-slate-400 font-bold block mb-1.5">تغيير مرحلة خط الإنتاج:</label>
                <select
                  value={selectedOrder.status}
                  disabled={updatingId === selectedOrder.id}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
                >
                  <option value="received">1. تم الاستلام</option>
                  <option value="preflight">2. فحص وبروفة (Preflight)</option>
                  <option value="printing">3. جاري الطباعة والسحب</option>
                  <option value="finishing">4. التشطيب والسكينة والسلوفان</option>
                  <option value="packaging">5. التعبئة وفحص الجودة</option>
                  <option value="shipped">6. مع مندوب التوصيل وفي الطريق</option>
                  <option value="delivered">7. تم التسليم بنجاح</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/track/?code=${selectedOrder.tracking_code}`}
                  target="_blank"
                  className="text-xs text-[#c93b41] hover:underline font-bold flex items-center gap-1"
                >
                  <span>فتح شاشة التتبع المباشرة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
