import React from "react";
import { HardDrive, Cloud } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";

interface MediaStorageInfoCardProps {
  asset: MediaAsset;
}

export function MediaStorageInfoCard({ asset }: MediaStorageInfoCardProps) {
  return (
    <div className="p-3 bg-slate-50 dark:bg-[#1a1c20] rounded-xl border border-slate-200/60 dark:border-white/5 space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-[11px]">مكان التخزين:</span>
        {asset.storageType === "local" ? (
          <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <HardDrive className="w-3 h-3" /> كود الموقع (Static Repo)
          </span>
        ) : (
          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Cloud className="w-3 h-3" /> سحابي / قاعدة بيانات
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">اسم الملف:</span>
        <span className="font-mono text-slate-700 dark:text-slate-300">{asset.filename}</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">الحجم والصيغة:</span>
        <span className="text-slate-700 dark:text-slate-300">
          {asset.fileSizeKb} KB ({asset.mimeType})
        </span>
      </div>
    </div>
  );
}

export default MediaStorageInfoCard;
