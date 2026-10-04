"use client";

import React from "react";
import Link from "next/link";
import { ProductShareButton } from "./ProductShareButton";

interface ProductDetailBreadcrumbProps {
  category: string;
  title: string;
  onShare?: () => void;
}

export function ProductDetailBreadcrumb({
  category,
  title,
}: ProductDetailBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
      <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-[#c93b41] transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/products/" className="hover:text-[#c93b41] transition-colors">
          كتالوج المنتجات
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400">{category}</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>
      <ProductShareButton title={title} category={category} className="shrink-0 mr-auto sm:mr-0" />
    </div>
  );
}

export default ProductDetailBreadcrumb;
