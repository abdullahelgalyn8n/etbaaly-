"use client";

import React from "react";
import { BookOpen, CheckCircle2, Clock, FolderOpen } from "lucide-react";

interface PostsKpiCardsProps {
  stats: {
    totalPosts: number;
    published: number;
    drafts: number;
    scheduled: number;
    categories: any[];
  };
}

export default function PostsKpiCards({ stats }: PostsKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-[#c93b41] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.totalPosts}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            إجمالي المقالات
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.published}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            منشورة لايف (سيو)
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.drafts + stats.scheduled}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            مسودات ومجدولة
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 flex items-center justify-center shrink-0">
          <FolderOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {stats.categories?.length || 6}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            تصنيفات نشطة
          </div>
        </div>
      </div>
    </div>
  );
}
