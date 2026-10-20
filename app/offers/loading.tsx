import React from "react";

export default function OffersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-pulse">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="h-6 w-48 bg-slate-200 dark:bg-white/[0.06] rounded-full mx-auto" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-white/[0.06] rounded-2xl mx-auto" />
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-white/[0.06] rounded-xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-96 rounded-3xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] p-6 space-y-4"
          >
            <div className="h-6 w-24 bg-slate-200 dark:bg-white/[0.08] rounded-full" />
            <div className="h-8 w-3/4 bg-slate-200 dark:bg-white/[0.08] rounded-xl" />
            <div className="h-16 w-full bg-slate-200 dark:bg-white/[0.08] rounded-2xl" />
            <div className="space-y-2 pt-4">
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-white/[0.08] rounded-md" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-white/[0.08] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
