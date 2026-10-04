"use client";

import React from "react";
import Link from "next/link";
import { Layers, PlusCircle, Sparkles, RefreshCw, ExternalLink } from "lucide-react";

interface ProductsHeaderProps {
  productsCount: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProductsHeader({ productsCount, loading, onRefresh }: ProductsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-[#c93b41] border border-red-200 dark:border-red-900/40">
                <Layers className="w-5 h-5" />
              </div>
              <span>استوديو قوالب ومنتجات المتجر</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/30 text-[#c93b41] border border-red-200 dark:border-red-900/40">
              {productsCount} منتجات
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            إدارة كافة المنتجات في قاعدة البيانات مع إمكانية التعديل، الحذف، والربط بالمهيئات البصرية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/admin/products/configurator/"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c93b41] to-red-700 hover:from-red-700 hover:to-[#c93b41] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>استوديو المهيئ التفاعلي الجديد ✨</span>
          </Link>

          <Link
            href="/admin/products/new/"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#202227] dark:hover:bg-[#282b32] text-slate-900 dark:text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-200 dark:border-white/[0.08] transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#c93b41]" />
            <span>إضافة منتج جديد</span>
          </Link>

          <button
            type="button"
            onClick={onRefresh}
            className="p-2.5 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 text-slate-600 dark:text-slate-300 rounded-xl text-xs shadow-xs cursor-pointer"
            title="تحديث القائمة"
          >
            <RefreshCw className={`w-4 h-4 text-[#c93b41] ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Featured Banner to Mockup & Configurator Studio */}
      <div className="bg-gradient-to-r from-slate-900 via-[#18191e] to-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>نظام استوديو المهيئات البصرية وضبط الطبقات المعتمد</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            استوديو المهيئات البصرية التفاعلية وضبط الطبقات بدقة 300 DPI
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            يمكنك الآن فتح وتعديل أي منتج للتحكم في المنظورات (Views)، طبقات الألوان، مساحات الطباعة، وعلامات التفاعل، أو حذفه بالكامل من المتجر وقاعدة البيانات.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <Link
            href="/admin/products/configurator/"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c93b41] to-red-700 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>فتح استوديو المهيئات 🎨</span>
          </Link>

          <Link
            href="/products/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <span>معرض المنتجات للعملاء</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
