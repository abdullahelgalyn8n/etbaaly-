"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Sparkles, Globe, ShieldCheck, Zap, Plus, RefreshCw, BarChart2 } from "lucide-react";
import { SeoHealthCards } from "@/components/admin/seo/SeoHealthCards";
import { SeoKeywordsTable } from "@/components/admin/seo/SeoKeywordsTable";
import { SeoGlobalSchemaTab } from "@/components/admin/seo/SeoGlobalSchemaTab";
import { SeoSitemapTab } from "@/components/admin/seo/SeoSitemapTab";

export default function AdminSeoSuitePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "schema" | "sitemap">("overview");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load posts for SEO analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const avgSeoScore = useMemo(() => {
    if (!posts.length) return 88;
    const sum = posts.reduce((acc, p) => acc + (p.seoScore || 85), 0);
    return Math.round(sum / posts.length);
  }, [posts]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#c93b41]/10 text-[#c93b41] border border-[#c93b41]/20">
              Rank Math SEO Suite 🚀
            </span>
            <span className="text-xs text-slate-400 font-mono">v3.0</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            إدارة محركات البحث والأرشفة الذكية (AEO / SEO)
          </h1>
          <p className="text-xs text-slate-500">
            مراقبة الكلمات المفتاحية، توليد Schema JSON-LD، وفهرسة المقالات والمنتجات في Google و Bing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchPosts}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/posts/new"
            className="btn-crimson px-4 py-2 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-red-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>مقال ومحتوى جديد</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <SeoHealthCards
        totalPosts={posts.length || 10}
        avgSeoScore={avgSeoScore}
        indexedCount={posts.filter((p) => p.status === "published").length || 8}
      />

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-1 bg-white dark:bg-[#18191f] p-1 rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-xs text-xs font-bold w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-[#c93b41] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>تحليل الكلمات والمقالات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schema")}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "schema"
              ? "bg-[#c93b41] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>بيانات Schema والهوية</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sitemap")}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "sitemap"
              ? "bg-[#c93b41] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>خريطة الموقع والفهرسة اللحظية</span>
        </button>
      </div>

      {/* 4. Tab Content */}
      <div className="mt-2">
        {activeTab === "overview" && <SeoKeywordsTable posts={posts} />}
        {activeTab === "schema" && <SeoGlobalSchemaTab />}
        {activeTab === "sitemap" && <SeoSitemapTab />}
      </div>
    </div>
  );
}
