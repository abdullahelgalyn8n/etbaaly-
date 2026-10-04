import React from "react";
import WPAdminShell from "@/components/WPAdminShell";

export const metadata = {
  title: "لوحة التحكم المركزية لإدارة المنصة والمطبعة | إطبعلي - Etbaaly",
  description: "لوحة تحكم المشرف لإدارة وتجهيز طبقات المنتجات، متابعة خطوط الإنتاج والطباعة، وعروض الأسعار في مطبعة إطبعلي.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WPAdminShell>{children}</WPAdminShell>;
}
