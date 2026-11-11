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

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAdminProducts("all");
  return products.map((p) => ({
    slug: p.slug || p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product =
    (await getAdminProductByIdOrSlug(slug)) ||
    (await getAdminProductByIdOrSlug(decodedSlug));

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
  const decodedSlug = decodeURIComponent(slug);
  const product =
    (await getAdminProductByIdOrSlug(slug)) ||
    (await getAdminProductByIdOrSlug(decodedSlug));

  if (!product) {
    notFound();
  }

  const allProducts = await getAdminProducts("published");
  const related = allProducts.filter((p) => p.id !== product.id && p.slug !== product.slug);

  const productUrl = `${siteConfig.url}/products/${product.slug || product.id}/`;
  const rawImage =
    product.image ||
    product.colors?.[0]?.images?.[0] ||
    "/images/ICON-LOGO-SITE.webp";
  const productImage = rawImage.startsWith("http")
    ? rawImage
    : `${siteConfig.url}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;
  const activePrice = product.salePrice ?? product.basePrice;

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description: product.description,
    image: productImage,
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "إطبعلي | Etbaaly",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: activePrice,
      priceCurrency: "EGP",
      priceValidUntil: "2026-12-31",
      availability:
        product.stockStatus === "outofstock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: productUrl,
      seller: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "إطبعلي | Etbaaly - A.Z Agency",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "EG",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EGP",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "EG",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
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
