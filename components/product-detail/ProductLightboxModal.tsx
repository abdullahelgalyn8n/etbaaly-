"use client";

import React, { useEffect } from "react";
import { Minus, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeImage: string;
  activeImageIdx: number;
  setActiveImageIdx: (idx: number) => void;
  imagesList: string[];
  productTitle: string;
  selectedColorName: string;
  zoomScale: number;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductLightboxModal({
  isOpen,
  onClose,
  activeImage,
  activeImageIdx,
  setActiveImageIdx,
  imagesList,
  productTitle,
  selectedColorName,
  zoomScale,
  setZoomScale,
}: ProductLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActiveImageIdx((activeImageIdx - 1 + imagesList.length) % imagesList.length);
      }
      if (e.key === "ArrowRight") {
        setActiveImageIdx((activeImageIdx + 1) % imagesList.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeImageIdx, imagesList.length, onClose, setActiveImageIdx]);

  if (!isOpen) return null;

  const handlePrev = () => {
    setActiveImageIdx((activeImageIdx - 1 + imagesList.length) % imagesList.length);
  };

  const handleNext = () => {
    setActiveImageIdx((activeImageIdx + 1) % imagesList.length);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-30">
        <div className="text-white text-xs sm:text-sm font-bold truncate max-w-[300px]">
          {productTitle} - {selectedColorName} (صورة {activeImageIdx + 1} من {imagesList.length})
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setZoomScale((s) => Math.max(0.8, Number((s - 0.2).toFixed(1))))}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
            title="تصغير"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-xs font-mono font-bold text-white min-w-[50px] text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale((s) => Math.min(2.5, Number((s + 0.2).toFixed(1))))}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold cursor-pointer transition-colors"
            title="تكبير"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-2xl bg-white/10 hover:bg-red-600 text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs font-bold"
          title="إغلاق (Esc)"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">إغلاق (Esc)</span>
        </button>
      </div>

      {/* Central Image */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden py-4">
        <div
          className="relative max-w-[85vw] max-h-[75vh] transition-transform duration-300"
          style={{ transform: `scale(${zoomScale})` }}
        >
          <img
            src={activeImage}
            alt={productTitle}
            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Chevrons */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer hover:scale-110 shadow-xl"
              title="السابق"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer hover:scale-110 shadow-xl"
              title="التالي"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnails */}
      {imagesList.length > 1 && (
        <div className="flex items-center justify-center gap-2 z-30 max-w-xl mx-auto w-full">
          {imagesList.map((thumbUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIdx(idx)}
              className={`w-14 h-14 rounded-xl overflow-hidden border p-1 transition-all cursor-pointer bg-white/5 ${
                activeImageIdx === idx
                  ? "ring-2 ring-[#c93b41] border-[#c93b41] scale-110"
                  : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={thumbUrl}
                alt={`زاوية ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
