"use client";

import React, { useState } from "react";
import { Sliders, HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface AdminDashboardHeaderProps {
  showWelcomePanel: boolean;
  setShowWelcomePanel: (v: boolean) => void;
}

export default function AdminDashboardHeader({
  showWelcomePanel,
  setShowWelcomePanel,
}: AdminDashboardHeaderProps) {
  const [showScreenOptions, setShowScreenOptions] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            لوحة التحكم
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/30 text-[#c93b41] border border-red-200 dark:border-red-900/40">
            منصة إدارة ومطبعة إطبعلي
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setShowScreenOptions(!showScreenOptions);
              setShowHelp(false);
            }}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 shadow-xs flex items-center gap-1.5 cursor-pointer rounded-xl font-bold transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>خيارات الشاشة</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setShowHelp(!showHelp);
              setShowScreenOptions(false);
            }}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 shadow-xs flex items-center gap-1.5 cursor-pointer rounded-xl font-bold transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>المساعدة</span>
          </button>
        </div>
      </div>

      {/* Expandable Screen Options Drawer */}
      {showScreenOptions && (
        <div className="mt-3 p-5 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-md text-xs space-y-3 animate-fadeIn rounded-2xl">
          <div className="font-bold text-slate-900 dark:text-white">
            تخصيص عناصر لوحة التحكم المعروضة:
          </div>
          <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showWelcomePanel}
                onChange={(e) => setShowWelcomePanel(e.target.checked)}
                className="accent-[#c93b41]"
              />
              <span>شاشة الترحيب (Welcome Panel)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#c93b41]" />
              <span>لمحة سريعة (At a Glance)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#c93b41]" />
              <span>النشاط والأوامر الأخيرة (Activity)</span>
            </label>
          </div>
        </div>
      )}

      {/* Expandable Help Drawer */}
      {showHelp && (
        <div className="mt-3 p-5 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-md text-xs text-slate-600 dark:text-slate-300 space-y-2 animate-fadeIn rounded-2xl">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#c93b41]" />
            <span>دليل إدارة مطبعة ومنصة إطبعلي:</span>
          </div>
          <p className="leading-relaxed">
            توفر لوحة التحكم متابعة فورية لأوامر الطباعة والشحن الصادرة من المتجر وحاسبة التكاليف.
          </p>
        </div>
      )}
    </div>
  );
}
