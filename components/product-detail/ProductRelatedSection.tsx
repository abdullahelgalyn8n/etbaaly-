"use client";

import React from "react";
import Link from "next/link";
import { Box } from "lucide-react";
import { AdminProduct } from "@/lib/db";

interface ProductRelatedSectionProps {
  relatedProducts: AdminProduct[];
}

export default function ProductRelatedSection({
  relatedProducts,
}: ProductRelatedSectionProps) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            منتجات أخرى قد تعجبك
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            تصفح تشكيلة واسعة من المجات والمطبوعات الفاخرة
          </p>
        </div>
        <Link
          href="/products/"
          className="text-xs font-bold text-[#c93b41] hover:underline flex items-center gap-1"
        >
          <span>عرض كافة المنتجات</span>
          <span>➔</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {relatedProducts.slice(0, 3).map((rp) => {
          const rpImage =
            rp.image ||
            rp.colors?.[0]?.images?.[0] ||
            (rp.colors?.[0]?.mockupOverlay?.startsWith("/")
              ? rp.colors[0].mockupOverlay
              : null);

          return (
            <Link
              key={rp.id}
              href={`/products/${rp.slug || rp.id}/`}
              className="group p-5 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/50 transition-all shadow-sm hover:shadow-xl space-y-4"
            >
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-[#18191d] p-4 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                {rpImage ? (
                  <img
                    src={rpImage}
                    alt={rp.title}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-xl shadow-md flex items-center justify-center text-white"
                    style={{
                      background: rp.colors[0]?.bgStyle || rp.colors[0]?.hex || "#C93B41",
                    }}
                  >
                    <Box className="w-6 h-6 text-white/80" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#c93b41] transition-colors truncate">
                  {rp.title}
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="font-mono font-black text-[#c93b41]">{rp.basePrice} ج.م</span>
                  <span className="text-[10px] text-slate-400 font-bold">{rp.turnaround || "24 ساعة"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
