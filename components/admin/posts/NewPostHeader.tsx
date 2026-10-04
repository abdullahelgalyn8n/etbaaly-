import React from "react";
import Link from "next/link";
import { ArrowRight, Save, Send } from "lucide-react";

interface NewPostHeaderProps {
  loading: boolean;
  onSubmit: (status: "published" | "draft") => void;
}

export function NewPostHeader({ loading, onSubmit }: NewPostHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts"
          className="p-2 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 text-slate-600 dark:text-slate-300 rounded-xl transition-all"
          title="العودة لقائمة المقالات"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            إضافة مقال جديد للمدونة
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            محرر المحتوى المتقدم مع معاينة السيو ومحركات الذكاء الاصطناعي (AEO).
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          disabled={loading}
          onClick={() => onSubmit("draft")}
          className="px-4 py-2 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>حفظ كمسودة</span>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onSubmit("published")}
          className="btn-crimson px-5 py-2 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/20 cursor-pointer flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{loading ? "جاري النشر..." : "نشر المقال الآن 🚀"}</span>
        </button>
      </div>
    </div>
  );
}

export default NewPostHeader;
