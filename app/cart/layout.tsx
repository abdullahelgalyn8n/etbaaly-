import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "سلة المشتريات وإتمام الطلب",
  description: "مراجعة منتجات الطباعة والتغليف المختارة وإتمام طلب الإنتاج والتوصيل.",
  alternates: {
    canonical: `${siteConfig.url}/cart/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
