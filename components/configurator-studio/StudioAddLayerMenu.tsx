"use client";

import React, { useState } from "react";
import { Plus, Folder, Image as ImageIcon } from "lucide-react";

interface StudioAddLayerMenuProps {
  activeGroupId?: string;
  onAddGroup: () => void;
  onAddSubGroup: (targetGroupId?: string) => void;
  onAddImageLayer: (targetGroupId?: string) => void;
}

export function StudioAddLayerMenu({
  activeGroupId,
  onAddGroup,
  onAddSubGroup,
  onAddImageLayer,
}: StudioAddLayerMenuProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowAddMenu(!showAddMenu)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202228] hover:bg-[#282b35] text-white rounded font-bold cursor-pointer border border-[#2e323e]"
      >
        <Plus className="w-3.5 h-3.5 text-white" />
        <span>Add Layer</span>
      </button>

      {showAddMenu && (
        <div
          className="absolute left-0 mt-1 w-44 bg-[#1e2026] border border-[#2e323e] rounded-md shadow-2xl py-1 z-50 text-xs text-slate-200 animate-fadeIn"
          onMouseLeave={() => setShowAddMenu(false)}
        >
          <button
            type="button"
            onClick={() => {
              onAddGroup();
              setShowAddMenu(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-[#2b2e38] flex items-center gap-2 cursor-pointer"
          >
            <div className="relative text-cyan-400">
              <Folder className="w-4 h-4 fill-cyan-400/20" />
              <span className="absolute -top-1 -right-1 text-[8px] text-cyan-400">★</span>
            </div>
            <span className="font-medium">Group</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onAddSubGroup(activeGroupId);
              setShowAddMenu(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-[#2b2e38] flex items-center gap-2 cursor-pointer"
          >
            <Folder className="w-4 h-4 text-slate-300" />
            <span className="font-medium">Sub Group</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onAddImageLayer(activeGroupId);
              setShowAddMenu(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-[#2b2e38] flex items-center gap-2 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-slate-300" />
            <span className="font-medium">Image</span>
          </button>
        </div>
      )}
    </div>
  );
}
