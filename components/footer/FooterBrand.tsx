"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft, MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import BrandLogo from "@/components/BrandLogo";
import AZLogo from "@/components/AZLogo";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function FooterBrand() {
  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center group py-1"
          aria-label="إطبعلي - الصفحة الرئيسية"
          title="إطبعلي | Etbaaly"
        >
          <BrandLogo className="w-auto h-8 sm:h-9" />
          <span className="sr-only">إطبعلي | Etbaaly - حلول الطباعة والتغليف</span>
        </Link>
        <span className="text-slate-300 dark:text-white/20 hidden sm:inline">|</span>
        <a
          href="https://azagency.online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:text-[#c93b41] hover:border-[#c93b41]/40 transition-all shadow-xs group"
          title="زيارة موقع وكالة A.Z Agency الرئيسي"
        >
          <AZLogo className="w-3.5 h-2.5 text-[#c93b41] group-hover:scale-110 transition-transform" />
          <span>A.Z Agency</span>
          <ArrowUpLeft className="w-3 h-3 text-slate-400 group-hover:text-[#c93b41] transition-transform" />
        </a>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-md font-medium">
        منصة الطباعة والتغليف الذكية التابعة لـ A.Z Agency: طباعة أوفست تجارية، علب كرتون فاخرة، أكياس ورقية، ستيكرات داي-كت، ومطبوعات المعارض مع تتبع الشحنات وفحص الجودة اللحظي.
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-3 pt-2">
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#1877f2] dark:hover:bg-[#1877f2] hover:border-[#1877f2] transition-all shadow-sm"
          aria-label="Facebook Page"
        >
          <FacebookIcon className="w-4 h-4" />
        </a>

        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-pink-500 transition-all shadow-sm"
          aria-label="Instagram Account"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>

        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:border-emerald-600 transition-all shadow-sm"
          aria-label="WhatsApp Direct"
        >
          <MessageSquare className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
