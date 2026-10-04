import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, User } from "lucide-react";
import BrandedImage from "@/components/BrandedImage";
import { BlogPost } from "@/data/blogPostsData";

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <>
      {/* Back Link */}
      <div className="pt-4">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-[#a8abb4] hover:text-[#c93b41] dark:hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة إلى المدونة والأفكار</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3.5 py-1 rounded-full badge-crimson font-bold">
            {post.category}
          </span>
          <span className="text-slate-500 dark:text-[#a8abb4] flex items-center gap-1 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <span className="text-slate-500 dark:text-[#a8abb4] flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
          <span className="text-slate-500 dark:text-[#a8abb4] flex items-center gap-1 font-medium">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-700 dark:text-[#a8abb4] leading-relaxed border-r-2 border-[#c93b41] pr-4 font-medium">
          {post.excerpt}
        </p>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-lg">
          <BrandedImage
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </header>
    </>
  );
}
