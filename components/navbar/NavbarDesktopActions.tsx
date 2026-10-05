"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Building2, ShieldCheck, Image as ImageIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import CartNavButton from "@/components/cart/CartNavButton";
import AZLogo from "@/components/AZLogo";
import { trackEvent } from "@/lib/fpixel";
import { useAuth } from "@/context/AuthContext";

interface NavbarDesktopActionsProps {
  isAuthenticated: boolean;
  pathname: string;
  whatsappInstantPrintUrl: string;
}

export default function NavbarDesktopActions({
  isAuthenticated,
  pathname,
  whatsappInstantPrintUrl,
}: NavbarDesktopActionsProps) {
  const { user, isAdmin } = useAuth();
  return (
    <div className="hidden lg:flex items-center gap-2.5">
      {/* Official Agency Brand Link */}
      <a
        href="https://azagency.online"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#c93b41] dark:hover:text-white bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] px-3 py-2 rounded-full transition-all group"
        title="زيارة موقع وكالة A.Z Agency الرسمي"
      >
        <AZLogo className="w-4 h-3 text-[#c93b41] group-hover:scale-110 transition-transform" />
        <span>A.Z Agency</span>
        <ArrowLeft className="w-3 h-3 text-slate-400 group-hover:text-[#c93b41] group-hover:-translate-x-0.5 transition-transform" />
      </a>

      <ThemeToggle />
      <CartNavButton />

      {/* Auth / Accounts Navigation */}
      {isAuthenticated ? (
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] p-1 rounded-full">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
              pathname.startsWith("/dashboard")
                ? "bg-[#c93b41] text-white shadow-xs"
                : "text-slate-800 dark:text-slate-200 hover:text-[#c93b41]"
            }`}
            title="لوحة تحكم العميل والشركات"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{user?.username ? `@${user.username}` : "حسابي"}</span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                pathname.startsWith("/admin")
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "text-slate-700 dark:text-slate-300 hover:text-red-500"
              }`}
              title="لوحة تحكم إدارة الموقع (Admin Portal)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>لوحة الإدارة</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#c93b41] bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] px-3.5 py-2 rounded-full transition-all shadow-xs"
            title="تسجيل الدخول إلى حسابك"
          >
            <User className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>تسجيل الدخول</span>
          </Link>
        </div>
      )}

      {/* Direct WhatsApp CTA */}
      <a
        href={whatsappInstantPrintUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent("Contact", { method: "whatsapp_header_instant_print" });
        }}
        className="inline-flex items-center justify-center text-xs font-bold text-white rounded-full px-4 py-2.5 btn-crimson transition-all group shadow-md"
        title="تواصل معنا فوراً عبر واتساب"
      >
        <span className="flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-red-200 group-hover:text-white" />
          <span>اطبع صورتك فوراً</span>
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        </span>
      </a>
    </div>
  );
}
