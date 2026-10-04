"use client";

import React, { useState } from "react";
import {
  GripVertical,
  Image as ImageIcon,
  Type,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { ConfiguratorLayerOption } from "@/lib/db";

interface StudioLayerOptionRowProps {
  opt: ConfiguratorLayerOption;
  oIdx: number;
  totalOptions: number;
  groupId: string;
  isOptActive: boolean;
  isLast: boolean;
  isHidden: boolean;
  viewName?: string;
  isCurrentView?: boolean;
  onSelect: () => void;
  onMoveUp?: () => void;
  canMoveUp?: boolean;
  onMoveDown?: () => void;
  canMoveDown?: boolean;
  onToggleHide?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
  onDragStartOpt?: (e: React.DragEvent, groupId: string, index: number, optId: string) => void;
  onDropOpt?: (e: React.DragEvent, targetGroupId: string, targetIndex: number) => void;
}

export default function StudioLayerOptionRow({
  opt,
  oIdx,
  groupId,
  isOptActive,
  isLast,
  isHidden,
  viewName,
  isCurrentView = true,
  onSelect,
  onMoveUp,
  canMoveUp,
  onMoveDown,
  canMoveDown,
  onToggleHide,
  onDuplicate,
  onDelete,
  canDelete,
  onDragStartOpt,
  onDropOpt,
}: StudioLayerOptionRowProps) {
  const [dragOverPos, setDragOverPos] = useState<"above" | "below" | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    if (e.clientY < mid) {
      setDragOverPos("above");
    } else {
      setDragOverPos("below");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPos(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const targetIdx = dragOverPos === "below" ? oIdx + 1 : oIdx;
    setDragOverPos(null);
    if (onDropOpt) {
      onDropOpt(e, groupId, targetIdx);
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
            type: "option",
            sourceGroupId: groupId,
            sourceIndex: oIdx,
            optionId: opt.id,
          })
        );
        if (onDragStartOpt) {
          onDragStartOpt(e, groupId, oIdx, opt.id);
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onSelect}
      className={`relative flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-all group/opt ${
        isOptActive
          ? "bg-[#252830] text-white font-bold ring-1 ring-cyan-500/40"
          : "text-slate-400 hover:bg-[#1a1c22] hover:text-slate-200"
      } ${isHidden ? "opacity-40" : ""} ${!isCurrentView ? "opacity-60" : ""} ${
        dragOverPos === "above"
          ? "border-t-2 border-cyan-400"
          : dragOverPos === "below"
          ? "border-b-2 border-cyan-400"
          : ""
      }`}
    >
      <span className="absolute -left-3 text-slate-600 font-mono text-[10px]">
        {isLast ? "└─" : "├─"}
      </span>

      <div className="flex items-center gap-1.5 truncate max-w-[155px]">
        {/* Drag handle */}
        <GripVertical className="w-3 h-3 text-slate-600 hover:text-cyan-400 cursor-grab active:cursor-grabbing shrink-0" />

        {/* Color preview chip if available */}
        {opt.colorHex && (
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0 shadow-xs"
            style={{ backgroundColor: opt.colorHex }}
          />
        )}

        {/* Icon based on controlType */}
        {opt.controlType === "inline_text" ? (
          <Type className="w-3 h-3 text-amber-400 shrink-0" />
        ) : (
          <ImageIcon className="w-3 h-3 text-[#00e5ff] shrink-0" />
        )}

        <span className="truncate text-xs">{opt.name}</span>

        {/* View Badge */}
        {viewName && (
          <span
            className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
              isCurrentView
                ? "bg-cyan-950/70 text-cyan-300 border border-cyan-700/40"
                : "bg-slate-800 text-slate-400"
            }`}
            title={`تابعة لمنظور: ${viewName}`}
          >
            {viewName}
          </span>
        )}
      </div>

      {/* Quick Layer Tools */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover/opt:opacity-100 shrink-0">
        {/* Move Layer Up */}
        {canMoveUp && onMoveUp && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="تحريك الطبقة لأعلى (تقديم للأمام)"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        )}

        {/* Move Layer Down */}
        {canMoveDown && onMoveDown && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="تحريك الطبقة لأسفل (تأخير للخلف)"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
        )}

        {/* Show/Hide */}
        {onToggleHide && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleHide();
            }}
            className="text-slate-400 hover:text-cyan-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title={isHidden ? "إظهار على الكانفاس" : "إخفاء من الكانفاس"}
          >
            {isHidden ? <EyeOff className="w-3 h-3 text-red-400" /> : <Eye className="w-3 h-3" />}
          </button>
        )}

        {/* Duplicate */}
        {onDuplicate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="تكرار الطبقة"
          >
            <Copy className="w-3 h-3" />
          </button>
        )}

        {/* Delete */}
        {canDelete && onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-slate-400 hover:text-red-400 p-0.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            title="حذف الطبقة"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
