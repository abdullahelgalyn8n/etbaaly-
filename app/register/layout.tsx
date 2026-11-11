import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "إنشاء حساب عميل جديد",
  description:
    "أنشئ حساباً في مطابع إطبعلي لإدارة طلبات الطباعة التجارية، حفظ تصميماتك، وتتبع شحناتك لحظياً.",
  alternates: {
    canonical: `${siteConfig.url}/register/`,
  },
  openGraph: {
    title: "إنشاء حساب عميل جديد | إطبعلي - Etbaaly",
    description:
      "افتح حساباً في مطابع إطبعلي لمتابعة أوامر الطباعة والحصول على مقايسات فورية.",
    url: `${siteConfig.url}/register/`,
    type: "website",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
