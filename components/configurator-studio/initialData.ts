import { ConfiguratorGroup, ConfiguratorHotspot, ConfiguratorView } from "@/lib/db";

export const defaultViews: ConfiguratorView[] = [
  { id: "v-front", name: "أمامية (Front)", canvasWidth: 1000, canvasHeight: 1000 },
  { id: "v-back", name: "خلفية (Back)", canvasWidth: 1000, canvasHeight: 1000 },
  { id: "v-side", name: "جانبية (Side)", canvasWidth: 1000, canvasHeight: 1000 },
];

export const defaultGroups: ConfiguratorGroup[] = [
  {
    id: "grp-1",
    title: "لون وخامة العلبة (Base Color)",
    controlType: "color",
    required: true,
    multiple: false,
    initialState: "open",
    options: [
      {
        id: "opt-1",
        name: "أحمر قرمزي إطبعلي",
        controlType: "color",
        colorHex: "#C93B41",
        priceAdd: 0,
        activeOnLoad: true,
        x: 50,
        y: 50,
        width: 90,
        height: 90,
        zIndex: 1,
        viewId: "v-front",
      },
      {
        id: "opt-2",
        name: "أسود ملكي فاحم",
        controlType: "color",
        colorHex: "#1C1C1C",
        priceAdd: 5,
        activeOnLoad: false,
        x: 50,
        y: 50,
        width: 90,
        height: 90,
        zIndex: 1,
        viewId: "v-front",
      },
    ],
  },
];

export const defaultHotspots: ConfiguratorHotspot[] = [
  { id: "hs-1", viewId: "v-front", x: 50, y: 35, title: "اختر تشطيب الغلاف", targetGroupId: "grp-1" },
];
