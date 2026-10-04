"use client";

import React, { useRef, useState } from "react";
import { Maximize2, Minimize2, Camera, Check } from "lucide-react";
import { ConfiguratorGroup, ConfiguratorView } from "@/lib/db";

interface ConfiguratorProductCanvasProps {
  views: ConfiguratorView[];
  activeViewId: string;
  setActiveViewId: (id: string) => void;
  groups: ConfiguratorGroup[];
  selections: Record<string, string>;
  customTexts: Record<string, string>;
  dimensions: { length: string; width: string; height: string };
}

export function ConfiguratorProductCanvas({
  views,
  activeViewId,
  setActiveViewId,
  groups,
  selections,
  customTexts,
  dimensions,
}: ConfiguratorProductCanvasProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedSnapshot, setCopiedSnapshot] = useState(false);

  const toggleFullscreen = () => {
    if (!canvasContainerRef.current) return;
    if (!document.fullscreenElement) {
      canvasContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSnapshot = () => {
    setCopiedSnapshot(true);
    setTimeout(() => setCopiedSnapshot(false), 2000);
  };

  return (
    <div
      ref={canvasContainerRef}
      className="relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[520px] w-full bg-slate-50 dark:bg-[#121316] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-4 sm:p-8 select-none overflow-hidden"
    >
      {/* 1. TOP-LEFT UTILITY ICONS: Fullscreen & Camera (Matching Reference Screenshot) */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#c93b41] hover:border-[#c93b41]/40 flex items-center justify-center shadow-xs cursor-pointer transition-all"
          title="عرض بملء الشاشة"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={handleSnapshot}
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#c93b41] hover:border-[#c93b41]/40 flex items-center justify-center shadow-xs cursor-pointer transition-all"
          title="التقاط لقطة للمعاينة"
        >
          {copiedSnapshot ? <Check className="w-4 h-4 text-emerald-500" /> : <Camera className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. CAMERA VIEWS SWITCHER (Front / Open / Side) */}
      {views.length > 1 && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-white/90 dark:bg-[#1e2026]/90 backdrop-blur-xs p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveViewId(v.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeViewId === v.id
                  ? "bg-[#c93b41] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {v.name.split("(")[0].trim()}
            </button>
          ))}
        </div>
      )}

      {/* 3. DIMENSION MARKERS (Matching Screenshot) */}
      {dimensions.length && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-white/90 dark:bg-black/70 border border-slate-200 dark:border-white/10 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs pointer-events-none z-20">
          {dimensions.length}
        </div>
      )}

      {dimensions.height && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-white/90 dark:bg-black/70 border border-slate-200 dark:border-white/10 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs pointer-events-none z-20">
          {dimensions.height}
        </div>
      )}

      {dimensions.width && (
        <div className="absolute bottom-6 left-1/3 -translate-x-1/2 px-2.5 py-0.5 rounded bg-white/90 dark:bg-black/70 border border-slate-200 dark:border-white/10 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs pointer-events-none z-20">
          {dimensions.width}
        </div>
      )}

      {/* 4. MAIN PRODUCT INTERACTIVE CANVAS STAGE */}
      <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] max-w-full aspect-square flex items-center justify-center transition-all duration-300">
        {groups.map((grp) => {
          const selectedOptionId = selections[grp.id] || grp.options[0]?.id;
          const selectedOption = grp.options.find((o) => o.id === selectedOptionId) || grp.options[0];
          if (!selectedOption) return null;

          // Find matching option for active view
          let viewOption = selectedOption;
          if (selectedOption.viewId && selectedOption.viewId !== activeViewId) {
            const matchingByColor = grp.options.find(
              (o) =>
                (o.viewId === activeViewId || !o.viewId) &&
                ((selectedOption.colorHex && o.colorHex === selectedOption.colorHex) ||
                  o.name === selectedOption.name)
            );
            const fallbackForView = grp.options.find(
              (o) => o.viewId === activeViewId || !o.viewId
            );
            viewOption = matchingByColor || fallbackForView || selectedOption;
          }

          if (viewOption.viewId && viewOption.viewId !== activeViewId) return null;

          return (
            <div
              key={grp.id}
              className="absolute transition-all duration-300 pointer-events-none select-none"
              style={{
                left: `${viewOption.x}%`,
                top: `${viewOption.y}%`,
                width: `${viewOption.width}%`,
                height: `${viewOption.height}%`,
                transform: "translate(-50%, -50%)",
                zIndex: viewOption.zIndex || 1,
                backgroundColor:
                  viewOption.imageUrl
                    ? "transparent"
                    : viewOption.controlType === "color"
                    ? viewOption.colorHex || "#C93B41"
                    : undefined,
                borderRadius: "14px",
                opacity: viewOption.opacity ?? 1,
                boxShadow:
                  !viewOption.imageUrl && viewOption.controlType === "color"
                    ? "0 20px 40px -15px rgba(0,0,0,0.3)"
                    : undefined,
              }}
            >
              {/* Mockup Image Layer */}
              {viewOption.imageUrl && (
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  <img
                    src={viewOption.imageUrl}
                    alt={viewOption.name}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                  />
                </div>
              )}

              {/* Image or Icon Layer */}
              {viewOption.controlType === "icon" && !viewOption.imageUrl && (
                <div className="w-full h-full flex items-center justify-center drop-shadow-lg">
                  {viewOption.iconUrl?.startsWith("http") ||
                  viewOption.iconUrl?.startsWith("/") ||
                  viewOption.iconUrl?.startsWith("blob:") ? (
                    <img
                      src={viewOption.iconUrl}
                      alt={viewOption.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-5xl sm:text-6xl">{viewOption.iconUrl || "✨"}</span>
                  )}
                </div>
              )}

              {/* Custom Text / Engraving Layer */}
              {viewOption.controlType === "inline_text" && (
                <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs sm:text-sm tracking-wider px-3 py-1 bg-black/40 backdrop-blur-xs rounded-lg border border-dashed border-cyan-400/80 text-center shadow-md">
                  {customTexts[viewOption.id] || viewOption.name || "إطبعلي للتغليف"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConfiguratorProductCanvas;
