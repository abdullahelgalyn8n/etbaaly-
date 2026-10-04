import { getDb, inMemoryStore } from "./client";
import { MediaAsset } from "./types";
import { initialMediaAssets } from "./initialMediaData";

export { initialMediaAssets };

export async function getMediaAssets(params?: {
  search?: string;
  category?: string;
  storageType?: string;
}) {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS media_assets (
          id VARCHAR(64) PRIMARY KEY,
          url TEXT NOT NULL UNIQUE,
          storage_type VARCHAR(20) NOT NULL DEFAULT 'local',
          filename VARCHAR(255) NOT NULL,
          alt_text VARCHAR(255) DEFAULT '',
          title VARCHAR(255) DEFAULT '',
          caption TEXT DEFAULT '',
          description TEXT DEFAULT '',
          dimensions JSONB DEFAULT '{"width": 0, "height": 0}'::jsonb,
          file_size_kb NUMERIC(10, 2) DEFAULT 0,
          mime_type VARCHAR(50) DEFAULT 'image/webp',
          category VARCHAR(100) DEFAULT 'general',
          tags JSONB DEFAULT '[]'::jsonb,
          used_in JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      const rows = await sql`SELECT * FROM media_assets ORDER BY created_at DESC`;
      if (rows && rows.length > 0) {
        let assets = rows.map((r: any) => ({
          id: r.id,
          url: r.url,
          storageType: r.storage_type as "local" | "cloud_db",
          filename: r.filename,
          altText: r.alt_text || "",
          title: r.title || "",
          caption: r.caption || "",
          description: r.description || "",
          dimensions: typeof r.dimensions === "string" ? JSON.parse(r.dimensions) : r.dimensions,
          fileSizeKb: Number(r.file_size_kb) || 0,
          mimeType: r.mime_type || "image/webp",
          category: r.category || "general",
          tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
          usedIn: typeof r.used_in === "string" ? JSON.parse(r.used_in) : r.used_in,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));

        if (params?.search) {
          const s = params.search.toLowerCase();
          assets = assets.filter(
            (a: any) =>
              a.title?.toLowerCase().includes(s) ||
              a.altText?.toLowerCase().includes(s) ||
              a.filename?.toLowerCase().includes(s)
          );
        }
        if (params?.category && params.category !== "all") {
          assets = assets.filter((a: any) => a.category === params.category);
        }
        if (params?.storageType && params.storageType !== "all") {
          assets = assets.filter((a: any) => a.storageType === params.storageType);
        }
        return assets;
      }
    } catch (err) {
      console.error("Error fetching media assets from Neon:", err);
    }
  }

  // In-memory fallback
  if (!inMemoryStore.mediaAssets || inMemoryStore.mediaAssets.length === 0) {
    inMemoryStore.mediaAssets = [...initialMediaAssets];
  }
  let list = inMemoryStore.mediaAssets;
  if (params?.search) {
    const s = params.search.toLowerCase();
    list = list.filter(
      (a: any) =>
        a.title?.toLowerCase().includes(s) ||
        a.altText?.toLowerCase().includes(s) ||
        a.filename?.toLowerCase().includes(s)
    );
  }
  if (params?.category && params.category !== "all") {
    list = list.filter((a: any) => a.category === params.category);
  }
  if (params?.storageType && params.storageType !== "all") {
    list = list.filter((a: any) => a.storageType === params.storageType);
  }
  return list;
}

export async function saveMediaAsset(asset: Partial<MediaAsset>) {
  const id = asset.id || `media-${Date.now()}`;
  const record: MediaAsset = {
    id,
    url: asset.url || `/images/placeholder.webp`,
    storageType: asset.storageType || "local",
    filename: asset.filename || "image.webp",
    altText: asset.altText || "",
    title: asset.title || asset.filename || "صورة جديدة",
    caption: asset.caption || "",
    description: asset.description || "",
    dimensions: asset.dimensions || { width: 800, height: 600 },
    fileSizeKb: asset.fileSizeKb || 50,
    mimeType: asset.mimeType || "image/webp",
    category: asset.category || "general",
    tags: asset.tags || [],
    usedIn: asset.usedIn || [],
    createdAt: asset.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        INSERT INTO media_assets (
          id, url, storage_type, filename, alt_text, title, caption, description,
          dimensions, file_size_kb, mime_type, category, tags, used_in, updated_at
        ) VALUES (
          ${record.id}, ${record.url}, ${record.storageType}, ${record.filename},
          ${record.altText}, ${record.title}, ${record.caption}, ${record.description},
          ${JSON.stringify(record.dimensions)}, ${record.fileSizeKb}, ${record.mimeType},
          ${record.category}, ${JSON.stringify(record.tags)}, ${JSON.stringify(record.usedIn)},
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          alt_text = EXCLUDED.alt_text,
          title = EXCLUDED.title,
          caption = EXCLUDED.caption,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          used_in = EXCLUDED.used_in,
          updated_at = CURRENT_TIMESTAMP;
      `;
    } catch (err) {
      console.error("Neon saveMediaAsset error:", err);
    }
  }

  // Memory fallback
  if (!inMemoryStore.mediaAssets) {
    inMemoryStore.mediaAssets = [...initialMediaAssets];
  }
  const idx = inMemoryStore.mediaAssets.findIndex((m: any) => m.id === id);
  if (idx >= 0) {
    inMemoryStore.mediaAssets[idx] = { ...inMemoryStore.mediaAssets[idx], ...record };
  } else {
    inMemoryStore.mediaAssets.unshift(record);
  }

  return record;
}

export async function deleteMediaAsset(id: string) {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`DELETE FROM media_assets WHERE id = ${id}`;
    } catch (err) {
      console.error("Neon deleteMediaAsset error:", err);
    }
  }
  if (inMemoryStore.mediaAssets) {
    inMemoryStore.mediaAssets = inMemoryStore.mediaAssets.filter((m: any) => m.id !== id);
  }
  return true;
}
