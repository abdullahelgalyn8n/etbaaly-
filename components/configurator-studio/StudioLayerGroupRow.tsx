"use client";

import React, { useState } from "react";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Folder,
  Image as ImageIcon,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";
import { ConfiguratorGroup } from "@/lib/db";

interface StudioLayerGroupRowProps {
  grp: ConfiguratorGroup;
  gIdx: number;
  totalGroups: number;
  isGroupActive: boolean;
  isCollapsed: boolean;
  onSelectGroup: () => void;
  onToggleCollapse: (e: React.MouseEvent) => void;
  onMoveGroup?: (from: number, to: number) => void;
  onAddImage: () => void;
  onAddSubGroup: () => void;
  onDragStartGroup?: (e: React.DragEvent, index: number, groupId: string) => void;
  onDropGroup?: (e: React.DragEvent, targetIndex: number, targetGroupId: string) => void;
  onDeleteGroup?: () => void;
  canDeleteGroup?: boolean;
}

export default function StudioLayerGroupRow({
  grp,
  gIdx,
  totalGroups,
  isGroupActive,
  isCollapsed,
  onSelectGroup,
  onToggleCollapse,
  onMoveGroup,
  onAddImage,
  onAddSubGroup,
  onDragStartGroup,
  onDropGroup,
  onDeleteGroup,
  canDeleteGroup,
}: StudioLayerGroupRowProps) {
  const [dragOverPos, setDragOverPos] = useState<"above" | "below" | "inside" | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    if (relY < rect.height * 0.25) {
      setDragOverPos("above");
    } else if (relY > rect.height * 0.75) {
      setDragOverPos("below");
    } else {
      setDragOverPos("inside");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPos(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const targetIdx = dragOverPos === "below" ? gIdx + 1 : gIdx;
    setDragOverPos(null);
    if (onDropGroup) {
      onDropGroup(e, targetIdx, grp.id);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({
            type: "group",
            index: gIdx,
            groupId: grp.id,
          })
        );
        if (onDragStartGroup) {
          onDragStartGroup(e, gIdx, grp.id);
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onSelectGroup}
      className={`flex items-center justify-between px-2 py-1.5 cursor-pointer transition-all ${
        isGroupActive
          ? "bg-[#1f2229] text-white font-bold ring-1 ring-cyan-500/30"
          : "text-slate-300 hover:bg-[#181a1f]"
      } ${
        dragOverPos === "above"
          ? "border-t-2 border-cyan-400"
          : dragOverPos === "below"
          ? "border-b-2 border-cyan-400"
          : dragOverPos === "inside"
          ? "bg-cyan-950/40 ring-1 ring-cyan-400"
          : ""
      }`}
    >
      {/* Left: Drag Handle, Chevron, Cyan Folder-Star, Name */}
      <div className="flex items-center gap-1.5 truncate max-w-[160px]">
        <span title="اسحب لإعادة ترتيب المجموعة" className="shrink-0 flex items-center">
          <GripVertical
            className="w-3 h-3 text-slate-500 hover:text-cyan-400 cursor-grab active:cursor-grabbing"
          />
        </span>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-0.5 text-slate-400 hover:text-white cursor-pointer shrink-0"
          title={isCollapsed ? "توسيع المجموعة" : "طي المجموعة"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>

        <div className="relative text-cyan-400 shrink-0">
          <Folder className="w-3.5 h-3.5 fill-[#00e5ff] text-[#00e5ff]" />
          <span className="absolute -top-1 -right-0.5 text-[7px] text-black font-black">★</span>
        </div>

        <span className="truncate text-xs">{grp.title}</span>
        <span className="text-[10px] text-slate-500 font-mono shrink-0">
          ({grp.options.length})
        </span>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/grp:opacity-100">
        {onMoveGroup && gIdx > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveGroup(gIdx, gIdx - 1);
            }}
            className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="تحريك المجموعة لأعلى"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        )}

        {onMoveGroup && gIdx < totalGroups - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveGroup(gIdx, gIdx + 1);
            }}
            className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="تحريك المجموعة لأسفل"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddImage();
          }}
          className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/5 cursor-pointer"
          title="إضافة طبقة صورة داخل المجموعة"
        >
          <ImageIcon className="w-3 h-3" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddSubGroup();
          }}
          className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/5 cursor-pointer"
          title="إضافة مجموعة فرعية"
        >
          <Folder className="w-3 h-3" />
        </button>

        <span className="text-slate-600 text-[9px]">◀</span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddImage();
          }}
          className="w-3.5 h-3.5 bg-[#00e5ff] hover:bg-[#28f0ff] text-black rounded-xs flex items-center justify-center font-black cursor-pointer shadow-xs"
          title="إضافة سريعة لطبقة"
        >
          <Plus className="w-2.5 h-2.5 stroke-[3]" />
        </button>

        {onDeleteGroup && canDeleteGroup && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteGroup();
            }}
            className="text-slate-400 hover:text-red-400 p-0.5 rounded hover:bg-white/5 cursor-pointer transition-colors"
            title="حذف المجموعة بالكامل"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
