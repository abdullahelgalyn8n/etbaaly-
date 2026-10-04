"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { ProductColor } from "@/lib/db";

interface StudioColorsTabProps {
  colors: ProductColor[];
  newColorName: string;
  setNewColorName: (v: string) => void;
  newColorHex: string;
  setNewColorHex: (v: string) => void;
  onAddColor: () => void;
  onDeleteColor: (id: string) => void;
}

export function StudioColorsTab({
  colors,
  newColorName,
  setNewColorName,
  newColorHex,
  setNewColorHex,
  onAddColor,
  onDeleteColor,
}: StudioColorsTabProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 shadow-xl space-y-4">
      <h3 className="text-xs font-bold text-slate-900 dark:text-white">إضافة وتعديل ألوان المنتج:</h3>

      {/* Add Color Form */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="اسم اللون (مثال: أبيض ناصع)..."
          value={newColorName}
          onChange={(e) => setNewColorName(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white"
        />
        <input
          type="color"
          value={newColorHex}
          onChange={(e) => setNewColorHex(e.target.value)}
          className="w-10 h-10 rounded-xl border-0 cursor-pointer shrink-0"
        />
        <button
          type="button"
          onClick={onAddColor}
          className="px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Current Colors Swatches List */}
      <div className="space-y-2 pt-2">
        {colors.map((c) => (
          <div
            key={c.id}
            className="p-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full border border-slate-300 dark:border-white/20 shadow-inner shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</span>
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 font-bold">{c.hex}</span>
            </div>

            <button
              type="button"
              onClick={() => onDeleteColor(c.id)}
              className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
