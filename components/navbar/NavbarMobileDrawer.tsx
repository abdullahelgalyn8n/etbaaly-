"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Building2, ShieldCheck, Image as ImageIcon, ShoppingBag } from "lucide-react";
import AZLogo from "@/components/AZLogo";
import { trackEvent } from "@/lib/fpixel";

interface NavLinkItem {
  name: string;
  href: string;
}

interface NavbarMobileDrawerProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  navLinks: NavLinkItem[];
  isAuthenticated: boolean;
  whatsappInstantPrintUrl: string;
}

export default function NavbarMobileDrawer({
  isOpen,
  setIsOpen,
  navLinks,
  isAuthenticated,
  whatsappInstantPrintUrl,
}: NavbarMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white dark:bg-[#151619] border-b border-slate-200 dark:border-white/[0.08] px-4 pt-4 pb-6 space-y-3 mt-2">
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1f2126]"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
        <a
          href="https://azagency.online"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#1a1c20] text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between group"
          title="زيارة موقع وكالة A.Z Agency الرئيسي"
        >
          <div className="flex items-center gap-2">
            <AZLogo className="w-4 h-3 text-[#c93b41]" />
            <span>موقع وكالة A.Z Agency الرسمي</span>
          </div>
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41] group-hover:-translate-x-1 transition-transform" />
        </a>

        {isAuthenticated ? (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#1a1c20] text-center text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#c93b41]" />
              <span>لوحة العميل</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-red-500/10 text-center text-xs font-bold text-[#c93b41] border border-red-500/20 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>أدمن الموقع</span>
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#1a1c20] text-center text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>تسجيل الدخول (عميل / أدمن)</span>
          </Link>
        )}

        <Link
          href="/cart"
          onClick={() => setIsOpen(false)}
          className="w-full py-2.5 px-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-xs font-bold text-[#c93b41] border border-red-200 dark:border-red-900/40 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#c93b41]" />
            <span>سلة المشتريات وإتمام الطلب</span>
          </div>
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        <a
          href={whatsappInstantPrintUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("Contact", { method: "whatsapp_header_instant_print_mobile" });
            setIsOpen(false);
          }}
          className="w-full py-3 rounded-xl btn-crimson text-white text-center text-xs font-bold flex items-center justify-center gap-2"
          title="تواصل معنا فوراً عبر واتساب"
        >
          <ImageIcon className="w-4 h-4" />
          <span>اطبع صورتك فوراً</span>
        </a>
      </div>
    </div>
  );
}
