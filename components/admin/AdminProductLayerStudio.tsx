"use client";

import React from "react";
import { Layers, Palette, Settings } from "lucide-react";
import { AdminProduct } from "@/lib/db";
import { StudioTopNav } from "./layer-studio/StudioTopNav";
import { StudioLayersTab } from "./layer-studio/StudioLayersTab";
import { StudioColorsTab } from "./layer-studio/StudioColorsTab";
import { StudioGeneralTab } from "./layer-studio/StudioGeneralTab";
import { StudioCanvasPreview } from "./layer-studio/StudioCanvasPreview";
import { useProductLayerStudio } from "./layer-studio/useProductLayerStudio";

export default function AdminProductLayerStudio({
  initialProduct,
}: {
  initialProduct?: AdminProduct;
}) {
  const {
    id,
    title,
    setTitle,
    basePrice,
    setBasePrice,
    turnaround,
    setTurnaround,
    description,
    setDescription,
    status,
    setStatus,
    colors,
    layers,
    activeTab,
    setActiveTab,
    selectedLayerId,
    setSelectedLayerId,
    previewColor,
    setPreviewColor,
    testSamplePhoto,
    handleSamplePhotoUpload,
    testSampleText,
    setTestSampleText,
    showLayerBoundaries,
    setShowLayerBoundaries,
    isSaving,
    saveSuccess,
    updateSelectedLayer,
    handleAddLayer,
    handleDeleteLayer,
    newColorName,
    setNewColorName,
    newColorHex,
    setNewColorHex,
    handleAddColor,
    handleDeleteColor,
    handleSaveProduct,
  } = useProductLayerStudio(initialProduct);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Top Studio Bar */}
      <StudioTopNav
        title={title}
        productId={id}
        status={status}
        setStatus={setStatus}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
        onSave={handleSaveProduct}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Layer & Color Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Studio Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-[#1c1c1c] p-1.5 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "general"
                  ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>بيانات المنتج</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("colors")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "colors"
                  ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>الألوان والصور ({colors.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("layers")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "layers"
                  ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>الطبقات ({layers.length})</span>
            </button>
          </div>

          {activeTab === "layers" && (
            <StudioLayersTab
              layers={layers}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onAddLayer={handleAddLayer}
              onDeleteLayer={handleDeleteLayer}
              onUpdateSelectedLayer={updateSelectedLayer}
            />
          )}

          {activeTab === "colors" && (
            <StudioColorsTab
              colors={colors}
              newColorName={newColorName}
              setNewColorName={setNewColorName}
              newColorHex={newColorHex}
              setNewColorHex={setNewColorHex}
              onAddColor={handleAddColor}
              onDeleteColor={handleDeleteColor}
            />
          )}

          {activeTab === "general" && (
            <StudioGeneralTab
              title={title}
              setTitle={setTitle}
              basePrice={basePrice}
              setBasePrice={setBasePrice}
              turnaround={turnaround}
              setTurnaround={setTurnaround}
              description={description}
              setDescription={setDescription}
            />
          )}
        </div>

        {/* Right Side: LIVE PREVIEW SIMULATOR (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <StudioCanvasPreview
            colors={colors}
            previewColor={previewColor}
            setPreviewColor={setPreviewColor}
            layers={layers}
            showLayerBoundaries={showLayerBoundaries}
            setShowLayerBoundaries={setShowLayerBoundaries}
            testSamplePhoto={testSamplePhoto}
            onSamplePhotoUpload={handleSamplePhotoUpload}
            testSampleText={testSampleText}
            setTestSampleText={setTestSampleText}
          />
        </div>
      </div>
    </div>
  );
}
