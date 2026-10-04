import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton, PageHeaderSkeleton, BreadcrumbSkeleton } from "./BaseSkeleton";
import {
  BlogCardSkeleton,
  ServiceCardSkeleton,
  ProductCardSkeleton,
  CartItemSkeleton,
  OrderSummarySkeleton,
  TrackTimelineSkeleton,
  TrackDetailsSkeleton,
  MetricCardSkeleton,
  MediaCardSkeleton,
} from "./CardSkeletons";
import { VisualCategoryBarSkeleton } from "./HomeSkeletons";

export { HeroSkeleton, HomeSkeleton } from "./HomeSkeletons";

/**
 * BlogSkeleton
 * Full skeleton for Blog Index (app/blog/loading.tsx)
 */
export function BlogSkeleton() {
  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumb Skeleton */}
      <BreadcrumbSkeleton itemsCount={2} />

      {/* Header & Tabs */}
      <section className="relative pt-8 pb-4 text-center max-w-3xl mx-auto px-4 space-y-4">
        <Skeleton className="h-7 w-44 rounded-full mx-auto" />
        <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl mx-auto" />
        <Skeleton className="h-4 w-2/3 rounded-md mx-auto" />

        {/* Category Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {["w-28", "w-44", "w-36", "w-32", "w-36", "w-32", "w-36", "w-32"].map(
            (w, idx) => (
              <Skeleton key={idx} className={cn("h-9 rounded-full", w)} />
            )
          )}
        </div>
      </section>

      {/* 3x3 Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>

        {/* Pagination Bar Skeleton */}
        <div className="mt-12 flex items-center justify-center gap-2 pt-6">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </section>
    </div>
  );
}

/**
 * ServicesSkeleton
 * Full skeleton for Services Index (app/services/loading.tsx)
 */
export function ServicesSkeleton() {
  return (
    <div className="space-y-20 pb-20">
      {/* Breadcrumb Skeleton */}
      <BreadcrumbSkeleton itemsCount={2} />

      <PageHeaderSkeleton badgeWidth="w-56" titleWidth="w-4/5" />

      {/* Services Grid Breakdown (6 items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Quick Action Tools Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-5 w-36 rounded-lg" />
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-4/5 rounded" />
                <Skeleton className="h-4 w-28 rounded pt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * ProductsPageSkeleton
 * Full skeleton for Products Catalog (app/products/loading.tsx)
 */
export function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-7 w-64 rounded-full mx-auto" />
        <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl mx-auto" />
        <Skeleton className="h-4 w-2/3 rounded-md mx-auto" />
      </div>

      {/* Visual Category Bar */}
      <VisualCategoryBarSkeleton />

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <Skeleton className="h-11 w-full sm:w-96 rounded-2xl" />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-11 w-28 rounded-2xl" />
          <Skeleton className="h-11 w-28 rounded-2xl" />
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-xl" />
        ))}
      </div>

      {/* Products Grid (9 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Benefits Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-3"
          >
            <Skeleton className="w-10 h-10 rounded-xl mx-auto" />
            <Skeleton className="h-5 w-36 rounded-md mx-auto" />
            <Skeleton className="h-3.5 w-5/6 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * CartPageSkeleton
 * Full skeleton for Cart & Checkout (app/cart/loading.tsx)
 */
export function CartPageSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Header & Stepper */}
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-7 h-7 rounded-xl" />
            <Skeleton className="h-8 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-1.5 shadow-xs">
          <Skeleton className="h-8 w-28 rounded-xl" />
          <Skeleton className="h-8 w-28 rounded-xl" />
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>
      </div>

      {/* 2. Main Grid: Cart Items (8 cols) + Order Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>

          {/* Cart Item Cards */}
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />

          {/* Cart Actions */}
          <div className="pt-4 flex items-center justify-between">
            <Skeleton className="h-10 w-36 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4">
          <OrderSummarySkeleton />
        </div>
      </div>
    </div>
  );
}

/**
 * TrackPageSkeleton
 * Full skeleton for Order Tracker (app/track/loading.tsx)
 */
export function TrackPageSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-7 w-64 rounded-full mx-auto" />
        <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl mx-auto" />
        <Skeleton className="h-4 w-2/3 rounded-md mx-auto" />
      </div>

      {/* Search Bar & Demo Pills Card */}
      <div className="w-full max-w-5xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-12 flex-grow rounded-2xl" />
          <Skeleton className="h-12 w-full sm:w-36 rounded-2xl" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-24 rounded-lg" />
        </div>
      </div>

      {/* Tracker Timeline & Details */}
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <TrackTimelineSkeleton />
        <TrackDetailsSkeleton />
      </div>

      {/* 3 Value Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2.5 shadow-sm"
          >
            <Skeleton className="w-12 h-12 rounded-xl mx-auto" />
            <Skeleton className="h-5 w-36 rounded-md mx-auto" />
            <Skeleton className="h-3.5 w-5/6 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * DashboardPageSkeleton
 * Full skeleton for Client Dashboard (app/dashboard/loading.tsx)
 */
export function DashboardPageSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-36 rounded-xl" />
        ))}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Active Orders List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
          <Skeleton className="h-6 w-44 rounded-lg" />
          <Skeleton className="h-10 w-64 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14161a] border border-slate-200/80 dark:border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-28 rounded font-mono" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-4 w-48 rounded" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-9 w-24 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * AdminDashboardSkeleton
 * Full skeleton for Central Admin (app/admin/loading.tsx)
 */
export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-xl" />
          <Skeleton className="h-4 w-48 rounded" />
        </div>
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Welcome Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] space-y-4">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* 4 KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* 2-Column Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] space-y-4">
          <Skeleton className="h-6 w-44 rounded-lg" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1a1c20] flex justify-between items-center"
              >
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-48 rounded" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AdminMediaSkeleton
 * Matches Admin Media library (app/admin/media/loading.tsx)
 */
export function AdminMediaSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* 3 KPI stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex items-center justify-between"
          >
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <Skeleton className="h-9 w-full sm:w-64 rounded-xl" />
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] space-y-4">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * LegalPageSkeleton
 * Full skeleton for legal & policy pages (policy, privacy, refund, terms)
 */
export function LegalPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      {/* PolicyHeader Skeleton */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-4">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-9 sm:h-11 w-3/4 rounded-2xl" />
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
      </div>

      {/* Tabs Nav Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-2"
          >
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
        ))}
      </div>

      {/* Strict Alert */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
        <div className="space-y-1.5 flex-grow">
          <Skeleton className="h-4 w-44 rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
        </div>
      </div>

      {/* Main Grid: Content (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {[1, 2, 3].map((section) => (
            <div
              key={section}
              className="p-8 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-4"
            >
              <Skeleton className="h-6 w-48 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * LoginPageSkeleton
 * Full skeleton for Login (app/login/loading.tsx)
 */
export function LoginPageSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col justify-center items-center">
      {/* Top Header & Breadcrumbs */}
      <div className="w-full max-w-lg mx-auto mb-6 flex items-center justify-between">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <Skeleton className="w-12 h-12 rounded-2xl mx-auto" />
          <Skeleton className="h-7 w-36 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-48 rounded-md mx-auto" />
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-[#18191e] p-1 rounded-2xl">
          <Skeleton className="h-9 rounded-xl" />
          <Skeleton className="h-9 rounded-xl" />
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Quick Demo buttons */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-28 rounded" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-8 rounded-lg" />
            <Skeleton className="h-8 rounded-lg" />
          </div>
        </div>

        {/* Submit */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Links */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * RegisterPageSkeleton
 * Full skeleton for Register (app/register/loading.tsx)
 */
export function RegisterPageSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col justify-center items-center">
      {/* Top Header & Breadcrumbs */}
      <div className="w-full max-w-xl mx-auto mb-6 flex items-center justify-between">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <Skeleton className="w-12 h-12 rounded-2xl mx-auto" />
          <Skeleton className="h-7 w-48 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-56 rounded-md mx-auto" />
        </div>

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-[#18191e] p-1 rounded-2xl">
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <Skeleton className="h-11 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-11 rounded-xl" />
            <Skeleton className="h-11 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-11 rounded-xl" />
            <Skeleton className="h-11 rounded-xl" />
          </div>
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Footer Link */}
        <div className="text-center pt-2">
          <Skeleton className="h-4 w-48 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

/**
 * ConfiguratorSkeleton
 * Full skeleton for Product Configurator (app/configurator/loading.tsx)
 */
export function ConfiguratorSkeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-4 w-80 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] space-y-4">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="aspect-square w-full rounded-3xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] p-6 flex items-center justify-center">
            <Skeleton className="w-48 h-48 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <OrderSummarySkeleton />
        </div>
      </div>
    </div>
  );
}
