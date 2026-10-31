"use client";

import React, { useMemo } from "react";
import { Sparkles, Maximize2, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface ProductGalleryProps {
  imagesList: string[];
  activeImageIdx: number;
  setActiveImageIdx: (idx: number) => void;
  badge?: string;
  title: string;
  selectedColorName: string;
  onOpenFullscreen: () => void;
}

export default function ProductGallery({
  imagesList,
  activeImageIdx,
  setActiveImageIdx,
  badge,
  title,
  selectedColorName,
  onOpenFullscreen,
}: ProductGalleryProps) {
  const activeImage = imagesList[activeImageIdx] || imagesList[0];

  const handleNext = () => {
    setActiveImageIdx((activeImageIdx + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setActiveImageIdx((activeImageIdx - 1 + imagesList.length) % imagesList.length);
  };

  // Human friendly perspective labels
  const perspectiveLabels = useMemo(() => {
    return imagesList.map((url, idx) => {
      const lower = (url || "").toLowerCase();
      if (lower.includes("index") || lower.includes("cutout")) return "مخطط الشكل والقص (Cutout)";
      if (lower.includes("cover")) return "الموك اب الأساسي (Cover)";
      if (lower.includes("gallery_1") || lower.includes("gallery-1")) return "نموذج واقعي 1 (Example 1)";
      if (lower.includes("gallery_2") || lower.includes("gallery-2")) return "نموذج واقعي 2 (Example 2)";
      if (lower.includes("gallery_3") || lower.includes("gallery-3")) return "نموذج واقعي 3 (Example 3)";
      if (lower.includes("gallery_4") || lower.includes("gallery-4")) return "نموذج واقعي 4 (Example 4)";

      if (imagesList.length === 3) {
        return idx === 0
          ? "المنظور 1 - الواجهة الأمامية (Front View)"
          : idx === 1
          ? "المنظور 2 - الزاوية العلوية 3/4 (Elevated Angle)"
          : "المنظور 3 - المقبض والجانب (Side View)";
      }
      return idx === 0 ? "الشكل والقص" : `نموذج واقعي ${idx}`;
    });
  }, [imagesList]);

  return (
    <div className="space-y-4 select-none">
      {/* 1. Main Visual Viewport */}
      <div className="relative rounded-[2.5rem] bg-[#ECEAE6] dark:bg-[#16171b] border border-slate-200/90 dark:border-white/[0.08] shadow-lg overflow-hidden aspect-square flex items-center justify-center p-4 sm:p-8 select-none group transition-all duration-300">
        {/* Floating Top Controls Bar */}
        <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20 pointer-events-none">
          {/* Badge */}
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white border border-white/15 text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{badge || "خامة فندقية فاخرة ✨"}</span>
          </div>

          {/* Active Angle Badge & Fullscreen */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {imagesList.length > 1 && (
              <span className="px-3 py-1.5 rounded-full bg-slate-900/80 text-white border border-white/10 text-[11px] font-mono font-bold shadow-sm">
                {activeImageIdx + 1} / {imagesList.length}
              </span>
            )}
            <button
              type="button"
              onClick={onOpenFullscreen}
              className="p-2.5 rounded-full bg-white/95 dark:bg-[#1f2127]/95 hover:bg-white text-slate-800 dark:text-white transition-transform cursor-pointer border border-slate-200 dark:border-white/20 shadow-md hover:scale-105 active:scale-95"
              title="تكبير الصورة بجودة Ultra HD"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Perspective Pill in Center Top */}
        {perspectiveLabels[activeImageIdx] && (
          <div className="absolute top-16 inset-x-0 mx-auto w-fit z-20 pointer-events-none transition-opacity duration-200">
            <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#202228]/95 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-white/10 text-[10px] font-bold shadow-xs">
              {perspectiveLabels[activeImageIdx]}
            </span>
          </div>
        )}

        {/* Main High-Res Mockup Image */}
        <div
          className="w-full h-full flex items-center justify-center cursor-zoom-in"
          onClick={onOpenFullscreen}
        >
          <img
            src={activeImage}
            alt={`${title} - ${selectedColorName} - ${perspectiveLabels[activeImageIdx] || ""}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        {/* Navigation Arrows */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-[#1f2127]/95 hover:bg-white text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 transition-transform cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
              title="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-[#1f2127]/95 hover:bg-white text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 transition-transform cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg"
              title="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Pagination Dots Indicator */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-2 z-20 pointer-events-none">
            {imagesList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`pointer-events-auto h-2 rounded-full transition-all cursor-pointer ${
                  activeImageIdx === idx
                    ? "w-8 bg-[#c93b41] shadow-md"
                    : "w-2.5 bg-black/25 dark:bg-white/30 hover:bg-black/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Interactive Thumbnails Strip with Angle Labels */}
      {imagesList.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
          {imagesList.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIdx(idx)}
              className={`relative rounded-2xl overflow-hidden border p-2 transition-all duration-200 cursor-pointer bg-[#ECEAE6] dark:bg-[#16171b] flex flex-col items-center justify-between text-center gap-1.5 ${
                activeImageIdx === idx
                  ? "ring-2 ring-[#c93b41] ring-offset-2 dark:ring-offset-[#1d1d1d] border-transparent shadow-md scale-[1.02]"
                  : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="aspect-[4/3] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={imgUrl}
                  alt={`زاوية ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-1 transition-transform duration-200 hover:scale-105"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate w-full px-1">
                {perspectiveLabels[idx]?.split("(")[0]?.trim() || `المنظور ${idx + 1}`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
