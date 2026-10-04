"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { PostContentEditor } from "@/components/admin/posts/PostContentEditor";
import { PostEditorSidebar } from "@/components/admin/posts/PostEditorSidebar";
import { PostGooglePreview } from "@/components/admin/posts/PostGooglePreview";
import NewPostHeader from "@/components/admin/posts/NewPostHeader";

export default function NewAdminPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("السيو والذكاء الاصطناعي (AEO)");
  const [categoryTag, setCategoryTag] = useState("seo");
  const [author, setAuthor] = useState("فريق تحرير مطبعة إطبعلي");
  const [readTime, setReadTime] = useState("5 دقائق قراءة");
  const [image, setImage] = useState("/images/social-media/az-social-offer-99egp.webp");
  const [tags, setTags] = useState("إطبعلي, طباعة أوفست, هوية تجارية, سيو");
  const [status, setStatus] = useState<"published" | "draft">("published");

  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const generateSlug = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\u0621-\u064Aa-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategory(selected);
    if (selected.includes("سيو")) setCategoryTag("seo");
    else if (selected.includes("ويب")) setCategoryTag("web");
    else if (selected.includes("موشن")) setCategoryTag("motion");
    else if (selected.includes("هويات")) setCategoryTag("branding");
    else if (selected.includes("أتمتة")) setCategoryTag("automation");
    else if (selected.includes("أخبار")) setCategoryTag("news");
    else setCategoryTag("general");
  };

  const handleSubmit = async (publishStatus: "published" | "draft") => {
    if (!title.trim()) {
      setErrorNotice("يرجى إدخال عنوان المقال.");
      return;
    }
    if (!content.trim()) {
      setErrorNotice("يرجى كتابة محتوى المقال.");
      return;
    }

    setLoading(true);
    setErrorNotice(null);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || generateSlug(title),
          excerpt: excerpt || title,
          content,
          category,
          categoryTag,
          author,
          readTime,
          image,
          tags: tags.split(",").map((t) => t.trim()),
          status: publishStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل حفظ المقال في قاعدة البيانات.");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setErrorNotice(err.message || "حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <NewPostHeader loading={loading} onSubmit={handleSubmit} />

      {/* Error Notice */}
      {errorNotice && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs text-red-800 dark:text-red-300 rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{errorNotice}</span>
          </div>
          <button
            onClick={() => setErrorNotice(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* TWO-COLUMN LAYOUT (CMS / GUTENBERG STYLE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PostContentEditor
          title={title}
          onTitleChange={handleTitleChange}
          slug={slug}
          setSlug={setSlug}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          content={content}
          setContent={setContent}
        />

        <div className="space-y-5">
          <PostEditorSidebar
            status={status}
            setStatus={setStatus}
            category={category}
            onCategoryChange={handleCategoryChange}
            author={author}
            setAuthor={setAuthor}
            readTime={readTime}
            setReadTime={setReadTime}
            image={image}
            setImage={setImage}
            tags={tags}
            setTags={setTags}
            loading={loading}
            onSubmit={handleSubmit}
          />

          <PostGooglePreview
            slug={slug}
            title={title}
            excerpt={excerpt}
          />
        </div>
      </div>
    </div>
  );
}
