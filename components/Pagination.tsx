"use client";

import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { getPaginationItems } from "./pagination/getPaginationItems";
import PaginationCounter from "./pagination/PaginationCounter";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
  showJumpToEdges?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
  showJumpToEdges = true,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(totalPages, currentPage);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <div className={`w-full flex flex-col items-center justify-center gap-4 select-none pt-12 pb-4 ${className}`}>
      {totalItems && startItem && endItem && (
        <PaginationCounter
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}

      {/* Glassmorphic Floating Pill Bar */}
      <nav
        aria-label="التنقل بين الصفحات"
        dir="rtl"
        className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-white/90 dark:bg-[#1a1c20]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.1] shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
      >
        {/* First Page (RTL) */}
        {showJumpToEdges && totalPages > 5 && (
          <button
            type="button"
            disabled={isFirstPage}
            onClick={() => !isFirstPage && onPageChange(1)}
            title="الصفحة الأولى"
            aria-label="الانتقال إلى الصفحة الأولى"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              isFirstPage
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
                : "text-slate-700 dark:text-slate-300 hover:text-[#c93b41] dark:hover:text-[#c93b41] hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer"
            }`}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        )}

        {/* Previous Button */}
        <button
          type="button"
          disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          aria-label="الصفحة السابقة"
          className={`h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 group ${
            isFirstPage
              ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
              : "text-slate-800 dark:text-slate-200 hover:text-[#c93b41] dark:hover:text-[#c93b41] hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer"
          }`}
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          <span className="font-bold">السابق</span>
        </button>

        <div className="h-5 w-[1px] bg-slate-200 dark:bg-white/[0.1] mx-0.5" />

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {paginationItems.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-7 sm:w-9 h-9 sm:h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold text-xs sm:text-sm select-none"
                >
                  •••
                </span>
              );
            }

            const pageNum = Number(item);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`الانتقال إلى الصفحة ${pageNum}`}
                className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? "btn-crimson text-white shadow-lg shadow-[#c93b41]/35 scale-105 font-black ring-2 ring-[#c93b41]/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#c93b41] dark:hover:text-[#c93b41] hover:bg-slate-100 dark:hover:bg-white/[0.06] active:scale-95"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <div className="h-5 w-[1px] bg-slate-200 dark:bg-white/[0.1] mx-0.5" />

        {/* Next Button */}
        <button
          type="button"
          disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          aria-label="الصفحة التالية"
          className={`h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 group ${
            isLastPage
              ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
              : "text-[#c93b41] dark:text-[#e04b4f] hover:text-[#ba3239] hover:bg-[#c93b41]/10 dark:hover:bg-[#c93b41]/15 cursor-pointer font-extrabold"
          }`}
        >
          <span className="font-bold">التالي</span>
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Last Page (RTL) */}
        {showJumpToEdges && totalPages > 5 && (
          <button
            type="button"
            disabled={isLastPage}
            onClick={() => !isLastPage && onPageChange(totalPages)}
            title="الصفحة الأخيرة"
            aria-label="الانتقال إلى الصفحة الأخيرة"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              isLastPage
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
                : "text-slate-700 dark:text-slate-300 hover:text-[#c93b41] dark:hover:text-[#c93b41] hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer"
            }`}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        )}
      </nav>
    </div>
  );
}
