import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/blogPostsData";

interface ServiceRelatedArticlesProps {
  articles: BlogPost[];
}

export default function ServiceRelatedArticles({ articles }: ServiceRelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#c93b41] uppercase tracking-wider">المقالات والمعرفة الفنية</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">
            أحدث الرؤى والاستراتيجيات المرتبطة
          </h2>
        </div>
        <Link
          href="/blog/"
          className="text-xs font-bold text-[#c93b41] hover:underline flex items-center gap-1"
        >
          <span>عرض كل المقالات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art, idx) => (
          <Link
            key={idx}
            href={`/${art.slug}/`}
            className="group flex flex-col justify-between bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/50 rounded-2xl p-6 transition-all shadow-sm hover:shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#c93b41]/10 text-[#c93b41] font-bold">
                  {art.category}
                </span>
                <span className="text-slate-600 dark:text-[#a8abb4] flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-[#c93b41] transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-[#a8abb4] line-clamp-2 leading-relaxed font-medium">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-600 dark:text-[#a8abb4] font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{art.date}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#c93b41] group-hover:translate-x-[-4px] transition-transform">
                <span>قراءة المقال</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
