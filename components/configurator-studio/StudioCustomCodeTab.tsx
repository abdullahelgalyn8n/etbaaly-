"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface StudioCustomCodeTabProps {
  customCss: string;
  setCustomCss: (val: string) => void;
  customJs: string;
  setCustomJs: (val: string) => void;
}

export default function StudioCustomCodeTab({
  customCss,
  setCustomCss,
  customJs,
  setCustomJs,
}: StudioCustomCodeTabProps) {
  const [openCss, setOpenCss] = useState(true);
  const [openJs, setOpenJs] = useState(true);

  return (
    <div className="space-y-4 text-xs select-none">
      {/* SECTION 1: CUSTOM CSS */}
      <div className="border-b border-[#22242b] pb-3">
        <button
          type="button"
          onClick={() => setOpenCss(!openCss)}
          className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
        >
          <span className="text-[11px] font-bold text-slate-200">CUSTOM CSS</span>
          {openCss ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {openCss && (
          <div className="pt-2 space-y-1">
            <label className="text-[#9da3af] font-semibold block text-xs">Custom CSS</label>
            <textarea
              rows={9}
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              placeholder="/* Add custom CSS rules here */"
              className="w-full p-2.5 bg-[#101114] border border-[#22242a] rounded font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 resize-y"
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* SECTION 2: CUSTOM JS */}
      <div className="pb-3">
        <button
          type="button"
          onClick={() => setOpenJs(!openJs)}
          className="w-full flex items-center justify-between py-1.5 font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
        >
          <span className="text-[11px] font-bold text-slate-200">CUSTOM JS</span>
          {openJs ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {openJs && (
          <div className="pt-2 space-y-1">
            <label className="text-[#9da3af] font-semibold block text-xs">Custom JS</label>
            <textarea
              rows={9}
              value={customJs}
              onChange={(e) => setCustomJs(e.target.value)}
              placeholder="// Add custom JavaScript scripts here"
              className="w-full p-2.5 bg-[#101114] border border-[#22242a] rounded font-mono text-xs text-amber-300 focus:outline-none focus:border-cyan-400 resize-y"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
