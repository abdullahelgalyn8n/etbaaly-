"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export interface VisualCategoryItem {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  tag: string;
  badge?: string;
}

export const visualCategories: VisualCategoryItem[] = [
  {
    id: "all",
    name: "كافة الأقسام",
    englishName: "All Products",
    icon: "/images/stickermule/02_Stickers_op_maat/Products/16_sticker-packs_stickersets/01_index_sticker-packs.png",
    tag: "48 منتجاً متوفراً",
  },
  {
    id: "استيكرات",
    name: "استيكرات داي-كت",
    englishName: "Custom Stickers",
    icon: "/images/stickermule/02_Stickers_op_maat/Products/04_317_uitgesneden-stickers/01_index_317.png",
    tag: "22 نوعاً ومقاس",
    badge: "الأكثر طلباً ⭐",
  },
  {
    id: "تجهيزات مكاتب ويافط",
    name: "أكريليك ويافط مكاتب",
    englishName: "Acrylic & Office",
    icon: "/images/stickermule/04_Gepersonaliseerde_acrylproducten/Products/06_die-cut-acrylic-signs_contourgesneden-acryl-borden/01_index_die-cut-acrylic-signs.png",
    tag: "يافطات، بوسترات وإطارات",
  },
  {
    id: "علب وتغليف",
    name: "تغليف وشحن وتيب",
    englishName: "Custom Packaging",
    icon: "/images/stickermule/05_Verpakking_op_maat/Products/03_pkg-tp_verpakkingstape/01_index_pkg-tp.png",
    tag: "أشرطة وتغليف بريميوم",
  },
  {
    id: "هدايا شخصية وحفر ليزر",
    name: "بادجات وهدايا ليزر",
    englishName: "Buttons & Gifts",
    icon: "/images/stickermule/07_Buttons_op_maat/Products/01_acrylic-pins_acryl-pins/01_index_acrylic-pins.png",
    tag: "دبابيس، كوسترات وهدايا",
  },
  {
    id: "ملابس وهوديز",
    name: "هوديز وملابس مخصصة",
    englishName: "Hoodies & Merch",
    icon: "/images/stickermule/03_Gepersonaliseerde_kleding/Products/03_custom-hoodies_gepersonaliseerde-hoodies/01_index_custom-hoodies-az.png?v=az1",
    tag: "طباعة DTF وميلتون 100%",
    badge: "جديد 🔥",
  },
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function StickerMuleVisualCategoryBar({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <div className="w-full space-y-3.5">
      <div className="flex items-center justify-between px-1 sm:px-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c93b41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c93b41]" />
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
            تصفح الأقسام والمنتجات البصرية
          </h2>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-3 py-1 rounded-full border border-slate-200/60 dark:border-white/[0.06]">
          <Sparkles className="w-3.5 h-3.5 text-[#c93b41]" />
          معاينة بصرية مباشرة لكافة الخامات
        </span>
      </div>

      {/* Horizontal Scrollable Strip of 3D Tiles */}
      <div className="flex items-stretch gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar pb-3 pt-3 px-1 sm:px-2 scroll-smooth snap-x snap-mandatory md:justify-center">
        {visualCategories.map((item) => {
          const isActive = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className={`group relative flex flex-col items-center justify-between flex-1 min-w-[125px] max-w-[165px] sm:min-w-[150px] p-3 sm:p-4 rounded-3xl border transition-all duration-300 cursor-pointer select-none text-center snap-start ${
                isActive
                  ? "bg-gradient-to-b from-[#c93b41]/[0.09] via-[#c93b41]/[0.03] to-white dark:to-[#1a1c22] border-[#c93b41] shadow-xl shadow-[#c93b41]/12 scale-[1.03] ring-2 ring-[#c93b41]/25"
                  : "bg-white dark:bg-[#181a20] border-slate-200/80 dark:border-white/[0.07] hover:border-[#c93b41]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30"
              }`}
            >
              {/* Top Badge if any */}
              {item.badge && (
                <span className="absolute -top-2.5 inset-x-0 mx-auto w-max px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#c93b41] to-rose-600 text-white text-[10px] font-black leading-tight inline-flex items-center justify-center gap-1 shadow-md shadow-[#c93b41]/25 ring-2 ring-white dark:ring-[#181a20] pointer-events-none z-10 tracking-tight">
                  {item.badge}
                </span>
              )}

              {/* 3D Realistic Icon Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center my-1.5">
                <img
                  src={item.icon}
                  alt={item.name}
                  loading="eager"
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                />
              </div>

              {/* Text Labels */}
              <div className="space-y-0.5 mt-1.5 w-full">
                <div
                  className={`text-xs sm:text-[13px] font-black leading-snug transition-colors line-clamp-1 ${
                    isActive
                      ? "text-[#c93b41]"
                      : "text-slate-900 dark:text-white group-hover:text-[#c93b41]"
                  }`}
                >
                  {item.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-tight">
                  {item.tag}
                </div>
              </div>

              {/* Active Indicator Bar */}
              <div
                className={`w-6 h-1 rounded-full mt-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[#c93b41] shadow-xs shadow-[#c93b41]/50 opacity-100 scale-100"
                    : "bg-transparent opacity-0 scale-50"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
