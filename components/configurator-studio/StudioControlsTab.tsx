"use client";

import React from "react";
import {
  ConfiguratorGroup,
  ConfiguratorLayerOption,
  ConfiguratorView,
} from "@/lib/db";
import StudioLayerTransformSection from "./StudioLayerTransformSection";
import StudioLayerPricingSection from "./StudioLayerPricingSection";
import { StudioLayerControlSettings } from "./StudioLayerControlSettings";
import { StudioLayerOtherSettings } from "./StudioLayerOtherSettings";

interface StudioControlsTabProps {
  activeGroup: ConfiguratorGroup | undefined;
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
  updateGroup?: (groupId: string, patch: Partial<ConfiguratorGroup>) => void;
  views: ConfiguratorView[];
}

export default function StudioControlsTab({
  activeGroup,
  activeOption,
  updateActiveOption,
  updateGroup,
  views,
}: StudioControlsTabProps) {
  const title = (activeOption?.name || activeGroup?.title || "GROUP LAYER 1").toUpperCase();

  const handleGroupPatch = (patch: Partial<ConfiguratorGroup>) => {
    if (activeGroup && updateGroup) {
      updateGroup(activeGroup.id, patch);
    }
  };

  return (
    <div className="space-y-4 text-xs select-none">
      {/* Title Header */}
      <div className="font-bold text-xs text-slate-300 uppercase tracking-wide">
        {title}
      </div>

      {/* 1. CONTROL SETTINGS */}
      <StudioLayerControlSettings
        activeGroup={activeGroup}
        activeOption={activeOption}
        updateActiveOption={updateActiveOption}
        onGroupPatch={handleGroupPatch}
      />

      {/* 2. LAYER TRANSFORM & COORDINATES */}
      <StudioLayerTransformSection
        activeOption={activeOption}
        updateActiveOption={updateActiveOption}
      />

      {/* 3. WOOCOMMERCE PRICING */}
      <StudioLayerPricingSection
        activeOption={activeOption}
        updateActiveOption={updateActiveOption}
      />

      {/* 4. OTHER SETTINGS */}
      <StudioLayerOtherSettings
        activeGroup={activeGroup}
        activeOption={activeOption}
        updateActiveOption={updateActiveOption}
        onGroupPatch={handleGroupPatch}
        views={views}
      />
    </div>
  );
}
