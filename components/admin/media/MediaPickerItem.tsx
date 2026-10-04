import React from "react";
import { Check } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";

interface MediaPickerItemProps {
  asset: MediaAsset;
  isSelected: boolean;
  onSelect: (asset: MediaAsset) => void;
}

export function MediaPickerItem({ asset, isSelected, onSelect }: MediaPickerItemProps) {
  return (
    <div
      onClick={() => onSelect(asset)}
      className={`relative rounded-2xl overflow-hidden border cursor-pointer group transition-all ${
        isSelected
          ? "border-[#c93b41] ring-2 ring-[#c93b41] shadow-lg"
          : "border-slate-200 dark:border-white/10 hover:border-slate-400"
      }`}
    >
      {/* Badge */}
      <div className="absolute top-1.5 right-1.5 z-10">
        {asset.storageType === "local" ? (
          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[9px] font-bold">
            محلي
          </span>
        ) : (
          <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">
            سحابي
          </span>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-1.5 left-1.5 z-10 w-5 h-5 bg-[#c93b41] text-white rounded-full flex items-center justify-center shadow-md">
          <Check className="w-3 h-3" />
        </div>
      )}

      <div className="aspect-square bg-slate-50 dark:bg-[#18191c] flex items-center justify-center p-2">
        <img
          src={asset.url}
          alt={asset.altText || asset.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-2 bg-white dark:bg-[#202124] border-t border-slate-100 dark:border-white/5">
        <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
          {asset.title || asset.filename}
        </p>
      </div>
    </div>
  );
}

export default MediaPickerItem;
