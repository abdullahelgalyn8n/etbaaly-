import React from "react";
import { Skeleton } from "./BaseSkeleton";
import { ProductCardSkeleton } from "./CardSkeletons";

/**
 * VisualCategoryBarSkeleton
 * Matches StickerMuleVisualCategoryBar horizontal category cards
 */
export function VisualCategoryBarSkeleton() {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] shrink-0"
        >
          <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
          <div className="space-y-1">
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-2.5 w-12 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * HomeHeroSkeleton
 * Matches HomeHeroSection layout in app/page.tsx
 */
export function HomeHeroSkeleton() {
  return (
    <section className="relative pt-4 md:pt-10 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <Skeleton className="h-7 w-72 rounded-full mx-auto" />

          {/* Main Title (2 lines) */}
          <div className="space-y-3">
            <Skeleton className="h-10 sm:h-14 w-full sm:w-5/6 rounded-2xl mx-auto" />
            <Skeleton className="h-10 sm:h-14 w-3/4 sm:w-2/3 rounded-2xl mx-auto" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md mx-auto" />
          </div>

          {/* 2 CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Skeleton className="h-12 w-full sm:w-56 rounded-xl" />
            <Skeleton className="h-12 w-full sm:w-52 rounded-xl" />
          </div>

          {/* 4 Value Props Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-11 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * HomeProductsSectionSkeleton
 * Matches Products Gallery section in app/page.tsx
 */
export function HomeProductsSectionSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-xl" />
        </div>
        <Skeleton className="h-5 w-40 rounded-md" />
      </div>

      {/* Visual Category Bar */}
      <VisualCategoryBarSkeleton />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
        <Skeleton className="h-11 w-full sm:w-96 rounded-2xl" />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-11 w-28 rounded-2xl" />
          <Skeleton className="h-11 w-28 rounded-2xl" />
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-xl" />
        ))}
      </div>

      {/* Products Grid (6 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * HowItWorksSkeleton
 * Matches 3 Simple Steps section in app/page.tsx
 */
export function HowItWorksSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Skeleton className="h-6 w-32 rounded-full mx-auto" />
          <Skeleton className="h-8 w-60 rounded-xl mx-auto" />
          <Skeleton className="h-4 w-3/4 rounded-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-[#1d1d1d] border border-slate-200/80 dark:border-white/[0.05] space-y-3"
            >
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="space-y-1.5 pt-1">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * HomeSkeleton
 * Full skeleton matching the updated Homepage (app/loading.tsx)
 */
export function HomeSkeleton() {
  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      <HomeHeroSkeleton />
      <HomeProductsSectionSkeleton />
      <HowItWorksSkeleton />
    </div>
  );
}
export { HomeHeroSkeleton as HeroSkeleton };
