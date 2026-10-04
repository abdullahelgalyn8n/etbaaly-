import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { allBlogPostsData, blogPostsData } from "@/data/blogPostsData";
import { BreadcrumbSchema } from "@/components/JsonLd";
import MarkdownContent from "@/components/MarkdownContent";
import LeadMagnetCard from "@/components/LeadMagnetCard";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleAuthorCard } from "@/components/article/ArticleAuthorCard";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { ArticleCta } from "@/components/article/ArticleCta";
import {
  extractFaqsFromContent,
  generateArticleSchema,
  generateFaqSchema,
} from "@/components/article/articleHelpers";

import { findPostBySlug } from "@/lib/posts/adminPostsStore";

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allBlogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dbPost = (await findPostBySlug(decodedSlug)) || (await findPostBySlug(slug));
  const post =
    dbPost ||
    allBlogPostsData.find(
      (p) => p.slug === slug || p.slug === decodedSlug || encodeURIComponent(p.slug) === slug
    );
  if (!post) return { title: "مقال غير موجود" };

  return {
    title: `${post.title} | إطبعلي - Etbaaly`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${siteConfig.url}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${siteConfig.url}${post.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dbPost = (await findPostBySlug(decodedSlug)) || (await findPostBySlug(slug));
  const post =
    dbPost ||
    allBlogPostsData.find(
      (p) => p.slug === slug || p.slug === decodedSlug || encodeURIComponent(p.slug) === slug
    );

  if (!post) {
    notFound();
  }

  const published = blogPostsData;
  const relatedArticles = published
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.categoryTag === post.categoryTag && b.categoryTag !== post.categoryTag) return -1;
      if (b.categoryTag === post.categoryTag && a.categoryTag !== post.categoryTag) return 1;
      return 0;
    })
    .slice(0, 3);

  const isNews = post.isNews || post.categoryTag === "news";
  const faqs = extractFaqsFromContent(post.content);
  const articleSchema = generateArticleSchema(post, isNews);
  const faqSchema = generateFaqSchema(faqs);

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المدونة", url: `${siteConfig.url}/blog/` },
          { name: post.title, url: `${siteConfig.url}/${post.slug}/` },
        ]}
      />

      <ArticleHeader post={post} />

      {/* Content */}
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 sm:p-12 text-slate-800 dark:text-slate-200 leading-relaxed space-y-8 text-sm sm:text-base font-medium shadow-sm">
        <MarkdownContent content={post.content} />

        <ArticleAuthorCard author={post.author} />

        <LeadMagnetCard categoryTag={post.categoryTag} sourceArticle={post.title} />

        {/* Tags */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400 ml-1" />
          {post.tags.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#1d1d1d] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 font-mono"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      <RelatedArticles articles={relatedArticles} />

      <ArticleCta />
    </div>
  );
}
