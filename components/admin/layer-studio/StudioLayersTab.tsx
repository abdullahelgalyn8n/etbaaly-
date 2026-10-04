"use client";

import React from "react";
import { Layers, Plus, Trash2, Image as ImageIcon, Type, Move } from "lucide-react";
import { ProductLayer } from "@/lib/db";

interface StudioLayersTabProps {
  layers: ProductLayer[];
  selectedLayerId: string;
  onSelectLayer: (id: string) => void;
  onAddLayer: (type: ProductLayer["type"]) => void;
  onDeleteLayer: (id: string) => void;
  onUpdateSelectedLayer: (updates: Partial<ProductLayer>) => void;
}

export function StudioLayersTab({
  layers,
  selectedLayerId,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onUpdateSelectedLayer,
}: StudioLayersTabProps) {
  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  return (
    <div className="space-y-4">
      {/* Layer Stack */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.08]">
          <span className="text-xs font-bold text-slate-900 dark:text-white">ترتيب الطبقات (Z-Index):</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onAddLayer("customer_photo_slot")}
              className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-[#c93b41] text-[11px] font-bold cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>منطقة صورة</span>
            </button>
            <button
              type="button"
              onClick={() => onAddLayer("customer_text_slot")}
              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-[11px] font-bold cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>منطقة نص</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {layers.map((layer) => {
            const isSelected = selectedLayerId === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => onSelectLayer(layer.id)}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "border-[#c93b41] bg-red-500/[0.06] ring-2 ring-red-500/20 text-slate-900 dark:text-white"
                    : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#111] flex items-center justify-center shrink-0">
                    {layer.type === "customer_photo_slot" ? (
                      <ImageIcon className="w-4 h-4 text-[#c93b41]" />
                    ) : layer.type === "customer_text_slot" ? (
                      <Type className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Layers className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{layer.name}</div>
                    <span className="text-[10px] text-slate-700 dark:text-slate-300 font-mono font-medium">
                      نوع: {layer.type} • Z: {layer.zIndex}
                    </span>
                  </div>
                </div>

                {layer.type !== "base_mockup" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLayer(layer.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Layer Configuration Panel */}
      {selectedLayer && (
        <div className="bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/[0.08]">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#c93b41]" />
              إحداثيات وأبعاد: {selectedLayer.name}
            </span>
          </div>

          {/* Position X Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>الموقع الأفقي (Position X):</span>
              <span className="font-mono">{selectedLayer.x}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={selectedLayer.x}
              onChange={(e) => onUpdateSelectedLayer({ x: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41] cursor-pointer"
            />
          </div>

          {/* Position Y Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>الموقع الرأسي (Position Y):</span>
              <span className="font-mono">{selectedLayer.y}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={selectedLayer.y}
              onChange={(e) => onUpdateSelectedLayer({ y: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41] cursor-pointer"
            />
          </div>

          {/* Width & Height Sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>العرض (W):</span>
                <span className="font-mono">{selectedLayer.width}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={selectedLayer.width}
                onChange={(e) => onUpdateSelectedLayer({ width: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>الارتفاع (H):</span>
                <span className="font-mono">{selectedLayer.height}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={selectedLayer.height}
                onChange={(e) => onUpdateSelectedLayer({ height: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 dark:bg-[#111] rounded appearance-none accent-[#c93b41] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
