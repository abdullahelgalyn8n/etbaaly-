import React from "react";

interface PaginationCounterProps {
  totalItems: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  totalPages: number;
}

export function PaginationCounter({
  totalItems,
  startItem,
  endItem,
  currentPage,
  totalPages,
}: PaginationCounterProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 text-xs font-semibold">
      <span>عرض</span>
      <span className="font-bold text-slate-900 dark:text-white">{startItem} - {endItem}</span>
      <span>من أصل</span>
      <span className="font-bold text-[#c93b41]">{totalItems}</span>
      <span>مقال منشور</span>
      <span className="opacity-40">•</span>
      <span>الصفحة</span>
      <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span>
      <span>من</span>
      <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
    </div>
  );
}

export default PaginationCounter;
