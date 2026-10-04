"use client";

import React from "react";
import BrandedImage from "@/components/BrandedImage";
import {
  X,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { PortfolioItem } from "@/data/servicesData";

interface PortfolioLightboxModalProps {
  activeItem: PortfolioItem;
  selectedIndex: number;
  totalItems: number;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PortfolioLightboxModal({
  activeItem,
  selectedIndex,
  totalItems,
  zoomLevel,
  setZoomLevel,
  onClose,
  onPrev,
  onNext,
}: PortfolioLightboxModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Modal Header Bar */}
      <div
        className="flex items-center justify-between text-white border-b border-white/10 pb-4 z-20 max-w-7xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/10">
            {selectedIndex + 1} / {totalItems}
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black truncate max-w-md sm:max-w-xl">
              {activeItem.title}
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              العميل: {activeItem.client}
            </span>
          </div>
        </div>

        {/* Controls: Zoom & Close */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="تصغير (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="إعادة ضبط (Reset)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="تكبير (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#c93b41] text-white border border-white/10 transition-colors shadow-lg"
            title="إغلاق (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal Main Viewport with Navigation */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden w-full max-w-7xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button (Right side in RTL) */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#c93b41] text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110 shadow-2xl"
          title="العمل السابق"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Canvas with dynamic zoom */}
        <div
          className="relative w-full h-full max-h-[75vh] flex items-center justify-center transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <BrandedImage
            src={activeItem.image}
            alt={activeItem.title}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Next Button (Left side in RTL) */}
        <button
          type="button"
          onClick={onNext}
          className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#c93b41] text-white border border-white/15 backdrop-blur-md transition-all hover:scale-110 shadow-2xl"
          title="العمل التالي"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Footer Description */}
      <div
        className="bg-black/60 border border-white/10 rounded-2xl p-4 sm:p-5 max-w-4xl w-full mx-auto text-white backdrop-blur-md z-20 space-y-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#c93b41] bg-[#c93b41]/20 px-3 py-1 rounded-full border border-[#c93b41]/30">
            {activeItem.result}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeItem.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {activeItem.description}
        </p>
      </div>
    </div>
  );
}
