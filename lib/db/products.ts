import { AdminProduct } from "./types";
import { inMemoryStore } from "./client";
import { initialAdminProducts } from "./seed";

// Static In-Code Store: Products are bundled directly in Git and Cloudflare Edge bundle
// Eliminates external database roundtrips for 0ms instantaneous response time.

export async function getAdminProducts(statusFilter?: "published" | "draft" | "all"): Promise<AdminProduct[]> {
  const store = inMemoryStore.adminProducts && inMemoryStore.adminProducts.length > 0
    ? inMemoryStore.adminProducts
    : initialAdminProducts;

  if (statusFilter && statusFilter !== "all") {
    return store.filter((p) => p.status === statusFilter);
  }
  return store;
}

export async function getAdminProductByIdOrSlug(idOrSlug: string): Promise<AdminProduct | null> {
  if (!idOrSlug) return null;

  const raw = String(idOrSlug).trim().replace(/\/+$/, "");
  const decoded = decodeURIComponent(raw).trim().replace(/\/+$/, "");
  const rawLower = raw.toLowerCase();
  const decodedLower = decoded.toLowerCase();

  const store = inMemoryStore.adminProducts && inMemoryStore.adminProducts.length > 0
    ? inMemoryStore.adminProducts
    : initialAdminProducts;

  // Direct fast matching across id and slug
  const found = store.find((p) => {
    if (!p) return false;
    const pId = (p.id || "").trim();
    const pSlug = (p.slug || "").trim();
    const pIdLower = pId.toLowerCase();
    const pSlugLower = pSlug.toLowerCase();

    return (
      pSlug === raw ||
      pSlug === decoded ||
      pId === raw ||
      pId === decoded ||
      pSlugLower === rawLower ||
      pSlugLower === decodedLower ||
      pIdLower === rawLower ||
      pIdLower === decodedLower ||
      encodeURIComponent(pSlug) === raw ||
      encodeURIComponent(pSlug) === decoded
    );
  });

  return found || null;
}

export async function saveAdminProduct(productData: Partial<AdminProduct>): Promise<AdminProduct> {
  const id = productData.id || `prod-${Date.now()}`;
  const slug =
    productData.slug ||
    productData.title?.toLowerCase().replace(/[\s/]+/g, "-").replace(/[^\w\u0621-\u064A-]+/g, "") ||
    id;

  const newProduct: AdminProduct = {
    id,
    slug,
    title: productData.title || "منتج مخصص جديد",
    category: productData.category || "هدايا ومجات",
    basePrice: Number(productData.basePrice) || 85,
    description: productData.description || "",
    turnaround: productData.turnaround || "24 ساعة",
    badge: productData.badge || "",
    status: productData.status || "published",
    colors: productData.colors || [
      { id: "c1", name: "أبيض كلاسيك", hex: "#FFFFFF", mockupOverlay: "#FFFFFF", bgStyle: "linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)" },
      { id: "c2", name: "أسود ملكي", hex: "#1C1C1C", mockupOverlay: "#1C1C1C", bgStyle: "linear-gradient(135deg, #2B2B2B 0%, #111111 100%)" },
    ],
    layers: productData.layers || [
      { id: "l1", name: "خامة ولون المنتج الأساسي", type: "base_mockup", x: 50, y: 50, width: 100, height: 100, zIndex: 1 },
      { id: "l2", name: "منطقة صورة العميل (Photo Slot)", type: "customer_photo_slot", x: 50, y: 50, width: 60, height: 60, zIndex: 2 },
    ],
    printAreaLabel: productData.printAreaLabel || "مساحة الصورة المطبوعة (9x8 cm)",
    createdAt: productData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!inMemoryStore.adminProducts || inMemoryStore.adminProducts.length === 0) {
    inMemoryStore.adminProducts = [...initialAdminProducts];
  }

  const existingIdx = inMemoryStore.adminProducts.findIndex((p) => p.id === id || p.slug === slug);
  if (existingIdx >= 0) {
    inMemoryStore.adminProducts[existingIdx] = newProduct;
  } else {
    inMemoryStore.adminProducts.unshift(newProduct);
  }

  return newProduct;
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
  if (!inMemoryStore.adminProducts || inMemoryStore.adminProducts.length === 0) {
    inMemoryStore.adminProducts = [...initialAdminProducts];
  }
  inMemoryStore.adminProducts = inMemoryStore.adminProducts.filter((p) => p.id !== id);
  return true;
}
