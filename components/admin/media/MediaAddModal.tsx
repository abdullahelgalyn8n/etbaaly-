"use client";

import React from "react";
import { Upload, X } from "lucide-react";

interface MediaAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newStorageType: "local" | "cloud_db";
  setNewStorageType: (val: "local" | "cloud_db") => void;
  newUrl: string;
  setNewUrl: (val: string) => void;
  newFilename: string;
  setNewFilename: (val: string) => void;
  newAlt: string;
  setNewAlt: (val: string) => void;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newCategory: string;
  setNewCategory: (val: string) => void;
}

export function MediaAddModal({
  isOpen,
  onClose,
  onSubmit,
  newStorageType,
  setNewStorageType,
  newUrl,
  setNewUrl,
  newFilename,
  setNewFilename,
  newAlt,
  setNewAlt,
  newCategory,
  setNewCategory,
}: MediaAddModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#c93b41]" />
            <span>إضافة صورة / ملف وسائط جديد</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
              نوع الاستضافة / التخزين:
            </label>
            <select
              value={newStorageType}
              onChange={(e: any) => setNewStorageType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="cloud_db">سحابي / Cloudflare R2 / قاعدة بيانات</option>
              <option value="local">محلي داخل كود الموقع (Static Public Folder)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
              رابط الصورة (URL): *
            </label>
            <input
              type="text"
              placeholder="/images/example.webp أو https://..."
              value={newUrl}
              onChange={(e) => {
                setNewUrl(e.target.value);
                if (!newFilename) {
                  const parts = e.target.value.split("/");
                  setNewFilename(parts[parts.length - 1] || "image.webp");
                }
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
              اسم الملف (Filename): *
            </label>
            <input
              type="text"
              placeholder="box-mockup.webp"
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
              النص البديل للـ SEO (Alt Text):
            </label>
            <input
              type="text"
              placeholder="وصف الصورة لمحركات البحث..."
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
              القسم:
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white"
            >
              <option value="products">المنتجات والتغليف</option>
              <option value="branding">الهويات واللوجو</option>
              <option value="social">السوشيال ميديا</option>
              <option value="general">عام</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#c93b41] hover:bg-[#b03036] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              إضافة إلى المعرض
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
