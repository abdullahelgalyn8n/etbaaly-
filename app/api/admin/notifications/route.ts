import { NextRequest, NextResponse } from "next/server";
import {
  getAdminNotifications,
  createAdminNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  getUnreadNotificationsCount,
  createTestAdminNotification,
} from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get("unreadOnly") === "true";
  const type = searchParams.get("type") || undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const { notifications, unreadCount } = await getAdminNotifications({
      unreadOnly,
      type,
      limit,
    });

    return NextResponse.json({
      success: true,
      count: notifications.length,
      unreadCount,
      notifications,
    });
  } catch (err: any) {
    console.error("GET /api/admin/notifications error:", err);
    return NextResponse.json(
      { success: false, error: "فشل استرجاع الإشعارات." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const body = await request.json().catch(() => ({}));
    const { action, id, read } = body;

    if (action === "mark_all_read") {
      await markAllNotificationsAsRead();
      const unreadCount = await getUnreadNotificationsCount();
      return NextResponse.json({
        success: true,
        message: "تم تحديد جميع الإشعارات كمقروءة.",
        unreadCount,
      });
    }

    if (id) {
      const readState = read !== undefined ? Boolean(read) : true;
      await markNotificationAsRead(id, readState);
      const unreadCount = await getUnreadNotificationsCount();
      return NextResponse.json({
        success: true,
        message: readState ? "تم تحديد الإشعار كمقروء." : "تم تغيير حالة الإشعار إلى غير مقروء.",
        unreadCount,
      });
    }

    return NextResponse.json(
      { success: false, error: "معاملات الطلب غير مكتملة." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("PATCH /api/admin/notifications error:", err);
    return NextResponse.json(
      { success: false, error: "تعذر تحديث حالة الإشعار." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const body = await request.json().catch(() => ({}));
    const { action, type, title, message, priority, link, metadata } = body;

    if (action === "test") {
      const testNotif = await createTestAdminNotification(type);
      const unreadCount = await getUnreadNotificationsCount();
      return NextResponse.json({
        success: true,
        message: "تم إنشاء إشعار تجريبي جديد بنجاح.",
        notification: testNotif,
        unreadCount,
      });
    }

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: "عنوان ونص الإشعار إلزاميان." },
        { status: 400 }
      );
    }

    const created = await createAdminNotification({
      title,
      message,
      type: type || "system",
      priority: priority || "medium",
      link: link || "/admin",
      metadata: metadata || {},
    });

    const unreadCount = await getUnreadNotificationsCount();

    return NextResponse.json({
      success: true,
      message: "تم حفظ الإشعار بنجاح.",
      notification: created,
      unreadCount,
    });
  } catch (err: any) {
    console.error("POST /api/admin/notifications error:", err);
    return NextResponse.json(
      { success: false, error: "تعذر إرسال الإشعار." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    const allParam = searchParams.get("all") === "true";

    let bodyId: string | undefined;
    let bodyClearAll = false;
    try {
      const body = await request.json();
      bodyId = body?.id;
      bodyClearAll = body?.action === "clear_all";
    } catch {
      // json body is optional for DELETE
    }

    if (allParam || bodyClearAll) {
      await clearAllNotifications();
      return NextResponse.json({
        success: true,
        message: "تم مسح جميع الإشعارات بنجاح.",
        unreadCount: 0,
      });
    }

    const targetId = idParam || bodyId;
    if (targetId) {
      await deleteNotification(targetId);
      const unreadCount = await getUnreadNotificationsCount();
      return NextResponse.json({
        success: true,
        message: "تم حذف الإشعار بنجاح.",
        unreadCount,
      });
    }

    return NextResponse.json(
      { success: false, error: "يرجى تحديد الإشعار المراد حذفه." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("DELETE /api/admin/notifications error:", err);
    return NextResponse.json(
      { success: false, error: "تعذر حذف الإشعار." },
      { status: 500 }
    );
  }
}
