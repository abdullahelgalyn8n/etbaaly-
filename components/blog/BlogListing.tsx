"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  BookOpen,
  Package,
  Printer,
  Tag,
  ShoppingBag,
  Gift,
  Megaphone,
  Layers,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { BlogPostSummary } from "@/data/blog/types";
import Pagination from "@/components/Pagination";
import BlogArticleCard from "@/components/blog/BlogArticleCard";

const POSTS_PER_PAGE = 9;

interface BlogListingProps {
  posts: BlogPostSummary[];
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Filtering by category + search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchCategory =
        activeCategory === "all" ||
        post.categoryTag === activeCategory ||
        (activeCategory === "news" && post.isNews);

      if (!matchCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = post.title?.toLowerCase().includes(query);
        const inExcerpt = post.excerpt?.toLowerCase().includes(query);
        const inCategory = post.category?.toLowerCase().includes(query);
        const inTags = post.tags?.some((t) => t.toLowerCase().includes(query));
        return inTitle || inExcerpt || inCategory || inTags;
      }

      return true;
    });
  }, [posts, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const startIndex = (validCurrentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setIsTransitioning(true);
    setCurrentPage(pageNumber);

    if (articlesSectionRef.current) {
      const targetY =
        articlesSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        110;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="space-y-10">
      {/* Search and Category Control Bar */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Instant Search Input */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث في أدلة الخامات، تقنيات الطباعة، أو حلول التغليف..."
            className="w-full px-12 py-3.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 outline-none text-slate-900 dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-300 shadow-sm transition-all"
            dir="rtl"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs - Mobile scrollable, desktop flex */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar px-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
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

        {/* Counter and Active Filter Feedback */}
        <div className="flex items-center justify-between text-xs px-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              المقالات المتاحة:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#c93b41]/10 text-[#c93b41] font-mono text-xs font-bold">
              {filteredPosts.length} مقال
            </span>
          </div>

          {(activeCategory !== "all" || searchQuery.trim()) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#c93b41] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>إعادة ضبط الفلاتر ↺</span>
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <section ref={articlesSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1a1c20] rounded-3xl border border-slate-200 dark:border-white/[0.08] max-w-lg mx-auto p-8 shadow-sm">
            <Newspaper className="w-12 h-12 text-[#c93b41] mx-auto mb-4 opacity-70" />
            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
              لم نعثر على مقالات مطابقة لبحثك
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              جرّب استخدام كلمات بحث أخرى أو تصفح كافة أقسام المدونة.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full btn-crimson text-white text-xs font-bold cursor-pointer"
            >
              عرض كافة المقالات
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
                isTransitioning ? "opacity-30 pointer-events-none scale-[0.99]" : "opacity-100 scale-100"
              }`}
            >
              {paginatedPosts.map((post) => (
                <BlogArticleCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={validCurrentPage}
                totalPages={totalPages}
                totalItems={filteredPosts.length}
                itemsPerPage={POSTS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
}
