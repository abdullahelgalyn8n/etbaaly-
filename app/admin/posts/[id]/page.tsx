"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import PostEditorHeader from "@/components/admin/posts/PostEditorHeader";
import { PostContentEditor } from "@/components/admin/posts/PostContentEditor";
import { PostSettingsSidebar } from "@/components/admin/posts/PostSettingsSidebar";
import { RankMathSeoBox } from "@/components/admin/seo/RankMathSeoBox";
import { useEditAdminPost } from "@/components/admin/posts/useEditAdminPost";

export default function EditAdminPostPage() {
  const params = useParams();
  const rawId = params?.id as string;
  const initialSlug = rawId ? decodeURIComponent(rawId) : "";

  const {
    loading,
    notFound,
    isSaving,
    saveNotice,
    errorMessage,
    setErrorMessage,
    title,
    setTitle,
    slug,
    setSlug,
    status,
    setStatus,
    excerpt,
    setExcerpt,
    content,
    setContent,
    category,
    setCategory,
    author,
    setAuthor,
    readTime,
    setReadTime,
    image,
    setImage,
    tags,
    setTags,
    date,
    focusKeyword,
    setFocusKeyword,
    seoTitle,
    setSeoTitle,
    metaDescription,
    setMetaDescription,
    canonicalUrl,
    setCanonicalUrl,
    schemaType,
    setSchemaType,
    robotsIndex,
    setRobotsIndex,
    robotsFollow,
    setRobotsFollow,
    setSeoScore,
    handleSave,
  } = useEditAdminPost(initialSlug);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#c93b41] animate-spin" />
        <span className="text-xs font-bold text-slate-500">جاري تحميل بيانات المقال وفحص محركات البحث...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">المقال المطلوب غير موجود</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          لم يتم العثور على مقال بالرابط المحدد &quot;{initialSlug}&quot;. قد يكون تم حذفه أو تغييره.
        </p>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لكافة المقالات
        </Link>
      </div>
    );
  }

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8">
      <PostEditorHeader
        title={title}
        slug={slug}
        status={status}
        isSaving={isSaving}
        saveNotice={saveNotice}
        onSave={handleSave}
      />

      {errorMessage && (
        <div className="m-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-700 dark:text-red-300 font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="cursor-pointer">✕</button>
        </div>
      )}

      {saveNotice && (
        <div className="m-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{saveNotice}</span>
        </div>
      )}

      <div className="p-4 sm:p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
            <PostContentEditor
              title={title}
              setTitle={setTitle}
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              content={content}
              setContent={setContent}
            />
          </div>

          <RankMathSeoBox
            title={title}
            content={content}
            excerpt={excerpt}
            slug={slug}
            setSlug={setSlug}
            focusKeyword={focusKeyword}
            setFocusKeyword={setFocusKeyword}
            seoTitle={seoTitle}
            setSeoTitle={setSeoTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            canonicalUrl={canonicalUrl}
            setCanonicalUrl={setCanonicalUrl}
            schemaType={schemaType}
            setSchemaType={setSchemaType}
            robotsIndex={robotsIndex}
            setRobotsIndex={setRobotsIndex}
            robotsFollow={robotsFollow}
            setRobotsFollow={setRobotsFollow}
            featuredImage={image}
            onScoreCalculated={(score) => setSeoScore(score)}
          />
        </div>

        <div className="space-y-4">
          <PostSettingsSidebar
            slug={slug}
            setSlug={setSlug}
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
            author={author}
            setAuthor={setAuthor}
            readTime={readTime}
            setReadTime={setReadTime}
            image={image}
            setImage={setImage}
            tags={tags}
            setTags={setTags}
            date={date}
          />
        </div>
      </div>
    </div>
  );
}
