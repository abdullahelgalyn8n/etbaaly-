import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Layers,
  FileText,
  Users,
  Settings,
  SearchCheck,
  Image as ImageIcon,
  Bell,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
  exact?: boolean;
  badge?: number | null;
  subItems?: { title: string; href: string }[];
}

export function getAdminMenuItems(
  activeOrdersCount: number,
  unreadNotificationsCount?: number
): MenuItem[] {
  return [
    {
      title: "الرئيسية",
      icon: LayoutDashboard,
      href: "/admin",
      exact: true,
      badge: null,
    },
    {
      title: "مركز الإشعارات",
      icon: Bell,
      href: "/admin/notifications",
      badge: unreadNotificationsCount && unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    {
      title: "المقالات والمدونة",
      icon: BookOpen,
      href: "/admin/posts",
      subItems: [
        { title: "كافة المقالات", href: "/admin/posts" },
        { title: "أضف مقالاً جديداً", href: "/admin/posts/new" },
        { title: "التصنيفات والوسوم", href: "/admin/posts?tab=categories" },
      ],
    },
    {
      title: "معرض الوسائط والملفات",
      icon: ImageIcon,
      href: "/admin/media",
    },
    {
      title: "محركات البحث (SEO)",
      icon: SearchCheck,
      href: "/admin/seo",
      subItems: [
        { title: "لوحة السيو العامة (Rank Math)", href: "/admin/seo" },
        { title: "تحليل الكلمات والمقالات", href: "/admin/seo" },
        { title: "بيانات Schema والميتا", href: "/admin/seo" },
        { title: "خريطة الموقع والأرشفة", href: "/admin/seo" },
      ],
    },
    {
      title: "الطلبات والتشغيل",
      icon: ShoppingBag,
      href: "/admin/orders",
      badge: activeOrdersCount > 0 ? activeOrdersCount : null,
      subItems: [
        { title: "جميع أوامر الشغل", href: "/admin/orders" },
        { title: "قيد الطباعة والسحب", href: "/admin/orders?status=printing" },
        { title: "في الطريق للشحن", href: "/admin/orders?status=shipped" },
      ],
    },
    {
      title: "استوديو المنتجات",
      icon: Layers,
      href: "/admin/products",
      subItems: [
        { title: "كل المنتجات والطبقات", href: "/admin/products" },
        { title: "أضف منتج جديد", href: "/admin/products/new" },
        { title: "استوديو الكانفاس والتهيئة 🎨", href: "/admin/products/configurator?id=cfg-luxury-box" },
      ],
    },
    {
      title: "عروض الأسعار B2B",
      icon: FileText,
      href: "/admin?tab=quotes",
    },
    {
      title: "الشركات والعملاء",
      icon: Users,
      href: "/admin?tab=clients",
    },
    {
      title: "إعدادات المطبعة",
      icon: Settings,
      href: "/admin?tab=settings",
    },
  ];
}
