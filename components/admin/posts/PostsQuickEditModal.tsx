"use client";

import React from "react";
import { Edit, X, Save } from "lucide-react";

interface PostsQuickEditModalProps {
  editingPost: any | null;
  setEditingPost: (post: any | null) => void;
  isSavingEdit: boolean;
  onSave: (e: React.FormEvent) => void;
}

export default function PostsQuickEditModal({
  editingPost,
  setEditingPost,
  isSavingEdit,
  onSave,
}: PostsQuickEditModalProps) {
  if (!editingPost) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Edit className="w-4 h-4 text-[#c93b41]" />
            <span>تعديل سريع للمقال</span>
          </div>
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              عنوان المقال:
            </label>
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              المقتطف التسويقي (Excerpt):
            </label>
            <textarea
              rows={2}
              value={editingPost.excerpt}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                التصنيف:
              </label>
              <input
                type="text"
                value={editingPost.category}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                حالة النشر:
              </label>
              <select
                value={editingPost.status || "published"}
                onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              >
                <option value="published">منشور لايف ✓</option>
                <option value="draft">مسودة ✎</option>
                <option value="scheduled">مجدول</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSavingEdit}
              className="px-4 py-2 rounded-xl btn-crimson text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingEdit ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
