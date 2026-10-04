import { AdminProduct } from "./types";
import { getDb, inMemoryStore } from "./client";
import { initialAdminProducts } from "./seed";

export async function getAdminProducts(statusFilter?: "published" | "draft" | "all") {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS admin_products (
          id VARCHAR(64) PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          base_price NUMERIC(10, 2) NOT NULL,
          description TEXT,
          turnaround VARCHAR(100),
          badge VARCHAR(100),
          status VARCHAR(50) DEFAULT 'published',
          colors JSONB DEFAULT '[]'::jsonb,
          layers JSONB DEFAULT '[]'::jsonb,
          print_area_label VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      let rows;
      if (statusFilter && statusFilter !== "all") {
        rows = await sql`SELECT * FROM admin_products WHERE status = ${statusFilter} ORDER BY created_at DESC`;
      } else {
        rows = await sql`SELECT * FROM admin_products ORDER BY created_at DESC`;
      }

      if (rows && rows.length > 0) {
        const dbProducts = rows.map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          basePrice: Number(r.base_price),
          description: r.description,
          turnaround: r.turnaround,
          badge: r.badge,
          status: r.status,
          colors: typeof r.colors === "string" ? JSON.parse(r.colors) : r.colors,
          layers: typeof r.layers === "string" ? JSON.parse(r.layers) : r.layers,
          printAreaLabel: r.print_area_label,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));

        // Automatically sync and append any missing seed products (e.g. apparel & hoodies)
        const dbIds = new Set(dbProducts.map((p: any) => p.id));
        const missingSeed = initialAdminProducts.filter((p) => !dbIds.has(p.id));

        if (missingSeed.length > 0) {
          for (const p of missingSeed) {
            try {
              await sql`
                INSERT INTO admin_products (
                  id, slug, title, category, base_price, description, turnaround, badge, status, colors, layers, print_area_label
                ) VALUES (
                  ${p.id}, ${p.slug}, ${p.title}, ${p.category}, ${p.basePrice}, ${p.description || ''},
                  ${p.turnaround || ''}, ${p.badge || ''}, ${p.status || 'published'},
                  ${JSON.stringify(p.colors || [])}::jsonb, ${JSON.stringify(p.layers || [])}::jsonb, ${p.printAreaLabel || ''}
                ) ON CONFLICT (id) DO NOTHING;
              `;
            } catch (insertErr) {
              console.warn("Auto-insert error for product:", p.id, insertErr);
            }
          }
          const filteredMissing = statusFilter && statusFilter !== "all" 
            ? missingSeed.filter((p) => p.status === statusFilter)
            : missingSeed;
          return [...dbProducts, ...filteredMissing];
        }

        return dbProducts;
      }
    } catch (err) {
      console.error("Neon getAdminProducts error:", err);
    }
  }

  // In-memory fallback
  if (inMemoryStore.adminProducts.length < initialAdminProducts.length) {
    inMemoryStore.adminProducts = [...initialAdminProducts];
  }
  if (statusFilter && statusFilter !== "all") {
    return inMemoryStore.adminProducts.filter((p) => p.status === statusFilter);
  }
  return inMemoryStore.adminProducts;
}

export async function saveAdminProduct(productData: Partial<AdminProduct>) {
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

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        INSERT INTO admin_products (
          id, slug, title, category, base_price, description, turnaround, badge,
          status, colors, layers, print_area_label, updated_at
        ) VALUES (
          ${newProduct.id}, ${newProduct.slug}, ${newProduct.title}, ${newProduct.category},
          ${newProduct.basePrice}, ${newProduct.description}, ${newProduct.turnaround}, ${newProduct.badge},
          ${newProduct.status}, ${JSON.stringify(newProduct.colors)}, ${JSON.stringify(newProduct.layers)},
          ${newProduct.printAreaLabel}, CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          base_price = EXCLUDED.base_price,
          description = EXCLUDED.description,
          turnaround = EXCLUDED.turnaround,
          badge = EXCLUDED.badge,
          status = EXCLUDED.status,
          colors = EXCLUDED.colors,
          layers = EXCLUDED.layers,
          print_area_label = EXCLUDED.print_area_label,
          updated_at = CURRENT_TIMESTAMP;
      `;
    } catch (err) {
      console.error("Neon saveAdminProduct error:", err);
    }
  }

  // Update in-memory
  const existingIdx = inMemoryStore.adminProducts.findIndex((p) => p.id === id);
  if (existingIdx >= 0) {
    inMemoryStore.adminProducts[existingIdx] = newProduct;
  } else {
    inMemoryStore.adminProducts.unshift(newProduct);
  }

  return newProduct;
}

export async function deleteAdminProduct(id: string) {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`DELETE FROM admin_products WHERE id = ${id}`;
    } catch (err) {
      console.error("Neon deleteAdminProduct error:", err);
    }
  }
  inMemoryStore.adminProducts = inMemoryStore.adminProducts.filter((p) => p.id !== id);
  return true;
}

export async function getAdminProductByIdOrSlug(idOrSlug: string): Promise<AdminProduct | null> {
  const products = await getAdminProducts("all");
  const decoded = decodeURIComponent(idOrSlug);
  return (
    products.find(
      (p) =>
        p.id === idOrSlug ||
        p.slug === idOrSlug ||
        p.slug === decoded ||
        p.id === decoded
    ) || null
  );
}
