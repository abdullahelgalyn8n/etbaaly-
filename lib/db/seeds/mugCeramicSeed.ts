import { VisualConfigurator } from "../types";

export const ceramicMugConfigurator: VisualConfigurator = {
  id: "cfg-mug-ceramic",
  name: "مج سيراميك حراري فاخر (Custom Ceramic Mug)",
  productId: "prod-mug-ceramic",
  style: "style1",
  canvasWidth: 1000,
  canvasHeight: 1000,
  basePrice: 85,
  views: [
    { id: "v-front", name: "المنظور الأمامي (Front View)", canvasWidth: 1000, canvasHeight: 1000 },
    { id: "v-handle", name: "يد ومسكة المج (Handle View)", canvasWidth: 1000, canvasHeight: 1000 },
    { id: "v-top", name: "المنظور العلوي والداخلي (Inside View)", canvasWidth: 1000, canvasHeight: 1000 },
  ],
  hotspots: [
    { id: "hs-mug-1", viewId: "v-front", x: 50, y: 50, title: "مساحة الصورة المطبوعة", targetGroupId: "grp-mug-photo" },
    { id: "hs-mug-2", viewId: "v-front", x: 50, y: 82, title: "اسم أو إهداء العميل", targetGroupId: "grp-mug-text" },
  ],
  groups: [
    {
      id: "grp-mug-color",
      title: "لون وخامة المج الأساسي (Base Color)",
      controlType: "color",
      required: true,
      multiple: false,
      initialState: "open",
      options: [
        { id: "opt-mc-white", name: "أبيض ناصع كلاسيك", controlType: "color", colorHex: "#FFFFFF", priceAdd: 0, activeOnLoad: true, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        { id: "opt-mc-black", name: "أسود ملكي مطفي", controlType: "color", colorHex: "#1C1C1C", priceAdd: 10, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        { id: "opt-mc-red", name: "أبيض بيد وقلب أحمر", controlType: "color", colorHex: "#C93B41", priceAdd: 15, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        { id: "opt-mc-navy", name: "أزرق كحلي داكن", controlType: "color", colorHex: "#1E293B", priceAdd: 10, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        { id: "opt-mc-pink", name: "وردي باستيل ناعم", controlType: "color", colorHex: "#FBCFE8", priceAdd: 10, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
        { id: "opt-mc-magic", name: "مج سحري أسود (حراري)", controlType: "color", colorHex: "#000000", priceAdd: 30, activeOnLoad: false, x: 50, y: 50, width: 90, height: 90, zIndex: 1, viewId: "v-front" },
      ],
    },
    {
      id: "grp-mug-photo",
      title: "موضع وطريقة طباعة الصورة (Photo Slot)",
      controlType: "icon",
      required: false,
      multiple: false,
      initialState: "open",
      options: [
        { id: "opt-mp-single", name: "طباعة صورة جهة واحدة (9x8 cm)", controlType: "icon", iconUrl: "🖼️", priceAdd: 0, activeOnLoad: true, x: 50, y: 50, width: 65, height: 65, zIndex: 2, viewId: "v-front" },
        { id: "opt-mp-wrap", name: "طباعة بانورامية كاملة حول المج (Wrap)", controlType: "icon", iconUrl: "🔄", priceAdd: 20, activeOnLoad: false, x: 50, y: 50, width: 85, height: 65, zIndex: 2, viewId: "v-front" },
        { id: "opt-mp-double", name: "طباعة صورتين على الوجهين", controlType: "icon", iconUrl: "👥", priceAdd: 15, activeOnLoad: false, x: 50, y: 50, width: 60, height: 60, zIndex: 2, viewId: "v-front" },
      ],
    },
    {
      id: "grp-mug-text",
      title: "كتابة الاسم أو الإهداء (Custom Text Slot)",
      controlType: "inline_text",
      required: false,
      multiple: false,
      initialState: "open",
      options: [
        { id: "opt-mt-custom", name: "اسم أو إهداء مخصص بخط عربي فاخر", controlType: "inline_text", priceAdd: 10, activeOnLoad: true, x: 50, y: 82, width: 70, height: 15, zIndex: 3, viewId: "v-front", description: "اكتب الاسم أو الإهداء ليتم طباعته بخط أنيق." },
      ],
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
