import { NextResponse } from "next/server";
import { getMediaAssets, saveMediaAsset, deleteMediaAsset } from "@/lib/db/media";
import { MediaAsset } from "@/lib/db/types";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const storageType = searchParams.get("storageType") || "all";

    const assets: MediaAsset[] = await getMediaAssets({ search, category, storageType });

    const totalCount = assets.length;
    const localCount = assets.filter((a: MediaAsset) => a.storageType === "local").length;
    const cloudCount = assets.filter((a: MediaAsset) => a.storageType === "cloud_db").length;

    return NextResponse.json({
      success: true,
      assets,
      stats: {
        total: totalCount,
        local: localCount,
        cloud: cloudCount,
      },
    });
  } catch (err: any) {
    console.error("API /api/admin/media GET error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "فشل جلب ملفات الوسائط." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const body = await request.json();
    if (!body.url && !body.filename) {
      return NextResponse.json(
        { success: false, error: "رابط الصورة واسم الملف مطلوبان." },
        { status: 400 }
      );
    }

    const saved = await saveMediaAsset(body);
    return NextResponse.json({ success: true, asset: saved });
  } catch (err: any) {
    console.error("API /api/admin/media POST error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "فشل حفظ بيانات الصورة." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "معرف الصورة (id) مطلوب." },
        { status: 400 }
      );
    }

    const updated = await saveMediaAsset(body);
    return NextResponse.json({ success: true, asset: updated });
  } catch (err: any) {
    console.error("API /api/admin/media PATCH error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "فشل تحديث بيانات الصورة." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "معرف الصورة (id) مطلوب للحذف." },
        { status: 400 }
      );
    }

    await deleteMediaAsset(id);
    return NextResponse.json({ success: true, message: "تم حذف الصورة بنجاح." });
  } catch (err: any) {
    console.error("API /api/admin/media DELETE error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "فشل حذف الصورة." },
      { status: 500 }
    );
  }
}
