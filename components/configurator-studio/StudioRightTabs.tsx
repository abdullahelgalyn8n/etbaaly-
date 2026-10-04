"use client";

import React from "react";
import {
  ConfiguratorGroup,
  ConfiguratorLayerOption,
  ConfiguratorView,
} from "@/lib/db";
import StudioControlsTab from "./StudioControlsTab";
import StudioGlobalSettingsTab from "./StudioGlobalSettingsTab";
import StudioCustomCodeTab from "./StudioCustomCodeTab";
import { StudioRightTabsHeader } from "./StudioRightTabsHeader";

interface StudioRightTabsProps {
  rightTab: "controls" | "settings" | "code";
  setRightTab: (t: "controls" | "settings" | "code") => void;
  activeGroup: ConfiguratorGroup | undefined;
  activeOption: ConfiguratorLayerOption | null;
  updateActiveOption: (patch: Partial<ConfiguratorLayerOption>) => void;
  updateGroup?: (groupId: string, patch: Partial<ConfiguratorGroup>) => void;
  duplicateActiveGroup?: (groupId?: string) => void;
  views: ConfiguratorView[];
  productId: string;
  setProductId: (id: string) => void;
  style: string;
  setStyle: (s: any) => void;
  responsibleViewThumbnail: string;
  setResponsibleViewThumbnail: (v: string) => void;
  chooseForm: string;
  setChooseForm: (v: string) => void;
  contactForm: string;
  setContactForm: (v: string) => void;
  basePrice: number;
  setBasePrice: (v: number) => void;
  loadConfiguratorIn: string;
  setLoadConfiguratorIn: (v: string) => void;
  configuratorTemplate: string;
  setConfiguratorTemplate: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  viewBackground: string;
  setViewBackground: (v: string) => void;
  showDetailsPage: string;
  setShowDetailsPage: (v: string) => void;
  customCss: string;
  setCustomCss: (v: string) => void;
  customJs: string;
  setCustomJs: (v: string) => void;
  handleSave: () => void;
  isSaving: boolean;
  saveSuccess: boolean;
}

export default function StudioRightTabs({
  rightTab,
  setRightTab,
  activeGroup,
  activeOption,
  updateActiveOption,
  updateGroup,
  duplicateActiveGroup,
  views,
  productId,
  setProductId,
  style,
  setStyle,
  responsibleViewThumbnail,
  setResponsibleViewThumbnail,
  chooseForm,
  setChooseForm,
  contactForm,
  setContactForm,
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
  customCss,
  setCustomCss,
  customJs,
  setCustomJs,
  handleSave,
  isSaving,
  saveSuccess,
}: StudioRightTabsProps) {
  return (
    <aside className="w-80 bg-[#16171a] border-l border-[#22242b] flex flex-col shrink-0 z-20 select-none">
      {/* Top Utility Header and Tab Selectors */}
      <StudioRightTabsHeader
        rightTab={rightTab}
        setRightTab={setRightTab}
        onDuplicate={() => duplicateActiveGroup && duplicateActiveGroup()}
        onSave={handleSave}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
      />

      {/* Scrollable Tab Content */}
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)] text-xs">
        {rightTab === "controls" && (
          <StudioControlsTab
            activeGroup={activeGroup}
            activeOption={activeOption}
            updateActiveOption={updateActiveOption}
            updateGroup={updateGroup}
            views={views}
          />
        )}

        {rightTab === "settings" && (
          <StudioGlobalSettingsTab
            productId={productId}
            setProductId={setProductId}
            style={style}
            setStyle={setStyle}
            views={views}
            responsibleViewThumbnail={responsibleViewThumbnail}
            setResponsibleViewThumbnail={setResponsibleViewThumbnail}
            chooseForm={chooseForm}
            setChooseForm={setChooseForm}
            contactForm={contactForm}
            setContactForm={setContactForm}
            basePrice={basePrice}
            setBasePrice={setBasePrice}
            loadConfiguratorIn={loadConfiguratorIn}
            setLoadConfiguratorIn={setLoadConfiguratorIn}
            configuratorTemplate={configuratorTemplate}
            setConfiguratorTemplate={setConfiguratorTemplate}
            description={description}
            setDescription={setDescription}
            viewBackground={viewBackground}
            setViewBackground={setViewBackground}
            showDetailsPage={showDetailsPage}
            setShowDetailsPage={setShowDetailsPage}
          />
        )}

        {rightTab === "code" && (
          <StudioCustomCodeTab
            customCss={customCss}
            setCustomCss={setCustomCss}
            customJs={customJs}
            setCustomJs={setCustomJs}
          />
        )}
      </div>
    </aside>
  );
}
