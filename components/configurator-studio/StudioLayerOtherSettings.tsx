"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConfiguratorGroup, ConfiguratorLayerOption, ConfiguratorView } from "@/lib/db";

interface StudioLayerOtherSettingsProps {
  activeGroup?: ConfiguratorGroup;
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
  onGroupPatch: (patch: Partial<ConfiguratorGroup>) => void;
  views: ConfiguratorView[];
}

export function StudioLayerOtherSettings({
  activeGroup,
  activeOption,
  updateActiveOption,
  onGroupPatch,
  views,
}: StudioLayerOtherSettingsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-3 space-y-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
      >
        <span className="text-[11px] font-bold text-slate-200">OTHER SETTINGS</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {open && (
        <div className="pt-2 space-y-3.5">
          {/* Initial State */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Initial State</label>
            <select
              value={activeGroup?.initialState || "open"}
              onChange={(e) => onGroupPatch({ initialState: e.target.value as any })}
              className="w-full px-3 py-2 bg-[#101114] border border-[#22242a] rounded text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="open">Choose Initial State</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <p className="text-[11px] text-[#656b78] pt-0.5">Choose the initial state</p>
          </div>

          {/* Description */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Description</label>
            <textarea
              rows={3}
              value={activeGroup?.description || ""}
              onChange={(e) => onGroupPatch({ description: e.target.value })}
              className="w-full p-2 bg-[#101114] border border-[#22242a] rounded text-white text-xs focus:outline-none focus:border-cyan-400 resize-y"
            />
          </div>

          {/* Required */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Required</label>
            <label className="flex items-center gap-2 cursor-pointer text-[#656b78] hover:text-white pt-0.5">
              <input
                type="checkbox"
                checked={activeGroup?.required || false}
                onChange={(e) => onGroupPatch({ required: e.target.checked })}
                className="rounded border-[#22242a] bg-[#101114] text-cyan-400 focus:ring-0"
              />
              <span className="text-[11px]">Is this required?</span>
            </label>
          </div>

          {/* Multiple */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Multiple</label>
            <label className="flex items-center gap-2 cursor-pointer text-[#656b78] hover:text-white pt-0.5">
              <input
                type="checkbox"
                checked={activeGroup?.multiple || false}
                onChange={(e) => onGroupPatch({ multiple: e.target.checked })}
                className="rounded border-[#22242a] bg-[#101114] text-cyan-400 focus:ring-0"
              />
              <span className="text-[11px]">Allow multiple selection?</span>
            </label>
          </div>

          {/* Hide Control */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Hide Control</label>
            <label className="flex items-center gap-2 cursor-pointer text-[#656b78] hover:text-white pt-0.5">
              <input
                type="checkbox"
                checked={activeGroup?.hideControl || false}
                onChange={(e) => onGroupPatch({ hideControl: e.target.checked })}
                className="rounded border-[#22242a] bg-[#101114] text-cyan-400 focus:ring-0"
              />
              <span className="text-[11px]">Hide this and child layers in controls</span>
            </label>
          </div>

          {/* Target View (viewId) */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Target View (المنظور المستهدف)</label>
            <select
              value={activeOption?.viewId || ""}
              onChange={(e) => updateActiveOption({ viewId: e.target.value || undefined })}
              className="w-full px-3 py-2 bg-[#101114] border border-[#22242a] rounded text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="">كل المناظير (All Views)</option>
              {views.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#656b78] leading-snug pt-0.5">
              تحديد المنظور الذي تظهر فيه هذه الطبقة حصراً
            </p>
          </div>

          {/* Switch View */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Switch View</label>
            <select
              value={activeOption?.switchViewId || ""}
              onChange={(e) => updateActiveOption({ switchViewId: e.target.value || undefined })}
              className="w-full px-3 py-2 bg-[#101114] border border-[#22242a] rounded text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="">Select View</option>
              {views.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#656b78] leading-snug pt-0.5">
              Switch to selected view when user click this control
            </p>
          </div>

          {/* Custom Class */}
          <div className="space-y-0.5">
            <label className="text-[#9da3af] font-semibold block text-xs">Custom Class</label>
            <input
              type="text"
              value={activeGroup?.customClass || ""}
              onChange={(e) => onGroupPatch({ customClass: e.target.value })}
              className="w-full px-3 py-2 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
