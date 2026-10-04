import { NextResponse } from "next/server";
import {
  findPostBySlug,
  queryAdminPosts,
  insertAdminPost,
  updateAdminPost,
  deleteAdminPost,
} from "@/lib/posts/adminPostsStore";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const post = await findPostBySlug(slug);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "المقال غير موجود." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, post });
  }

  const result = await queryAdminPosts({
    search: searchParams.get("search")?.toLowerCase().trim() || "",
    category: searchParams.get("category") || "all",
    status: searchParams.get("status") || "all",
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "15", 10),
  });

  return NextResponse.json({
    success: true,
    posts: result.posts,
    pagination: result.pagination,
    stats: result.stats,
  });
}

export async function POST(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const body = await request.json();
    const res = await insertAdminPost(body);

    if (!res.success) {
      const status = res.error?.includes("يوجد مقال") ? 409 : 400;
      return NextResponse.json({ success: false, error: res.error }, { status });
    }

    return NextResponse.json({
      success: true,
      message: "تم إنشاء ونشر المقال وحفظه بنجاح!",
      post: res.post,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء حفظ المقال." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const body = await request.json();
    const targetSlug = body.originalSlug || body.slug;

    if (!targetSlug) {
      return NextResponse.json(
        { success: false, error: "رابط المقال (Slug) مطلوب لتحديث البيانات." },
        { status: 400 }
      );
    }

    const res = await updateAdminPost(targetSlug, body);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث المقال بنجاح.",
      post: res.post,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء تحديث المقال." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "رابط المقال (Slug) مطلوب للحذف." },
        { status: 400 }
      );
    }

    const deleted = await deleteAdminPost(slug);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "لم يتم العثور على المقال المراد حذفه." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف المقال بنجاح.",
    });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء حذف المقال." },
      { status: 500 }
    );
  }
}
