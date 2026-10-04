"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  PlusCircle,
  BookOpen,
  Layers,
  Palette,
  Printer,
  Sparkles,
  Building2,
  ExternalLink,
  User,
  LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { NotificationBellDropdown } from "../notifications/NotificationBellDropdown";

interface AdminTopBarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  user: { full_name?: string } | null;
  logout: () => void;
}

export function AdminTopBar({
  isMobileOpen,
  setIsMobileOpen,
  user,
  logout,
}: AdminTopBarProps) {
  const [showNewDropdown, setShowNewDropdown] = useState(false);

  return (
    <header className="h-12 bg-white/95 dark:bg-[#18191c]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] sticky top-0 z-50 flex items-center justify-between px-3 sm:px-5 text-xs select-none shadow-xs">
      {/* Right Section (Branding, Visit Site, Quick + New, Preview as Client) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Sidebar Hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Etbaaly Brand Monogram & Name */}
        <Link
          href="/admin"
          className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors group"
          title="لوحة تحكم إطبعلي المركزية"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#e04b4f] to-[#ba3239] flex items-center justify-center text-white font-black text-xs shadow-xs group-hover:scale-105 transition-transform">
            إ
          </div>
          <span className="font-black text-slate-900 dark:text-white text-sm hidden sm:inline tracking-tight">
            إطبعلي <span className="text-[10px] text-[#c93b41] font-bold">Admin</span>
          </span>
        </Link>

        {/* Visit Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors text-xs font-bold"
          title="زيارة المتجر في تبويب جديد"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">زيارة الموقع</span>
        </Link>

        {/* Quick + New Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNewDropdown(!showNewDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors text-xs font-bold cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>جديد</span>
          </button>

          {showNewDropdown && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-xl py-1.5 text-xs z-50 text-slate-700 dark:text-slate-300 animate-fadeIn overflow-hidden"
              onMouseLeave={() => setShowNewDropdown(false)}
            >
              <Link
                href="/admin/posts/new"
                onClick={() => setShowNewDropdown(false)}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#c93b41] transition-colors font-medium"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>مقال جديد في المدونة 📝</span>
              </Link>
              <Link
                href="/admin/products/new"
                onClick={() => setShowNewDropdown(false)}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#c93b41] transition-colors font-medium"
              >
                <Palette className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>منتج موك اب وقالب جديد</span>
              </Link>
              <Link
                href="/admin/products/configurator/"
                onClick={() => setShowNewDropdown(false)}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#c93b41] transition-colors font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>استوديو المهيئ التفاعلي الجديد ✨</span>
              </Link>
              <Link
                href="/#calculator"
                target="_blank"
                onClick={() => setShowNewDropdown(false)}
                className="flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-[#c93b41] transition-colors font-medium"
              >
                <Printer className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>أمر شغل وطباعة جديد</span>
              </Link>
            </div>
          )}
        </div>

        {/* Switch to Client View */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/30 text-[#c93b41] hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/40 rounded-full transition-all text-xs font-bold"
          title="الانتقال إلى بوابة العميل"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">معاينة كعميل (بوابة الشركات)</span>
        </Link>
      </div>

      {/* Left Section (Theme Toggle, Notifications Bell, User Profile & Logout) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time Notifications Bell */}
        <NotificationBellDropdown />

        <ThemeToggle />

        {/* User Profile Info */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#252830] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-slate-900 dark:text-white font-bold leading-none">
              {user?.full_name ? user.full_name.split(" ")[0] : "المدير العام"}
            </div>
            <span className="text-[10px] text-slate-400">مشرف النظام</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1 text-slate-500 hover:text-[#c93b41] hover:bg-red-50 dark:hover:bg-red-950/30 p-1.5 sm:px-2.5 sm:py-1 rounded-xl transition-colors text-xs font-bold cursor-pointer"
          title="تسجيل الخروج"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">خروج</span>
        </button>
      </div>
    </header>
  );
}
