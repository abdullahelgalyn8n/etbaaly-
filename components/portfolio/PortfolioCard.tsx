"use client";

import React from "react";
import BrandedImage from "@/components/BrandedImage";
import { Maximize2, Sparkles } from "lucide-react";
import { PortfolioItem } from "@/data/servicesData";

interface PortfolioCardProps {
  item: PortfolioItem;
  idx: number;
  onOpen: (index: number) => void;
}

export default function PortfolioCard({ item, idx, onOpen }: PortfolioCardProps) {
  return (
    <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/50 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Media Container with Exact 4:5 Frame */}
        <div
          onClick={() => onOpen(idx)}
          className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-[#15171c] cursor-pointer select-none border-b border-slate-200 dark:border-white/[0.06]"
          role="button"
          tabIndex={0}
          aria-label={`تكبير صورة: ${item.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpen(idx);
          }}
        >
          {/* Main Artwork with Edge-to-Edge 4:5 Fit */}
          <BrandedImage
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            loading="lazy"
            className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Floating Metric Result Badge */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#c93b41] px-3.5 py-1.5 rounded-full shadow-lg border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{item.result}</span>
            </span>
          </div>

          {/* Hover Click-to-Zoom Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px] z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/20 text-white text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Maximize2 className="w-4 h-4 text-[#c93b41]" />
              <span>انقر للمشاهدة والتكبير بدقة عالية</span>
            </div>
          </div>
        </div>

        {/* Card Body Information */}
        <div className="p-6 space-y-3">
          <div className="text-xs font-bold text-slate-500 dark:text-[#a8abb4]">
            العميل: <span className="text-slate-950 dark:text-white font-bold">{item.client}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-[#c93b41] transition-colors line-clamp-2">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a8abb4] leading-relaxed line-clamp-3 font-medium">
            {item.description}
          </p>
        </div>
      </div>

      {/* Tags & Action Button */}
      <div className="p-6 pt-0 space-y-4">
        <div className="flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-white/[0.06] pt-3">
          {item.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-slate-300 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onOpen(idx)}
          type="button"
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#282a30] dark:hover:bg-[#32353d] text-slate-900 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/[0.08]"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#c93b41]" />
          <span>عرض العمل مكبراً (Full Preview)</span>
        </button>
      </div>
    </div>
  );
}
