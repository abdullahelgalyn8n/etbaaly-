"use client";

import React, { RefObject, useState } from "react";
import { ConfiguratorGroup, ConfiguratorHotspot, ConfiguratorLayerOption } from "@/lib/db";
import { calculateDragPosition, calculateResizedDimensions } from "./canvasMath";
import { StudioCanvasLayerItem } from "./StudioCanvasLayerItem";
import { StudioCanvasZoom } from "./StudioCanvasZoom";

interface StudioCanvasProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  isHotspotMode: boolean;
  handleCanvasClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  groups: ConfiguratorGroup[];
  activeViewId: string;
  selectedOptionId: string;
  setSelectedGroupId: (id: string) => void;
  setSelectedOptionId: (id: string) => void;
  hotspots: ConfiguratorHotspot[];
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption?: (patch: Partial<ConfiguratorLayerOption>) => void;
  hiddenGroupIds?: string[];
  hiddenOptionIds?: string[];
  lockedOptionIds?: string[];
}

export default function StudioCanvas({
  canvasRef,
  isHotspotMode,
  handleCanvasClick,
  groups,
  activeViewId,
  selectedOptionId,
  setSelectedGroupId,
  setSelectedOptionId,
  hotspots,
  activeOption,
  updateActiveOption,
  hiddenGroupIds = [],
  hiddenOptionIds = [],
  lockedOptionIds = [],
}: StudioCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [resizingHandle, setResizingHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ clientX: number; clientY: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleMouseDown = (e: React.MouseEvent, optId: string, grpId: string) => {
    if (isHotspotMode) return;
    e.stopPropagation();
    setSelectedGroupId(grpId);
    setSelectedOptionId(optId);

    if (lockedOptionIds.includes(optId)) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !activeOption || !updateActiveOption) return;
    const rect = canvasRef.current.getBoundingClientRect();

    if (isDragging) {
      const pos = calculateDragPosition(e.clientX, e.clientY, rect);
      updateActiveOption({ x: pos.x, y: pos.y });
    } else if (resizingHandle && dragStart) {
      const dx = ((e.clientX - dragStart.clientX) / rect.width) * 100;
      const dy = ((e.clientY - dragStart.clientY) / rect.height) * 100;
      const dims = calculateResizedDimensions(
        resizingHandle as any,
        dx,
        dy,
        activeOption.width,
        activeOption.height
      );
      updateActiveOption({ width: dims.width, height: dims.height });
      setDragStart({ clientX: e.clientX, clientY: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizingHandle(null);
    setDragStart(null);
  };

  return (
    <main
      className="flex-1 flex flex-col bg-[#121316] relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Horizontal Pixel Ruler (0 to 1200px) */}
      <div className="h-6 bg-[#181a1f] border-b border-[#26282f] flex items-end pl-6 pr-4 shrink-0 overflow-hidden">
        <div className="flex text-[9px] font-mono text-slate-500 w-full justify-between items-end pb-0.5">
          {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((t) => (
            <div key={t} className="flex flex-col items-center">
              <span className="leading-none">{t}</span>
              <div className="h-1.5 w-[1px] bg-[#333640] mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Vertical Pixel Ruler (0 to 900px) */}
        <div className="w-6 bg-[#181a1f] border-r border-[#26282f] flex flex-col justify-between py-4 text-[9px] font-mono text-slate-500 shrink-0 items-center">
          {[0, 150, 300, 450, 600, 750, 900].map((t) => (
            <div key={t} className="flex items-center gap-0.5">
              <span className="transform -rotate-90 origin-center leading-none">{t}</span>
              <div className="w-1.5 h-[1px] bg-[#333640]" />
            </div>
          ))}
        </div>

        {/* Central Stage Area */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-auto relative">
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`relative rounded-xl shadow-2xl border border-[#353945] overflow-hidden transition-transform duration-100 ${
              isHotspotMode ? "cursor-crosshair ring-2 ring-cyan-400" : "cursor-default"
            }`}
            style={{
              width: "min(calc(100vw - 640px), calc(100vh - 90px))",
              height: "min(calc(100vw - 640px), calc(100vh - 90px))",
              maxWidth: "1200px",
              maxHeight: "1200px",
              aspectRatio: "1 / 1",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
              backgroundImage: `
                linear-gradient(45deg, #1c1e24 25%, transparent 25%),
                linear-gradient(-45deg, #1c1e24 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #1c1e24 75%),
                linear-gradient(-45deg, transparent 75%, #1c1e24 75%)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              backgroundColor: "#15161b",
            }}
          >
            {/* Visual Layers */}
            {groups.map((grp) => {
              if (hiddenGroupIds.includes(grp.id)) return null;

              // Filter options matching active view
              const viewOptions = grp.options.filter(
                (opt) => opt.viewId === activeViewId || !opt.viewId
              );
              if (viewOptions.length === 0) return null;

              // Find globally selected option to match variants across groups/views
              const allOptions = groups.flatMap((g) => g.options);
              const globallySelectedOpt = allOptions.find((o) => o.id === selectedOptionId);

              // For single-choice groups (e.g. color), determine the active single option
              let visibleOptions = viewOptions;
              if (!grp.multiple || grp.controlType === "color") {
                let activeOpt = viewOptions.find((o) => o.id === selectedOptionId);

                if (!activeOpt && globallySelectedOpt) {
                  // Match by color hex or name for current view
                  activeOpt = viewOptions.find(
                    (o) =>
                      (globallySelectedOpt.colorHex &&
                        o.colorHex &&
                        o.colorHex.toLowerCase() === globallySelectedOpt.colorHex.toLowerCase()) ||
                      (o.name &&
                        globallySelectedOpt.name &&
                        o.name.split("(")[0]?.trim() ===
                          globallySelectedOpt.name.split("(")[0]?.trim())
                  );
                }

                if (!activeOpt) {
                  activeOpt = viewOptions.find((o) => o.activeOnLoad) || viewOptions[0];
                }

                visibleOptions = activeOpt ? [activeOpt] : [];
              }

              return visibleOptions
                .filter((opt) => !hiddenOptionIds.includes(opt.id))
                .map((opt) => (
                  <StudioCanvasLayerItem
                    key={opt.id}
                    opt={opt}
                    groupId={grp.id}
                    isSelected={opt.id === selectedOptionId}
                    isLocked={lockedOptionIds.includes(opt.id)}
                    onMouseDown={handleMouseDown}
                    onStartResize={(handle, clientX, clientY) => {
                      setResizingHandle(handle);
                      setDragStart({ clientX, clientY });
                    }}
                  />
                ));
            })}

            {/* Hotspots */}
            {hotspots
              .filter((hs) => hs.viewId === activeViewId)
              .map((hs) => (
                <div
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupId(hs.targetGroupId);
                  }}
                  className="absolute z-40 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-cyan-400 opacity-75" />
                    <div className="relative w-6 h-6 rounded-full bg-[#00e5ff] text-black font-black flex items-center justify-center text-xs shadow-lg border-2 border-white">
                      +
                    </div>
                  </div>
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black/95 text-white text-[11px] font-bold rounded shadow-xl whitespace-nowrap z-50">
                    {hs.title}
                  </div>
                </div>
              ))}
          </div>

          {/* Floating Zoom Controls */}
          <StudioCanvasZoom zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
        </div>
      </div>
    </main>
  );
}
