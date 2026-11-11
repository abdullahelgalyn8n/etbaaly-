"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface DashboardNavButtonProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Navigates authenticated/portal users to /dashboard/ on click without emitting
 * a crawlable <a href="/dashboard/"> that conflicts with robots.txt Disallow.
 */
export default function DashboardNavButton({
  className = "",
  children,
}: DashboardNavButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/dashboard/")}
      className={className}
    >
      {children}
    </button>
  );
}
