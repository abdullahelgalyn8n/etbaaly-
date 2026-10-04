"use client";

import React, { useState } from "react";
import { Pencil, Filter, Eye, Layers } from "lucide-react";
import { ConfiguratorGroup, ConfiguratorView } from "@/lib/db";
import StudioLayerGroupRow from "./StudioLayerGroupRow";
import StudioLayerOptionRow from "./StudioLayerOptionRow";

interface StudioLayersTreeProps {
  title: string;
  setTitle: (t: string) => void;
  isEditingTitle: boolean;
  setIsEditingTitle: (v: boolean) => void;
  groups: ConfiguratorGroup[];
  selectedGroupId: string;
  setSelectedGroupId: (id: string) => void;
  selectedOptionId: string;
  setSelectedOptionId: (id: string) => void;
  handleAddGroup: () => void;
  handleAddSubGroup: (targetGroupId?: string) => void;
  handleAddImageLayer: (targetGroupId?: string) => void;
  deleteGroup: (groupId: string) => void;
  deleteActiveOption?: (optId?: string, groupId?: string) => void;
  moveGroup?: (fromIndex: number, toIndex: number) => void;
  moveOption?: (groupId: string, fromIndex: number, toIndex: number) => void;
  moveOptionAcross?: (
    sourceGroupId: string,
    fromIndex: number,
    targetGroupId: string,
    toIndex: number
  ) => void;
  duplicateOption?: (groupId: string, optId: string) => void;
  toggleHideOption?: (optId: string) => void;
  toggleLockOption?: (optId: string) => void;
  hiddenOptionIds?: string[];
  lockedOptionIds?: string[];
  views?: ConfiguratorView[];
  activeViewId?: string;
  setActiveViewId?: (id: string) => void;
}

export default function StudioLayersTree({
  title,
  setTitle,
  isEditingTitle,
  setIsEditingTitle,
  groups,
  selectedGroupId,
  setSelectedGroupId,
  selectedOptionId,
  setSelectedOptionId,
  handleAddSubGroup,
  handleAddImageLayer,
  deleteGroup,
  deleteActiveOption,
  moveGroup,
  moveOption,
  moveOptionAcross,
  duplicateOption,
  toggleHideOption,
  hiddenOptionIds = [],
  views = [],
  activeViewId = "v-front",
  setActiveViewId,
}: StudioLayersTreeProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  // View filter: "current" shows only layers active for activeViewId, "all" shows everything
  const [filterMode, setFilterMode] = useState<"current" | "all">("current");

  // Track currently dragged item
  const [draggedItem, setDraggedItem] = useState<{
    type: "group" | "option";
    sourceGroupId?: string;
    sourceIndex: number;
    optionId?: string;
  } | null>(null);

  const toggleCollapse = (gId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedGroups((prev) =>
      prev.includes(gId) ? prev.filter((id) => id !== gId) : [...prev, gId]
    );
  };

  const activeViewObj = views.find((v) => v.id === activeViewId);
  const activeViewShortName = activeViewObj
    ? activeViewObj.name.includes("Front") || activeViewObj.name.includes("الأمامي")
      ? "الواجهة الأمامية"
      : activeViewObj.name.includes("Angle") || activeViewObj.name.includes("المائل")
      ? "الزاوية المائلة"
      : activeViewObj.name.includes("Side") || activeViewObj.name.includes("المقبض")
      ? "المقبض والجانب"
      : activeViewObj.name
    : "المنظور الحالي";

  const getViewLabel = (viewId?: string) => {
    if (!viewId) return undefined;
    if (viewId === "v-front") return "أمامي";
    if (viewId === "v-angle") return "مائل";
    if (viewId === "v-handle" || viewId === "v-side") return "مقبض";
    const found = views.find((v) => v.id === viewId);
    return found ? found.name.split(" ")[0] : viewId;
  };

  // Drag and Drop handlers
  const handleDragStartOpt = (
    _e: React.DragEvent,
    sourceGroupId: string,
    index: number,
    optId: string
  ) => {
    setDraggedItem({
      type: "option",
      sourceGroupId,
      sourceIndex: index,
      optionId: optId,
    });
  };

  const handleDragStartGroup = (_e: React.DragEvent, index: number) => {
    setDraggedItem({
      type: "group",
      sourceIndex: index,
    });
  };

  const handleDropOpt = (
    _e: React.DragEvent,
    targetGroupId: string,
    targetIndex: number
  ) => {
    if (!draggedItem || draggedItem.type !== "option" || !draggedItem.sourceGroupId) return;

    if (draggedItem.sourceGroupId === targetGroupId) {
      if (moveOption) {
        moveOption(targetGroupId, draggedItem.sourceIndex, targetIndex);
      }
    } else {
      if (moveOptionAcross) {
        moveOptionAcross(
          draggedItem.sourceGroupId,
          draggedItem.sourceIndex,
          targetGroupId,
          targetIndex
        );
      }
    }
    setDraggedItem(null);
  };

  const handleDropGroup = (
    _e: React.DragEvent,
    targetIndex: number,
    targetGroupId: string
  ) => {
    if (!draggedItem) return;

    if (draggedItem.type === "group") {
      if (moveGroup) {
        moveGroup(draggedItem.sourceIndex, targetIndex);
      }
    } else if (draggedItem.type === "option" && draggedItem.sourceGroupId) {
      // Dropping an option onto a group row moves the option to the end of that group
      const targetGroup = groups.find((g) => g.id === targetGroupId);
      const targetOptIndex = targetGroup ? targetGroup.options.length : 0;
      if (moveOptionAcross) {
        moveOptionAcross(
          draggedItem.sourceGroupId,
          draggedItem.sourceIndex,
          targetGroupId,
          targetOptIndex
        );
      }
    }
    setDraggedItem(null);
  };

  // Filter groups and options if filterMode === "current"
  const visibleGroups = groups.filter((grp) => {
    if (filterMode === "all") return true;
    // Show group if it has options matching active view, or has general options (no viewId)
    return grp.options.some((o) => !o.viewId || o.viewId === activeViewId);
  });

  const totalVisibleItems = visibleGroups.reduce((sum, g) => {
    if (filterMode === "all") return sum + g.options.length;
    return sum + g.options.filter((o) => !o.viewId || o.viewId === activeViewId).length;
  }, 0);

  return (
    <aside className="w-72 bg-[#141518] border-r border-[#26282f] flex flex-col justify-between shrink-0 z-20 select-none">
      <div>
        {/* Title Bar */}
        <div className="h-10 px-3 border-b border-[#26282f] flex items-center justify-between bg-[#181a1f]">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="text-slate-400 text-xs">Title:</span>
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                className="bg-[#252830] text-white px-1.5 py-0.5 rounded text-xs w-32 focus:outline-none"
                autoFocus
              />
            ) : (
              <span
                onClick={() => setIsEditingTitle(true)}
                className="font-bold text-white text-xs truncate cursor-pointer hover:text-cyan-400"
                title="اضغط للتعديل"
              >
                {title}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsEditingTitle(!isEditingTitle)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
            title="تعديل العنوان"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>

        {/* LAYERS Section Header with View Filter Toggle */}
        <div className="px-3 py-2 bg-[#111215] border-b border-[#26282f] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                LAYERS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {totalVisibleItems} {filterMode === "current" ? "نشط" : "عنصر"}
            </span>
          </div>

          {/* View Filter Switcher Tabs */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#1a1c22] border border-[#2b2e38] text-[10px]">
            <button
              type="button"
              onClick={() => setFilterMode("current")}
              className={`flex-1 py-1 px-1.5 rounded-md font-bold transition-all text-center truncate cursor-pointer flex items-center justify-center gap-1 ${
                filterMode === "current"
                  ? "bg-cyan-500 text-black shadow-xs font-black"
                  : "text-slate-400 hover:text-white"
              }`}
              title={`عرض ليرات المنظور النشط (${activeViewShortName}) فقط`}
            >
              <Filter className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate">{activeViewShortName}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`py-1 px-2 rounded-md font-bold transition-all text-center cursor-pointer ${
                filterMode === "all"
                  ? "bg-[#252830] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
              title="عرض جميع الليرات والمناظير معاً"
            >
              كل المناظير
            </button>
          </div>
        </div>

        {/* Tree Container */}
        <div className="overflow-y-auto max-h-[calc(100vh-170px)] py-1 text-xs">
          {visibleGroups.map((grp, gIdx) => {
            const isGroupActive = grp.id === selectedGroupId;
            const isCollapsed = collapsedGroups.includes(grp.id);

            // Filter options within this group according to filterMode
            const displayedOptions = grp.options.filter((opt) => {
              if (filterMode === "all") return true;
              return !opt.viewId || opt.viewId === activeViewId;
            });

            return (
              <div key={grp.id} className="group/grp select-none mb-1">
                {/* Group Row */}
                <StudioLayerGroupRow
                  grp={grp}
                  gIdx={gIdx}
                  totalGroups={visibleGroups.length}
                  isGroupActive={isGroupActive}
                  isCollapsed={isCollapsed}
                  onSelectGroup={() => {
                    setSelectedGroupId(grp.id);
                    if (displayedOptions[0]) setSelectedOptionId(displayedOptions[0].id);
                  }}
                  onToggleCollapse={(e) => toggleCollapse(grp.id, e)}
                  onMoveGroup={moveGroup}
                  onAddImage={() => handleAddImageLayer(grp.id)}
                  onAddSubGroup={() => handleAddSubGroup(grp.id)}
                  onDragStartGroup={handleDragStartGroup}
                  onDropGroup={handleDropGroup}
                  onDeleteGroup={() => deleteGroup(grp.id)}
                  canDeleteGroup={groups.length > 1}
                />

                {/* Nested Children */}
                {!isCollapsed && (
                  <div className="pl-6 space-y-0.5 py-0.5 relative">
                    {displayedOptions.map((opt, oIdx) => {
                      const isCurrentView = !opt.viewId || opt.viewId === activeViewId;
                      const viewLabel = getViewLabel(opt.viewId);

                      // Determine absolute index within full grp.options for correct reordering
                      const absoluteIndex = grp.options.findIndex((o) => o.id === opt.id);

                      const allOptions = groups.flatMap((g) => g.options);
                      const globallySelectedOpt = allOptions.find((o) => o.id === selectedOptionId);
                      const isMatchingGlobal =
                        globallySelectedOpt &&
                        ((opt.colorHex &&
                          globallySelectedOpt.colorHex &&
                          opt.colorHex.toLowerCase() ===
                            globallySelectedOpt.colorHex.toLowerCase()) ||
                          (opt.name &&
                            globallySelectedOpt.name &&
                            opt.name.split("(")[0]?.trim() ===
                              globallySelectedOpt.name.split("(")[0]?.trim()));

                      const isOptionSelected = Boolean(
                        opt.id === selectedOptionId || (isGroupActive && isMatchingGlobal)
                      );

                      return (
                        <StudioLayerOptionRow
                          key={opt.id}
                          opt={opt}
                          oIdx={absoluteIndex >= 0 ? absoluteIndex : oIdx}
                          totalOptions={grp.options.length}
                          groupId={grp.id}
                          isOptActive={isOptionSelected}
                          isLast={oIdx === displayedOptions.length - 1}
                          isHidden={hiddenOptionIds.includes(opt.id)}
                          viewName={viewLabel}
                          isCurrentView={isCurrentView}
                          onSelect={() => {
                            setSelectedGroupId(grp.id);
                            setSelectedOptionId(opt.id);
                            if (opt.viewId && opt.viewId !== activeViewId && setActiveViewId) {
                              setActiveViewId(opt.viewId);
                            }
                          }}
                          canMoveUp={absoluteIndex > 0}
                          onMoveUp={() =>
                            moveOption &&
                            moveOption(grp.id, absoluteIndex, absoluteIndex - 1)
                          }
                          canMoveDown={absoluteIndex < grp.options.length - 1}
                          onMoveDown={() =>
                            moveOption &&
                            moveOption(grp.id, absoluteIndex, absoluteIndex + 1)
                          }
                          onToggleHide={() => toggleHideOption && toggleHideOption(opt.id)}
                          onDuplicate={() => duplicateOption && duplicateOption(grp.id, opt.id)}
                          canDelete={true}
                          onDelete={() => deleteActiveOption && deleteActiveOption(opt.id, grp.id)}
                          onDragStartOpt={handleDragStartOpt}
                          onDropOpt={handleDropOpt}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
