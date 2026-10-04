import { getDb, inMemoryStore } from "./client";
import { AdminNotification, NotificationType, NotificationPriority } from "./types";

export const initialAdminNotifications: AdminNotification[] = [
  {
    id: "notif-101",
    title: "طلب شراء جديد: علب كرتون دوبلكس مقوى",
    message: "قام العميل م. أحمد عبد الرحمن بتأكيد طلب بقيمة 21,250 ج.م (كود تتبع ETB-8841).",
    type: "order",
    priority: "high",
    read: false,
    link: "/admin/orders",
    metadata: {
      orderId: "ord-8841",
      trackingCode: "ETB-8841",
      customer: "م. أحمد عبد الرحمن",
      amount: 21250,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
  },
  {
    id: "notif-102",
    title: "طلب عرض أسعار B2B عاجل",
    message: "طلب تسعير جديد من شركة 'أفق المستقبل' لطباعة 10,000 شنطة كرافت وتغليف هدايا.",
    type: "quote",
    priority: "urgent",
    read: false,
    link: "/admin?tab=quotes",
    metadata: {
      company: "شركة أفق المستقبل",
      phone: "01099881122",
      productType: "شنط كرافت وبوكسات",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: "notif-103",
    title: "تصميم ثلاثي الأبعاد جديد تم حفظه",
    message: "تم حفظ تصميم مخصص جديد عبر استوديو المهيئ التفاعلي لمنتج 'بوكس هدايا فاخر'.",
    type: "customization",
    priority: "medium",
    read: false,
    link: "/admin/products/configurator?id=cfg-luxury-box",
    metadata: {
      product: "بوكس هدايا فاخر",
      dimensions: "25x20x10 cm",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: "notif-104",
    title: "طلب عينات خامات ومطبوعات",
    message: "طلب بوكس عينات مجاني للشركات من مكتب دار التصميم للمقاولات والديكور.",
    type: "sample",
    priority: "medium",
    read: true,
    link: "/admin/orders",
    metadata: {
      client: "دار التصميم",
      city: "القاهرة الجديدة",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "notif-105",
    title: "تنبيه نظام: جاهزية خطوط سحب الأوفست",
    message: "اكتمل فحص الجودة الدوري لماكينات هايدلبرج أوفست الألمانية ومستويات أحبار CMYK.",
    type: "system",
    priority: "low",
    read: true,
    link: "/admin",
    metadata: {
      machine: "Heidelberg Speedmaster XL 106",
      status: "optimal",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

// Initialize in-memory notifications
if (!(inMemoryStore as any).notifications || (inMemoryStore as any).notifications.length === 0) {
  (inMemoryStore as any).notifications = [...initialAdminNotifications];
}

let tableInitChecked = false;
async function ensureNotificationsTable(sql: any) {
  if (tableInitChecked) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admin_notifications (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        priority VARCHAR(50) DEFAULT 'medium',
        read BOOLEAN DEFAULT FALSE,
        link TEXT,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    tableInitChecked = true;
  } catch (err) {
    console.error("Error ensuring admin_notifications table:", err);
  }
}

export async function getAdminNotifications(filter?: {
  unreadOnly?: boolean;
  type?: string;
  limit?: number;
}): Promise<{ notifications: AdminNotification[]; unreadCount: number }> {
  const { isLive, sql } = getDb();

  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);

      let query = "SELECT * FROM admin_notifications WHERE 1=1";
      if (filter?.unreadOnly) {
        query += " AND read = FALSE";
      }
      if (filter?.type && filter.type !== "all") {
        query += ` AND type = '${filter.type.replace(/'/g, "")}'`;
      }
      query += " ORDER BY created_at DESC";
      if (filter?.limit) {
        query += ` LIMIT ${Number(filter.limit) || 50}`;
      }

      const rows = await sql(Object.assign([query], { raw: [query] }));
      const unreadCountRows = await sql`SELECT COUNT(*) as count FROM admin_notifications WHERE read = FALSE`;
      const unreadCount = Number(unreadCountRows[0]?.count) || 0;

      if (rows && rows.length > 0) {
        const mapped: AdminNotification[] = rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          message: r.message,
          type: r.type as NotificationType,
          priority: (r.priority || "medium") as NotificationPriority,
          read: Boolean(r.read),
          link: r.link,
          metadata: r.metadata,
          createdAt: r.created_at || new Date().toISOString(),
        }));
        return { notifications: mapped, unreadCount };
      }
    } catch (err) {
      console.error("Failed to query notifications from DB, falling back to memory:", err);
    }
  }

  // In-memory fallback
  const storeNotifs: AdminNotification[] = (inMemoryStore as any).notifications || [];
  let filtered = [...storeNotifs];

  if (filter?.unreadOnly) {
    filtered = filtered.filter((n) => !n.read);
  }
  if (filter?.type && filter.type !== "all") {
    filtered = filtered.filter((n) => n.type === filter.type);
  }
  if (filter?.limit) {
    filtered = filtered.slice(0, filter.limit);
  }

  const unreadCount = storeNotifs.filter((n) => !n.read).length;
  return { notifications: filtered, unreadCount };
}

export async function createAdminNotification(data: {
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  link?: string;
  metadata?: Record<string, any>;
}): Promise<AdminNotification> {
  const newNotif: AdminNotification = {
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: data.title,
    message: data.message,
    type: data.type || "system",
    priority: data.priority || "medium",
    read: false,
    link: data.link || "/admin",
    metadata: data.metadata || {},
    createdAt: new Date().toISOString(),
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      await sql`
        INSERT INTO admin_notifications (
          id, title, message, type, priority, read, link, metadata, created_at
        ) VALUES (
          ${newNotif.id}, ${newNotif.title}, ${newNotif.message},
          ${newNotif.type}, ${newNotif.priority}, ${newNotif.read},
          ${newNotif.link}, ${JSON.stringify(newNotif.metadata)}::jsonb,
          ${newNotif.createdAt}
        )
      `;
    } catch (err) {
      console.error("Failed to insert notification into DB:", err);
    }
  }

  if (!(inMemoryStore as any).notifications) {
    (inMemoryStore as any).notifications = [];
  }
  (inMemoryStore as any).notifications.unshift(newNotif);

  return newNotif;
}

export async function markNotificationAsRead(id: string, read: boolean = true): Promise<boolean> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      await sql`
        UPDATE admin_notifications
        SET read = ${read}
        WHERE id = ${id}
      `;
    } catch (err) {
      console.error("Failed to update notification read status in DB:", err);
    }
  }

  const list: AdminNotification[] = (inMemoryStore as any).notifications || [];
  const notif = list.find((n) => n.id === id);
  if (notif) {
    notif.read = read;
  }
  return true;
}

export async function markAllNotificationsAsRead(): Promise<boolean> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      await sql`
        UPDATE admin_notifications
        SET read = TRUE
        WHERE read = FALSE
      `;
    } catch (err) {
      console.error("Failed to mark all notifications as read in DB:", err);
    }
  }

  const list: AdminNotification[] = (inMemoryStore as any).notifications || [];
  list.forEach((n) => {
    n.read = true;
  });
  return true;
}

export async function deleteNotification(id: string): Promise<boolean> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      await sql`
        DELETE FROM admin_notifications
        WHERE id = ${id}
      `;
    } catch (err) {
      console.error("Failed to delete notification from DB:", err);
    }
  }

  const list: AdminNotification[] = (inMemoryStore as any).notifications || [];
  const idx = list.findIndex((n) => n.id === id);
  if (idx !== -1) {
    list.splice(idx, 1);
  }
  return true;
}

export async function clearAllNotifications(): Promise<boolean> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      await sql`DELETE FROM admin_notifications`;
    } catch (err) {
      console.error("Failed to clear notifications in DB:", err);
    }
  }

  (inMemoryStore as any).notifications = [];
  return true;
}

export async function getUnreadNotificationsCount(): Promise<number> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensureNotificationsTable(sql);
      const rows = await sql`SELECT COUNT(*) as count FROM admin_notifications WHERE read = FALSE`;
      if (rows && rows[0]?.count !== undefined) {
        return Number(rows[0].count);
      }
    } catch (err) {
      console.error("Failed to count unread notifications in DB:", err);
    }
  }

  const list: AdminNotification[] = (inMemoryStore as any).notifications || [];
  return list.filter((n) => !n.read).length;
}

export async function createTestAdminNotification(type?: NotificationType): Promise<AdminNotification> {
  const sampleScenarios = [
    {
      title: "طلب جديد وارد الآن: مطبوعات شركات VIP",
      message: "تم تسجيل طلب جديد بقيمة 8,450 ج.م من شركة دلتا للمشروبات (تغليف مخصص مع بصمة UV).",
      type: "order" as NotificationType,
      priority: "high" as NotificationPriority,
      link: "/admin/orders",
      metadata: { customer: "شركة دلتا للمشروبات", amount: 8450 },
    },
    {
      title: "طلب مقايسة B2B جديدة",
      message: "طلب عرض أسعار فوري لـ 5,000 كرتونة شحن مع كود QR مخصص وهوية بصرية.",
      type: "quote" as NotificationType,
      priority: "urgent" as NotificationPriority,
      link: "/admin?tab=quotes",
      metadata: { requester: "م. مصطفى كمال", quantity: 5000 },
    },
    {
      title: "تنبيه نظام: اكتمال تجهيز طلبات اليوم",
      message: "تم تجهيز 12 شحنة مطبوعات بنجاح وإسنادها إلى مناديب شحن إطبعلي إكسبريس.",
      type: "system" as NotificationType,
      priority: "low" as NotificationPriority,
      link: "/admin/orders?status=shipped",
      metadata: { dispatchedCount: 12 },
    },
    {
      title: "طلب عينات خامات أوفست جديدة",
      message: "طلب عينة أوراق كوشيه 350 جم وبصمة ليزرية لعميل جديد من التجمع.",
      type: "sample" as NotificationType,
      priority: "medium" as NotificationPriority,
      link: "/admin/orders",
      metadata: { city: "التجمع الخامس" },
    },
  ];

  let chosen = sampleScenarios[Math.floor(Math.random() * sampleScenarios.length)];
  if (type) {
    const matched = sampleScenarios.find((s) => s.type === type);
    if (matched) chosen = matched;
  }

  return createAdminNotification(chosen);
}
