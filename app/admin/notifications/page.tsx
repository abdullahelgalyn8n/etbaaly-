"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Trash2,
  Volume2,
  VolumeX,
  RotateCw,
  ShoppingBag,
  FileText,
  Sparkles,
  Package,
  Activity,
  Search,
  Filter,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  ArrowRight,
  Copy,
  Check,
  Phone,
  Tag,
  Clock,
  ChevronDown,
  Layers,
  HelpCircle,
} from "lucide-react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { AdminNotification, NotificationType, NotificationPriority } from "@/lib/db/types";
import { formatRelativeArabicTime } from "@/components/admin/notifications/notificationUtils";

export default function AdminNotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    isRefreshing,
    audioEnabled,
    browserNotificationsEnabled,
    toggleAudio,
    requestBrowserPermission,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    triggerTestNotification,
    refresh,
  } = useAdminNotifications();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "unread" | "read">("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = unreadCount;
    const orders = notifications.filter((n) => n.type === "order").length;
    const quotes = notifications.filter(
      (n) => n.type === "quote" || n.type === "sample"
    ).length;
    return { total, unread, orders, quotes };
  }, [notifications, unreadCount]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = notif.title.toLowerCase().includes(query);
        const matchesMsg = notif.message.toLowerCase().includes(query);
        const matchesMeta = notif.metadata
          ? JSON.stringify(notif.metadata).toLowerCase().includes(query)
          : false;
        if (!matchesTitle && !matchesMsg && !matchesMeta) return false;
      }

      // Type
      if (selectedType !== "all" && notif.type !== selectedType) {
        return false;
      }

      // Read status
      if (selectedStatus === "unread" && notif.read) return false;
      if (selectedStatus === "read" && !notif.read) return false;

      // Priority
      if (selectedPriority !== "all" && notif.priority !== selectedPriority) {
        return false;
      }

      return true;
    });
  }, [notifications, searchQuery, selectedType, selectedStatus, selectedPriority]);

  const toggleSelectId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllFiltered = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  const handleBulkMarkRead = async () => {
    for (const id of selectedIds) {
      await markAsRead(id, true);
    }
    setSelectedIds([]);
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`هل أنت متأكد من حذف ${selectedIds.length} إشعار؟`)) return;
    for (const id of selectedIds) {
      await deleteNotification(id);
    }
    setSelectedIds([]);
  };

  const handleClearAll = async () => {
    if (
      !window.confirm(
        "تحذير: هل أنت متأكد من مسح كافة الإشعارات في النظام بالكامل؟ لا يمكن التراجع عن هذه الخطوة."
      )
    ) {
      return;
    }
    setIsClearingAll(true);
    await clearAll();
    setIsClearingAll(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2500);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "quote":
        return <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "customization":
        return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case "sample":
        return <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "system":
      default:
        return <Activity className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    }
  };

  const getCategoryColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40";
      case "quote":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/40";
      case "customization":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/40";
      case "sample":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/40";
      case "system":
      default:
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/40";
    }
  };

  const getPriorityBadge = (priority: NotificationPriority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            عاجل جداً
          </span>
        );
      case "high":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            أولوية مرتفعة
          </span>
        );
      case "medium":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            متوسطة
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400">
            عادية
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-xs pb-20">
      {/* 1. BREADCRUMBS & TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#22242a] p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-1.5">
            <Link href="/admin" className="hover:text-[#c93b41] font-bold transition-colors">
              لوحة التحكم
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              مركز التنبيهات المباشرة
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c93b41] to-[#ba3239] flex items-center justify-center text-white shadow-md shadow-red-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <span>مركز الإشعارات والتشغيل</span>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-[#c93b41] text-white shadow-sm shadow-red-500/30">
                    {unreadCount} جديد
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  مزامنة حية لحظية كل 20 ثانية
                </span>
                <span>•</span>
                <span>التحكم المركزي في طلبات المتجر وعروض الأسعار</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="relative flex flex-wrap items-center gap-2 self-start md:self-center">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border font-bold transition-all cursor-pointer shadow-xs ${
              audioEnabled
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-slate-50 dark:bg-[#1a1c20] border-slate-200 dark:border-white/10 text-slate-500"
            }`}
            title="تفعيل / كتم صوت التنبيهات"
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>الصوت مفعّل</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>الصوت مكتوم</span>
              </>
            )}
          </button>

          {/* Browser Desktop Push Notification */}
          {!browserNotificationsEnabled && (
            <button
              type="button"
              onClick={requestBrowserPermission}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-all cursor-pointer shadow-xs"
              title="تفعيل إشعارات سطح المكتب"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>إشعارات المتصفح</span>
            </button>
          )}

          {/* Simulate Test Notification */}
          <button
            type="button"
            onClick={() => triggerTestNotification()}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#c93b41] hover:bg-[#ba3239] text-white font-bold transition-all cursor-pointer shadow-md shadow-red-500/25"
            title="إرسال إشعار تجريبي لاختبار الصوت والتنبيه"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إشعار تجريبي 🔔</span>
          </button>

          {/* Mark All Read */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllAsRead()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-[#18191c] border border-slate-200 dark:border-white/10 hover:border-emerald-500 text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer shadow-xs"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>قراءة الكل</span>
            </button>
          )}

          {/* Clear All */}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isClearingAll}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="مسح جميع الإشعارات"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. STATS KPI CARDS (Interactive: Clicking filters list) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: All */}
        <button
          type="button"
          onClick={() => {
            setSelectedType("all");
            setSelectedStatus("all");
          }}
          className={`p-4 rounded-3xl border transition-all text-right cursor-pointer group relative overflow-hidden ${
            selectedType === "all" && selectedStatus === "all"
              ? "bg-white dark:bg-[#22242a] border-[#c93b41] ring-2 ring-[#c93b41]/20 shadow-md"
              : "bg-white dark:bg-[#22242a] border-slate-200/80 dark:border-white/10 hover:border-[#c93b41]/40 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-xs">
              إجمالي التنبيهات
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-2">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            سجل كافة العمليات المسجلة
          </div>
        </button>

        {/* Card 2: Unread */}
        <button
          type="button"
          onClick={() => {
            setSelectedStatus("unread");
            setSelectedType("all");
          }}
          className={`p-4 rounded-3xl border transition-all text-right cursor-pointer group relative overflow-hidden ${
            selectedStatus === "unread"
              ? "bg-white dark:bg-[#22242a] border-[#c93b41] ring-2 ring-[#c93b41]/20 shadow-md"
              : "bg-white dark:bg-[#22242a] border-slate-200/80 dark:border-white/10 hover:border-[#c93b41]/40 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-xs">
              بانتظار الإجراء
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-[#c93b41] relative">
              <AlertTriangle className="w-4 h-4" />
              {stats.unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#c93b41] animate-ping" />
              )}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#c93b41] mt-2">
            {stats.unread}
          </div>
          <div className="text-[11px] text-red-500/80 font-bold mt-1">
            تنبيهات غير مقروءة حالياً
          </div>
        </button>

        {/* Card 3: Orders */}
        <button
          type="button"
          onClick={() => {
            setSelectedType("order");
            setSelectedStatus("all");
          }}
          className={`p-4 rounded-3xl border transition-all text-right cursor-pointer group relative overflow-hidden ${
            selectedType === "order"
              ? "bg-white dark:bg-[#22242a] border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
              : "bg-white dark:bg-[#22242a] border-slate-200/80 dark:border-white/10 hover:border-emerald-500/40 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-xs">
              أوامر الشغل والطباعة
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {stats.orders}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            طلبات الشراء المؤكدة
          </div>
        </button>

        {/* Card 4: Quotes / Samples */}
        <button
          type="button"
          onClick={() => {
            setSelectedType("quote");
            setSelectedStatus("all");
          }}
          className={`p-4 rounded-3xl border transition-all text-right cursor-pointer group relative overflow-hidden ${
            selectedType === "quote"
              ? "bg-white dark:bg-[#22242a] border-amber-500 ring-2 ring-amber-500/20 shadow-md"
              : "bg-white dark:bg-[#22242a] border-slate-200/80 dark:border-white/10 hover:border-amber-500/40 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-500 dark:text-slate-400 text-xs">
              عروض أسعار B2B وعينات
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 mt-2">
            {stats.quotes}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            مقايسات الشركات والبوكسات
          </div>
        </button>
      </div>

      {/* 3. SEARCH & ADVANCED FILTERS TOOLBAR */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#22242a] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث في نص الإشعار، كود الطلب (مثل ETB-8841)، اسم العميل، أو رقم الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-10 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Select Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e: any) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer focus:outline-none focus:border-[#c93b41]"
            >
              <option value="all">كل الحالات (مقروء وغير مقروء)</option>
              <option value="unread">غير المقروء فقط ({unreadCount})</option>
              <option value="read">المقروء فقط</option>
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer focus:outline-none focus:border-[#c93b41]"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="order">أوامر الشغل والطباعة 🛍️</option>
              <option value="quote">مقايسات B2B 📄</option>
              <option value="customization">تخصيصات ثلاثية الأبعاد 🎨</option>
              <option value="sample">عينات خامات 📦</option>
              <option value="system">تنبيهات النظام والمعدات ⚙️</option>
            </select>

            {/* Priority */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer focus:outline-none focus:border-[#c93b41]"
            >
              <option value="all">كل درجات الأولوية</option>
              <option value="urgent">عاجل جداً 🔥</option>
              <option value="high">أولوية مرتفعة ⚡</option>
              <option value="medium">متوسطة</option>
              <option value="low">عادية</option>
            </select>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => refresh()}
              disabled={isRefreshing}
              className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer ${
                isRefreshing ? "animate-spin text-[#c93b41]" : ""
              }`}
              title="تحديث القائمة"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. NOTIFICATIONS CARDS LIST */}
      <div className="bg-white dark:bg-[#22242a] border border-slate-200/80 dark:border-white/10 rounded-3xl shadow-xs overflow-hidden">
        {/* List Header */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-white/[0.02] flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                filteredNotifications.length > 0 &&
                selectedIds.length === filteredNotifications.length
              }
              onChange={selectAllFiltered}
              className="accent-[#c93b41] w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-sm">
              التنبيهات المعروضة ({filteredNotifications.length})
            </span>
          </div>

          {copiedText && (
            <div className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-[11px] animate-fadeIn">
              تم نسخ {copiedText} بنجاح!
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-400">
            <RotateCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#c93b41]" />
            <p className="font-bold text-sm">جاري جلب مركز الإشعارات...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                جرب تغيير خيارات التصفية أو مسح عبارة البحث، أو اضغط زر التجربة لمحاكاة طلب شراء فوري.
              </p>
            </div>
            <button
              type="button"
              onClick={() => triggerTestNotification()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#c93b41] text-white font-bold hover:bg-[#ba3239] transition-all cursor-pointer shadow-md shadow-red-500/25 text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إرسال إشعار تجريبي الآن</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredNotifications.map((notif) => {
              const isSelected = selectedIds.includes(notif.id);
              return (
                <div
                  key={notif.id}
                  className={`p-4 sm:p-5 transition-all relative flex flex-col sm:flex-row items-start gap-4 ${
                    !notif.read
                      ? "bg-red-50/25 dark:bg-red-950/15 border-r-4 border-r-[#c93b41]"
                      : "bg-white dark:bg-transparent hover:bg-slate-50/70 dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectId(notif.id)}
                      className="accent-[#c93b41] w-4 h-4 rounded cursor-pointer"
                    />

                    {/* Category Icon */}
                    <div
                      className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${getCategoryColor(
                        notif.type
                      )}`}
                    >
                      {getNotificationIcon(notif.type)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-slate-900 dark:text-white text-sm">
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#c93b41]" />
                        )}
                        {getPriorityBadge(notif.priority)}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatRelativeArabicTime(notif.createdAt)}</span>
                        <span>•</span>
                        <span className="font-mono">
                          {new Date(notif.createdAt).toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mt-2 text-xs leading-relaxed">
                      {notif.message}
                    </p>

                    {/* Metadata Badges */}
                    {notif.metadata && Object.keys(notif.metadata).length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
                        {notif.metadata.trackingCode && (
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(notif.metadata?.trackingCode, "كود التتبع")
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#18191c] hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 font-mono text-[11px] font-bold text-[#c93b41] transition-colors cursor-pointer"
                            title="انقر لنسخ كود التتبع"
                          >
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>كود: {notif.metadata.trackingCode}</span>
                          </button>
                        )}

                        {notif.metadata.amount && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold font-mono text-[11px]">
                            {Number(notif.metadata.amount).toLocaleString()} ج.م
                          </span>
                        )}

                        {notif.metadata.customer && (
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                            العميل: {notif.metadata.customer}
                          </span>
                        )}

                        {notif.metadata.phone && (
                          <a
                            href={`tel:${notif.metadata.phone}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-white/5 hover:text-[#c93b41] text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{notif.metadata.phone}</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 text-xs">
                      <div className="flex items-center gap-3">
                        {notif.link && (
                          <Link
                            href={notif.link}
                            onClick={() => markAsRead(notif.id, true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-[#c93b41] font-black transition-colors"
                          >
                            <span>متابعة تفاصيل الأمر</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => markAsRead(notif.id, !notif.read)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer transition-colors"
                        >
                          {notif.read ? "تحديد كغير مقروء" : "تحديد كمقروء ✓"}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteNotification(notif.id)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 font-medium transition-colors cursor-pointer"
                        title="حذف هذا الإشعار"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. FLOATING BULK ACTIONS DOCK (When items are selected) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center animate-slideUp">
          <div className="bg-slate-900/95 dark:bg-[#18191c]/95 backdrop-blur-xl border border-white/10 text-white px-5 py-3 rounded-3xl shadow-2xl flex items-center gap-4">
            <span className="font-bold text-xs">
              تم تحديد <span className="text-[#c93b41] font-mono">{selectedIds.length}</span> إشعار
            </span>
            <div className="h-4 w-px bg-white/20" />
            <button
              type="button"
              onClick={handleBulkMarkRead}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              تحديد كمقروء
            </button>
            <button
              type="button"
              onClick={handleBulkDelete}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              حذف المحدد
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              إلغاء التحديد
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
