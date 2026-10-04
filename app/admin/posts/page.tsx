"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import PostsKpiCards from "@/components/admin/posts/PostsKpiCards";
import PostsCategoryCards from "@/components/admin/posts/PostsCategoryCards";
import PostsTable from "@/components/admin/posts/PostsTable";
import PostsQuickEditModal from "@/components/admin/posts/PostsQuickEditModal";
import PostsFilterBar from "@/components/admin/posts/PostsFilterBar";
import { useAdminPosts } from "@/components/admin/posts/useAdminPosts";

function AdminPostsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  const {
    posts,
    stats,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeStatusTab,
    setActiveStatusTab,
    statusNotice,
    setStatusNotice,
    editingPost,
    setEditingPost,
    isSavingEdit,
    handleSearchSubmit,
    handleToggleStatus,
    handleDeletePost,
    handleQuickEditSave,
  } = useAdminPosts(initialTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              إدارة المقالات والمدونة
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/30 text-[#c93b41] border border-red-200 dark:border-red-900/40">
              AEO & AI Search
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            تحرير وجدولة محتوى المقالات، وتوجيه عناكب البحث والذكاء الاصطناعي نحو صفحات خدمات إطبعلي.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="btn-crimson inline-flex items-center gap-2 px-4 py-2.5 text-white font-bold rounded-xl shadow-md transition-all text-xs self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>أضف مقالاً جديداً</span>
        </Link>
      </div>

      {/* Status Notice */}
      {statusNotice && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 shadow-xs rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{statusNotice}</span>
          </div>
          <button
            onClick={() => setStatusNotice(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. KPI CARDS */}
      <PostsKpiCards stats={stats} />

      {/* 3. TABS & FILTER BAR & TABLE */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-7 shadow-xl rounded-3xl space-y-4">
        <PostsFilterBar
          stats={stats}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Categories Tab Content or Posts Table */}
        {activeStatusTab === "categories" ? (
          <PostsCategoryCards
            categories={stats.categories || []}
            onSelectCategory={(name) => {
              setSelectedCategory(name);
              setActiveStatusTab("all");
            }}
          />
        ) : (
          <PostsTable
            posts={posts}
            loading={loading}
            onEdit={(post) => setEditingPost({ ...post })}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeletePost}
          />
        )}
      </div>

      {/* QUICK EDIT MODAL */}
      <PostsQuickEditModal
        editingPost={editingPost}
        setEditingPost={setEditingPost}
        isSavingEdit={isSavingEdit}
        onSave={handleQuickEditSave}
      />
    </div>
  );
}

export default function AdminPostsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500 font-bold">
          جاري تحميل المقالات...
        </div>
      }
    >
      <AdminPostsContent />
    </Suspense>
  );
}
