"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  Phone,
  MessageSquare,
  Building2,
  FileCheck,
  CheckCircle,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface NavItem {
  id: string;
  title: string;
}

interface LegalSidebarProps {
  navItems: NavItem[];
}

export default function LegalSidebar({ navItems }: LegalSidebarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Table of Contents */}
      <div className="rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <FileText className="w-4 h-4 text-[#c93b41]" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">فهرس البنود والمواد</h4>
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="w-full text-right px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#c93b41] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between group"
            >
              <span className="line-clamp-1">{item.title}</span>
              <span className="text-[10px] text-slate-400 group-hover:text-[#c93b41] font-mono">
                #{index + 1}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Egyptian Market Fast Facts & Ground Rules */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#1e2025] text-white border border-white/10 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-[#c93b41]" />
          <span>قواعد مصرية ملزمة وحاسمة</span>
        </div>

        <ul className="space-y-3 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
            <span>
              <strong>المادة 17 حماية المستهلك:</strong> البضائع المطبوعة خصيصاً لا ترد ولا تستبدل
              بعد بدء التشغيل.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
            <span>
              <strong>تفاوت ألوان الطباعة:</strong> شاشة الهاتف ليست مرجعاً؛ فارق CMYK المسموح به
              صناعياً حتى 10%.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
            <span>
              <strong>فيديو المعاينة خلال 48 ساعة:</strong> لا تقبل الشكاوى بدون فيديو فتح الطرد
              الأصلي (Unboxing).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
            <span>
              <strong>رسوم أرضيات التخزين:</strong> 14 يوماً مهلة استلام، وبعد 30 يوماً يتصرف المصنع
              بالبضاعة المهملة.
            </span>
          </li>
        </ul>
      </div>

      {/* B2B Contracts & Legal Contact */}
      <div className="rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <Building2 className="w-4 h-4 text-[#c93b41]" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">عقود وتوريدات الشركات</h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          للشركات والمصانع التي تتطلب عقود توريد سنوية مخصصة، أوامر توريد رسمية (L.P.O)، وفواتير
          إلكترونية معتمدة من مصلحة الضرائب المصرية:
        </p>

        <div className="space-y-2 pt-1">
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>التواصل مع الإدارة القانونية والتعاقدات</span>
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
