"use client";

import React from "react";
import Link from "next/link";
import { Layers, CheckCircle2, Save, Sparkles, Eye, ArrowRight } from "lucide-react";

interface StudioTopNavProps {
  title: string;
  productId?: string;
  status: "published" | "draft";
  setStatus: (status: "published" | "draft") => void;
  isSaving: boolean;
  saveSuccess: boolean;
  onSave: () => void;
}

export function StudioTopNav({
  title,
  productId,
  status,
  setStatus,
  isSaving,
  saveSuccess,
  onSave,
}: StudioTopNavProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <Link
            href="/admin/products/"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c20] text-slate-600 dark:text-slate-300 text-xs font-bold transition-colors"
          >
            <ArrowRight className="w-3 h-3" />
            <span>قائمة المنتجات</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full badge-crimson text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            تعديل وإدارة بيانات المنتج
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Customer Live Preview */}
        {productId && (
          <Link
            href={`/products/${productId}/`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c20] dark:hover:bg-[#202228] text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5 transition-colors"
            title="معاينة صفحة المنتج كما تظهر للعملاء"
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>معاينة صفحة المنتج</span>
          </Link>
        )}

        {/* Published / Draft status switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-[#1a1a1a] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => setStatus("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              status === "published"
                ? "bg-emerald-500 text-white shadow"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            منشور بالموقع ✓
          </button>
          <button
            type="button"
            onClick={() => setStatus("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              status === "draft"
                ? "bg-amber-500 text-white shadow"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            مسودة
          </button>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <span>جاري الحفظ...</span>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>تم الحفظ!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
