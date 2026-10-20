import React from "react";

export default function OfferDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-pulse">
      <div className="h-6 w-32 bg-slate-200 dark:bg-white/[0.06] rounded-full" />
      <div className="h-16 w-full bg-slate-100 dark:bg-white/[0.04] rounded-2xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-6 w-48 bg-slate-200 dark:bg-white/[0.06] rounded-full" />
          <div className="h-12 w-5/6 bg-slate-200 dark:bg-white/[0.06] rounded-2xl" />
          <div className="h-20 w-full bg-slate-200 dark:bg-white/[0.06] rounded-2xl" />
          <div className="h-44 w-full bg-slate-100 dark:bg-white/[0.04] rounded-3xl" />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-white/[0.06] rounded-3xl" />
          <div className="h-24 w-full bg-slate-100 dark:bg-white/[0.04] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
