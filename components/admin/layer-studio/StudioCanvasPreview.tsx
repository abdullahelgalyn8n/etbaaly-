"use client";

import React from "react";
import { Eye, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { ProductColor, ProductLayer } from "@/lib/db";

interface StudioCanvasPreviewProps {
  colors: ProductColor[];
  previewColor: ProductColor;
  setPreviewColor: (c: ProductColor) => void;
  layers: ProductLayer[];
  showLayerBoundaries: boolean;
  setShowLayerBoundaries: (v: boolean) => void;
  testSamplePhoto: string | null;
  onSamplePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testSampleText: string;
  setTestSampleText: (v: string) => void;
}

export function StudioCanvasPreview({
  colors,
  previewColor,
  setPreviewColor,
  layers,
  showLayerBoundaries,
  setShowLayerBoundaries,
  testSamplePhoto,
  onSamplePhotoUpload,
  testSampleText,
  setTestSampleText,
}: StudioCanvasPreviewProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.08]">
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#c93b41]" />
            شاشة المعاينة الحية قبل النشر (Live Merchant Preview)
          </span>
          <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
            جرب الألوان وارفع صورة اختبارية لمطابقة مسار الطباعة.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLayerBoundaries(!showLayerBoundaries)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showLayerBoundaries
                ? "bg-[#c93b41] text-white shadow"
                : "bg-slate-100 dark:bg-[#1c1c1c] text-slate-700 dark:text-slate-300"
            }`}
          >
            {showLayerBoundaries ? "إخفاء حدود الطبقات" : "إظهار حدود الطبقات"}
          </button>
        </div>
      </div>

      {/* Test Color Switcher in Preview */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 shrink-0">معاينة باللون:</span>
        {colors.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setPreviewColor(c)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              previewColor.id === c.id
                ? "border-[#c93b41] bg-red-500/10 text-[#c93b41]"
                : "border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300"
            }`}
          >
            <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.hex }} />
            <span>{c.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Visual Canvas Simulator */}
      <div
        className="relative aspect-square w-full max-w-md mx-auto rounded-3xl border-2 border-slate-200 dark:border-white/[0.1] shadow-2xl p-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: previewColor.hex === "#FFFFFF" ? "#F5F5F7" : "#141416",
        }}
      >
        {/* Product Mockup Body */}
        <div
          className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl shadow-2xl transition-all duration-300 flex flex-col items-center justify-center p-4 border-2 border-black/10 overflow-hidden"
          style={{
            background: previewColor.bgStyle || previewColor.hex,
          }}
        >
          {/* Render Layers */}
          {layers.map((layer) => {
            if (layer.type === "customer_photo_slot") {
              return (
                <div
                  key={layer.id}
                  className={`absolute flex items-center justify-center p-2 transition-all ${
                    showLayerBoundaries ? "border-2 border-dashed border-[#c93b41] rounded-2xl bg-red-500/10" : ""
                  }`}
                  style={{
                    top: `${layer.y}%`,
                    left: `${layer.x}%`,
                    width: `${layer.width}%`,
                    height: `${layer.height}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: layer.zIndex,
                  }}
                >
                  {testSamplePhoto ? (
                    <img
                      src={testSamplePhoto}
                      alt="Sample customer imprint"
                      className="max-h-full max-w-full object-contain drop-shadow"
                    />
                  ) : (
                    <div className="text-center space-y-1 p-1">
                      <ImageIcon className="w-6 h-6 mx-auto text-[#c93b41]" />
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white block leading-tight">
                        [منطقة صورة العميل]
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            if (layer.type === "customer_text_slot") {
              return (
                <div
                  key={layer.id}
                  className={`absolute flex items-center justify-center p-1 transition-all ${
                    showLayerBoundaries ? "border-2 border-dashed border-blue-500 rounded-xl bg-blue-500/10" : ""
                  }`}
                  style={{
                    top: `${layer.y}%`,
                    left: `${layer.x}%`,
                    width: `${layer.width}%`,
                    height: `${layer.height}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: layer.zIndex,
                  }}
                >
                  <span className="text-xs font-black text-white drop-shadow truncate">
                    {testSampleText || layer.defaultText}
                  </span>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Status Overlay */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] text-white font-mono flex items-center gap-1.5 border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>جاهز للعملاء 300 DPI</span>
        </div>
      </div>

      {/* Test Inputs for Admin Preview */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.08] space-y-3">
        <span className="text-xs font-bold text-slate-900 dark:text-white block">
          تجربة المعاينة قبل اعتماد ونشر المنتج:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              ارفع صورة للتجربة:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onSamplePhotoUpload}
              className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:btn-crimson file:text-white cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              اكتب نصاً تجريبياً:
            </label>
            <input
              type="text"
              value={testSampleText}
              onChange={(e) => setTestSampleText(e.target.value)}
              placeholder="اسم العميل..."
              className="w-full p-1.5 rounded-lg bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
