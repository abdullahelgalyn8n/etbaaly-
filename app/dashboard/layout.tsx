import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "بوابة العميل ولوحة التحكم",
  description: "متابعة الطلبات، عروض الأسعار، حاسبة الشحن، والملفات المعتمدة لحسابك في إطبعلي.",
  alternates: {
    canonical: `${siteConfig.url}/dashboard/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
