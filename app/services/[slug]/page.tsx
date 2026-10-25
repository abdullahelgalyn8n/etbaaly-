import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Tag, ArrowLeft, Sparkles, Clock, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import { blogPostsData } from "@/data/blogPostsData";
import { getOffersByServiceSlug } from "@/data/offersData";
import { BreadcrumbSchema, ServiceSchema } from "@/components/JsonLd";
import PortfolioGallery from "@/components/PortfolioGallery";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceWorkflow from "@/components/services/ServiceWorkflow";
import ServiceRelatedArticles from "@/components/services/ServiceRelatedArticles";
import ServiceCta from "@/components/services/ServiceCta";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

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

  // Related offers tied directly to this service
  const relatedOffers = getOffersByServiceSlug(service.slug);

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
          { name: "خدمات الطباعة والتغليف", url: `${siteConfig.url}/services/` },
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
          <span>العودة إلى جميع خدمات الطباعة والتغليف</span>
        </Link>
      </div>

      {/* 1. Hero Header */}
      <ServiceHero service={service} />

      {/* 2. Step by Step Workflow */}
      <ServiceWorkflow workflowSteps={service.workflowSteps} />

      {/* 2.5 Active Promotional Offers Linked to this Service */}
      {relatedOffers.length > 0 ? (
        <section id="service-offers" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-crimson text-xs font-bold shadow-sm">
              <Tag className="w-3.5 h-3.5" />
              <span>العروض والباقات الترويجية النشطة لهذه الخدمة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white">
              باقات جاهزة بأسعار وكميات تفضيلية
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
              إذا كنت تبحث عن باقة متكاملة محددة السعر والتسليم السريع، يمكنك الاطلاع على العروض التابعة لهذا القسم أدناه:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {relatedOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#1a1c20] border-2 border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/60 transition-all shadow-md hover:shadow-2xl flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#c93b41] text-white">
                      {offer.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      وفر {offer.savings}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-950 dark:text-white group-hover:text-[#c93b41] transition-colors leading-snug">
                    <Link href={`/offers/${offer.slug}/`}>{offer.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a8abb4] leading-relaxed font-medium">
                    {offer.subtitle}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111215] border border-slate-100 dark:border-white/[0.06] flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">سعر الباقة بعد الخصم:</span>
                      <span className="text-2xl font-black text-[#c93b41]">
                        {offer.discountedPrice}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 line-through">
                      {offer.originalPrice}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {offer.deliverables.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
                        <span>
                          <strong>{item.title}</strong> ({item.qty})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>التنفيذ: {offer.turnaround}</span>
                  </span>

                  <Link
                    href={`/offers/${offer.slug}/`}
                    className="px-5 py-2.5 rounded-xl btn-crimson text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                  >
                    <span>صفحة وتفاصيل العرض</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-3xl p-8 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] text-center space-y-4 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-950 dark:text-white">
            هل تحتاج إلى تسعير كميات ضخمة أو مواصفات خاصة؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-xl mx-auto">
            خطوط إنتاجنا مستعدة لسحب ملايين النسخ وتصنيع التغليف بمواصفات ومقاسات مخصصة تماماً.
          </p>
          <Link
            href={`/contact/?service=${service.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-crimson text-white font-bold text-xs shadow-md transition-all hover:scale-105"
          >
            <span>طلب مقايسة فنية مخصصة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </section>
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
