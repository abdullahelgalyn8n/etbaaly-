import { NextRequest, NextResponse } from "next/server";
import { podProductsSeed } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (slug) {
    const product = podProductsSeed.find((p) => p.slug === slug || p.id === slug);
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  }

  let results = [...podProductsSeed];
  if (category && category !== "all") {
    results = results.filter((p) => (p.categorySlug || p.category) === category || p.category === category);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    products: results,
  });
}
