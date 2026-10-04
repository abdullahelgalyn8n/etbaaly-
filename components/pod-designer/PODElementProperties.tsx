import React from "react";
import { Layers, Trash2 } from "lucide-react";
import { CanvasElement } from "./types";

interface PODElementPropertiesProps {
  selectedElement: CanvasElement;
  updateSelectedElement: (updates: Partial<CanvasElement>) => void;
  deleteSelectedElement: () => void;
}

export function PODElementProperties({
  selectedElement,
  updateSelectedElement,
  deleteSelectedElement,
}: PODElementPropertiesProps) {
  return (
    <div className="bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#c93b41]" />
          تحكم العنصر النشط
        </span>
        <button
          type="button"
          onClick={deleteSelectedElement}
          className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
          title="حذف العنصر"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Scaling Slider */}
      <div>
        <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          <span>الحجم والتكبير:</span>
          <span className="font-mono">{Math.round(selectedElement.scale * 100)}%</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.1}
          value={selectedElement.scale}
          onChange={(e) => updateSelectedElement({ scale: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41]"
        />
      </div>

      {/* Rotation Slider */}
      <div>
        <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          <span>زاوية الدوران:</span>
          <span className="font-mono">{selectedElement.rotation}°</span>
        </div>
        <input
          type="range"
          min={-180}
          max={180}
          step={5}
          value={selectedElement.rotation}
          onChange={(e) => updateSelectedElement({ rotation: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41]"
        />
      </div>
    </div>
  );
}

export default PODElementProperties;
