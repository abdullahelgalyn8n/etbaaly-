import React from "react";
import { Skeleton } from "./BaseSkeleton";
import { PortfolioCardSkeleton, ProductCardSkeleton } from "./CardSkeletons";

export { AboutSkeleton, ContactSkeleton } from "./AboutAndContactSkeletons";

/**
 * ProductDetailSkeleton
 * Matches ProductStudioDetailView layout in app/products/[slug]/page.tsx
 */
export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>

      {/* 2. Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full bg-[#ECEAE6] dark:bg-[#15161a] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] flex items-center justify-center p-8">
            <Skeleton className="w-56 h-56 rounded-2xl bg-slate-300/60 dark:bg-white/10" />
            <div className="absolute top-4 right-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="absolute top-4 left-4">
              <Skeleton className="w-9 h-9 rounded-xl" />
            </div>
          </div>
          {/* Thumbnails row */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className="aspect-square rounded-2xl bg-[#ECEAE6] dark:bg-[#15161a] border border-slate-200 dark:border-white/[0.06]"
              />
            ))}
          </div>
        </div>

        {/* Right Column: Order Info Panel (5 cols) */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-6 shadow-sm">
          {/* Badge & Title */}
          <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <Skeleton className="h-8 w-4/5 rounded-xl" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          {/* Color Variants */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="flex gap-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-full" />
              ))}
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#18191e] border border-slate-100 dark:border-white/[0.05] flex items-center justify-between">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <div className="space-y-1 text-left">
                <Skeleton className="h-3 w-14 rounded" />
                <Skeleton className="h-7 w-24 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Skeleton className="h-13 w-full rounded-2xl" />
            <Skeleton className="h-11 w-full rounded-2xl" />
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Tabs Section */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-white/[0.06]">
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36 rounded-2xl" />
          <Skeleton className="h-11 w-32 rounded-2xl" />
          <Skeleton className="h-11 w-36 rounded-2xl" />
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-4">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
      </section>

      {/* 4. Related Products */}
      <section className="space-y-6 pt-6">
        <Skeleton className="h-8 w-56 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * ServiceDetailSkeleton
 * Matches ServiceDetail layout (app/services/[slug]/loading.tsx)
 */
export function ServiceDetailSkeleton() {
  return (
    <div className="space-y-20 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="pt-4 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>

      {/* Hero Banner */}
      <section className="rounded-[32px] p-8 sm:p-12 md:p-16 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="h-6 w-36 rounded-full" />
            </div>
            <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <div className="flex flex-wrap gap-4 pt-2">
              <Skeleton className="h-12 w-44 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="aspect-[4/5] rounded-2xl w-full" />
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-3"
            >
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="h-5 w-36 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="space-y-8">
        <Skeleton className="h-8 w-56 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <PortfolioCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * ArticleSkeleton
 * Full skeleton for dynamic article / case study pages (app/[slug]/loading.tsx)
 */
export function ArticleSkeleton() {
  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Skeleton */}
      <div className="pt-4 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-36 rounded-md" />
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <Skeleton className="h-10 sm:h-12 w-full rounded-2xl" />
        <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl" />
        <Skeleton className="h-5 w-full rounded-md" />

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/[0.08]">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      </header>

      {/* Article Content Lines */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 space-y-6">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-5/6 rounded-md" />
        <div className="py-4 space-y-3">
          <Skeleton className="h-8 w-2/3 rounded-xl mb-3" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] space-y-3">
          <Skeleton className="h-5 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-11/12 rounded-md" />
        </div>
        {/* Author Card Skeleton */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
