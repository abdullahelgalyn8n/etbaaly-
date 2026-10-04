import React from "react";
import { Skeleton, PageHeaderSkeleton } from "./BaseSkeleton";

/**
 * AboutSkeleton
 * Full skeleton for About page (app/about/loading.tsx)
 */
export function AboutSkeleton() {
  return (
    <div className="space-y-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>

      <PageHeaderSkeleton badgeWidth="w-44" titleWidth="w-3/4" />

      {/* Story Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Skeleton className="h-8 w-4/5 rounded-xl" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
            <Skeleton className="h-12 w-44 rounded-xl pt-2" />
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <Skeleton className="aspect-[4/5] rounded-3xl" />
            <Skeleton className="aspect-[4/5] rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <PageHeaderSkeleton badgeWidth="w-28" titleWidth="w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 space-y-4"
            >
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * ContactSkeleton
 * Full skeleton for Contact page (app/contact/loading.tsx)
 */
export function ContactSkeleton() {
  return (
    <div className="space-y-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </div>

      <PageHeaderSkeleton badgeWidth="w-36" titleWidth="w-2/3" />

      {/* Grid: Info Card + Form Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 space-y-6">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                    <div className="space-y-2 flex-grow">
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-5 w-44 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-8 sm:p-10 space-y-6">
              <Skeleton className="h-7 w-48 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-12 rounded-2xl" />
                <Skeleton className="h-12 rounded-2xl" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-12 rounded-2xl" />
                <Skeleton className="h-12 rounded-2xl" />
              </div>
              <Skeleton className="h-32 rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
