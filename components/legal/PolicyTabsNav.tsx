"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Shield, RotateCcw, BookOpen } from "lucide-react";

export default function PolicyTabsNav() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/terms/",
      label: "الشروط والأحكام وعقد التوريد",
      shortLabel: "الشروط والأحكام",
      icon: FileText,
      description: "اعتماد البروفات، ملكية التصاميم، والدفع",
    },
    {
      href: "/refund/",
      label: "سياسة الاسترجاع والإلغاء وتفاوت التشغيل",
      shortLabel: "الاسترجاع والإلغاء",
      icon: RotateCcw,
      description: "المادة 17 حماية المستهلك، الهالك، والألوان",
    },
    {
      href: "/privacy/",
      label: "سياسة الخصوصية وأمان البيانات",
      shortLabel: "الخصوصية وسرية الملفات",
      icon: Shield,
      description: "قانون 151 لسنة 2020، وسرية ملفات العميل",
    },
    {
      href: "/policy/",
      label: "المركز القانوني الشامل",
      shortLabel: "دليل السياسات الكامل",
      icon: BookOpen,
      description: "ملخص السياسات والبروتوكول الصناعي",
    },
  ];

  return (
    <div className="w-full print:hidden">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/policy/" && pathname?.startsWith(tab.href.replace(/\/$/, "")));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              prefetch={false}
              className={`flex-shrink-0 group flex flex-col p-4 rounded-2xl border transition-all duration-200 text-right ${
                isActive
                  ? "bg-white dark:bg-[#242424] border-[#c93b41] shadow-md shadow-[#c93b41]/5 ring-1 ring-[#c93b41]/40"
                  : "bg-white/60 dark:bg-[#1a1c20]/60 hover:bg-white dark:hover:bg-[#242424] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-[#c93b41] text-white"
                      : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-[#c93b41] group-hover:bg-[#c93b41]/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                {isActive && (
                  <span className="inline-block w-2 h-2 rounded-full bg-[#c93b41] animate-pulse" />
                )}
              </div>
              <span
                className={`text-sm font-bold block mb-1 ${
                  isActive ? "text-slate-950 dark:text-white" : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {tab.shortLabel}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight line-clamp-1">
                {tab.description}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
