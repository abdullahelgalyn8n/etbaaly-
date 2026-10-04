import React from "react";
import { cn } from "@/lib/utils";

/**
 * Base Skeleton component with GPU-accelerated Shimmer Effect
 * Supports custom shapes, responsive classes, and dark/light modes.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-slate-200/80 dark:bg-[#27282d] animate-shimmer rounded-xl shrink-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * PageHeaderSkeleton
 * Clean generic header skeleton
 */
export function PageHeaderSkeleton({
  badgeWidth = "w-48",
  titleWidth = "w-3/4",
}: {
  badgeWidth?: string;
  titleWidth?: string;
}) {
  return (
    <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-3xl mx-auto px-4 space-y-4">
      <Skeleton className={cn("h-7 rounded-full mx-auto mb-4", badgeWidth)} />
      <Skeleton className={cn("h-10 sm:h-12 rounded-2xl mx-auto", titleWidth)} />
      <Skeleton className="h-4 w-5/6 sm:w-2/3 rounded-md mx-auto" />
    </section>
  );
}

/**
 * BreadcrumbSkeleton
 * Matches standard breadcrumb row across pages
 */
export function BreadcrumbSkeleton({
  itemsCount = 3,
  className,
}: {
  itemsCount?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center gap-2",
        className
      )}
    >
      <Skeleton className="h-4 w-16 rounded-md" />
      {Array.from({ length: itemsCount - 1 }).map((_, i) => (
        <React.Fragment key={i}>
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton
            className={cn(
              "h-4 rounded-md",
              i === itemsCount - 2 ? "w-28 sm:w-36" : "w-20"
            )}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * BadgeSkeleton
 */
export function BadgeSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-6 w-24 rounded-full", className)} />;
}


