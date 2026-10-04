import { ProductColor, ProductLayer } from "@/lib/db";

export const defaultStudioColors: ProductColor[] = [
  { id: "c1", name: "أبيض ناصع كلاسيك", hex: "#FFFFFF", mockupOverlay: "#FFFFFF", bgStyle: "linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)" },
  { id: "c2", name: "أسود ملكي مطفي", hex: "#1C1C1C", mockupOverlay: "#1C1C1C", bgStyle: "linear-gradient(135deg, #2B2B2B 0%, #111111 100%)" },
  { id: "c3", name: "أبيض بيد وقلب أحمر", hex: "#C93B41", mockupOverlay: "#C93B41", bgStyle: "linear-gradient(135deg, #FFFFFF 60%, #C93B41 100%)" },
  { id: "c4", name: "أزرق كحلي داكن", hex: "#1E293B", mockupOverlay: "#1E293B", bgStyle: "linear-gradient(135deg, #334155 0%, #0F172A 100%)" },
];

export const defaultStudioLayers: ProductLayer[] = [
  { id: "l1", name: "خامة ولون المج الأساسي", type: "base_mockup", x: 50, y: 50, width: 100, height: 100, zIndex: 1 },
  { id: "l2", name: "منطقة صورة العميل (Photo Slot)", type: "customer_photo_slot", x: 50, y: 50, width: 65, height: 65, zIndex: 2 },
  { id: "l3", name: "منطقة اسم/إهداء العميل (Text Slot)", type: "customer_text_slot", defaultText: "اسم أو إهداء العميل...", x: 50, y: 82, width: 70, height: 15, zIndex: 3 },
  { id: "l4", name: "إطار لمعان وانعكاس الضوء", type: "overlay_frame", x: 50, y: 50, width: 100, height: 100, zIndex: 4, blendMode: "overlay" },
];
