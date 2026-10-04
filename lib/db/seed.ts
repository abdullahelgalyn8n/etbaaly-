import { AdminProduct } from "./types";
import { initialProductsStickerMule } from "./initialProductsStickerMule";
import { vpcConfiguratorPresets, VPCConfiguratorPreset } from "./vpcPresets";

export const initialAdminProducts: AdminProduct[] = [
  ...initialProductsStickerMule,
];

export const merchantTemplatesSeed = initialAdminProducts;
export const podProductsSeed = initialAdminProducts;

export { vpcConfiguratorPresets };
export type { VPCConfiguratorPreset };
