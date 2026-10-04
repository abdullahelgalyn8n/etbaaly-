"use client";

import React from "react";
import { Image as ImageIcon, HardDrive, Cloud, Plus } from "lucide-react";

interface MediaHeaderStatsProps {
  stats: { total: number; local: number; cloud: number };
  onOpenAddModal: () => void;
}

export function MediaHeaderStats({ stats, onOpenAddModal }: MediaHeaderStatsProps) {
  return (
    <div className="space-y-6">
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-[#c93b41]" />
            <span>معرض الوسائط ومفتش الميتا (Media SEO Inspector)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            إدارة صور الموقع والمنتجات والمقالات، معرفة نوع الاستضافة (محلي / سحابي R2 / داتا بيز) وتعديل Alt Text و Schema.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#c93b41] hover:bg-[#b03036] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة رابط / صورة جديدة</span>
          </button>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block mb-1">إجمالي الوسائط المسجلة</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block mb-1">ملفات داخل الكود (Local Assets)</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.local}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold block mb-1">مخزنة سحابياً / داتا بيز (Cloud R2)</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.cloud}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
