"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, Layers, FileSpreadsheet, Eye, BookOpen, Settings, ExternalLink } from "lucide-react";

interface AdminWelcomePanelProps {
  onClose: () => void;
}

export default function AdminWelcomePanel({ onClose }: AdminWelcomePanelProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-7 shadow-xs rounded-3xl">
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#c93b41]/10 rounded-full blur-2xl pointer-events-none" />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 left-5 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
        title="إخفاء لوحة الترحيب"
      >
        إغلاق ✕
      </button>

      <div className="space-y-1.5 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <span>أهلاً بك في لوحة تحكم إطبعلي!</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          لقد جمعنا لك هنا أهم الروابط والإجراءات السريعة لإدارة خط الإنتاج والطباعة، استوديو تخصيص المنتجات، وعروض الأسعار.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-100 dark:border-white/[0.06] text-xs">
        {/* Col 1 */}
        <div className="space-y-3.5">
          <div className="font-bold text-slate-900 dark:text-white text-sm">الخطوات الأولى</div>
          <Link
            href="/admin/products/new"
            className="btn-crimson inline-flex items-center gap-2 px-4 py-2.5 text-white font-bold rounded-xl shadow-md shadow-red-500/20 transition-all text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة منتج وقالب طبقات جديد</span>
          </Link>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            أو يمكنك{" "}
            <Link href="/dashboard" className="text-[#c93b41] hover:text-[#ba3239] hover:underline font-bold">
              معاينة المتجر كعميل (بوابة الشركات)
            </Link>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2.5">
          <div className="font-bold text-slate-900 dark:text-white text-sm">الخطوات التالية</div>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li>
              <Link href="/admin/products" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <Layers className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>إدارة قوالب وتخصيصات المنتجات</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>متابعة أوامر الشغل ومطابقة الألوان</span>
              </Link>
            </li>
            <li>
              <Link href="/" target="_blank" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <Eye className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>معاينة واجهة المتجر الرئيسية</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2.5">
          <div className="font-bold text-slate-900 dark:text-white text-sm">المزيد من الإجراءات</div>
          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li>
              <Link href="/admin/posts" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>إدارة المقالات والمدونة وسيو AEO</span>
              </Link>
            </li>
            <li>
              <Link href="/admin?tab=quotes" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>مراجعة طلبات عروض أسعار B2B</span>
              </Link>
            </li>
            <li>
              <Link href="/admin?tab=settings" className="hover:text-[#c93b41] flex items-center gap-2 font-medium">
                <Settings className="w-3.5 h-3.5 text-[#c93b41]" />
                <span>إعدادات الضرائب وتكامل قاعدة بيانات Supabase</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
