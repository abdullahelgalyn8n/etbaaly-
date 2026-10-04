"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, Save, Send, CheckCircle2 } from "lucide-react";

interface PostEditorHeaderProps {
  title: string;
  slug: string;
  status: string;
  isSaving: boolean;
  saveNotice: string | null;
  onSave: (targetStatus?: "published" | "draft") => void;
}

export default function PostEditorHeader({
  title,
  slug,
  status,
  isSaving,
  saveNotice,
  onSave,
}: PostEditorHeaderProps) {
  return (
    <header className="h-14 bg-white dark:bg-[#1a1c22] border-b border-slate-200 dark:border-white/[0.08] px-4 flex items-center justify-between z-20 shrink-0 sticky top-0">
      {/* Back and Title */}
      <div className="flex items-center gap-3 truncate">
        <Link
          href="/admin/posts"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
          title="الرجوع لجدول المقالات"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
            {title ? `تحرير: ${title}` : "مقال جديد"}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
              status === "published"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
            }`}
          >
            {status === "published" ? "منشور" : "مسودة"}
          </span>
        </div>
      </div>

      {/* Action Buttons & Notice */}
      <div className="flex items-center gap-2 shrink-0">
        {saveNotice && (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-500 font-bold animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{saveNotice}</span>
          </span>
        )}

        {slug && (
          <Link
            href={`/${slug}`}
            target="_blank"
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="معاينة حية للمقال في الموقع"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">معاينة حية</span>
          </Link>
        )}

        <button
          type="button"
          onClick={() => onSave("draft")}
          disabled={isSaving}
          className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>حفظ كمسودة</span>
        </button>

        <button
          type="button"
          onClick={() => onSave("published")}
          disabled={isSaving}
          className="px-4 py-1.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSaving ? "جاري النشر..." : "تحديث ونشر"}</span>
        </button>
      </div>
    </header>
  );
}
