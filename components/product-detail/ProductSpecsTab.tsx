"use client";

import React from "react";
import { AdminProduct } from "@/lib/db";

interface ProductSpecsTabProps {
  product: AdminProduct;
}

export default function ProductSpecsTab({ product }: ProductSpecsTabProps) {
  return (
    <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-200">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
        المواصفات الفنية وخامات التصنيع:
      </h3>
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] text-xs sm:text-sm">
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">التصنيف:</span>
          <span className="font-bold text-slate-900 dark:text-white">{product.category}</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">الخامة الأساسية:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            بورسلين سيراميكي حراري فندقي فاخر عالي الكثافة
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">السعة:</span>
          <span className="font-bold text-slate-900 dark:text-white">330 مل (11 أونصة)</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">مساحة الطباعة واللوجو:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {product.printAreaLabel || "8.5 × 7.5 سم"}
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">دقة الطباعة وثبات الألوان:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            300 DPI حراري فائق الثبات، مقاوم للبهتان والتآكل
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">إرشادات الاستخدام والتنظيف:</span>
          <span className="font-bold text-slate-900 dark:text-white">آمن 100% في غسالة الأطباق والمايكروويف</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">التغليف:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            علبة فردية كرتونية مقواة مع فوم هوائي عازل لحماية المنتج
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">مدة التجهيز والتسليم:</span>
          <span className="font-bold text-slate-900 dark:text-white">{product.turnaround || "24 ساعة"}</span>
        </div>
      </div>
    </div>
  );
}
