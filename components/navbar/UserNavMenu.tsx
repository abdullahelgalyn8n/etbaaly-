"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  Package, 
  Settings, 
  SlidersHorizontal,
  FileText
} from "lucide-react";
import { useAuth, UserProfile } from "@/context/AuthContext";

interface UserNavMenuProps {
  user: UserProfile | null;
  isAdmin: boolean;
  pathname: string;
}

export default function UserNavMenu({ user, isAdmin, pathname }: UserNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const displayName = user?.full_name?.split(" ")[0] || user?.username || "حسابي";
  const userInitial = (user?.full_name || user?.username || "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1 pl-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xs ${
          isOpen
            ? "border-[#c93b41] ring-2 ring-[#c93b41]/20 bg-slate-100 dark:bg-[#202228]"
            : "border-slate-200 dark:border-white/[0.1] bg-slate-100/80 dark:bg-[#1a1c20] hover:bg-slate-200/70 dark:hover:bg-[#24272f]"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* User Avatar Circle */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shadow-xs ${
            isAdmin
              ? "bg-gradient-to-br from-red-600 to-[#c93b41]"
              : "bg-gradient-to-br from-blue-600 to-indigo-600"
          }`}
        >
          {userInitial}
        </div>

        {/* User Info Label */}
        <div className="flex items-center gap-1.5 text-right">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[110px] truncate">
            {displayName}
          </span>

          {isAdmin ? (
            <span className="flex items-center gap-0.5 text-[10px] font-black text-red-600 dark:text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-500/20">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>أدمن</span>
            </span>
          ) : (
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md border border-blue-500/20">
              عميل
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#c93b41]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-2xl py-2 z-50 text-right animate-fadeIn overflow-hidden">
          {/* Header with full info */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                {user?.full_name || "مستخدم مسجل"}
              </span>
              {isAdmin ? (
                <span className="text-[9px] font-bold text-white bg-[#c93b41] px-1.5 py-0.5 rounded-full">
                  مشرف المنصة
                </span>
              ) : (
                <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-white/[0.1] px-1.5 py-0.5 rounded-full">
                  حساب عميل
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate dir-ltr text-right">
              {user?.email || (user?.username ? `@${user.username}` : "")}
            </div>
            {user?.company_name && (
              <div className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1 font-medium">
                <Building2 className="w-3 h-3 text-[#c93b41]" />
                <span className="truncate">{user.company_name}</span>
              </div>
            )}
          </div>

          {/* Admin Dedicated Section */}
          {isAdmin && (
            <div className="py-1 border-b border-slate-100 dark:border-white/[0.08]">
              <div className="px-3 py-1 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                أدوات الإدارة والتحكم
              </div>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold transition-colors ${
                  pathname === "/admin"
                    ? "bg-red-50 dark:bg-red-950/30 text-[#c93b41]"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41]"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#c93b41]" />
                <span>لوحة التحكم المركزية (Admin)</span>
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41] transition-colors"
              >
                <Package className="w-4 h-4 text-slate-400" />
                <span>إدارة أوامر الشغل والإنتاج</span>
              </Link>
              <Link
                href="/admin/products"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span>إدارة كتالوج المنتجات والقوالب</span>
              </Link>
              <Link
                href="/admin/posts"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41] transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>إدارة مقالات المدونة</span>
              </Link>
            </div>
          )}

          {/* Client & Common Navigation */}
          <div className="py-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              مساحة الحساب
            </div>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold transition-colors ${
                pathname.startsWith("/dashboard")
                  ? "bg-slate-100 dark:bg-white/[0.08] text-[#c93b41]"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41]"
              }`}
            >
              <Building2 className="w-4 h-4 text-[#c93b41]" />
              <span>لوحة تحكم حسابي (Dashboard)</span>
            </Link>
            <Link
              href="/track"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41] transition-colors"
            >
              <Package className="w-4 h-4 text-slate-400" />
              <span>تتبع شحناتي وأوامر الطباعة</span>
            </Link>
            <Link
              href="/dashboard?tab=profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#c93b41] transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>بيانات الشركة والملف الشخصي</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer text-right"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>تسجيل الخروج من الحساب</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
