import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandedImage from "@/components/BrandedImage";
import { BlogPost } from "@/data/blogPostsData";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
          مقالات ودراسات ذات صلة
        </h3>
        <Link
          href="/blog/"
          className="text-xs font-bold text-[#c93b41] hover:underline flex items-center gap-1"
        >
          <span>تصفح جميع المقالات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((rel) => (
          <Link
            key={rel.slug}
            href={`/${rel.slug}/`}
            className="group bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 rounded-2xl overflow-hidden flex flex-col transition-all shadow-sm hover:shadow-md"
          >
            <div className="relative h-36 w-full bg-slate-100 dark:bg-[#111215] overflow-hidden">
              <BrandedImage
                src={rel.image}
                alt={rel.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full badge-crimson text-[10px] font-bold z-10 shadow-sm">
                {rel.category}
              </span>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#c93b41] transition-colors line-clamp-2 leading-snug">
                {rel.title}
              </h4>
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>{rel.date}</span>
                <span className="font-sans font-bold text-[#c93b41] group-hover:underline">
                  قراءة المقال ←
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
