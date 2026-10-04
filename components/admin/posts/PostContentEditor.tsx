"use client";

import React, { useState } from "react";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Edit3,
} from "lucide-react";

interface PostContentEditorProps {
  title: string;
  setTitle?: (v: string) => void;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  slug?: string;
  setSlug?: (v: string) => void;
  excerpt: string;
  setExcerpt: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
}

export function PostContentEditor({
  title,
  setTitle,
  onTitleChange,
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  content,
  setContent,
}: PostContentEditorProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  const insertSnippet = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("post-content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || "نص جديد"}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="space-y-4 text-xs select-none">
      {/* 1. Article Title */}
      <div className="space-y-1">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            if (onTitleChange) onTitleChange(e);
            else if (setTitle) setTitle(e.target.value);
          }}
          placeholder="اكتب عنوان المقال الجذاب هنا..."
          className="w-full text-lg sm:text-2xl font-black bg-transparent border-b border-slate-200 dark:border-white/[0.1] pb-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] placeholder:text-slate-400"
        />
      </div>

      {/* 2. Article Excerpt */}
      <div className="space-y-1">
        <label className="text-slate-500 font-bold block text-[11px]">مقتطف المقال (Excerpt)</label>
        <textarea
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="نبذة تشويقية قصيرة تلخص فكرة المقال وتظهر في بطاقات المدونة..."
          className="w-full p-3 bg-slate-50 dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-cyan-400 resize-y"
        />
      </div>

      {/* 3. Formatting Toolbar & View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-100 dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-xl">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertSnippet("## ")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="عنوان فرعي H2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("### ")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="عنوان فرعي H3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("**", "**")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="عريض (Bold)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("*", "*")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="مائل (Italic)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("- ")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="قائمة نقطية"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("> ")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="اقتباس"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("[عنوان الرابط](", ")")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="إدراج رابط"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("![وصف الصورة](", ")")}
            className="p-1.5 rounded hover:bg-white dark:hover:bg-[#252830] text-slate-600 dark:text-slate-300 font-bold"
            title="إدراج صورة"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white dark:bg-[#121316] rounded-lg p-0.5 border border-slate-200 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              viewMode === "edit" ? "bg-cyan-500 text-black shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>محرر</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              viewMode === "preview" ? "bg-cyan-500 text-black shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>معاينة حية</span>
          </button>
        </div>
      </div>

      {/* 4. Content Area */}
      {viewMode === "edit" ? (
        <textarea
          id="post-content-textarea"
          rows={16}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="اكتب المحتوى الكامل للمقال هنا باستخدام صيغة Markdown..."
          className="w-full p-4 bg-white dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] rounded-2xl text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-cyan-400 resize-y font-sans"
        />
      ) : (
        <div className="p-6 bg-white dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] rounded-2xl text-slate-900 dark:text-slate-100 min-h-[300px] prose dark:prose-invert max-w-none text-xs sm:text-sm">
          {content ? (
            <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
          ) : (
            <span className="text-slate-400 italic">لا يوجد محتوى للمعاينة حتى الآن...</span>
          )}
        </div>
      )}
    </div>
  );
}

export default PostContentEditor;
