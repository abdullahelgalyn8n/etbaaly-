"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Eye, Edit, Trash2, Calendar, BookOpen, Sparkles } from "lucide-react";

interface PostsTableProps {
  posts: any[];
  loading: boolean;
  onEdit: (post: any) => void;
  onToggleStatus: (slug: string, currentStatus: string) => void;
  onDelete: (slug: string, title: string) => void;
}

export default function PostsTable({
  posts,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
}: PostsTableProps) {
  if (loading) {
    return (
      <div className="py-16 text-center text-xs text-slate-500 font-bold">
        جاري تحميل المقالات والمحتوى...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center space-y-3">
        <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
        <p className="text-xs sm:text-sm text-slate-500 font-bold">
          لا توجد مقالات مطابقة للبحث أو الفلتر المحدد.
        </p>
        <Link
          href="/admin/posts/new"
          className="inline-block px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold"
        >
          أضف مقالاً جديداً الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-right text-xs">
        <thead>
          <tr className="border-b border-slate-100 dark:border-white/[0.06] text-slate-500 font-bold">
            <th className="pb-3 pr-2">عنوان المقال</th>
            <th className="pb-3">التصنيف</th>
            <th className="pb-3">الكاتب والوقت</th>
            <th className="pb-3">الحالة</th>
            <th className="pb-3 text-center">السيو (Rank Math)</th>
            <th className="pb-3 text-left pl-2">إجراءات التحكم</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {posts.map((post) => (
            <tr
              key={post.slug}
              className="hover:bg-slate-50/60 dark:hover:bg-[#1f2126] transition-colors group"
            >
              {/* Title & Info */}
              <td className="py-4 pr-2 max-w-md">
                <div className="space-y-1">
                  <Link
                    href={`/${post.slug}`}
                    target="_blank"
                    className="font-bold text-slate-900 dark:text-white hover:text-[#c93b41] text-xs sm:text-sm line-clamp-1 group-hover:underline flex items-center gap-1.5"
                  >
                    <span>{post.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400">/{post.slug}</div>
                </div>
              </td>

              {/* Category */}
              <td className="py-4 whitespace-nowrap">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a1c20] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                  {post.category}
                </span>
              </td>

              {/* Author & Date */}
              <td className="py-4 whitespace-nowrap">
                <div className="text-slate-900 dark:text-white font-medium">
                  {post.author ? post.author.split(" ")[0] : "فريق إطبعلي"}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
              </td>

              {/* Status */}
              <td className="py-4 whitespace-nowrap">
                {post.status === "published" ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                    منشور لايف ✓
                  </span>
                ) : post.status === "scheduled" ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                    مجدول للنشر
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                    مسودة ✎
                  </span>
                )}
              </td>

              {/* Rank Math SEO Score */}
              <td className="py-4 whitespace-nowrap text-center">
                {(() => {
                  const score = post.seoScore || 85;
                  const isGood = score >= 80;
                  const isOk = score >= 60 && score < 80;
                  return (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                        isGood
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40"
                          : isOk
                          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
                          : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40"
                      }`}
                      title={`درجة فحص Rank Math SEO: ${score}/100`}
                    >
                      <Sparkles className="w-3 h-3 text-[#c93b41]" />
                      <span>{score}/100</span>
                    </span>
                  );
                })()}
              </td>

              {/* Actions */}
              <td className="py-4 whitespace-nowrap text-left pl-2">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={`/${post.slug}`}
                    target="_blank"
                    className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                    title="معاينة المقال في المتجر"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/admin/posts/${encodeURIComponent(post.slug)}`}
                    className="p-1.5 text-slate-500 hover:text-[#c93b41] hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                    title="محرر المقال الكامل واختبار Rank Math SEO"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onToggleStatus(post.slug, post.status)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                      post.status === "published"
                        ? "bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    }`}
                    title={post.status === "published" ? "تحويل لمسودة" : "تفعيل النشر"}
                  >
                    {post.status === "published" ? "تعطيل" : "نشر"}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(post.slug, post.title)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                    title="حذف المقال"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
