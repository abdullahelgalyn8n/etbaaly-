"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Share2, Globe, Sparkles } from "lucide-react";

interface RankMathSnippetPreviewProps {
  seoTitle: string;
  setSeoTitle: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  metaDescription: string;
  setMetaDescription: (v: string) => void;
  focusKeyword: string;
  featuredImage?: string;
}

export default function RankMathSnippetPreview({
  seoTitle,
  setSeoTitle,
  slug,
  setSlug,
  metaDescription,
  setMetaDescription,
  focusKeyword,
  featuredImage,
}: RankMathSnippetPreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile" | "social">("desktop");

  const titleLength = seoTitle.length;
  const descLength = metaDescription.length;

  return (
    <div className="space-y-3 bg-[#17181c] border border-[#24262d] rounded-2xl p-3.5 text-xs select-none">
      {/* Header with Device Switcher */}
      <div className="flex items-center justify-between pb-2 border-b border-[#24262d]">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>معاينة الظهور في محركات البحث (SERP Preview)</span>
        </div>

        <div className="flex items-center bg-[#101114] rounded-lg p-0.5 border border-[#22242a]">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
              device === "desktop" ? "bg-cyan-500 text-black shadow-xs" : "text-slate-400 hover:text-white"
            }`}
            title="معاينة سطح المكتب (Desktop)"
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden sm:inline">كمبيوتر</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
              device === "mobile" ? "bg-cyan-500 text-black shadow-xs" : "text-slate-400 hover:text-white"
            }`}
            title="معاينة الهاتف (Mobile)"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden sm:inline">هاتف</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("social")}
            className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
              device === "social" ? "bg-cyan-500 text-black shadow-xs" : "text-slate-400 hover:text-white"
            }`}
            title="معاينة المشاركة في السوشيال ميديا"
          >
            <Share2 className="w-3 h-3" />
            <span className="hidden sm:inline">سوشيال</span>
          </button>
        </div>
      </div>

      {/* Google Mockup (Desktop / Mobile) */}
      {(device === "desktop" || device === "mobile") && (
        <div
          className={`bg-white dark:bg-[#202124] rounded-xl p-3.5 border border-slate-200 dark:border-[#303134] shadow-sm space-y-1.5 transition-all text-left ${
            device === "mobile" ? "max-w-[340px] mx-auto" : "w-full"
          }`}
          dir="ltr"
        >
          {/* Breadcrumb & Favicon */}
          <div className="flex items-center gap-2 text-[11px] text-[#202124] dark:text-[#bdc1c6]">
            <div className="w-4 h-4 rounded-full bg-[#c93b41] text-white font-bold flex items-center justify-center text-[9px]">
              إ
            </div>
            <div className="flex flex-col truncate">
              <span className="font-semibold text-[11px] leading-none text-slate-800 dark:text-slate-200">
                مطبعة إطبعلي - Etbaaly
              </span>
              <span className="text-[10px] text-[#4d5156] dark:text-[#9aa0a6] truncate">
                https://etbaaly.com/blog/{slug || "article-slug"}
              </span>
            </div>
          </div>

          {/* Title (Blue Google link) */}
          <h3 className="text-[#1a0dab] dark:text-[#8ab4f8] text-sm sm:text-base hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
            {seoTitle || "عنوان المقال لمحركات البحث | مطبعة إطبعلي"}
          </h3>

          {/* Description */}
          <p className="text-[#4d5156] dark:text-[#bdc1c6] text-xs leading-relaxed line-clamp-2">
            {metaDescription || "وصف موجز وجذاب للمقال يظهر في نتائج بحث جوجل لجذب الزوار إلى موقع إطبعلي..."}
          </p>
        </div>
      )}

      {/* Social Card Mockup */}
      {device === "social" && (
        <div className="bg-[#1f232b] rounded-xl border border-[#2e323e] overflow-hidden max-w-sm mx-auto text-left" dir="ltr">
          {featuredImage ? (
            <img src={featuredImage} alt={seoTitle} className="w-full h-36 object-cover" />
          ) : (
            <div className="w-full h-36 bg-gradient-to-tr from-[#c93b41]/40 to-slate-900 flex items-center justify-center text-slate-400 font-bold text-xs">
              صورة المعاينة في السوشيال ميديا
            </div>
          )}
          <div className="p-3 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">ETBAALY.COM</span>
            <div className="font-bold text-white text-xs line-clamp-1">{seoTitle}</div>
            <div className="text-[11px] text-slate-400 line-clamp-2">{metaDescription}</div>
          </div>
        </div>
      )}

      {/* Snippet Editor Inputs */}
      <div className="pt-2 space-y-2.5">
        {/* SEO Title Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <label className="text-[#9da3af] font-semibold">عنوان السيو (SEO Title)</label>
            <span className={`font-mono text-[10px] ${titleLength > 60 ? "text-red-400" : titleLength >= 40 ? "text-emerald-400" : "text-amber-400"}`}>
              {titleLength} / 60 حرف
            </span>
          </div>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-[#101114] border border-[#24262d] rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
            placeholder="اكتب عنواناً جذاباً لا يتجاوز 60 حرفاً..."
          />
        </div>

        {/* SEO Slug Input */}
        <div className="space-y-1">
          <label className="text-[#9da3af] font-semibold text-[11px]">الرابط الدائم للمقال (Slug)</label>
          <div className="flex items-center bg-[#101114] border border-[#24262d] rounded-lg px-2 py-1 text-xs font-mono text-slate-400">
            <span className="text-slate-600">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="flex-1 bg-transparent text-white focus:outline-none px-1"
              placeholder="article-slug"
            />
          </div>
        </div>

        {/* Meta Description Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <label className="text-[#9da3af] font-semibold">وصف الميتا (Meta Description)</label>
            <span className={`font-mono text-[10px] ${descLength > 160 ? "text-red-400" : descLength >= 120 ? "text-emerald-400" : "text-amber-400"}`}>
              {descLength} / 160 حرف
            </span>
          </div>
          <textarea
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full p-2 bg-[#101114] border border-[#24262d] rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none resize-y"
            placeholder="اكتب وصفاً تسويقياً مقنعاً يحتوي على الكلمة المفتاحية..."
          />
        </div>
      </div>
    </div>
  );
}
