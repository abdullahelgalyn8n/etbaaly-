import { actionScheduledArticles } from "./actionsArticles";
import { BlogPost, BlogPostSummary } from "./blog/types";
import { basePostsPart1 } from "./blog/basePostsPart1";
import { basePostsPart2 } from "./blog/basePostsPart2";

export * from "./blog/types";

export const baseBlogPostsData: BlogPost[] = [
  ...basePostsPart1,
  ...basePostsPart2,
];

// دمج المقالات الأساسية مع مقالات الأكشن
export const allBlogPostsData: BlogPost[] = [
  ...baseBlogPostsData,
  ...actionScheduledArticles,
];

// استرجاع المقالات المنشورة فعلياً فقط حتى اللحظة الحالية (لحماية الفهرسة ومنع تسريب المقالات المجدولة)
export function getPublishedArticles(): BlogPost[] {
  const now = new Date();
  return allBlogPostsData.filter((post) => {
    if (!post.publishDate) return true;
    return new Date(post.publishDate) <= now;
  });
}

// استرجاع المقالات المجدولة في الأكشن التي تنتظر موعد نشرها
export function getScheduledArticles(): BlogPost[] {
  const now = new Date();
  return allBlogPostsData.filter((post) => {
    return Boolean(post.publishDate && new Date(post.publishDate) > now);
  });
}

// التصدير الافتراضي المعتمد للمقالات المنشورة
export const blogPostsData: BlogPost[] = getPublishedArticles();

// ملخصات خفيفة الوزن للمقالات بدون نصوص الماركداون الضخمة لتقليل حجم حزم الجافاسكريبت للعميل
export const blogPostsSummaries: BlogPostSummary[] = blogPostsData.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  categoryTag: post.categoryTag,
  image: post.image,
  date: post.date,
  publishDate: post.publishDate,
  readTime: post.readTime,
  author: post.author,
  tags: post.tags,
  isNews: post.isNews,
  publishedTime: post.publishedTime,
  isAction: post.isAction,
}));
