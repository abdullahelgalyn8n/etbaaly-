import { NextRequest, NextResponse } from "next/server";
import { getAdminProducts, inMemoryStore, getDb } from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  const products = await getAdminProducts("all");
  let orders = inMemoryStore.orders;

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      const rows = await sql`SELECT * FROM orders`;
      if (rows) orders = rows as any;
    } catch (e) {
      console.error(e);
    }
  }

  const totalSales = orders.reduce((sum: number, o: any) => sum + Number(o.total_price || 0), 0);
  const activeOrders = orders.filter((o: any) => o.status !== "delivered").length;
  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;

  return NextResponse.json({
    success: true,
    stats: {
      totalSales,
      totalOrders: orders.length,
      activeOrders,
      publishedProducts,
      draftProducts,
      totalProducts: products.length,
    },
  });
}
