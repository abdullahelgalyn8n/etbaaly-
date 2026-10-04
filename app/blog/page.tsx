"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Newspaper, BookOpen, Layers, Printer, Package, Tag, ShoppingBag, Gift, Megaphone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { blogPostsSummaries } from "@/data/blogPostsData";
import { BreadcrumbSchema } from "@/components/JsonLd";
import Pagination from "@/components/Pagination";
import BlogArticleCard from "@/components/blog/BlogArticleCard";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const articlesSectionRef = useRef<HTMLElement>(null);

  const categories = [
    { id: "all", name: "كافة المقالات", icon: BookOpen },
    { id: "packaging", name: "علب وتغليف المنتجات", icon: Package },
    { id: "offset", name: "طباعة الأوفست والدعاية", icon: Printer },
    { id: "stickers", name: "الاستيكرات والملصقات", icon: Tag },
    { id: "bags", name: "الأكياس والشنط الورقية", icon: ShoppingBag },
    { id: "promo", name: "الهدايا الدعائية واليونيفورم", icon: Gift },
    { id: "signage", name: "اليفط والإعلانات الخارجية", icon: Megaphone },
    { id: "prepress", name: "دليل وخامات الطباعة", icon: Layers },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? blogPostsSummaries
      : blogPostsSummaries.filter(
          (post) => post.categoryTag === activeCategory || (activeCategory === "news" && post.isNews)
        );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const startIndex = (validCurrentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setIsTransitioning(true);
    setCurrentPage(pageNumber);

    if (articlesSectionRef.current) {
      const targetY = articlesSectionRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  };

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

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "btn-crimson text-white shadow-md scale-105"
                    : "bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-[#c93b41]/40 hover:text-[#c93b41]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid (With Featured Images & Pagination) */}
      <section ref={articlesSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1a1c20] rounded-3xl border border-slate-200 dark:border-white/[0.08] max-w-lg mx-auto p-8">
            <Newspaper className="w-12 h-12 text-[#c93b41] mx-auto mb-4 opacity-70" />
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
              جاري تجهيز مقالات جديدة لهذا القسم
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              تابعنا باستمرار للاطلاع على أحدث أدلة الطباعة وخامات التغليف أولاً بأول.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="px-5 py-2 rounded-full btn-crimson text-white text-xs font-bold cursor-pointer"
            >
              عرض كافة المقالات
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${
              isTransitioning ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
          >
            {paginatedPosts.map((post) => (
              <BlogArticleCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        )}

        {/* Reusable Clean Pagination Controls */}
        <Pagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
