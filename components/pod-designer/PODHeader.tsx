"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { podProductsSeed, PODProduct } from "@/lib/db";

interface PODHeaderProps {
  selectedProduct: PODProduct;
  onProductChange: (prodId: string) => void;
}

export function PODHeader({ selectedProduct, onProductChange }: PODHeaderProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          استوديو ومصمم المنتجات عند الطلب (Web-to-Print Canvas)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          صمم واطبع هويتك على {selectedProduct.title.split("(")[0]}
        </h1>
      </div>

      {/* Product Switcher Dropdown */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">المنتج:</label>
        <select
          value={selectedProduct.id}
          onChange={(e) => onProductChange(e.target.value)}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        >
          {podProductsSeed.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
