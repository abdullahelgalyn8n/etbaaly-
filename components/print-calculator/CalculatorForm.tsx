"use client";

import React from "react";
import { ProductPreset, productPresets } from "./presets";
import NumericQuantityInput from "@/components/ui/NumericQuantityInput";

interface CalculatorFormProps {
  selectedProduct: ProductPreset;
  onProductChange: (id: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (id: string) => void;
  selectedFinish: string;
  setSelectedFinish: (id: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;
}

export function CalculatorForm({
  selectedProduct,
  onProductChange,
  selectedMaterial,
  setSelectedMaterial,
  selectedFinish,
  setSelectedFinish,
  quantity,
  setQuantity,
}: CalculatorFormProps) {
  return (
    <div className="lg:col-span-7 space-y-6">
      {/* Step 1: Select Category / Product */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          1. نوع المطبوعات المطلوب:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {productPresets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onProductChange(p.id)}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                selectedProduct.id === p.id
                  ? "border-[#c93b41] bg-red-500/[0.06] text-slate-900 dark:text-white ring-2 ring-red-500/20"
                  : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.2] bg-slate-50/50 dark:bg-[#1f1f1f]"
              }`}
            >
              <span className="text-xs font-bold line-clamp-1">{p.name}</span>
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium mt-1">
                {p.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Material Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          2. نوع الخامة وسماكة الورق:
        </label>
        <div className="space-y-2">
          {selectedProduct.materials.map((m) => (
            <label
              key={m.id}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                selectedMaterial === m.id
                  ? "border-[#c93b41] bg-red-500/[0.06] text-slate-900 dark:text-white"
                  : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#1e1e1e]"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="material"
                  checked={selectedMaterial === m.id}
                  onChange={() => setSelectedMaterial(m.id)}
                  className="accent-[#c93b41] w-4 h-4"
                />
                <span className="text-xs sm:text-sm font-bold">{m.name}</span>
              </div>
              {m.multiplier > 1.0 && (
                <span className="text-[11px] font-mono font-bold text-[#c93b41] bg-red-500/10 px-2 py-0.5 rounded">
                  فاخر (+{Math.round((m.multiplier - 1) * 100)}%)
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Step 3: Finishing & Coating */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          3. التشطيب والمعالجات الفاخرة (Finishing & Spot UV):
        </label>
        <div className="space-y-2">
          {selectedProduct.finishes.map((f) => (
            <label
              key={f.id}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                selectedFinish === f.id
                  ? "border-[#c93b41] bg-red-500/[0.06] text-slate-900 dark:text-white"
                  : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#1e1e1e]"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="finishing"
                  checked={selectedFinish === f.id}
                  onChange={() => setSelectedFinish(f.id)}
                  className="accent-[#c93b41] w-4 h-4"
                />
                <span className="text-xs sm:text-sm font-bold">{f.name}</span>
              </div>
              {f.addPerUnit > 0 && (
                <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold">
                  +{f.addPerUnit} ج.م / قطعة
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Step 4: Quantity Slider / Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            4. الكمية المطلوبة (كتابة يدوية أو شريط التمرير):
          </label>
          <div className="flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-lg border border-red-500/20">
            <NumericQuantityInput
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={1000000}
              ariaLabel="الكمية المطلوبة بالمطبعة"
              className="w-20 text-sm font-black text-[#c93b41] bg-transparent focus:bg-white dark:focus:bg-[#1a1a1a] rounded px-1"
            />
            <span className="text-xs font-bold text-[#c93b41]">قطعة</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min={selectedProduct.minQty}
            max={selectedProduct.minQty * 10}
            step={selectedProduct.minQty >= 1000 ? 500 : 100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-[#1c1c1c] rounded-lg appearance-none cursor-pointer accent-[#c93b41]"
          />
        </div>

        {/* Quick Quantity Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[1, 2, 3, 5, 10].map((multiplier) => {
            const qtyVal = selectedProduct.minQty * multiplier;
            return (
              <button
                key={multiplier}
                type="button"
                onClick={() => setQuantity(qtyVal)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  quantity === qtyVal
                    ? "bg-[#c93b41] text-white"
                    : "bg-slate-100 dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252525]"
                }`}
              >
                {qtyVal.toLocaleString()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
