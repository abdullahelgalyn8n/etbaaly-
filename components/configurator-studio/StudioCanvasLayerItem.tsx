"use client";

import React from "react";
import { ConfiguratorLayerOption } from "@/lib/db";

interface StudioCanvasLayerItemProps {
  opt: ConfiguratorLayerOption;
  groupId: string;
  isSelected: boolean;
  isLocked: boolean;
  onMouseDown: (e: React.MouseEvent, optId: string, grpId: string) => void;
  onStartResize: (handle: "se" | "sw" | "ne" | "nw", clientX: number, clientY: number) => void;
}

export function StudioCanvasLayerItem({
  opt,
  groupId,
  isSelected,
  isLocked,
  onMouseDown,
  onStartResize,
}: StudioCanvasLayerItemProps) {
  return (
    <div
      onMouseDown={(e) => onMouseDown(e, opt.id, groupId)}
      className={`absolute transition-shadow ${
        isSelected
          ? "ring-2 ring-[#00e5ff] shadow-2xl cursor-move z-30"
          : isLocked
          ? "cursor-not-allowed"
          : "cursor-pointer hover:ring-1 hover:ring-white/40"
      }`}
      style={{
        left: `${opt.x}%`,
        top: `${opt.y}%`,
        width: `${opt.width}%`,
        height: `${opt.height}%`,
        transform: "translate(-50%, -50%)",
        zIndex: opt.zIndex || 1,
        backgroundColor:
          opt.imageUrl
            ? "transparent"
            : opt.controlType === "color"
            ? opt.colorHex || "#C93B41"
            : undefined,
        borderRadius: "6px",
        opacity: opt.opacity ?? 1,
      }}
    >
      {/* Real Image Mockup */}
      {opt.imageUrl && (
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <img
            src={opt.imageUrl}
            alt={opt.name}
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
          />
        </div>
      )}

      {/* Inner Layer Mockup for Icons */}
      {opt.controlType === "icon" && !opt.imageUrl && (
        <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-xs rounded border border-white/10 overflow-hidden">
          {opt.iconUrl?.startsWith("http") || opt.iconUrl?.startsWith("blob:") || opt.iconUrl?.startsWith("/") ? (
            <img src={opt.iconUrl} alt={opt.name} className="w-full h-full object-contain pointer-events-none" />
          ) : (
            <span className="text-3xl select-none">{opt.iconUrl || "🖼️"}</span>
          )}
        </div>
      )}

      {/* Text / Safe Area */}
      {opt.controlType === "inline_text" && (
        <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs bg-black/20 rounded px-2 border-2 border-dashed border-cyan-400/60 shadow-xs">
          {opt.name || "مساحة النص المخصص"}
        </div>
      )}

      {/* Bounding Box Info & Resize Handles */}
      {isSelected && (
        <>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 border border-[#00e5ff] text-[#00e5ff] font-mono text-[10px] rounded whitespace-nowrap pointer-events-none z-40">
            X: {opt.x}% | Y: {opt.y}% | {opt.width}×{opt.height}%
          </div>

          {(["se", "sw", "ne", "nw"] as const).map((handle) => (
            <div
              key={handle}
              onMouseDown={(e) => {
                e.stopPropagation();
                onStartResize(handle, e.clientX, e.clientY);
              }}
              className={`absolute w-3 h-3 bg-[#00e5ff] border border-black rounded-xs z-40 cursor-${handle}-resize ${
                handle === "se" ? "-bottom-1.5 -right-1.5" :
                handle === "sw" ? "-bottom-1.5 -left-1.5" :
                handle === "ne" ? "-top-1.5 -right-1.5" : "-top-1.5 -left-1.5"
              }`}
            />
          ))}
        </>
      )}
    </div>
  );
}
