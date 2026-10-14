import { initialAdminProducts } from "./seed";

export interface GalleryProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  subCategory?: string;
  subCategorySlug?: string;
  basePrice: number;
  description?: string;
  turnaround: string;
  badge?: string;
  status: string;
  image: string | null;
  imagesCount?: number;
  bgColor?: string;
}

export function getInitialGalleryProducts(): GalleryProductItem[] {
  return initialAdminProducts
    .filter((p) => p.status === "published")
    .map((p) => ({
      id: p.id,
      slug: p.slug || p.id,
      title: p.title,
      category: p.category,
      categorySlug: p.categorySlug,
      subCategory: p.subCategory,
      subCategorySlug: p.subCategorySlug,
      basePrice: p.basePrice,
      description: p.description,
      turnaround: p.turnaround,
      badge: p.badge,
      status: p.status,
      image:
        p.image ||
        p.colors?.[0]?.images?.[0] ||
        p.colors?.[0]?.mockupOverlay ||
        null,
      imagesCount: p.colors?.[0]?.images?.length || 1,
      bgColor: p.colors?.[0]?.bgStyle || p.colors?.[0]?.hex || "#FFFFFF",
    }));
}
