"use client";

import { useState, useRef } from "react";
import {
  VisualConfigurator,
  ConfiguratorView,
  ConfiguratorHotspot,
  ConfiguratorLayerOption,
} from "@/lib/db";
import { defaultViews, defaultHotspots } from "./initialData";
import { useStudioLayers } from "./useStudioLayers";
import { useStudioGlobalSettings } from "./useStudioGlobalSettings";

export function useConfiguratorStudio(initialConfigurator?: VisualConfigurator) {
  const [configId] = useState(initialConfigurator?.id || `cfg-${Date.now()}`);
  const [title, setTitle] = useState(initialConfigurator?.name || "علب هدايا فاخرة 3D");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [productId, setProductId] = useState(initialConfigurator?.productId || "prod-packaging-rigid-box");
  const [style, setStyle] = useState(initialConfigurator?.style || "style2");

  // Global Settings and Custom Code state
  const globalSettings = useStudioGlobalSettings(initialConfigurator);

  // Views
  const [views, setViews] = useState<ConfiguratorView[]>(
    initialConfigurator?.views?.length ? initialConfigurator.views : defaultViews
  );
  const [activeViewId, setActiveViewIdState] = useState<string>(views[0]?.id || "v-front");

  // Layers & Groups (delegated to modular hook)
  const layers = useStudioLayers(initialConfigurator?.groups, activeViewId);

  // Synchronize selection when active view changes
  const setActiveViewId = (newViewId: string) => {
    setActiveViewIdState(newViewId);

    // Synchronize selected option/group to match new active view
    const allOpts = layers.groups.flatMap((g) => g.options);
    const currentOpt = allOpts.find((o) => o.id === layers.selectedOptionId);

    const viewGroups = layers.groups.filter((g) =>
      g.options.some((o) => !o.viewId || o.viewId === newViewId)
    );

    if (viewGroups.length > 0) {
      const sameGroupInView = viewGroups.find((g) => g.id === layers.selectedGroupId);
      const targetGroup = sameGroupInView || viewGroups[0];
      const targetViewOptions = targetGroup.options.filter(
        (o) => !o.viewId || o.viewId === newViewId
      );

      let matchingOpt: ConfiguratorLayerOption | undefined;
      if (currentOpt) {
        matchingOpt = targetViewOptions.find(
          (o) =>
            (currentOpt.colorHex &&
              o.colorHex &&
              o.colorHex.toLowerCase() === currentOpt.colorHex.toLowerCase()) ||
            (o.name &&
              currentOpt.name &&
              o.name.split("(")[0]?.trim() === currentOpt.name.split("(")[0]?.trim())
        );

        if (!matchingOpt) {
          for (const vg of viewGroups) {
            const opt = vg.options.find(
              (o) =>
                (!o.viewId || o.viewId === newViewId) &&
                ((currentOpt.colorHex &&
                  o.colorHex &&
                  o.colorHex.toLowerCase() === currentOpt.colorHex.toLowerCase()) ||
                  (o.name &&
                    currentOpt.name &&
                    o.name.split("(")[0]?.trim() === currentOpt.name.split("(")[0]?.trim()))
            );
            if (opt) {
              layers.setSelectedGroupId(vg.id);
              layers.setSelectedOptionId(opt.id);
              return;
            }
          }
        }
      }

      if (!matchingOpt) {
        matchingOpt = targetViewOptions.find((o) => o.activeOnLoad) || targetViewOptions[0];
      }

      layers.setSelectedGroupId(targetGroup.id);
      if (matchingOpt) {
        layers.setSelectedOptionId(matchingOpt.id);
      }
    }
  };

  // Hotspots & Tabs
  const [hotspots, setHotspots] = useState<ConfiguratorHotspot[]>(
    initialConfigurator?.hotspots || defaultHotspots
  );
  const [isHotspotMode, setIsHotspotMode] = useState(false);
  const [rightTab, setRightTab] = useState<"controls" | "settings" | "code">("settings");

  // Modals & Save State
  const [showCustomerPreview, setShowCustomerPreview] = useState(false);
  const [showNewViewModal, setShowNewViewModal] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHotspotMode || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const newHs: ConfiguratorHotspot = {
      id: `hs-${Date.now()}`,
      viewId: activeViewId,
      x: Math.round(clickX),
      y: Math.round(clickY),
      title: layers.activeGroup ? layers.activeGroup.title : "تخصيص الخيار",
      targetGroupId: layers.selectedGroupId || layers.groups[0]?.id || "",
    };

    setHotspots([...hotspots, newHs]);
    setIsHotspotMode(false);
  };

  const handleCreateView = () => {
    if (!newViewName.trim()) return;
    const vId = `v-${Date.now()}`;
    const newV: ConfiguratorView = {
      id: vId,
      name: newViewName.trim(),
      canvasWidth: 1000,
      canvasHeight: 1000,
    };
    setViews([...views, newV]);
    setActiveViewId(vId);
    setNewViewName("");
    setShowNewViewModal(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload: VisualConfigurator = {
        id: configId,
        name: title,
        productId,
        style,
        canvasWidth: initialConfigurator?.canvasWidth || 1000,
        canvasHeight: initialConfigurator?.canvasHeight || 1000,
        views,
        groups: layers.groups,
        hotspots,
        responsibleViewThumbnail: globalSettings.responsibleViewThumbnail,
        chooseForm: globalSettings.chooseForm,
        contactForm: globalSettings.contactForm,
        basePrice: globalSettings.basePrice,
        loadConfiguratorIn: globalSettings.loadConfiguratorIn,
        configuratorTemplate: globalSettings.configuratorTemplate,
        description: globalSettings.description,
        viewBackground: globalSettings.viewBackground,
        showDetailsPage: globalSettings.showDetailsPage,
        customCss: globalSettings.customCss,
        customJs: globalSettings.customJs,
        createdAt: initialConfigurator?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/admin/configurators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    title,
    setTitle,
    isEditingTitle,
    setIsEditingTitle,
    productId,
    setProductId,
    style,
    setStyle,
    views,
    activeViewId,
    setActiveViewId,
    hotspots,
    isHotspotMode,
    setIsHotspotMode,
    rightTab,
    setRightTab,
    showCustomerPreview,
    setShowCustomerPreview,
    showNewViewModal,
    setShowNewViewModal,
    newViewName,
    setNewViewName,
    isSaving,
    saveSuccess,
    canvasRef,
    handleCanvasClick,
    handleCreateView,
    handleSave,
    ...globalSettings,
    ...layers,
  };
}
