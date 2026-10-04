import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "المدونة والأفكار والمستجدات | A.Z Agency",
  description:
    "تحليلات متعمقة، دراسات حالة موثقة، وأحدث مقالات تحسين محركات البحث والذكاء الاصطناعي (Technical SEO/AEO)، الموشن جرافيك، وتطوير المنصات الرقمية من خبراء A.Z Agency.",
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: "المدونة والأفكار والمستجدات | A.Z Agency",
    description:
      "تحليلات متعمقة، دراسات حالة موثقة، وأحدث مقالات تحسين محركات البحث والذكاء الاصطناعي، الموشن جرافيك، وتطوير المنصات الرقمية.",
    url: `${siteConfig.url}/blog/`,
    type: "website",
    images: [
      {
        url: "/images/brand-hero-business.webp",
        width: 1200,
        height: 630,
        alt: "مدونة ومقالات A.Z Agency للحلول الرقمية والإبداعية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المدونة والأفكار والمستجدات | A.Z Agency",
    description:
      "تحليلات متعمقة ودراسات حالة في السيو، الموشن جرافيك، وتطوير المواقع الحديثة.",
    images: ["/images/brand-hero-business.webp"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
