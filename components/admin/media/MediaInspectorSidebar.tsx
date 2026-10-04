"use client";

import React from "react";
import { Sparkles, X, Copy, ExternalLink, Save, Trash2, Eye } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";
import MediaStorageInfoCard from "./MediaStorageInfoCard";
import MediaMetaForm from "./MediaMetaForm";

interface MediaInspectorSidebarProps {
  selectedAsset: MediaAsset | null;
  onClose: () => void;
  editAlt: string;
  setEditAlt: (val: string) => void;
  editTitle: string;
  setEditTitle: (val: string) => void;
  editCaption: string;
  setEditCaption: (val: string) => void;
  editDescription: string;
  setEditDescription: (val: string) => void;
  editCategory: string;
  setEditCategory: (val: string) => void;
  editTags: string;
  setEditTags: (val: string) => void;
  isSaving: boolean;
  onSave: () => void;
  onDelete: (id: string) => void;
  onCopyUrl: (url: string) => void;
}

export function MediaInspectorSidebar({
  selectedAsset,
  onClose,
  editAlt,
  setEditAlt,
  editTitle,
  setEditTitle,
  editCategory,
  setEditCategory,
  editTags,
  setEditTags,
  isSaving,
  onSave,
  onDelete,
  onCopyUrl,
}: MediaInspectorSidebarProps) {
  if (!selectedAsset) {
    return (
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 text-center sticky top-20 text-slate-400">
        <Eye className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">حدد صورة لعرض وتعديل الميتا</p>
        <p className="text-[11px] text-slate-400 mt-1">
          يمكنك فحص نوع الاستضافة وتحديث الـ Alt Text لكل صورة مباشرة.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 sticky top-20 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c93b41]" />
          <h3 className="text-xs font-black text-slate-900 dark:text-white">تفاصيل وميتا تاج الصورة</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preview image */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#18191c] p-3 flex flex-col items-center">
        <div className="w-full h-40 relative flex items-center justify-center">
          <img
            src={selectedAsset.url}
            alt={selectedAsset.altText || ""}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2 mt-3 w-full justify-between pt-2 border-t border-slate-200/60 dark:border-white/[0.06] text-[11px]">
          <button
            onClick={() => onCopyUrl(selectedAsset.url)}
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#c93b41] font-bold"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ الرابط</span>
          </button>
          <a
            href={selectedAsset.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#c93b41]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>فتح الأصل</span>
          </a>
        </div>
      </div>

      <MediaStorageInfoCard asset={selectedAsset} />

      <MediaMetaForm
        selectedAsset={selectedAsset}
        editAlt={editAlt}
        setEditAlt={setEditAlt}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        editTags={editTags}
        setEditTags={setEditTags}
      />

      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#c93b41] hover:bg-[#b03036] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "جاري الحفظ..." : "حفظ بيانات الميتا"}</span>
        </button>

        <button
          onClick={() => onDelete(selectedAsset.id)}
          className="p-2.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer"
          title="حذف من المعرض"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default MediaInspectorSidebar;
