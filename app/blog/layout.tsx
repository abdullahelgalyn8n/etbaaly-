import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "مدونة ودليل الطباعة والتغليف",
  description:
    "دليلك العملي لأسرار الطباعة الأوفست والديجيتال، اختيار خامات الكرتون والدوبلكس وتغليف المتاجر، وتجهيز ملفات CMYK للطباعة باحترافية من خبراء إطبعلي.",
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: "مدونة ودليل الطباعة والتغليف | إطبعلي - Etbaaly",
    description:
      "دليلك العملي لأسرار الطباعة الأوفست والديجيتال، خامات الكرتون والدوبلكس، الأكياس الورقية، وتجهيز ملفات CMYK للطباعة.",
    url: `${siteConfig.url}/blog/`,
    type: "website",
    images: [
      {
        url: "/images/brand-hero-business.webp",
        width: 1200,
        height: 630,
        alt: "مدونة ودليل الطباعة والتغليف | إطبعلي - Etbaaly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مدونة ودليل الطباعة والتغليف | إطبعلي - Etbaaly",
    description:
      "مقالات متخصصة في خامات الورق والكرتون، طباعة الأوفست، علب التغليف، وتجهيز ملفات الطباعة الاحترافية.",
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
