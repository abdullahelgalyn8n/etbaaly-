import { VisualConfigurator, AdminProduct } from "./types";
import { getDb, inMemoryStore } from "./client";
import { getAdminProducts } from "./products";
import { initialVisualConfigurators } from "./seeds/initialVisualConfigurators";
import { generateConfiguratorForProduct } from "./configuratorGenerators";

export { initialVisualConfigurators, generateConfiguratorForProduct };

export async function getVisualConfigurators(): Promise<VisualConfigurator[]> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS visual_configurators (
          id VARCHAR(64) PRIMARY KEY, name VARCHAR(255) NOT NULL, product_id VARCHAR(64) NOT NULL,
          style VARCHAR(50) DEFAULT 'style1', canvas_width INT DEFAULT 1000, canvas_height INT DEFAULT 1000,
          base_price NUMERIC(10, 2) DEFAULT 0, views JSONB DEFAULT '[]'::jsonb, groups JSONB DEFAULT '[]'::jsonb,
          hotspots JSONB DEFAULT '[]'::jsonb, responsible_view_thumbnail VARCHAR(255), choose_form VARCHAR(50),
          contact_form VARCHAR(50), load_configurator_in VARCHAR(50), configurator_template VARCHAR(100),
          description TEXT, view_background TEXT, show_details_page VARCHAR(50), custom_css TEXT, custom_js TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      const rows = await sql`SELECT * FROM visual_configurators ORDER BY updated_at DESC`;
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          productId: r.product_id,
          style: r.style,
          canvasWidth: r.canvas_width,
          canvasHeight: r.canvas_height,
          basePrice: r.base_price ? Number(r.base_price) : undefined,
          views: typeof r.views === "string" ? JSON.parse(r.views) : r.views,
          groups: typeof r.groups === "string" ? JSON.parse(r.groups) : r.groups,
          hotspots: typeof r.hotspots === "string" ? JSON.parse(r.hotspots) : r.hotspots,
          responsibleViewThumbnail: r.responsible_view_thumbnail,
          chooseForm: r.choose_form,
          contactForm: r.contact_form,
          loadConfiguratorIn: r.load_configurator_in,
          configuratorTemplate: r.configurator_template,
          description: r.description,
          viewBackground: r.view_background,
          showDetailsPage: r.show_details_page,
          customCss: r.custom_css,
          customJs: r.custom_js,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));
      }
    } catch (err) {
      console.error("Neon getVisualConfigurators error:", err);
    }
  }

  // Fallback to in-memory store
  if (!(inMemoryStore as any).visualConfigurators || (inMemoryStore as any).visualConfigurators.length === 0) {
    (inMemoryStore as any).visualConfigurators = [...initialVisualConfigurators];
  } else {
    for (const seed of initialVisualConfigurators) {
      const idx = (inMemoryStore as any).visualConfigurators.findIndex((c: any) => c.id === seed.id);
      if (idx !== -1 && !(inMemoryStore as any).visualConfigurators[idx]._userModified) {
        (inMemoryStore as any).visualConfigurators[idx] = seed;
      }
    }
  }
  return (inMemoryStore as any).visualConfigurators;
}

export async function getConfiguratorByProductId(productId: string): Promise<VisualConfigurator> {
  const configurators = await getVisualConfigurators();
  const direct = configurators.find(
    (c) => c.productId === productId || c.id === productId || c.id === `cfg-${productId}`
  );
  if (direct) return direct;

  // Search products by id or slug
  const products = await getAdminProducts("all");
  const product = products.find((p: AdminProduct) => p.id === productId || p.slug === productId);
  if (product) {
    const existingForProd = configurators.find(
      (c) => c.productId === product.id || c.id === product.id || c.id === `cfg-${product.id}`
    );
    if (existingForProd) return existingForProd;

    const generated = generateConfiguratorForProduct(product);
    await saveVisualConfigurator(generated);
    return generated;
  }

  return initialVisualConfigurators[0];
}

export async function saveVisualConfigurator(configuratorData: Partial<VisualConfigurator>) {
  const id = configuratorData.id || `cfg-${Date.now()}`;
  const now = new Date().toISOString();

  const record: VisualConfigurator = {
    id,
    name: configuratorData.name || "مهيئ منتج جديد",
    productId: configuratorData.productId || "prod-default",
    style: configuratorData.style || "style1",
    canvasWidth: configuratorData.canvasWidth || 1000,
    canvasHeight: configuratorData.canvasHeight || 1000,
    basePrice: configuratorData.basePrice !== undefined ? Number(configuratorData.basePrice) : undefined,
    views: configuratorData.views || [
      { id: "v-front", name: "أمامية (Front)", canvasWidth: 1000, canvasHeight: 1000 },
    ],
    groups: configuratorData.groups || [],
    hotspots: configuratorData.hotspots || [],
    responsibleViewThumbnail: configuratorData.responsibleViewThumbnail,
    chooseForm: configuratorData.chooseForm,
    contactForm: configuratorData.contactForm,
    loadConfiguratorIn: configuratorData.loadConfiguratorIn,
    configuratorTemplate: configuratorData.configuratorTemplate,
    description: configuratorData.description,
    viewBackground: configuratorData.viewBackground,
    showDetailsPage: configuratorData.showDetailsPage,
    customCss: configuratorData.customCss,
    customJs: configuratorData.customJs,
    createdAt: configuratorData.createdAt || now,
    updatedAt: now,
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        INSERT INTO visual_configurators (
          id, name, product_id, style, canvas_width, canvas_height, base_price,
          views, groups, hotspots, responsible_view_thumbnail, choose_form,
          contact_form, load_configurator_in, configurator_template, description,
          view_background, show_details_page, custom_css, custom_js, updated_at
        ) VALUES (
          ${record.id}, ${record.name}, ${record.productId}, ${record.style},
          ${record.canvasWidth}, ${record.canvasHeight}, ${record.basePrice ?? null},
          ${JSON.stringify(record.views)}, ${JSON.stringify(record.groups)},
          ${JSON.stringify(record.hotspots)}, ${record.responsibleViewThumbnail ?? null},
          ${record.chooseForm ?? null}, ${record.contactForm ?? null},
          ${record.loadConfiguratorIn ?? null}, ${record.configuratorTemplate ?? null},
          ${record.description ?? null}, ${record.viewBackground ?? null},
          ${record.showDetailsPage ?? null}, ${record.customCss ?? null},
          ${record.customJs ?? null}, CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, product_id = EXCLUDED.product_id, style = EXCLUDED.style,
          canvas_width = EXCLUDED.canvas_width, canvas_height = EXCLUDED.canvas_height,
          base_price = EXCLUDED.base_price, views = EXCLUDED.views, groups = EXCLUDED.groups,
          hotspots = EXCLUDED.hotspots, responsible_view_thumbnail = EXCLUDED.responsible_view_thumbnail,
          choose_form = EXCLUDED.choose_form, contact_form = EXCLUDED.contact_form,
          load_configurator_in = EXCLUDED.load_configurator_in, configurator_template = EXCLUDED.configurator_template,
          description = EXCLUDED.description, view_background = EXCLUDED.view_background,
          show_details_page = EXCLUDED.show_details_page, custom_css = EXCLUDED.custom_css,
          custom_js = EXCLUDED.custom_js, updated_at = CURRENT_TIMESTAMP
      `;
    } catch (e) {
      console.error("Neon saveVisualConfigurator error:", e);
    }
  }

  // Update in-memory
  const list = await getVisualConfigurators();
  const idx = list.findIndex((c) => c.id === id);
  if (idx !== -1) {
    list[idx] = record;
  } else {
    list.unshift(record);
  }

  return record;
}

export async function deleteVisualConfigurator(id: string) {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`DELETE FROM visual_configurators WHERE id = ${id} OR product_id = ${id}`;
    } catch (e) {
      console.error("Neon deleteVisualConfigurator error:", e);
    }
  }

  const list = await getVisualConfigurators();
  (inMemoryStore as any).visualConfigurators = list.filter((c: any) => c.id !== id && c.productId !== id);
  return true;
}
