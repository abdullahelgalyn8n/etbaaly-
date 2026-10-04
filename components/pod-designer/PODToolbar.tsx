"use client";

import React from "react";
import { Type, Image as ImageIcon, Shapes, CheckCircle2 } from "lucide-react";
import { PODProduct, ProductColor } from "@/lib/db";
import { CanvasElement, presetCliparts } from "./types";
import PODTextTool from "./PODTextTool";
import PODElementProperties from "./PODElementProperties";

interface PODToolbarProps {
  activeTab: "text" | "image" | "clipart" | "settings";
  setActiveTab: (t: "text" | "image" | "clipart" | "settings") => void;
  newText: string;
  setNewText: (t: string) => void;
  textColor: string;
  setTextColor: (c: string) => void;
  fontFamily: string;
  setFontFamily: (f: string) => void;
  handleAddText: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddClipart: (emoji: string) => void;
  selectedElement?: CanvasElement;
  updateSelectedElement: (updates: Partial<CanvasElement>) => void;
  deleteSelectedElement: () => void;
  selectedProduct: PODProduct;
  selectedColor: ProductColor;
  setSelectedColor: (c: ProductColor) => void;
}

export function PODToolbar({
  activeTab,
  setActiveTab,
  newText,
  setNewText,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  handleAddText,
  handleImageUpload,
  handleAddClipart,
  selectedElement,
  updateSelectedElement,
  deleteSelectedElement,
  selectedProduct,
  selectedColor,
  setSelectedColor,
}: PODToolbarProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Tool Tabs */}
      <div className="flex bg-slate-100 dark:bg-[#1c1c1c] p-1.5 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "text"
              ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <Type className="w-4 h-4" />
          <span>نصوص</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("image")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "image"
              ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>لوجو / صورة</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("clipart")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "clipart"
              ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <Shapes className="w-4 h-4" />
          <span>أشكال</span>
        </button>
      </div>

      {/* Tab 1: Text Tool */}
      {activeTab === "text" && (
        <PODTextTool
          newText={newText}
          setNewText={setNewText}
          textColor={textColor}
          setTextColor={setTextColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          handleAddText={handleAddText}
          updateSelectedElement={updateSelectedElement}
        />
      )}

      {/* Tab 2: Image Upload */}
      {activeTab === "image" && (
        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-md">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">رفع لوجو أو تصميم مسبق:</h3>
          <div className="border-2 border-dashed border-slate-300 dark:border-white/[0.15] rounded-2xl p-6 text-center group hover:border-[#c93b41]">
            <input
              type="file"
              id="pod-art-upload"
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="pod-art-upload" className="cursor-pointer flex flex-col items-center">
              <ImageIcon className="w-8 h-8 text-[#c93b41] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                اختر صورة اللوجو (PNG بخلفية شفافة)
              </span>
              <span className="text-[10px] text-slate-700 dark:text-slate-300 mt-1 font-medium">
                دقة 300 DPI لضمان أعلى نقاوة طباعية
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Cliparts */}
      {activeTab === "clipart" && (
        <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-3 shadow-md">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">أيقونات وشعارات جاهزة:</h3>
          <div className="grid grid-cols-4 gap-2">
            {presetCliparts.map((clip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddClipart(clip.icon)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] hover:bg-red-50 dark:hover:bg-[#2a1718] border border-slate-200 dark:border-white/[0.08] text-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                title={clip.label}
              >
                {clip.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Layer Properties Control */}
      {selectedElement && (
        <PODElementProperties
          selectedElement={selectedElement}
          updateSelectedElement={updateSelectedElement}
          deleteSelectedElement={deleteSelectedElement}
        />
      )}

      {/* Product Color Swatches */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-3 shadow-md">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">لون الخامة / المنتج:</h3>
        <div className="flex flex-wrap gap-2.5">
          {selectedProduct.colors.map((c: any, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedColor(c)}
              className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                selectedColor.name === c.name
                  ? "border-[#c93b41] ring-2 ring-red-500/30 scale-110"
                  : "border-slate-300 dark:border-white/[0.2]"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {selectedColor.name === c.name && (
                <CheckCircle2
                  className={`w-4 h-4 ${
                    c.hex === "#FFFFFF" || c.hex === "#FAFAFA" ? "text-slate-900" : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PODToolbar;
