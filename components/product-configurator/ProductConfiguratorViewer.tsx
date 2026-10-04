"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Home, Package } from "lucide-react";
import { VisualConfigurator, ConfiguratorGroup, ConfiguratorView } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { ConfiguratorProductCanvas } from "./ConfiguratorProductCanvas";
import { ConfiguratorProductOptions } from "./ConfiguratorProductOptions";

interface ProductConfiguratorViewerProps {
  initialConfigurator?: VisualConfigurator;
}

export function ProductConfiguratorViewer({ initialConfigurator }: ProductConfiguratorViewerProps) {
  // Use passed configurator or robust default
  const config: VisualConfigurator = initialConfigurator || {
    id: "cfg-luxury-box",
    name: "علب هدايا وتغليف فاخرة 3D (Luxury Packaging Box)",
    productId: "prod-packaging-rigid-box",
    style: "style1",
    canvasWidth: 1000,
    canvasHeight: 1000,
    hotspots: [],
    basePrice: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: [
      { id: "v-front", name: "المنظور الأمامي (Front View)", canvasWidth: 1000, canvasHeight: 1000 },
      { id: "v-open", name: "العلبة مفتوحة (Open Box Inside)", canvasWidth: 1000, canvasHeight: 1000 },
      { id: "v-side", name: "المنظور الجانبي (Side View)", canvasWidth: 1000, canvasHeight: 1000 },
    ],
    groups: [
      {
        id: "grp-color",
        title: "لون العلبة الأساسي (Base Color)",
        controlType: "color",
        required: true,
        multiple: false,
        initialState: "open",
        options: [
          { id: "opt-c-red", name: "أحمر قرمزي ملكي", controlType: "color", colorHex: "#C93B41", priceAdd: 0, activeOnLoad: true, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
          { id: "opt-c-black", name: "أسود فاحم مطفي", controlType: "color", colorHex: "#1C1C1C", priceAdd: 5, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
          { id: "opt-c-gold", name: "ذهبي شامبين معدني", controlType: "color", colorHex: "#D4AF37", priceAdd: 12, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
          { id: "opt-c-orange", name: "برتقالي هيرميس كلاسيك", controlType: "color", colorHex: "#E5833B", priceAdd: 8, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
          { id: "opt-c-brown", name: "بني شيكولاتة داكن", controlType: "color", colorHex: "#4E2E1E", priceAdd: 6, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        ],
      },
      {
        id: "grp-foil",
        title: "المعالجة الذهبية واللوجو (Finishing & Foil)",
        controlType: "icon",
        required: false,
        multiple: false,
        initialState: "open",
        options: [
          { id: "opt-foil-gold", name: "بصمة فويل ذهبي حراري", controlType: "icon", iconUrl: "✨", priceAdd: 18, activeOnLoad: true, x: 50, y: 35, width: 45, height: 25, zIndex: 4, viewId: "v-front" },
          { id: "opt-foil-silver", name: "بصمة ليزر فضي براق", controlType: "icon", iconUrl: "❄️", priceAdd: 15, activeOnLoad: false, x: 50, y: 35, width: 45, height: 25, zIndex: 4, viewId: "v-front" },
          { id: "opt-foil-uv", name: "سبوت UV بارز ملمع", controlType: "icon", iconUrl: "💧", priceAdd: 10, activeOnLoad: false, x: 50, y: 35, width: 45, height: 25, zIndex: 4, viewId: "v-front" },
        ],
      },
      {
        id: "grp-text",
        title: "كتابة الاسم أو الإهداء (Custom Engraving)",
        controlType: "inline_text",
        required: false,
        multiple: false,
        initialState: "open",
        options: [
          { id: "opt-text-slot", name: "حفر ليزري لاسم الشركة", controlType: "inline_text", priceAdd: 15, activeOnLoad: false, x: 50, y: 78, width: 60, height: 15, zIndex: 5, viewId: "v-front" },
        ],
      },
    ],
  };

  const [activeViewId, setActiveViewId] = useState(config.views[0]?.id || "v-front");

  // Initial Selections from activeOnLoad
  const initialSelections = useMemo(() => {
    const sel: Record<string, string> = {};
    config.groups.forEach((g) => {
      const def = g.options.find((o) => o.activeOnLoad) || g.options[0];
      if (def) sel[g.id] = def.id;
    });
    return sel;
  }, [config]);

  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({
    "opt-text-slot": "مطبعة إطبعلي - فاخر",
  });
  const [dimensions, setDimensions] = useState({ length: "87", width: "39", height: "30" });
  const { addItem } = useCart();
  const [cartSuccess, setCartSuccess] = useState(false);

  const handleSelectOption = (groupId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const handleCustomTextChange = (optionId: string, val: string) => {
    setCustomTexts((prev) => ({ ...prev, [optionId]: val }));
  };

  const handleDimensionChange = (key: "length" | "width" | "height", val: string) => {
    setDimensions((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setSelections(initialSelections);
    setDimensions({ length: "87", width: "39", height: "30" });
  };

  // Calculate dynamic total price
  const totalPrice = useMemo(() => {
    const base = config.basePrice || 45;
    const addSum = config.groups.reduce((sum, grp) => {
      const activeOptId = selections[grp.id];
      const opt = grp.options.find((o) => o.id === activeOptId);
      return sum + (opt?.priceAdd || 0);
    }, 0);
    return base + addSum;
  }, [config, selections]);

  const handleAddToCart = () => {
    const optionLabels: Record<string, string> = {};
    config.groups.forEach((g) => {
      const opt = g.options.find((o) => o.id === selections[g.id]);
      if (opt) optionLabels[g.title || g.id] = opt.name;
    });

    const activeOpt = config.groups.flatMap((g) => g.options).find((o) => o.imageUrl);
    const mockupImg = activeOpt?.imageUrl || "/images/products/mugs/green/Free_Mug_Mockup_1.jpg";

    addItem({
      productId: config.id || `custom-${Date.now()}`,
      slug: config.productId || config.id || "custom-packaging",
      title: config.name || "منتج مخصص بالمهيئ البصري",
      image: mockupImg,
      price: totalPrice,
      quantity: 1,
      category: "تخصيص مطبوعات",
      selectedOptions: optionLabels,
      customNotes: [
        ...Object.entries(customTexts).map(([k, v]) => `${k}: ${v}`),
        `أبعاد: ${dimensions.length}×${dimensions.width}×${dimensions.height} سم`,
      ].join(" | "),
    });

    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 3500);
  };

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. CLEAN BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-[#c93b41] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
        <Link href="/products" className="hover:text-[#c93b41] flex items-center gap-1">
          <Package className="w-3.5 h-3.5" />
          <span>المنتجات والتغليف</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
        <span className="text-slate-900 dark:text-white line-clamp-1">{config.name}</span>
      </nav>

      {/* Cart Success Alert */}
      {cartSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تمت إضافة المنتج إلى سلة المشتريات بنجاح!</span>
          </div>
          <Link href="/cart" className="underline hover:text-emerald-600">
            عرض السلة وإتمام الطلب ←
          </Link>
        </div>
      )}

      {/* 2. MASTER 2-COLUMN PRODUCT DISPLAY (Matching Reference Screenshot) */}
      <div className="bg-white dark:bg-[#181a1f] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* LEFT: Product Interactive Visual Stage */}
        <ConfiguratorProductCanvas
          views={config.views}
          activeViewId={activeViewId}
          setActiveViewId={setActiveViewId}
          groups={config.groups}
          selections={selections}
          customTexts={customTexts}
          dimensions={dimensions}
        />

        {/* RIGHT: Product Options, Swatches, Inputs & Checkout */}
        <ConfiguratorProductOptions
          configId={config.id}
          productTitle={config.name}
          basePrice={config.basePrice || 45}
          totalPrice={totalPrice}
          groups={config.groups}
          selections={selections}
          onSelectOption={handleSelectOption}
          customTexts={customTexts}
          onCustomTextChange={handleCustomTextChange}
          dimensions={dimensions}
          onDimensionChange={handleDimensionChange}
          onReset={handleReset}
          onAddToCart={handleAddToCart}
          onDownloadPdf={handleDownloadPdf}
        />
      </div>
    </div>
  );
}

export default ProductConfiguratorViewer;
