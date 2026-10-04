import { NextRequest, NextResponse } from "next/server";
import { queryAdminPosts, findPostBySlug } from "@/lib/posts/adminPostsStore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await findPostBySlug(slug);
      if (!post || post.status !== "published") {
        return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
      }
      return NextResponse.json({ success: true, post });
    }

    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const category = searchParams.get("category") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await queryAdminPosts({
      search,
      category,
      status: "published",
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      posts: result.posts,
      pagination: result.pagination,
      stats: result.stats,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "تعذر جلب المقالات المتاحة" },
      { status: 500 }
    );
  }
}
