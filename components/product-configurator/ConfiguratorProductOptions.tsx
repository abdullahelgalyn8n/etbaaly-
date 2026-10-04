"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, Edit3 } from "lucide-react";
import { ConfiguratorGroup } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import ConfiguratorDimensionsInput from "./ConfiguratorDimensionsInput";
import ConfiguratorGroupControl from "./ConfiguratorGroupControl";
import ConfiguratorCheckoutBar from "./ConfiguratorCheckoutBar";

interface ConfiguratorProductOptionsProps {
  configId: string;
  productTitle: string;
  basePrice: number;
  totalPrice: number;
  groups: ConfiguratorGroup[];
  selections: Record<string, string>;
  onSelectOption: (groupId: string, optionId: string) => void;
  customTexts: Record<string, string>;
  onCustomTextChange: (optionId: string, val: string) => void;
  dimensions: { length: string; width: string; height: string };
  onDimensionChange: (key: "length" | "width" | "height", val: string) => void;
  onReset: () => void;
  onAddToCart: () => void;
  onDownloadPdf: () => void;
}

export function ConfiguratorProductOptions({
  configId,
  productTitle,
  totalPrice,
  groups,
  selections,
  onSelectOption,
  customTexts,
  onCustomTextChange,
  dimensions,
  onDimensionChange,
  onReset,
  onAddToCart,
  onDownloadPdf,
}: ConfiguratorProductOptionsProps) {
  const { isAdmin } = useAuth();
  const originalPrice = Math.round(totalPrice * 1.25);

  return (
    <div className="flex flex-col justify-between space-y-6 select-none">
      <div className="space-y-6">
        {/* PRODUCT TITLE & PRICING HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {productTitle}
          </h1>
          <div className="flex items-center gap-2.5 mt-2 font-mono">
            <span className="text-slate-400 line-through text-sm sm:text-base">
              {originalPrice} ج.م
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalPrice} ج.م
            </span>
          </div>
        </div>

        {/* SPECIFICATION INPUTS */}
        <ConfiguratorDimensionsInput
          dimensions={dimensions}
          onDimensionChange={onDimensionChange}
        />

        {/* DYNAMIC GROUPS LOADED FROM STUDIO */}
        {groups.map((grp) => (
          <ConfiguratorGroupControl
            key={grp.id}
            group={grp}
            activeOptId={selections[grp.id] || grp.options[0]?.id}
            onSelectOption={onSelectOption}
            customTexts={customTexts}
            onCustomTextChange={onCustomTextChange}
          />
        ))}

        {/* UTILITY LINKS: Edit configurator & Reset configuration */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {isAdmin && (
            <Link
              href={`/admin/products/configurator?id=${configId}`}
              className="text-blue-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل هذا المنتج في الاستوديو (Edit configurator)</span>
            </Link>
          )}

          <button
            type="button"
            onClick={onReset}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط الخيارات (Reset configuration)</span>
          </button>
        </div>
      </div>

      {/* BOTTOM CHECKOUT ACTION ROW */}
      <ConfiguratorCheckoutBar
        totalPrice={totalPrice}
        onAddToCart={onAddToCart}
        onDownloadPdf={onDownloadPdf}
      />
    </div>
  );
}

export default ConfiguratorProductOptions;
