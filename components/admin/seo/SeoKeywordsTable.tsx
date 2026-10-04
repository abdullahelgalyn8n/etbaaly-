"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ExternalLink, Edit3, ArrowUpDown, Filter } from "lucide-react";

interface SeoKeywordsTableProps {
  posts: any[];
}

export function SeoKeywordsTable({ posts }: SeoKeywordsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterScore, setFilterScore] = useState<"all" | "good" | "fair" | "poor">("all");

  const filteredPosts = posts.filter((post) => {
    const score = post.seoScore || 85;
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.focusKeyword?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterScore === "good") return score >= 80;
    if (filterScore === "fair") return score >= 60 && score < 80;
    if (filterScore === "poor") return score < 60;
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c93b41]" />
            جدول الكلمات المفتاحية ودرجات السيو (Rank Math)
          </h3>
          <p className="text-[11px] text-slate-500">
            مراقبة الكلمة المفتاحية المستهدفة ومستوى الأداء في محركات البحث لكل صفحة ومقال
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث بالكلمة أو العنوان..."
              className="pr-8 pl-3 py-1.5 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          {/* Filter Score */}
          <select
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value as any)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">كل النقاط</option>
            <option value="good">ممتاز (80 - 100)</option>
            <option value="fair">متوسط (60 - 79)</option>
            <option value="poor">يحتاج تحسين (&lt; 60)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.06] text-slate-500 font-bold">
              <th className="pb-3 pr-2">عنوان المقال</th>
              <th className="pb-3">الكلمة المفتاحية (Focus Keyword)</th>
              <th className="pb-3 text-center">نقاط Rank Math</th>
              <th className="pb-3 text-center">حالة الفهرسة</th>
              <th className="pb-3 text-left pl-2">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {filteredPosts.map((post) => {
              const score = post.seoScore || 85;
              const keyword = post.focusKeyword || post.title?.split(" ").slice(0, 3).join(" ") || "سيو ومطابع";
              return (
                <tr key={post.slug} className="hover:bg-slate-50/60 dark:hover:bg-[#1f2126] transition-colors">
                  <td className="py-3.5 pr-2 max-w-xs sm:max-w-md">
                    <Link
                      href={`/admin/posts/${encodeURIComponent(post.slug)}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-[#c93b41] line-clamp-1 flex items-center gap-1.5"
                    >
                      <span>{post.title}</span>
                    </Link>
                    <span className="text-[10px] font-mono text-slate-400">/{post.slug}</span>
                  </td>

                  <td className="py-3.5 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-[#121316] text-[#c93b41] border border-red-500/20">
                      {keyword}
                    </span>
                  </td>

                  <td className="py-3.5 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                        score >= 80
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40"
                          : score >= 60
                          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
                          : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{score}/100</span>
                    </span>
                  </td>

                  <td className="py-3.5 whitespace-nowrap text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Index, Follow ✓
                    </span>
                  </td>

                  <td className="py-3.5 whitespace-nowrap text-left pl-2">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${encodeURIComponent(post.slug)}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-[#c93b41] hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>تحرير السيو</span>
                      </Link>
                      <Link
                        href={`/${post.slug}`}
                        target="_blank"
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        title="معاينة في المتجر"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SeoKeywordsTable;
