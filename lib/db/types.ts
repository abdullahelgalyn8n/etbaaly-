export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  mockupOverlay: string;
  bgStyle?: string;
  priceAdd?: number;
  images?: string[];
}

export interface ProductLayer {
  id: string;
  name: string;
  type: "base_mockup" | "customer_photo_slot" | "customer_text_slot" | "overlay_frame" | "badge";
  imageUrl?: string;
  x: number; // % from left
  y: number; // % from top
  width: number; // %
  height: number; // %
  zIndex: number;
  rotation?: number;
  blendMode?: string;
  defaultText?: string;
}

export interface ConfiguratorView {
  id: string;
  name: string; // e.g. "أمامية (Front)", "خلفية (Back)", "جانبية (Side)"
  canvasWidth: number;
  canvasHeight: number;
}

export interface ConfiguratorHotspot {
  id: string;
  viewId: string;
  x: number; // %
  y: number; // %
  title: string;
  targetGroupId: string;
}

export interface ConfiguratorLayerOption {
  id: string;
  name: string;
  controlType: "color" | "icon" | "label" | "inline_text";
  colorHex?: string;
  iconUrl?: string;
  imageUrl?: string;
  priceAdd: number; // WooCommerce add-on price
  salePriceAdd?: number;
  activeOnLoad: boolean;
  switchViewId?: string; // Auto-rotates view on selection
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  opacity?: number;
  description?: string;
  tags?: string[];
  viewId?: string; // Which view this layer belongs to
}

export interface ConfiguratorGroup {
  id: string;
  title: string;
  controlType?: "color" | "icon" | "label" | "inline_text";
  required: boolean;
  multiple: boolean;
  initialState: "open" | "deactivate" | "closed";
  options: ConfiguratorLayerOption[];
  description?: string;
  hideControl?: boolean;
  customClass?: string;
}

export interface VisualConfigurator {
  id: string;
  name: string;
  productId: string;
  style: "style1" | "style2" | "style3" | "accordion";
  canvasWidth: number;
  canvasHeight: number;
  views: ConfiguratorView[];
  groups: ConfiguratorGroup[];
  hotspots: ConfiguratorHotspot[];
  // wp-configurator-pro Global Settings
  responsibleViewThumbnail?: string;
  chooseForm?: string;
  contactForm?: string;
  basePrice?: number;
  loadConfiguratorIn?: string;
  configuratorTemplate?: string;
  description?: string;
  viewBackground?: string;
  showDetailsPage?: string;
  customCss?: string;
  customJs?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProduct {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  subCategory?: string;
  subCategorySlug?: string;
  tags?: string[];
  basePrice: number;
  salePrice?: number;
  sku?: string;
  stockStatus?: "instock" | "outofstock";
  description: string;
  turnaround: string;
  badge?: string;
  status: "published" | "draft";
  colors: ProductColor[];
  layers: ProductLayer[];
  configurator?: VisualConfigurator;
  sizes?: string[];
  image?: string;
  printAreaLabel?: string;
  defaultTextPlaceholder?: string;
  createdAt: string;
  updatedAt: string;
}

export type MerchantTemplate = AdminProduct;
export type PODProduct = AdminProduct;

export interface MediaAsset {
  id: string;
  url: string;
  storageType: "local" | "cloud_db";
  filename: string;
  altText: string;
  title: string;
  caption?: string;
  description?: string;
  dimensions?: { width: number; height: number };
  fileSizeKb?: number;
  mimeType?: string;
  category?: string;
  tags?: string[];
  usedIn?: { type: "article" | "product"; id: string; title: string }[];
  createdAt: string;
  updatedAt: string;
}

export type NotificationType = "order" | "quote" | "customization" | "sample" | "system" | "inventory";
export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  link?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}
