import { NextRequest, NextResponse } from "next/server";
import { getAdminProducts, saveAdminProduct, deleteAdminProduct, deleteVisualConfigurator } from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { id } = await params;
  const products = await getAdminProducts("all");
  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await saveAdminProduct({ ...body, id });

    return NextResponse.json({
      success: true,
      message: "تم تحديث إعدادات وطبقات المنتج بنجاح.",
      product: updated,
    });
  } catch (err) {
    return NextResponse.json({ error: "تعذر تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  const { id } = await params;
  try {
    await deleteAdminProduct(id);
    await deleteVisualConfigurator(id);
    return NextResponse.json({ success: true, message: "تم حذف المنتج بنجاح من قاعدة البيانات." });
  } catch (err) {
    return NextResponse.json({ error: "تعذر حذف المنتج" }, { status: 500 });
  }
}
