"use client";

import React from "react";
import { Search } from "lucide-react";

interface PostsFilterBarProps {
  stats: any;
  activeStatusTab: string;
  setActiveStatusTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export default function PostsFilterBar({
  stats,
  activeStatusTab,
  setActiveStatusTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}: PostsFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
      {/* Status Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "كافة المقالات", count: stats.totalPosts },
          { id: "published", label: "المنشورة", count: stats.published },
          { id: "draft", label: "المسودات", count: stats.drafts },
          { id: "categories", label: "دليل التصنيفات", count: stats.categories?.length || 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveStatusTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeStatusTab === tab.id
                ? "bg-[#c93b41] text-white shadow-sm"
                : "bg-slate-100 dark:bg-[#1a1c20] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252830]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeStatusTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 dark:bg-white/10 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Category Filter */}
      {activeStatusTab !== "categories" && (
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#c93b41]"
          >
            <option value="all">كافة الأقسام والتصنيفات</option>
            {stats.categories?.map((c: any) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>

          <form onSubmit={onSearchSubmit} className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="بحث بالعنوان، الكاتب أو الرابط..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </form>
        </div>
      )}
    </div>
  );
}
