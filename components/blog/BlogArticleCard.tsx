import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import BrandedImage from "@/components/BrandedImage";
import { BlogPostSummary } from "@/data/blogPostsData";

interface BlogArticleCardProps {
  post: BlogPostSummary;
}

export function BlogArticleCard({ post }: BlogArticleCardProps) {
  const isNewsItem = post.isNews || post.categoryTag === "news";

  return (
    <article className="bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group">
      {/* Featured Image */}
      <div className="relative h-52 w-full bg-slate-100 dark:bg-[#111215] overflow-hidden">
        <BrandedImage
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {isNewsItem && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping inline-block" />
              تحديث إخباري
            </span>
          )}
          <span className="px-3 py-1 rounded-full badge-crimson text-xs font-bold shadow-md">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-[#a8abb4] font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white group-hover:text-[#c93b41] transition-colors leading-snug">
            <Link href={`/${post.slug}/`}>{post.title}</Link>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a8abb4] leading-relaxed line-clamp-3 font-medium">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-5 border-t border-slate-100 dark:border-white/[0.06] mt-5 flex items-center justify-between">
          <span className="text-[11px] text-slate-600 dark:text-[#a8abb4] font-mono flex items-center gap-1 font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <Link
            href={`/${post.slug}/`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#c93b41] group-hover:underline transition-colors"
          >
            <span>{isNewsItem ? "قراءة التقرير" : "قراءة المقال"}</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogArticleCard;
