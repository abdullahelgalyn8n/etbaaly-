"use client";

import React from "react";
import { Image as ImageIcon, HardDrive, Cloud, Search } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";

interface MediaGridProps {
  assets: MediaAsset[];
  loading: boolean;
  selectedAsset: MediaAsset | null;
  onSelectAsset: (asset: MediaAsset) => void;
  search: string;
  onSearchChange: (val: string) => void;
  storageFilter: string;
  onStorageFilterChange: (val: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (val: string) => void;
  onSearchSubmit: () => void;
}

export function MediaGrid({
  assets,
  loading,
  selectedAsset,
  onSelectAsset,
  search,
  onSearchChange,
  storageFilter,
  onStorageFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onSearchSubmit,
}: MediaGridProps) {
  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit();
          }}
          className="relative w-full md:w-80"
        >
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث بالاسم، النص البديل، أو الملف..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={storageFilter}
            onChange={(e) => onStorageFilterChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#c93b41]"
          >
            <option value="all">كل الاستضافات</option>
            <option value="local">المحلي (كود الموقع)</option>
            <option value="cloud_db">السحابي / الداتا بيز (Cloud)</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#c93b41]"
          >
            <option value="all">كل الأقسام</option>
            <option value="products">المنتجات والتغليف</option>
            <option value="branding">الهويات واللوجو</option>
            <option value="social">السوشيال ميديا</option>
            <option value="general">عام</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-slate-100 dark:bg-white/[0.04] animate-pulse"
            />
          ))}
        </div>
      ) : assets.length === 0 ? (
        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">لا توجد صور مطابقة لخيارات البحث</p>
          <p className="text-xs text-slate-400 mt-1">جرب تغيير شروط الفلتر أو إضافة صورة جديدة</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {assets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset)}
                className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer bg-white dark:bg-[#242424] ${
                  isSelected
                    ? "border-[#c93b41] ring-2 ring-[#c93b41]/30 shadow-lg"
                    : "border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/30 shadow-xs"
                }`}
              >
                <div className="absolute top-2 right-2 z-10">
                  {asset.storageType === "local" ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                      <HardDrive className="w-2.5 h-2.5" />
                      <span>محلي</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                      <Cloud className="w-2.5 h-2.5" />
                      <span>سحابي</span>
                    </span>
                  )}
                </div>

                <div className="aspect-square relative bg-slate-100 dark:bg-[#18191c] overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e: any) => {
                      e.target.src = "/images/ICON-LOGO-SITE.webp";
                    }}
                  />
                </div>

                <div className="p-2.5 bg-white dark:bg-[#242424] border-t border-slate-100 dark:border-white/[0.04]">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={asset.title}>
                    {asset.title || asset.filename}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>{asset.dimensions?.width ? `${asset.dimensions.width}x${asset.dimensions.height}` : "WebP"}</span>
                    <span>{asset.fileSizeKb ? `${asset.fileSizeKb} KB` : ""}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
