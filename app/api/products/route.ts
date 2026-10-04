import { NextRequest, NextResponse } from "next/server";
import { getAdminProducts } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const allPublished = await getAdminProducts("published");
    let results = allPublished;

    if (category && category !== "all") {
      results = results.filter((p) => p.category === category);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      products: results,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "تعذر جلب المنتجات المتاحة" },
      { status: 500 }
    );
  }
}
