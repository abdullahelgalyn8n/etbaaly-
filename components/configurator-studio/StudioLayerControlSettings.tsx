"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Image as ImageIcon } from "lucide-react";
import { ConfiguratorGroup, ConfiguratorLayerOption } from "@/lib/db";

interface StudioLayerControlSettingsProps {
  activeGroup?: ConfiguratorGroup;
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
  onGroupPatch: (patch: Partial<ConfiguratorGroup>) => void;
}

export function StudioLayerControlSettings({
  activeGroup,
  activeOption,
  updateActiveOption,
  onGroupPatch,
}: StudioLayerControlSettingsProps) {
  const [open, setOpen] = useState(true);
  const [isEditingControlType, setIsEditingControlType] = useState(false);

  return (
    <div className="border-b border-[#22242b] pb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
      >
        <span className="text-[11px] font-bold text-slate-200">CONTROL SETTINGS</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {open && (
        <div className="pt-2 space-y-3">
          {/* Control Type */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[#9da3af] font-semibold text-xs">Control Type</span>
              <span className="text-white font-bold text-xs capitalize ml-1">
                {activeOption?.controlType || activeGroup?.controlType || "Icon"}
              </span>
              <button
                type="button"
                onClick={() => setIsEditingControlType(!isEditingControlType)}
                className="text-white hover:text-cyan-400 p-0.5 cursor-pointer ml-0.5"
                title="Change Control Type"
              >
                <Pencil className="w-3 h-3 inline" />
              </button>
            </div>
            <p className="text-[11px] text-[#656b78]">Choose control type</p>

            {isEditingControlType && (
              <select
                value={activeOption?.controlType || activeGroup?.controlType || "icon"}
                onChange={(e) => {
                  const val = e.target.value as any;
                  if (activeOption) updateActiveOption({ controlType: val });
                  onGroupPatch({ controlType: val });
                  setIsEditingControlType(false);
                }}
                className="w-full px-2 py-1.5 bg-[#101114] border border-cyan-500 rounded text-white text-xs mt-1 cursor-pointer focus:outline-none"
              >
                <option value="icon">Icon</option>
                <option value="color">Color Swatch</option>
                <option value="label">Label</option>
                <option value="inline_text">Inline Text</option>
              </select>
            )}
          </div>

          {/* Color Swatch Picker */}
          {(activeOption?.controlType === "color" || activeGroup?.controlType === "color") && (
            <div className="space-y-1">
              <label className="text-[#9da3af] font-semibold block text-xs">Color Hex</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeOption?.colorHex || "#C93B41"}
                  onChange={(e) => updateActiveOption({ colorHex: e.target.value })}
                  className="w-7 h-7 rounded border border-[#353945] bg-transparent cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={activeOption?.colorHex || "#C93B41"}
                  onChange={(e) => updateActiveOption({ colorHex: e.target.value })}
                  className="flex-1 px-2 py-1 bg-[#101114] border border-[#22242a] rounded font-mono text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* Layer Mockup Image (For Real Photographic Views) */}
          <div className="space-y-1 pt-1 border-t border-[#22242a]">
            <label className="text-[#9da3af] font-semibold block text-xs">Layer Mockup Image (Photo Asset)</label>
            <p className="text-[11px] text-[#656b78]">صورة الزاوية أو الموك اب للطبقة</p>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={activeOption?.imageUrl || ""}
                placeholder="/images/products/..."
                onChange={(e) => updateActiveOption({ imageUrl: e.target.value })}
                className="flex-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded font-mono text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
              <label className="p-2 rounded bg-[#1c1e24] border border-[#2e323e] hover:border-cyan-400 flex items-center justify-center cursor-pointer text-cyan-400 hover:text-white transition-colors" title="رفع صورة جديدة">
                <ImageIcon className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      updateActiveOption({ imageUrl: url });
                    }
                  }}
                />
              </label>
            </div>
            {activeOption?.imageUrl && (
              <div className="mt-1.5 flex items-center gap-2 p-1.5 bg-[#101114] rounded border border-white/10">
                <img
                  src={activeOption.imageUrl}
                  alt="معاينة"
                  className="w-10 h-10 object-contain rounded bg-white/5 p-0.5"
                />
                <span className="text-[10px] text-slate-400 truncate flex-1 font-mono">
                  {activeOption.imageUrl}
                </span>
                <button
                  type="button"
                  onClick={() => updateActiveOption({ imageUrl: undefined })}
                  className="text-red-400 hover:text-red-300 text-[10px] px-1.5 py-0.5 rounded bg-red-950/40"
                >
                  إزالة
                </button>
              </div>
            )}
          </div>

          {/* Control Icon */}
          <div className="space-y-0.5 pt-1 border-t border-[#22242a]">
            <label className="text-[#9da3af] font-semibold block text-xs">Control Icon</label>
            <p className="text-[11px] text-[#656b78] pb-1">Choose an Icon</p>
            <div className="flex items-center gap-2">
              <label className="w-12 h-12 rounded bg-[#101114] border border-[#22242a] hover:border-cyan-400 flex items-center justify-center cursor-pointer text-[#656b78] hover:text-white transition-colors">
                <ImageIcon className="w-5 h-5 text-[#656b78]" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      updateActiveOption({ iconUrl: url });
                    }
                  }}
                />
              </label>
              {activeOption?.iconUrl && (
                <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                  {activeOption.iconUrl}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
