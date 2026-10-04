"use client";

import React from "react";
import { Truck, ShieldCheck, Layers } from "lucide-react";
import { PODProduct, ProductColor } from "@/lib/db";
import { CanvasElement } from "./types";

interface PODCanvasProps {
  selectedColor: ProductColor;
  elements: CanvasElement[];
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  selectedProduct: PODProduct;
}

export function PODCanvas({
  selectedColor,
  elements,
  selectedElementId,
  setSelectedElementId,
  selectedProduct,
}: PODCanvasProps) {
  const isBox = selectedProduct.id.includes("packaging") || selectedProduct.id.includes("box");
  const isMug = selectedProduct.id.includes("mug");
  const isTshirt = selectedProduct.id.includes("tshirt");
  const isHoodie = selectedProduct.id.includes("hoodie");
  const isTote = selectedProduct.id.includes("tote");
  const isTumbler = selectedProduct.id.includes("tumbler");

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 space-y-4">
        {/* Studio Canvas Container */}
        <div className="relative aspect-square w-full rounded-3xl border-2 border-slate-200 dark:border-white/[0.1] bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-[#15171b] dark:via-[#111215] dark:to-[#0d0e10] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 select-none transition-all duration-300">
          {/* Studio Backdrop Light & Floor Shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.6)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-8 w-64 h-8 bg-black/30 dark:bg-black/60 rounded-full blur-xl pointer-events-none" />

          {/* Top-Right Badge: Live 2D Mockup */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>معاينة الموك اب المباشر (2D Mockup)</span>
          </div>

          {/* PRODUCT MOCKUP OBJECT */}
          <div className="relative flex items-center justify-center transition-transform duration-300">
            {/* Mug Handle Accent */}
            {isMug && (
              <div
                className="absolute -right-7 top-10 w-12 h-36 rounded-r-3xl border-[10px] border-l-0 shadow-lg -z-0"
                style={{ borderColor: selectedColor.mockupOverlay || selectedColor.hex }}
              />
            )}

            {/* Tote Bag Straps */}
            {isTote && (
              <div
                className="absolute -top-12 w-28 h-16 border-4 border-b-0 rounded-t-full shadow-sm -z-0"
                style={{ borderColor: selectedColor.mockupOverlay || selectedColor.hex }}
              />
            )}

            {/* Tumbler Lid Accent */}
            {isTumbler && (
              <div className="absolute -top-4 w-32 h-6 bg-slate-800 dark:bg-black rounded-t-xl border border-white/20 shadow-md flex items-center justify-center">
                <span className="w-6 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            )}

            {/* Product Mockup Main Body */}
            <div
              className={`relative shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden border border-black/10 dark:border-white/10 ${
                isBox
                  ? "w-64 h-64 sm:w-72 sm:h-72 rounded-2xl"
                  : isMug
                  ? "w-52 h-64 sm:w-60 sm:h-72 rounded-b-[40px] rounded-t-xl"
                  : isTote
                  ? "w-60 h-64 sm:w-68 sm:h-72 rounded-2xl"
                  : isTumbler
                  ? "w-40 h-72 sm:w-44 sm:h-80 rounded-3xl"
                  : "w-64 h-72 sm:w-72 sm:h-80 rounded-3xl"
              }`}
              style={{
                background: selectedColor.bgStyle || selectedColor.hex,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
              }}
            >
              {/* Subtle Box Lid Line / Seam for Packaging */}
              {isBox && (
                <div className="absolute top-8 inset-x-0 h-[1px] bg-black/20 dark:bg-white/20 pointer-events-none" />
              )}

              {/* Subtle T-shirt / Hoodie Neck Collar Accent */}
              {(isTshirt || isHoodie) && (
                <div className="absolute -top-6 w-24 h-12 rounded-b-full border-2 border-black/10 dark:border-white/15 pointer-events-none" />
              )}

              {/* Surface Reflection Highlight */}
              <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

              {/* Printable Safe Area (Dashed Boundary on product surface) */}
              <div
                className={`relative border-2 border-dashed border-white/50 dark:border-white/40 rounded-xl flex items-center justify-center p-3 backdrop-blur-[0.5px] ${
                  isBox
                    ? "w-48 h-48 sm:w-52 sm:h-52"
                    : isMug
                    ? "w-36 h-44 sm:w-40 sm:h-48"
                    : isTumbler
                    ? "w-28 h-48 sm:w-32 sm:h-52"
                    : "w-44 h-48 sm:w-52 sm:h-56"
                }`}
              >
                <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[8px] font-mono font-bold tracking-tight">
                  منطقة الطباعة
                </span>

                {/* Render Customer Design Canvas Elements */}
                {elements.map((elem) => {
                  const isSelected = elem.id === selectedElementId;
                  return (
                    <div
                      key={elem.id}
                      onClick={() => setSelectedElementId(elem.id)}
                      className={`absolute cursor-grab active:cursor-grabbing select-none transition-transform ${
                        isSelected ? "ring-2 ring-[#c93b41] ring-offset-2 ring-offset-transparent rounded-lg p-1" : ""
                      }`}
                      style={{
                        top: `${elem.y}%`,
                        left: `${elem.x}%`,
                        transform: `translate(-50%, -50%) scale(${elem.scale}) rotate(${elem.rotation}deg)`,
                      }}
                    >
                      {elem.type === "text" && (
                        <span
                          style={{
                            color: elem.color,
                            fontFamily: elem.fontFamily,
                            fontSize: `${elem.fontSize || 20}px`,
                            lineHeight: 1,
                            fontWeight: 900,
                            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                          }}
                        >
                          {elem.content}
                        </span>
                      )}

                      {elem.type === "clipart" && (
                        <span style={{ fontSize: `${elem.fontSize || 36}px` }}>{elem.content}</span>
                      )}

                      {elem.type === "image" && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={elem.content}
                          alt="Custom graphic"
                          className="max-w-[130px] max-h-[130px] object-contain pointer-events-none drop-shadow-md"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Subtle Depth Shadow */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Product Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] text-white font-mono flex items-center gap-1.5 border border-white/10 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>300 DPI Ultra HD Mockup</span>
          </div>
        </div>

        {/* Techniques Info */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-xs space-y-1.5 shadow-sm">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#c93b41]" />
            مواصفات وخامات المنتج:
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {selectedProduct.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PODCanvas;

