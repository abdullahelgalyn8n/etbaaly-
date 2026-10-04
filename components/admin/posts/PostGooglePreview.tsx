"use client";

import React from "react";
import { Search } from "lucide-react";

interface PostGooglePreviewProps {
  slug: string;
  title: string;
  excerpt: string;
}

export function PostGooglePreview({ slug, title, excerpt }: PostGooglePreviewProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 shadow-sm space-y-3">
      <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-white/[0.06]">
        <Search className="w-3.5 h-3.5 text-blue-500" />
        <span>معاينة نتيجة بحث جوجل (SEO Preview)</span>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-[#1a1c20] border border-slate-100 dark:border-white/[0.05] rounded-xl text-xs space-y-1">
        <div className="text-[10px] text-slate-400 font-mono">
          https://etbaaly.com/{slug || "post-url"}
        </div>
        <div className="text-blue-600 dark:text-blue-400 font-bold text-xs line-clamp-1">
          {title || "عنوان المقال كما يظهر في نتائج البحث"} | إطبعلي
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {excerpt || "المقتطف التسويقي الذي يصف المقال بدقة لمحركات البحث ونماذج الذكاء الاصطناعي."}
        </div>
      </div>
    </div>
  );
}
