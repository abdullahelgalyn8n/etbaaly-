import React from "react";
import { FileText, Layers } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";

interface MediaMetaFormProps {
  selectedAsset: MediaAsset;
  editAlt: string;
  setEditAlt: (val: string) => void;
  editTitle: string;
  setEditTitle: (val: string) => void;
  editCategory: string;
  setEditCategory: (val: string) => void;
  editTags: string;
  setEditTags: (val: string) => void;
}

export function MediaMetaForm({
  selectedAsset,
  editAlt,
  setEditAlt,
  editTitle,
  setEditTitle,
  editCategory,
  setEditCategory,
  editTags,
  setEditTags,
}: MediaMetaFormProps) {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
          النص البديل للـ SEO (Alt Text) ⚡
        </label>
        <textarea
          rows={2}
          value={editAlt}
          onChange={(e) => setEditAlt(e.target.value)}
          placeholder="وصف دقيق لمحركات البحث والذكاء الاصطناعي..."
          className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
        <span className="text-[10px] text-slate-400 block mt-0.5">
          يستخدمه Google و ChatGPT لفهم محتوى الصورة وأرشفتها.
        </span>
      </div>

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
          عنوان الصورة (Title)
        </label>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
          التصنيف (Category)
        </label>
        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#c93b41]"
        >
          <option value="products">المنتجات والتغليف</option>
          <option value="branding">الهويات واللوجو</option>
          <option value="social">السوشيال ميديا</option>
          <option value="general">عام</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
          الوسوم (مفصولة بفواصل)
        </label>
        <input
          type="text"
          value={editTags}
          onChange={(e) => setEditTags(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      {selectedAsset.usedIn && selectedAsset.usedIn.length > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06]">
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">مستخدمة حالياً في:</span>
          <div className="space-y-1">
            {selectedAsset.usedIn.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 p-1.5 rounded-lg"
              >
                {item.type === "article" ? (
                  <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                ) : (
                  <Layers className="w-3.5 h-3.5 text-[#c93b41] shrink-0" />
                )}
                <span className="truncate">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaMetaForm;
