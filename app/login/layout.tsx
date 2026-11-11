import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "تسجيل الدخول إلى بوابة العملاء",
  description:
    "سجّل الدخول إلى حسابك في مطابع إطبعلي لمتابعة طلبات الطباعة والتغليف وعروض الأسعار الفورية.",
  alternates: {
    canonical: `${siteConfig.url}/login/`,
  },
  openGraph: {
    title: "تسجيل الدخول إلى بوابة العملاء | إطبعلي - Etbaaly",
    description:
      "الدخول إلى بوابة العملاء في مطابع إطبعلي لإدارة أوامر التشغيل ومتابعة الشحنات والفواتير.",
    url: `${siteConfig.url}/login/`,
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
