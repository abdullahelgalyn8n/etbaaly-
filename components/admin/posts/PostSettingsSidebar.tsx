"use client";

import React, { useState } from "react";
import { Sparkles, Link as LinkIcon, User, Clock, CheckCircle2 } from "lucide-react";
import PostFeaturedImageCard from "./PostFeaturedImageCard";
import PostTagsCard from "./PostTagsCard";

interface PostSettingsSidebarProps {
  slug: string;
  setSlug: (slug: string) => void;
  status: "published" | "draft" | "scheduled";
  setStatus: (status: "published" | "draft" | "scheduled") => void;
  category: string;
  setCategory: (category: string) => void;
  author: string;
  setAuthor: (author: string) => void;
  readTime: string;
  setReadTime: (time: string) => void;
  image: string;
  setImage: (img: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  date?: string;
}

const CATEGORIES = [
  "السيو والذكاء الاصطناعي (AEO)",
  "تطوير الويب والمتاجر",
  "الموشن جرافيك",
  "الهويات والتصاميم",
  "الأتمتة والأنظمة",
  "الأخبار والتحديثات",
];

export function PostSettingsSidebar({
  slug,
  setSlug,
  status,
  setStatus,
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
}: PostSettingsSidebarProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopySlug = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Status & Visibility Card */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <span className="font-bold text-slate-800 dark:text-white text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c93b41]" />
            حالة النشر والرابط
          </span>
          {date && <span className="text-[10px] text-slate-400">{date}</span>}
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-500 font-bold block mb-1 text-[11px]">حالة المقال:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            >
              <option value="published">منشور لايف للزوار ✓</option>
              <option value="draft">مسودة خاصة (غير مرئي)</option>
              <option value="scheduled">مجدول للنشر لاحقاً</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-500 font-bold text-[11px]">الرابط الثابت (Slug):</label>
              <button
                type="button"
                onClick={handleCopySlug}
                className="text-[10px] text-[#c93b41] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                {copiedLink ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <LinkIcon className="w-3 h-3" />}
                <span>{copiedLink ? "تم النسخ!" : "نسخ الرابط"}</span>
              </button>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl">
              <span className="text-slate-400 font-mono text-[11px] dir-ltr">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category & Author Card */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-xs space-y-3">
        <span className="font-bold text-slate-800 dark:text-white text-xs block pb-2 border-b border-slate-100 dark:border-white/[0.06]">
          التصنيف والكاتب
        </span>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-500 font-bold block mb-1 text-[11px]">التصنيف الرئيسي:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1 text-[11px] flex items-center gap-1">
              <User className="w-3 h-3" />
              الكاتب / المحرر:
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              مدة القراءة المقدرة:
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="مثال: 5 دقائق قراءة"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
            />
          </div>
        </div>
      </div>

      <PostFeaturedImageCard image={image} setImage={setImage} />
      <PostTagsCard tags={tags} setTags={setTags} />
    </div>
  );
}

export default PostSettingsSidebar;
