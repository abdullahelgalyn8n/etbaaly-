"use client";

import React from "react";
import {
  Layers,
  Settings,
  Cpu,
  History,
  Copy,
  HelpCircle,
  Save,
} from "lucide-react";

interface StudioRightTabsHeaderProps {
  rightTab: "controls" | "settings" | "code";
  setRightTab: (t: "controls" | "settings" | "code") => void;
  onDuplicate?: () => void;
  onSave: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

export function StudioRightTabsHeader({
  rightTab,
  setRightTab,
  onDuplicate,
  onSave,
  isSaving,
  saveSuccess,
}: StudioRightTabsHeaderProps) {
  return (
    <>
      {/* 1. Top Utility Bar: History, Copy, Help, Save Block */}
      <div className="h-10 bg-[#16171a] border-b border-[#22242b] flex items-center justify-end">
        <div className="flex items-center gap-1 px-1.5">
          <button
            type="button"
            className="p-1.5 text-[#8a8d93] hover:text-white cursor-pointer transition-colors"
            title="History / Activity Log"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 text-[#8a8d93] hover:text-white cursor-pointer transition-colors"
            title="Duplicate Current Layer"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-1.5 text-[#8a8d93] hover:text-white cursor-pointer transition-colors"
            title="Configurator Documentation & Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Cyan Save Block */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={`h-10 w-11 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
            saveSuccess
              ? "bg-emerald-500 text-white"
              : "bg-[#00e5ff] hover:bg-[#28f0ff] text-black shadow-xs"
          }`}
          title="Save Configurator"
        >
          <Save className="w-4 h-4 fill-current stroke-[2.5]" />
        </button>
      </div>

      {/* 2. The 3 Tabs Header: Stack (Controls), Settings, Chip (Code) */}
      <div className="h-10 bg-[#16171a] border-b border-[#22242b] flex items-center">
        <button
          type="button"
          onClick={() => setRightTab("controls")}
          className={`flex-1 h-full flex items-center justify-center cursor-pointer transition-colors border-r border-[#22242b] ${
            rightTab === "controls"
              ? "bg-[#00e5ff] text-black font-bold"
              : "text-[#8a8d93] hover:text-white hover:bg-[#1a1b1f]"
          }`}
          title="Layer Controls"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setRightTab("settings")}
          className={`flex-1 h-full flex items-center justify-center cursor-pointer transition-colors border-r border-[#22242b] ${
            rightTab === "settings"
              ? "bg-[#00e5ff] text-black font-bold"
              : "text-[#8a8d93] hover:text-white hover:bg-[#1a1b1f]"
          }`}
          title="Global Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setRightTab("code")}
          className={`flex-1 h-full flex items-center justify-center cursor-pointer transition-colors ${
            rightTab === "code"
              ? "bg-[#00e5ff] text-black font-bold"
              : "text-[#8a8d93] hover:text-white hover:bg-[#1a1b1f]"
          }`}
          title="Custom CSS / JS"
        >
          <Cpu className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
