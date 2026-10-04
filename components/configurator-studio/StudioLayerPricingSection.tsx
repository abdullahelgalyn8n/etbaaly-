"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConfiguratorLayerOption } from "@/lib/db";

interface StudioLayerPricingSectionProps {
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
}

export default function StudioLayerPricingSection({
  activeOption,
  updateActiveOption,
}: StudioLayerPricingSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!activeOption) return null;

  return (
    <div className="border-b border-[#22242b] pb-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
      >
        <span className="text-[11px] font-bold text-slate-200">WOOCOMMERCE PRICING</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="pt-2 space-y-3">
          {/* Price Add-on */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold text-xs block">
              Regular Price Add-on (سعر الخيار الإضافي)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="1"
                value={activeOption.priceAdd ?? 0}
                onChange={(e) => updateActiveOption({ priceAdd: Number(e.target.value) })}
                className="flex-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
              <span className="text-slate-400 text-xs font-bold">ج.م / ر.س</span>
            </div>
            <p className="text-[11px] text-[#656b78] pt-0.5">
              يضاف هذا المبلغ لسعر المنتج الأساسي عند اختيار العميل لهذه الطبقة.
            </p>
          </div>

          {/* Active on Load */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#656b78] hover:text-white">
              <input
                type="checkbox"
                checked={activeOption.activeOnLoad ?? false}
                onChange={(e) => updateActiveOption({ activeOnLoad: e.target.checked })}
                className="rounded border-[#22242a] bg-[#101114] text-cyan-400 focus:ring-0"
              />
              <span className="text-[11px]">Active on Load (تفعيل افتراضي عند فتح المعرض)</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
