import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "A.Z Agency",
    "alternateName": "وكالة A.Z للحلول الرقمية والإبداعية",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
    "image": `${siteConfig.url}/images/hero-image.webp`,
    "description": siteConfig.description,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressCountry": "EG",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.0444",
      "longitude": "31.2357",
    },
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.whatsapp,
      siteConfig.social.linkedin,
    ],
    "priceRange": "$$",
    "knowsAbout": [
      "Technical SEO",
      "Answer Engine Optimization (AEO)",
      "Motion Graphics & Visual Production",
      "Branding & Print Design",
      "Hyper-Automation with n8n",
      "Next.js Development",
      "Cloudflare Edge Deployment"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Engineering & Growth Services",
      "itemListElement": servicesData.map((s, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.description,
        },
        "position": idx + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  service,
  url,
}: {
  service: {
    title: string;
    description: string;
    features?: string[];
  };
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "A.Z Agency",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
    },
    "url": url,
    "areaServed": ["EG", "SA", "AE", "KW", "QA", "OM"],
    ...(service.features && service.features.length > 0
      ? {
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": service.title,
            "itemListElement": service.features.map((feature, idx) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": feature,
              },
              "position": idx + 1,
            })),
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "A.Z Agency",
    "alternateName": "وكالة A.Z للحلول الرقمية والإبداعية",
    "url": siteConfig.url,
    "inLanguage": "ar",
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": "A.Z Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
