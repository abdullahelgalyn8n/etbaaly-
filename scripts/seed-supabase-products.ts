import { initialAdminProducts } from "../lib/db/seed";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dvkbfckmtovvoybnytix.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function executeSql(query: string) {
  const endpoint = `${supabaseUrl}/rest/v1/rpc/exec_sql`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`SQL Error: ${await res.text()}`);
  }
  return res.json();
}

async function seedProducts() {
  console.log(`Starting to seed ${initialAdminProducts.length} products to Supabase...`);
  let inserted = 0;
  for (const p of initialAdminProducts) {
    try {
      const q = `
        INSERT INTO admin_products (
          id, slug, title, category, base_price, description, turnaround, badge, status, colors, layers, print_area_label
        ) VALUES (
          '${p.id.replace(/'/g, "''")}',
          '${p.slug.replace(/'/g, "''")}',
          '${p.title.replace(/'/g, "''")}',
          '${p.category.replace(/'/g, "''")}',
          ${p.basePrice || 0},
          '${(p.description || "").replace(/'/g, "''")}',
          '${(p.turnaround || "").replace(/'/g, "''")}',
          '${(p.badge || "").replace(/'/g, "''")}',
          '${(p.status || "published").replace(/'/g, "''")}',
          '${JSON.stringify(p.colors || []).replace(/'/g, "''")}'::jsonb,
          '${JSON.stringify(p.layers || []).replace(/'/g, "''")}'::jsonb,
          '${(p.printAreaLabel || "").replace(/'/g, "''")}'
        ) ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          base_price = EXCLUDED.base_price,
          description = EXCLUDED.description,
          colors = EXCLUDED.colors,
          layers = EXCLUDED.layers,
          updated_at = CURRENT_TIMESTAMP;
      `;
      await executeSql(q);
      inserted++;
    } catch (err) {
      console.error(`Error inserting ${p.id}:`, err);
    }
  }
  console.log(`Successfully synced ${inserted} products to Supabase!`);
}

seedProducts();
