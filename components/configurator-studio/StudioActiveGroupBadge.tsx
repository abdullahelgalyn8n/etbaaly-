"use client";

import React, { useState } from "react";
import {
  Copy,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Pencil,
  Folder,
} from "lucide-react";
import { ConfiguratorGroup } from "@/lib/db";

interface StudioActiveGroupBadgeProps {
  activeGroup: ConfiguratorGroup;
  updateGroup?: (groupId: string, patch: Partial<ConfiguratorGroup>) => void;
  duplicateActiveGroup?: (groupId?: string) => void;
  toggleLockGroup?: (id?: string) => void;
  toggleHideGroup?: (id?: string) => void;
  isLocked: boolean;
  isHidden: boolean;
}

export function StudioActiveGroupBadge({
  activeGroup,
  updateGroup,
  duplicateActiveGroup,
  toggleLockGroup,
  toggleHideGroup,
  isLocked,
  isHidden,
}: StudioActiveGroupBadgeProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(activeGroup.title || "Group Layer");

  const handleFinishRename = () => {
    if (updateGroup && nameInput.trim()) {
      updateGroup(activeGroup.id, { title: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <div className="flex items-center gap-2 bg-[#202228] px-2.5 py-1.5 rounded border border-[#2e323e] ml-2">
      <div className="relative text-cyan-400">
        <Folder className="w-4 h-4 fill-[#00e5ff] text-[#00e5ff]" />
        <span className="absolute -top-1 -right-0.5 text-[8px] text-black font-bold">★</span>
      </div>

      {isEditingName ? (
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onBlur={handleFinishRename}
          onKeyDown={(e) => e.key === "Enter" && handleFinishRename()}
          className="bg-[#141518] text-white px-1 py-0.5 rounded text-xs w-28 focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          onClick={() => {
            setNameInput(activeGroup.title);
            setIsEditingName(true);
          }}
          className="font-bold text-white max-w-[130px] truncate cursor-pointer hover:text-cyan-400"
        >
          {activeGroup.title}
        </span>
      )}

      <button
        type="button"
        onClick={() => {
          setNameInput(activeGroup.title);
          setIsEditingName(!isEditingName);
        }}
        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
        title="Rename Layer"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => duplicateActiveGroup && duplicateActiveGroup(activeGroup.id)}
        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
        title="Duplicate Group Layer"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => toggleLockGroup && toggleLockGroup(activeGroup.id)}
        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
        title={isLocked ? "Unlock Group" : "Lock Group"}
      >
        {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
      </button>

      <button
        type="button"
        onClick={() => toggleHideGroup && toggleHideGroup(activeGroup.id)}
        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
        title={isHidden ? "Show Group" : "Hide Group"}
      >
        {isHidden ? <EyeOff className="w-3.5 h-3.5 text-red-400" /> : <Eye className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
