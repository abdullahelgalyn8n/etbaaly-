"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import { Skeleton } from "@/components/Skeleton";

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col justify-center items-center bg-slate-50 dark:bg-[#121316] relative">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#c93b41_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Top Header & Breadcrumbs */}
      <div className="w-full max-w-lg mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للمتجر الرئيسي</span>
        </Link>

        <Link href="/" className="inline-block">
          <BrandLogo className="w-auto h-7 sm:h-8" />
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="w-full max-w-lg bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="text-center space-y-2">
              <Skeleton className="w-12 h-12 rounded-2xl mx-auto" />
              <Skeleton className="h-7 w-36 rounded-lg mx-auto" />
              <Skeleton className="h-4 w-48 rounded-md mx-auto" />
            </div>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-[#18191e] p-1 rounded-2xl">
              <Skeleton className="h-9 rounded-xl" />
              <Skeleton className="h-9 rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
