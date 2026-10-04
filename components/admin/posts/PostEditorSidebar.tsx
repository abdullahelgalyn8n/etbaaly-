"use client";

import React, { useState } from "react";
import { Sparkles, Send, Image as ImageIcon } from "lucide-react";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";

interface PostEditorSidebarProps {
  status: "published" | "draft";
  setStatus: (status: "published" | "draft") => void;
  category: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  author: string;
  setAuthor: (author: string) => void;
  readTime: string;
  setReadTime: (time: string) => void;
  image: string;
  setImage: (img: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  loading: boolean;
  onSubmit: (status: "published" | "draft") => void;
}

export function PostEditorSidebar({
  status,
  setStatus,
  category,
  onCategoryChange,
  author,
  setAuthor,
  readTime,
  setReadTime,
  image,
  setImage,
  tags,
  setTags,
  loading,
  onSubmit,
}: PostEditorSidebarProps) {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <Sparkles className="w-4 h-4 text-[#c93b41]" />
        <span>إعدادات النشر والظهور</span>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-slate-500 font-bold block mb-1">
            حالة النشر:
          </label>
          <select
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
          >
            <option value="published">منشور فورياً للجميع</option>
            <option value="draft">حفظ كمسودة خاصة</option>
          </select>
        </div>

        <div>
          <label className="text-slate-500 font-bold block mb-1">
            التصنيف الرئيسي:
          </label>
          <select
            value={category}
            onChange={onCategoryChange}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
          >
            <option value="السيو والذكاء الاصطناعي (AEO)">السيو والذكاء الاصطناعي (AEO)</option>
            <option value="تطوير الويب والمتاجر">تطوير الويب والمتاجر</option>
            <option value="الموشن جرافيك">الموشن جرافيك</option>
            <option value="الهويات والتصاميم">الهويات والتصاميم</option>
            <option value="الأتمتة والأنظمة">الأتمتة والأنظمة</option>
            <option value="الأخبار والتحديثات">الأخبار والتحديثات</option>
          </select>
        </div>

        <div>
          <label className="text-slate-500 font-bold block mb-1">
            الكاتب / محرر المقال:
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>

        <div>
          <label className="text-slate-500 font-bold block mb-1">
            مدة القراءة التقديرية:
          </label>
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-500 font-bold block">
              رابط الصورة البارزة (Featured Image):
            </label>
            <button
              type="button"
              onClick={() => setIsMediaPickerOpen(true)}
              className="text-[11px] font-bold text-[#c93b41] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ImageIcon className="w-3 h-3" />
              <span>المعرض</span>
            </button>
          </div>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>

        <div>
          <label className="text-slate-500 font-bold block mb-1">
            الوسوم (مفصولة بفواصل):
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => onSubmit(status)}
          className="btn-crimson w-full py-2.5 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/20 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{loading ? "جاري الحفظ..." : status === "published" ? "نشر المقال الآن" : "حفظ المسودة"}</span>
        </button>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(selected) => {
          setImage(selected.url);
        }}
      />
    </div>
  );
}
