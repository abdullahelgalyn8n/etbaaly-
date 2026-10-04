"use client";

import React from "react";

interface StudioCanvasZoomProps {
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

export function StudioCanvasZoom({ zoomLevel, setZoomLevel }: StudioCanvasZoomProps) {
  return (
    <div className="absolute bottom-4 right-4 z-40 bg-[#1e2026]/90 backdrop-blur-xs border border-[#30333d] rounded-xl px-2.5 py-1.5 flex items-center gap-2 shadow-2xl text-[11px] font-mono text-slate-300">
      <button
        type="button"
        onClick={() => setZoomLevel((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white font-bold cursor-pointer transition-colors"
        title="Zoom Out"
      >
        -
      </button>
      <span className="min-w-[42px] text-center font-bold text-cyan-400 select-none">
        {Math.round(zoomLevel * 100)}%
      </span>
      <button
        type="button"
        onClick={() => setZoomLevel((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white font-bold cursor-pointer transition-colors"
        title="Zoom In"
      >
        +
      </button>
      <div className="w-[1px] h-3.5 bg-[#3a3d47]" />
      <button
        type="button"
        onClick={() => setZoomLevel(1)}
        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
          zoomLevel === 1
            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
            : "hover:bg-white/10 text-slate-300"
        }`}
      >
        Fit
      </button>
    </div>
  );
}
