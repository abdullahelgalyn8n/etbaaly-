"use client";

import React from "react";
import { VisualConfigurator } from "@/lib/db";
import StudioTopBar from "./configurator-studio/StudioTopBar";
import StudioLayersTree from "./configurator-studio/StudioLayersTree";
import StudioCanvas from "./configurator-studio/StudioCanvas";
import StudioRightTabs from "./configurator-studio/StudioRightTabs";
import StudioCustomerPreviewModal from "./configurator-studio/StudioCustomerPreviewModal";
import StudioNewViewModal from "./configurator-studio/StudioNewViewModal";
import { useConfiguratorStudio } from "./configurator-studio/useConfiguratorStudio";

interface VisualProductConfiguratorStudioProps {
  initialConfigurator?: VisualConfigurator;
}

export default function VisualProductConfiguratorStudio({
  initialConfigurator,
}: VisualProductConfiguratorStudioProps) {
  const studio = useConfiguratorStudio(initialConfigurator);

  return (
    <div dir="ltr" className="fixed inset-0 z-50 h-screen w-screen bg-[#111215] text-slate-200 flex flex-col font-sans overflow-hidden select-none">
      {/* 1. TOP TOOLBAR (Matching Screenshot 1) */}
      <StudioTopBar
        productId={studio.productId}
        views={studio.views}
        activeViewId={studio.activeViewId}
        setActiveViewId={studio.setActiveViewId}
        isHotspotMode={studio.isHotspotMode}
        setIsHotspotMode={studio.setIsHotspotMode}
        activeGroup={studio.activeGroup}
        updateGroup={studio.updateGroup}
        duplicateActiveGroup={studio.duplicateActiveGroup}
        toggleLockGroup={studio.toggleLockGroup}
        toggleHideGroup={studio.toggleHideGroup}
        lockedGroupIds={studio.lockedGroupIds}
        hiddenGroupIds={studio.hiddenGroupIds}
        handleAddGroup={studio.handleAddGroup}
        handleAddSubGroup={studio.handleAddSubGroup}
        handleAddImageLayer={studio.handleAddImageLayer}
        setShowNewViewModal={studio.setShowNewViewModal}
        setShowCustomerPreview={studio.setShowCustomerPreview}
        handleSave={studio.handleSave}
        isSaving={studio.isSaving}
        saveSuccess={studio.saveSuccess}
      />

      {/* 2. MAIN 3-PANE WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PANE 1: LEFT LAYERS TREE (Matching Screenshot 2) */}
        <StudioLayersTree
          title={studio.title}
          setTitle={studio.setTitle}
          isEditingTitle={studio.isEditingTitle}
          setIsEditingTitle={studio.setIsEditingTitle}
          groups={studio.groups}
          selectedGroupId={studio.selectedGroupId}
          setSelectedGroupId={studio.setSelectedGroupId}
          selectedOptionId={studio.selectedOptionId}
          setSelectedOptionId={studio.setSelectedOptionId}
          handleAddGroup={studio.handleAddGroup}
          handleAddSubGroup={studio.handleAddSubGroup}
          handleAddImageLayer={studio.handleAddImageLayer}
          deleteGroup={studio.deleteGroup}
          deleteActiveOption={studio.deleteActiveOption}
          moveGroup={studio.moveGroup}
          moveOption={studio.moveOption}
          moveOptionAcross={studio.moveOptionAcross}
          duplicateOption={studio.duplicateOption}
          toggleHideOption={studio.toggleHideOption}
          toggleLockOption={studio.toggleLockOption}
          hiddenOptionIds={studio.hiddenOptionIds}
          lockedOptionIds={studio.lockedOptionIds}
          views={studio.views}
          activeViewId={studio.activeViewId}
          setActiveViewId={studio.setActiveViewId}
        />

        {/* PANE 2: CENTER STAGE WITH PIXEL RULERS */}
        <StudioCanvas
          canvasRef={studio.canvasRef}
          isHotspotMode={studio.isHotspotMode}
          handleCanvasClick={studio.handleCanvasClick}
          groups={studio.groups}
          activeViewId={studio.activeViewId}
          selectedOptionId={studio.selectedOptionId}
          setSelectedGroupId={studio.setSelectedGroupId}
          setSelectedOptionId={studio.setSelectedOptionId}
          hotspots={studio.hotspots}
          activeOption={studio.activeOption}
          updateActiveOption={studio.updateActiveOption}
          hiddenGroupIds={studio.hiddenGroupIds}
          hiddenOptionIds={studio.hiddenOptionIds}
          lockedOptionIds={studio.lockedOptionIds}
        />

        {/* PANE 3: RIGHT PROPERTIES & SETTINGS (Matching Screenshots 3, 4, 5) */}
        <StudioRightTabs
          rightTab={studio.rightTab}
          setRightTab={studio.setRightTab}
          activeGroup={studio.activeGroup}
          activeOption={studio.activeOption}
          updateActiveOption={studio.updateActiveOption}
          updateGroup={studio.updateGroup}
          duplicateActiveGroup={studio.duplicateActiveGroup}
          views={studio.views}
          productId={studio.productId}
          setProductId={studio.setProductId}
          style={studio.style}
          setStyle={studio.setStyle}
          responsibleViewThumbnail={studio.responsibleViewThumbnail}
          setResponsibleViewThumbnail={studio.setResponsibleViewThumbnail}
          chooseForm={studio.chooseForm}
          setChooseForm={studio.setChooseForm}
          contactForm={studio.contactForm}
          setContactForm={studio.setContactForm}
          basePrice={studio.basePrice}
          setBasePrice={studio.setBasePrice}
          loadConfiguratorIn={studio.loadConfiguratorIn}
          setLoadConfiguratorIn={studio.setLoadConfiguratorIn}
          configuratorTemplate={studio.configuratorTemplate}
          setConfiguratorTemplate={studio.setConfiguratorTemplate}
          description={studio.description}
          setDescription={studio.setDescription}
          viewBackground={studio.viewBackground}
          setViewBackground={studio.setViewBackground}
          showDetailsPage={studio.showDetailsPage}
          setShowDetailsPage={studio.setShowDetailsPage}
          customCss={studio.customCss}
          setCustomCss={studio.setCustomCss}
          customJs={studio.customJs}
          setCustomJs={studio.setCustomJs}
          handleSave={studio.handleSave}
          isSaving={studio.isSaving}
          saveSuccess={studio.saveSuccess}
        />
      </div>

      {/* MODALS */}
      <StudioNewViewModal
        showNewViewModal={studio.showNewViewModal}
        setShowNewViewModal={studio.setShowNewViewModal}
        newViewName={studio.newViewName}
        setNewViewName={studio.setNewViewName}
        handleCreateView={studio.handleCreateView}
      />

      <StudioCustomerPreviewModal
        showCustomerPreview={studio.showCustomerPreview}
        setShowCustomerPreview={studio.setShowCustomerPreview}
        title={studio.title}
        views={studio.views}
        activeViewId={studio.activeViewId}
        setActiveViewId={studio.setActiveViewId}
        groups={studio.groups}
        selectedOptionId={studio.selectedOptionId}
        setSelectedGroupId={studio.setSelectedGroupId}
        setSelectedOptionId={studio.setSelectedOptionId}
      />
    </div>
  );
}
