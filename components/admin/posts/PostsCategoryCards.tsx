"use client";

import React from "react";
import { FolderOpen, ArrowRight } from "lucide-react";

interface PostsCategoryCardsProps {
  categories: Array<{ name: string; count: number }>;
  onSelectCategory: (name: string) => void;
}

export default function PostsCategoryCards({
  categories,
  onSelectCategory,
}: PostsCategoryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fadeIn">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-5 rounded-2xl shadow-xs space-y-3 hover:border-[#c93b41]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-[#c93b41] flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-[#1a1c20] text-slate-700 dark:text-slate-300">
              {cat.count} مقال
            </span>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              مقالات ودراسات الحالة المتخصصة في {cat.name} لتحسين السيو وتجربة العميل.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06]">
            <button
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className="text-xs text-[#c93b41] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>استعراض مقالات القسم</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
