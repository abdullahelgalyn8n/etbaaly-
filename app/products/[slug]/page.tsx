import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminProducts, getAdminProductByIdOrSlug } from "@/lib/db";
import { siteConfig } from "@/data/siteConfig";
import ProductStudioDetailView from "@/components/product-detail/ProductStudioDetailView";
import { BreadcrumbSchema } from "@/components/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAdminProducts("all");
  return products.map((p) => ({
    slug: p.slug || p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getAdminProductByIdOrSlug(slug);

  if (!product) {
    return { title: "منتج غير موجود | إطبعلي" };
  }

  const title = `${product.title} - طلب المنتج وتصميم فوري | إطبعلي - Etbaaly`;
  const description = product.description || `صمم واطلب ${product.title} عبر إطبعلي مع معاينة حية وتشطيب فاخر وسرعة تنفيذ.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug || product.id}/`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/products/${product.slug || product.id}/`,
      images: [
        {
          url: `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/images/ICON-LOGO-SITE.webp`],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getAdminProductByIdOrSlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAdminProducts("published");
  const related = allProducts.filter((p) => p.id !== product.id && p.slug !== product.slug);

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.basePrice,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.slug || product.id}/`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: `${siteConfig.url}/` },
          { name: "المنتجات", url: `${siteConfig.url}/products/` },
          { name: product.title, url: `${siteConfig.url}/products/${product.slug || product.id}/` },
        ]}
      />
      <ProductStudioDetailView product={product} relatedProducts={related} />
    </>
  );
}
