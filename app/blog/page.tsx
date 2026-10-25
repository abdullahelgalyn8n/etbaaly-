import React from "react";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { blogPostsSummaries } from "@/data/blogPostsSummaries";
import { BreadcrumbSchema } from "@/components/JsonLd";
import BlogListing from "@/components/blog/BlogListing";

export const dynamic = "force-static";

export default function BlogPage() {
  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المدونة", url: `${siteConfig.url}/blog/` },
        ]}
      />

      {/* Header */}
      <section className="relative pt-12 md:pt-16 pb-4 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-crimson text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>مركز المعرفة وأسرار الطباعة والتغليف</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight mb-4">
          مدونة الطباعة، التغليف، والدعاية والإعلان
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-[#a8abb4] font-medium leading-relaxed">
          دليل هندسي وصناعي شامل: خامات الكرتون والورق، أسرار دقة ألوان CMYK والبانتون، تصنيع العلب والأكياس، الرول ليبل، واليفط الإعلانية من خبراء إطبعلي.
        </p>
      </section>

      {/* Client Interactive Filter & Grid */}
      <BlogListing posts={blogPostsSummaries} />
    </div>
  );
}
