"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConfiguratorLayerOption } from "@/lib/db";

interface StudioLayerTransformSectionProps {
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
}

export default function StudioLayerTransformSection({
  activeOption,
  updateActiveOption,
}: StudioLayerTransformSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!activeOption) return null;

  return (
    <div className="border-b border-[#22242b] pb-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
      >
        <span className="text-[11px] font-bold text-slate-200">TRANSFORM & POSITION</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="pt-2 space-y-3">
          {/* Coordinates X & Y */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">Position X (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={activeOption.x ?? 50}
                onChange={(e) => updateActiveOption({ x: Number(e.target.value) })}
                className="w-full mt-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">Position Y (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={activeOption.y ?? 50}
                onChange={(e) => updateActiveOption({ y: Number(e.target.value) })}
                className="w-full mt-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Width & Height */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">Width (%)</label>
              <input
                type="number"
                min="5"
                max="100"
                value={activeOption.width ?? 80}
                onChange={(e) => updateActiveOption({ width: Number(e.target.value) })}
                className="w-full mt-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">Height (%)</label>
              <input
                type="number"
                min="5"
                max="100"
                value={activeOption.height ?? 80}
                onChange={(e) => updateActiveOption({ height: Number(e.target.value) })}
                className="w-full mt-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Z-Index & Opacity */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">Z-Index (Layer Order)</label>
              <input
                type="number"
                min="1"
                max="99"
                value={activeOption.zIndex ?? 1}
                onChange={(e) => updateActiveOption({ zIndex: Number(e.target.value) })}
                className="w-full mt-1 px-2.5 py-1.5 bg-[#101114] border border-[#22242a] rounded text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#9da3af] font-semibold text-[11px] block">
                Opacity ({Math.round((activeOption.opacity ?? 1) * 100)}%)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={activeOption.opacity ?? 1}
                onChange={(e) => updateActiveOption({ opacity: Number(e.target.value) })}
                className="w-full mt-3.5 accent-[#00e5ff] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
