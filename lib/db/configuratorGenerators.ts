import { VisualConfigurator, AdminProduct, ConfiguratorView } from "./types";

/**
 * Generate a dynamic VisualConfigurator for any AdminProduct based on its colors, layers, and specs
 */
export function generateConfiguratorForProduct(product: AdminProduct): VisualConfigurator {
  const cfgId = `cfg-${product.id}`;

  // 1. Derive dynamic views based on product colors and available images
  const firstColor = product.colors?.[0];
  const imagesCount = firstColor?.images?.length || (firstColor?.mockupOverlay?.startsWith("/") ? 1 : (product.image ? 1 : 0));

  let views: ConfiguratorView[] = [];
  if (imagesCount === 3) {
    views = [
      { id: "v-front", name: "المنظور 1 - الأمامي (Front View)", canvasWidth: 1000, canvasHeight: 1000 },
      { id: "v-angle", name: "المنظور 2 - العلوي المائل (Elevated Angle)", canvasWidth: 1000, canvasHeight: 1000 },
      { id: "v-side", name: "المنظور 3 - المقبض والجانب (Side View)", canvasWidth: 1000, canvasHeight: 1000 },
    ];
  } else if (imagesCount > 1) {
    views = Array.from({ length: imagesCount }).map((_, idx) => ({
      id: `v-${idx + 1}`,
      name: `المنظور ${idx + 1} (${idx === 0 ? "Front" : idx === 1 ? "Angle" : "Side"})`,
      canvasWidth: 1000,
      canvasHeight: 1000,
    }));
  } else {
    views = [
      { id: "v-front", name: "المنظور الرئيسي (Front View)", canvasWidth: 1000, canvasHeight: 1000 },
      { id: "v-side", name: "المنظور الجانبي (Side View)", canvasWidth: 1000, canvasHeight: 1000 },
    ];
  }

  // 2. Generate Color Options mapped across views
  const colorOptions: any[] = [];
  (product.colors || []).forEach((c, colorIdx) => {
    if (c.images && c.images.length > 0) {
      c.images.forEach((imgUrl, vIdx) => {
        const targetViewId = views[vIdx]?.id || views[0]?.id || "v-front";
        colorOptions.push({
          id: `opt-${c.id}-${targetViewId}`,
          name: c.name,
          controlType: "color" as const,
          colorHex: c.hex,
          priceAdd: c.priceAdd || 0,
          activeOnLoad: colorIdx === 0,
          imageUrl: imgUrl,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          zIndex: 1,
          viewId: targetViewId,
        });
      });
    } else {
      views.forEach((v) => {
        colorOptions.push({
          id: `opt-${c.id}-${v.id}`,
          name: c.name,
          controlType: "color" as const,
          colorHex: c.hex,
          priceAdd: c.priceAdd || 0,
          activeOnLoad: colorIdx === 0,
          imageUrl: c.mockupOverlay?.startsWith("/") ? c.mockupOverlay : undefined,
          x: 50,
          y: 50,
          width: c.mockupOverlay?.startsWith("/") ? 100 : 90,
          height: c.mockupOverlay?.startsWith("/") ? 100 : 90,
          zIndex: 1,
          viewId: v.id,
        });
      });
    }
  });

  const photoLayer = product.layers?.find((l) => l.type === "customer_photo_slot");
  const textLayer = product.layers?.find((l) => l.type === "customer_text_slot");

  const groups: any[] = [
    {
      id: "grp-color",
      title: `لون ${product.title} (Base Color)`,
      controlType: "color",
      required: true,
      multiple: false,
      initialState: "open",
      options: colorOptions,
    },
  ];

  if (photoLayer) {
    groups.push({
      id: "grp-photo-slot",
      title: "موضع ومساحة الصورة واللوجو (Design & Logo Slot)",
      controlType: "icon",
      required: false,
      multiple: false,
      initialState: "open",
      options: [
        {
          id: `opt-photo-std`,
          name: product.printAreaLabel || "مساحة الطباعة القياسية",
          controlType: "icon",
          iconUrl: "🖼️",
          priceAdd: 0,
          activeOnLoad: true,
          x: photoLayer.x,
          y: photoLayer.y,
          width: photoLayer.width,
          height: photoLayer.height,
          zIndex: photoLayer.zIndex || 2,
          viewId: views[0]?.id || "v-front",
        },
      ],
    });
  }

  if (textLayer) {
    groups.push({
      id: "grp-text-slot",
      title: "كتابة الاسم أو النص المخصص (Custom Text Slot)",
      controlType: "inline_text",
      required: false,
      multiple: false,
      initialState: "open",
      options: [
        {
          id: `opt-text-std`,
          name: "نص مخصص / إهداء",
          controlType: "inline_text",
          priceAdd: 10,
          activeOnLoad: false,
          x: textLayer.x,
          y: textLayer.y,
          width: textLayer.width,
          height: textLayer.height,
          zIndex: textLayer.zIndex || 3,
          viewId: views[0]?.id || "v-front",
          description: textLayer.defaultText || "اكتب النص المخصص هنا...",
        },
      ],
    });
  }

  const hotspots = [
    {
      id: `hs-1`,
      viewId: views[0]?.id || "v-front",
      x: photoLayer ? photoLayer.x : 50,
      y: photoLayer ? photoLayer.y : 50,
      title: "تخصيص منطقة التصميم",
      targetGroupId: photoLayer ? "grp-photo-slot" : "grp-color",
    },
  ];

  return {
    id: cfgId,
    name: `${product.title} (Visual Configurator Studio)`,
    productId: product.id,
    style: "style1",
    canvasWidth: 1000,
    canvasHeight: 1000,
    basePrice: product.basePrice,
    views,
    groups,
    hotspots,
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
