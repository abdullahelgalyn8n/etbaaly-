"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

interface ProductsFilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  categories: string[];
  totalProductsCount: number;
}

export function ProductsFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  categories,
  totalProductsCount,
}: ProductsFilterBarProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="بحث بالاسم، التصنيف، أو الكود..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#1b1c20] border border-slate-200 dark:border-white/[0.08] focus:border-[#c93b41] focus:outline-none text-slate-900 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#1b1c20] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
            >
              <option value="all">كل التصنيفات ({totalProductsCount})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-[#1b1c20] p-1 border border-slate-200 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-white dark:bg-[#242424] text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            الكل
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "published"
                ? "bg-white dark:bg-[#242424] text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-500 hover:text-emerald-500"
            }`}
          >
            منشور
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "draft"
                ? "bg-white dark:bg-[#242424] text-amber-500 shadow-xs"
                : "text-slate-500 hover:text-amber-500"
            }`}
          >
            مسودة
          </button>
        </div>
      </div>
    </div>
  );
}
