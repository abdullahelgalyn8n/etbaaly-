import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ConfiguratorGroup } from "@/lib/db";

interface ConfiguratorGroupControlProps {
  group: ConfiguratorGroup;
  activeOptId: string;
  onSelectOption: (groupId: string, optionId: string) => void;
  customTexts: Record<string, string>;
  onCustomTextChange: (optionId: string, val: string) => void;
}

export function ConfiguratorGroupControl({
  group,
  activeOptId,
  onSelectOption,
  customTexts,
  onCustomTextChange,
}: ConfiguratorGroupControlProps) {
  return (
    <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-800 dark:text-slate-200">{group.title}</span>
        <span className="text-[#c93b41] text-[11px] font-medium">(edit)</span>
      </div>

      {/* Color Swatches */}
      {group.controlType === "color" && (
        <div className="flex flex-wrap gap-2 pt-1">
          {group.options.map((opt) => {
            const isSelected = activeOptId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(group.id, opt.id)}
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl cursor-pointer transition-all duration-200 shadow-xs border-2 ${
                  isSelected
                    ? "border-[#c93b41] ring-3 ring-[#c93b41]/25 scale-105"
                    : "border-slate-200 dark:border-white/10 hover:border-slate-400"
                }`}
                style={{ backgroundColor: opt.colorHex || "#C93B41" }}
                title={`${opt.name} ${opt.priceAdd > 0 ? `(+${opt.priceAdd} ج.م)` : ""}`}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                    <CheckCircle2 className="w-4 h-4 fill-black/30" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Finishing / Icon Options */}
      {group.controlType === "icon" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {group.options.map((opt) => {
            const isSelected = activeOptId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(group.id, opt.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#c93b41]/10 border-[#c93b41] text-[#c93b41] shadow-xs"
                    : "bg-white dark:bg-[#181a1f] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }`}
              >
                <span className="text-xl">{opt.iconUrl || "✨"}</span>
                <span className="text-[11px] text-center leading-tight line-clamp-1">{opt.name}</span>
                {opt.priceAdd > 0 && (
                  <span className="text-[10px] text-emerald-500 font-mono">+{opt.priceAdd} ج.م</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Text / Engraving Input */}
      {group.controlType === "inline_text" && (
        <div className="pt-1">
          {group.options.map((opt) => (
            <div key={opt.id} className="space-y-1">
              <input
                type="text"
                value={customTexts[opt.id] || ""}
                onChange={(e) => onCustomTextChange(opt.id, e.target.value)}
                placeholder="اكتب الاسم أو النص للحفر الفوري على المنتج..."
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#181a1f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConfiguratorGroupControl;
