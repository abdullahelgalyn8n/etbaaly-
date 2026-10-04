"use client";

import React from "react";

interface StudioGeneralTabProps {
  title: string;
  setTitle: (v: string) => void;
  basePrice: number;
  setBasePrice: (v: number) => void;
  turnaround: string;
  setTurnaround: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}

export function StudioGeneralTab({
  title,
  setTitle,
  basePrice,
  setBasePrice,
  turnaround,
  setTurnaround,
  description,
  setDescription,
}: StudioGeneralTabProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 shadow-xl space-y-3.5">
      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">اسم المنتج:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">السعر الأساسي (ج.م):</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-mono font-bold"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">وقت التنفيذ:</label>
          <input
            type="text"
            value={turnaround}
            onChange={(e) => setTurnaround(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">وصف المنتج:</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs"
        />
      </div>
    </div>
  );
}
