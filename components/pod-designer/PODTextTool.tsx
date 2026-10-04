import React from "react";
import { Plus } from "lucide-react";
import { CanvasElement } from "./types";

interface PODTextToolProps {
  newText: string;
  setNewText: (t: string) => void;
  textColor: string;
  setTextColor: (c: string) => void;
  fontFamily: string;
  setFontFamily: (f: string) => void;
  handleAddText: () => void;
  updateSelectedElement: (updates: Partial<CanvasElement>) => void;
}

export function PODTextTool({
  newText,
  setNewText,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  handleAddText,
  updateSelectedElement,
}: PODTextToolProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-md">
      <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">إضافة نص مخصص:</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="اكتب العبارة أو الشعار..."
          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
        <button
          type="button"
          onClick={handleAddText}
          className="px-4 py-2.5 rounded-xl btn-crimson text-white font-bold text-xs shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">لون الخط:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                updateSelectedElement({ color: e.target.value });
              }}
              className="w-8 h-8 rounded-lg border-0 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold">{textColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">نوع الخط:</label>
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              updateSelectedElement({ fontFamily: e.target.value });
            }}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-medium"
          >
            <option value="sans-serif">عصري قياسي</option>
            <option value="Arial Black">عريض قوي</option>
            <option value="serif">كلاسيك رسمي</option>
            <option value="monospace">كود رقمي</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PODTextTool;
