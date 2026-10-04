"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface StudioGlobalDisplaySettingsProps {
  basePrice: number;
  setBasePrice: (val: number) => void;
  loadConfiguratorIn: string;
  setLoadConfiguratorIn: (val: string) => void;
  configuratorTemplate: string;
  setConfiguratorTemplate: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  viewBackground: string;
  setViewBackground: (val: string) => void;
  showDetailsPage: string;
  setShowDetailsPage: (val: string) => void;
}

export function StudioGlobalDisplaySettings({
  basePrice,
  setBasePrice,
  loadConfiguratorIn,
  setLoadConfiguratorIn,
  configuratorTemplate,
  setConfiguratorTemplate,
  description,
  setDescription,
  viewBackground,
  setViewBackground,
  showDetailsPage,
  setShowDetailsPage,
}: StudioGlobalDisplaySettingsProps) {
  return (
    <>
      {/* Base Price */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">Base Price</label>
        <input
          type="number"
          min="0"
          step="1"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
          placeholder="0"
          className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Load Configurator in */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">Load Configurator in</label>
        <select
          value={loadConfiguratorIn}
          onChange={(e) => setLoadConfiguratorIn(e.target.value)}
          className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
        >
          <option value="directly">Directly in Product Page</option>
          <option value="popup">Popup Modal Window</option>
          <option value="dedicated">Dedicated Configurator Page</option>
        </select>
        <p className="text-[11px] text-slate-500 leading-snug">
          Once Configure is clicked! is selected, `Configure it` button added in single product page.
        </p>
      </div>

      {/* Configurator Template */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">Configurator Template</label>
        <select
          value={configuratorTemplate}
          onChange={(e) => setConfiguratorTemplate(e.target.value)}
          className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
        >
          <option value="replace">Replace Entire Product Page</option>
          <option value="override">Override Product Detail as Configurator</option>
        </select>
        <p className="text-[11px] text-slate-500 leading-snug">
          `Override Product Detail as Configurator` replaces the product gallery and summary as `Configurator`.
        </p>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400 resize-y"
        />
      </div>

      {/* View Background */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">View Background</label>
        <p className="text-[11px] text-slate-500 mb-1.5">Choose the view background</p>
        <div className="flex items-center gap-3">
          <label className="w-16 h-16 rounded bg-[#141518] border border-[#2e323e] hover:border-cyan-400 flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-white transition-colors">
            <ImageIcon className="w-6 h-6 mb-1" />
            <span className="text-[9px] uppercase font-bold text-slate-500">FRONT</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setViewBackground(url);
                }
              }}
            />
          </label>
          {viewBackground && (
            <div className="text-[10px] text-slate-400 break-all truncate max-w-[170px]">
              {viewBackground}
            </div>
          )}
        </div>
      </div>

      {/* Show Details Page */}
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">Show Details Page</label>
        <select
          value={showDetailsPage}
          onChange={(e) => setShowDetailsPage(e.target.value)}
          className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
        >
          <option value="">Select Page</option>
          <option value="product-details">Default Product Details</option>
          <option value="custom-landing">Custom Landing Page</option>
        </select>
        <p className="text-[11px] text-slate-500 leading-snug">
          Please choose the detail page. If you dont set anything it loads product details by default.
        </p>
      </div>
    </>
  );
}
