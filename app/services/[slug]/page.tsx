import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import { blogPostsData } from "@/data/blogPostsData";
import { BreadcrumbSchema, ServiceSchema } from "@/components/JsonLd";
import PortfolioGallery from "@/components/PortfolioGallery";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceWorkflow from "@/components/services/ServiceWorkflow";
import ServicePackages from "@/components/services/ServicePackages";
import ServiceRelatedArticles from "@/components/services/ServiceRelatedArticles";
import ServiceCta from "@/components/services/ServiceCta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "الخدمة غير موجودة" };

  return {
    title: `${service.title} | تفاصيل الخدمة وسابقة الأعمال`,
    description: service.subtitle,
    alternates: {
      canonical: `${siteConfig.url}/services/${service.slug}/`,
    },
    openGraph: {
      title: `${service.title} - A.Z Agency`,
      description: service.description,
      url: `${siteConfig.url}/services/${service.slug}/`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Filter related blog posts matching this service category or tags
  const relatedArticles = blogPostsData.filter(
    (post) =>
      post.categoryTag === service.categoryTag ||
      post.tags.some((t) => service.tags.includes(t))
  );

  return (
    <div className="space-y-20 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "الخدمات والعروض", url: `${siteConfig.url}/services/` },
          { name: service.title, url: `${siteConfig.url}/services/${service.slug}/` },
        ]}
      />
      <ServiceSchema
        service={service}
        url={`${siteConfig.url}/services/${service.slug}/`}
      />

      {/* Back to Services Nav */}
      <div className="pt-4">
        <Link
          href="/services/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-[#a8abb4] hover:text-[#c93b41] dark:hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة إلى جميع الخدمات والعروض</span>
        </Link>
      </div>

      {/* 1. Hero Header */}
      <ServiceHero service={service} />

      {/* 2. Step by Step Workflow */}
      <ServiceWorkflow workflowSteps={service.workflowSteps} />

      {/* 2.5 Pricing Packages & Offers */}
      {service.packages && service.packages.length > 0 && (
        <ServicePackages packages={service.packages} serviceTitle={service.title} />
      )}

      {/* 3. Portfolio Showcase */}
      {service.portfolio.length > 0 && (
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold text-[#c93b41] uppercase tracking-wider">سابقة الأعمال</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">
              أعمال ونماذج حقيقية تم إنجازها
            </h2>
          </div>

          <PortfolioGallery items={service.portfolio} serviceTitle={service.title} />
        </section>
      )}

      {/* 4. Related Articles */}
      <ServiceRelatedArticles articles={relatedArticles} />

      {/* 5. CTA Bottom */}
      <ServiceCta serviceTitle={service.title} serviceId={service.id} />
    </div>
  );
}
