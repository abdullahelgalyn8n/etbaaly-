import React from "react";
import { Skeleton } from "./BaseSkeleton";
/**
 * BlogCardSkeleton
 * Matches the layout of article cards in /blog (1-col mobile, 2-col tablet, 3-col desktop)
 */
export function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm">
      {/* Featured Image Area */}
      <div className="relative h-52 w-full bg-slate-100 dark:bg-[#111215] overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <Skeleton className="h-6 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          {/* Read time */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-3.5 h-3.5 rounded-full" />
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>

          {/* Title (2 lines) */}
          <Skeleton className="h-6 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />

          {/* Excerpt (2-3 lines) */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3.5 w-full rounded-md" />
            <Skeleton className="h-3.5 w-11/12 rounded-md" />
            <Skeleton className="h-3.5 w-4/5 rounded-md" />
          </div>
        </div>

        {/* Footer (Date + Link) */}
        <div className="pt-5 border-t border-slate-100 dark:border-white/[0.06] mt-5 flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * ServiceCardSkeleton
 * Matches ServiceCard component on homepage & services index
 */
export function ServiceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Title & Subtitle */}
        <Skeleton className="h-7 w-3/4 rounded-lg mb-2" />
        <Skeleton className="h-4 w-1/2 rounded-md mb-4" />
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-5/6 rounded-md mb-6" />

        {/* Features Checklist */}
        <div className="space-y-3 mb-6">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full shrink-0" />
              <Skeleton className="h-3.5 w-4/5 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-3 mt-auto">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

/**
 * PortfolioCardSkeleton
 * Matches PortfolioGallery items with 4:5 aspect ratio artwork container
 */
export function PortfolioCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-md flex flex-col justify-between">
      <div>
        {/* 4:5 Aspect Artwork Container */}
        <div className="relative aspect-[4/5] w-full bg-slate-100 dark:bg-[#15171c] overflow-hidden border-b border-slate-200 dark:border-white/[0.06]">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-3.5 right-3.5 z-10">
            <Skeleton className="h-6 w-24 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-6 w-4/5 rounded-lg" />
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-2/3 rounded-md" />
        </div>
      </div>

      {/* Tags */}
      <div className="p-6 pt-0 space-y-4">
        <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-white/[0.06] pt-3">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * ProductCardSkeleton
 * Matches PODProductsGallery product card layout
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Visual Image Container (aspect-[4/3]) */}
        <div className="relative aspect-[4/3] w-full bg-[#ECEAE6] dark:bg-[#15161a] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.05] flex items-center justify-center">
          <Skeleton className="w-28 h-28 rounded-2xl bg-slate-300/60 dark:bg-white/10" />

          {/* Top Badge: Category */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>

          {/* Turnaround Pill */}
          <div className="absolute bottom-3 left-3">
            <Skeleton className="h-5 w-24 rounded-lg" />
          </div>

          {/* Gallery Photos Count Indicator */}
          <div className="absolute bottom-3 right-3">
            <Skeleton className="h-5 w-14 rounded-lg" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-5/6 rounded-md" />
        </div>
      </div>

      {/* Card Footer: Price & Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-12 rounded" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * CartItemSkeleton
 * Matches cart item row in /cart
 */
export function CartItemSkeleton() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Thumbnail & Title */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <Skeleton className="w-18 h-18 rounded-2xl shrink-0 aspect-square" />
        <div className="space-y-2 flex-grow sm:flex-grow-0">
          <Skeleton className="h-4 w-44 rounded-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-full" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* Quantity Stepper & Price & Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/[0.06]">
        <Skeleton className="h-9 w-28 rounded-2xl" />
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * OrderSummarySkeleton
 * Matches order summary card in /cart
 */
export function OrderSummarySkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-6">
      <Skeleton className="h-6 w-32 rounded-lg" />
      <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
      </div>
      {/* Coupon input */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-grow rounded-xl" />
        <Skeleton className="h-10 w-20 rounded-xl" />
      </div>
      {/* Total */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15161a] flex justify-between items-center">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-7 w-28 rounded-lg" />
      </div>
      {/* Checkout button */}
      <Skeleton className="h-12 w-full rounded-2xl" />
      <Skeleton className="h-12 w-full rounded-2xl" />
    </div>
  );
}

/**
 * TrackTimelineSkeleton
 * Matches 7 production stages in OrderTracker
 */
export function TrackTimelineSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-44 rounded-lg" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      {/* 7 Timeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 pt-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <Skeleton className="h-3.5 w-16 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * TrackDetailsSkeleton
 * Matches OrderTracker details card
 */
export function TrackDetailsSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/[0.06]">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * MetricCardSkeleton
 * Used in Dashboard and Admin KPI cards
 */
export function MetricCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3.5 w-24 rounded" />
        <Skeleton className="w-8 h-8 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-20 rounded-lg" />
      <Skeleton className="h-3 w-32 rounded" />
    </div>
  );
}

/**
 * MediaCardSkeleton
 * Used in Admin Media library
 */
export function MediaCardSkeleton() {
  return (
    <div className="aspect-square bg-white dark:bg-[#1e2026] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-2 flex flex-col justify-between overflow-hidden">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  );
}

