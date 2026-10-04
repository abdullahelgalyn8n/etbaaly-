"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  BoxSelect,
  Radio,
  Sparkles,
} from "lucide-react";
import { ConfiguratorView, ConfiguratorGroup } from "@/lib/db";
import { StudioAddLayerMenu } from "./StudioAddLayerMenu";
import { StudioActiveGroupBadge } from "./StudioActiveGroupBadge";

interface StudioTopBarProps {
  productId?: string;
  views: ConfiguratorView[];
  activeViewId: string;
  setActiveViewId: (id: string) => void;
  isHotspotMode: boolean;
  setIsHotspotMode: (val: boolean) => void;
  activeGroup?: ConfiguratorGroup;
  updateGroup?: (groupId: string, patch: Partial<ConfiguratorGroup>) => void;
  duplicateActiveGroup?: (groupId?: string) => void;
  toggleLockGroup?: (id?: string) => void;
  toggleHideGroup?: (id?: string) => void;
  lockedGroupIds?: string[];
  hiddenGroupIds?: string[];
  handleAddGroup: () => void;
  handleAddSubGroup: (targetGroupId?: string) => void;
  handleAddImageLayer: (targetGroupId?: string) => void;
  setShowNewViewModal: (val: boolean) => void;
  setShowCustomerPreview: (val: boolean) => void;
  handleSave: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

export default function StudioTopBar({
  productId,
  views,
  activeViewId,
  setActiveViewId,
  isHotspotMode,
  setIsHotspotMode,
  activeGroup,
  updateGroup,
  duplicateActiveGroup,
  toggleLockGroup,
  toggleHideGroup,
  lockedGroupIds = [],
  hiddenGroupIds = [],
  handleAddGroup,
  handleAddSubGroup,
  handleAddImageLayer,
  setShowNewViewModal,
  setShowCustomerPreview,
  handleSave,
  isSaving,
  saveSuccess,
}: StudioTopBarProps) {
  const isLocked = activeGroup ? lockedGroupIds.includes(activeGroup.id) : false;
  const isHidden = activeGroup ? hiddenGroupIds.includes(activeGroup.id) : false;

  return (
    <header className="h-12 bg-[#181a1f] border-b border-[#26282f] flex items-center justify-between px-3 text-xs select-none z-30 shrink-0">
      {/* LEFT SECTION: WP Logo, Back, + Add Layer, View, Hotspot, Active Layer Badge */}
      <div className="flex items-center gap-3">
        {/* WordPress Icon + Back Link */}
        <Link
          href="/admin/products/"
          className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-[#252830] transition-colors"
          title="Back to Products Catalog"
        >
          <span className="w-5 h-5 rounded-full bg-[#2271b1] text-white flex items-center justify-center font-serif font-black text-[12px] leading-none">
            W
          </span>
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold">Back</span>
        </Link>

        {/* + Add Layer Dropdown Button */}
        <StudioAddLayerMenu
          activeGroupId={activeGroup?.id}
          onAddGroup={handleAddGroup}
          onAddSubGroup={handleAddSubGroup}
          onAddImageLayer={handleAddImageLayer}
        />

        {/* View Switcher Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#202228] px-2.5 py-1.5 rounded border border-[#2e323e]">
          <BoxSelect className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={activeViewId}
            onChange={(e) => setActiveViewId(e.target.value)}
            className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
          >
            {views.map((v) => (
              <option key={v.id} value={v.id} className="bg-[#1e2026] text-white">
                View: {v.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowNewViewModal(true)}
            className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 cursor-pointer"
            title="Add New View"
          >
            +
          </button>
        </div>

        {/* Hotspot Button */}
        <button
          type="button"
          onClick={() => setIsHotspotMode(!isHotspotMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all cursor-pointer font-bold ${
            isHotspotMode
              ? "bg-cyan-500 text-black shadow-md animate-pulse"
              : "bg-[#202228] text-slate-300 hover:text-white border border-[#2e323e]"
          }`}
          title="Click to place a Hotspot on Canvas"
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Hotspot</span>
        </button>

        {/* Active Layer Quick Actions Badge */}
        {activeGroup && (
          <StudioActiveGroupBadge
            activeGroup={activeGroup}
            updateGroup={updateGroup}
            duplicateActiveGroup={duplicateActiveGroup}
            toggleLockGroup={toggleLockGroup}
            toggleHideGroup={toggleHideGroup}
            isLocked={isLocked}
            isHidden={isHidden}
          />
        )}
      </div>

      {/* RIGHT SECTION: Customer Preview, Save Status */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowCustomerPreview(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202228] hover:bg-[#282b35] text-cyan-400 hover:text-cyan-300 border border-[#2e323e] hover:border-cyan-500/50 rounded font-bold cursor-pointer transition-colors"
          title="معاينة تفاعلية فورية داخل الاستوديو"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>المعاينة التفاعلية</span>
        </button>

        <Link
          href={`/products/${productId || "prod-packaging-rigid-box"}/`}
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#202228] hover:bg-[#282b35] text-slate-200 hover:text-white border border-[#2e323e] rounded font-bold cursor-pointer transition-colors"
          title="معاينة صفحة المنتج للعميل في تبويب جديد"
        >
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>صفحة المتجر</span>
        </Link>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-3.5 py-1.5 rounded font-bold cursor-pointer transition-all ${
            saveSuccess
              ? "bg-emerald-600 text-white"
              : "bg-[#00e5ff] hover:bg-[#28f0ff] text-black"
          }`}
        >
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save"}
        </button>
      </div>
    </header>
  );
}
