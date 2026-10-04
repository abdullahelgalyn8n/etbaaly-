import { NextRequest, NextResponse } from "next/server";
import { getAdminProducts, saveAdminProduct } from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as "published" | "draft" | "all" | null;

  try {
    const products = await getAdminProducts(status || "all");
    return NextResponse.json({ success: true, count: products.length, products });
  } catch {
    return NextResponse.json({ error: "فشل جلب المنتجات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const body = await request.json();

    if (!body.title || !body.basePrice) {
      return NextResponse.json(
        { error: "يرجى كتابة عنوان المنتج وسعره الأساسي." },
        { status: 400 }
      );
    }

    const saved = await saveAdminProduct(body);
    return NextResponse.json({
      success: true,
      message: "تم حفظ وإعداد طبقات المنتج بنجاح.",
      product: saved,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "تعذر حفظ المنتج في قاعدة البيانات." },
      { status: 500 }
    );
  }
}
