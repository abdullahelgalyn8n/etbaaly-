"use client";

import { useState } from "react";
import { AdminProduct, ProductColor, ProductLayer } from "@/lib/db";
import { defaultStudioColors, defaultStudioLayers } from "./studioDefaults";

export function useProductLayerStudio(initialProduct?: AdminProduct) {
  // Product metadata
  const [id] = useState(initialProduct?.id || `prod-${Date.now()}`);
  const [title, setTitle] = useState(initialProduct?.title || "مج سيراميك مخصص بالاسم والصورة");
  const [slug] = useState(initialProduct?.slug || "custom-ceramic-mug");
  const [category] = useState(initialProduct?.category || "هدايا ومجات");
  const [basePrice, setBasePrice] = useState(initialProduct?.basePrice || 85);
  const [description, setDescription] = useState(
    initialProduct?.description || "مج سيراميك فاخر بجدار عازل مع طباعة حرارية 300 DPI."
  );
  const [turnaround, setTurnaround] = useState(initialProduct?.turnaround || "24 ساعة");
  const [badge] = useState(initialProduct?.badge || "الأكثر مبيعاً ⭐");
  const [status, setStatus] = useState<"published" | "draft">(initialProduct?.status || "published");
  const [printAreaLabel] = useState(
    initialProduct?.printAreaLabel || "مساحة الصورة المطبوعة (9x8 cm)"
  );

  // Colors list
  const [colors, setColors] = useState<ProductColor[]>(initialProduct?.colors || defaultStudioColors);

  // Layers list
  const [layers, setLayers] = useState<ProductLayer[]>(initialProduct?.layers || defaultStudioLayers);

  // Active studio states
  const [activeTab, setActiveTab] = useState<"general" | "colors" | "layers">("general");
  const [selectedLayerId, setSelectedLayerId] = useState<string>("l2");
  const [previewColor, setPreviewColor] = useState<ProductColor>(colors[0] || defaultStudioColors[0]);
  const [testSamplePhoto, setTestSamplePhoto] = useState<string | null>(null);
  const [testSampleText, setTestSampleText] = useState("أحمد عبد الرحمن");
  const [showLayerBoundaries, setShowLayerBoundaries] = useState(true);

  // Submitting
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Layer methods
  const updateSelectedLayer = (updates: Partial<ProductLayer>) => {
    if (!selectedLayerId) return;
    setLayers((prev) => prev.map((l) => (l.id === selectedLayerId ? { ...l, ...updates } : l)));
  };

  const handleAddLayer = (type: ProductLayer["type"]) => {
    const newLayer: ProductLayer = {
      id: `l-${Date.now()}`,
      name:
        type === "customer_photo_slot"
          ? "منطقة صورة عميل إضافية"
          : type === "customer_text_slot"
          ? "منطقة نص إضافية"
          : type === "overlay_frame"
          ? "طبقة إطار وزخرفة"
          : "طبقة جديدة",
      type,
      x: 50,
      y: 50,
      width: 50,
      height: 50,
      zIndex: layers.length + 1,
      defaultText: type === "customer_text_slot" ? "نص جديد..." : undefined,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const handleDeleteLayer = (layerId: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== layerId));
    if (selectedLayerId === layerId) {
      setSelectedLayerId(layers[0]?.id || "");
    }
  };

  // Color methods
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#C93B41");

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const newC: ProductColor = {
      id: `c-${Date.now()}`,
      name: newColorName.trim(),
      hex: newColorHex,
      mockupOverlay: newColorHex,
      bgStyle: `linear-gradient(135deg, ${newColorHex} 0%, #111111 100%)`,
    };
    setColors((prev) => [...prev, newC]);
    setNewColorName("");
  };

  const handleDeleteColor = (colorId: string) => {
    if (colors.length <= 1) return;
    setColors((prev) => prev.filter((c) => c.id !== colorId));
  };

  // Upload sample test photo in preview
  const handleSamplePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTestSamplePhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save full product setup
  const handleSaveProduct = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          slug,
          title,
          category,
          basePrice: Number(basePrice),
          description,
          turnaround,
          badge,
          status,
          colors,
          layers,
          printAreaLabel,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save product error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
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
  };
}
