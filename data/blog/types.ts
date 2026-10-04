export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTag: string;
  image: string;
  date: string;
  publishDate?: string;
  readTime: string;
  author: string;
  content: string;
  tags: string[];
  isNews?: boolean;
  publishedTime?: string;
  isAction?: boolean;
  // Rank Math SEO Fields
  focusKeyword?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaType?: string;
  ogImage?: string;
  robotsMeta?: { index: boolean; follow: boolean };
  seoScore?: number;
}

export type BlogPostSummary = Omit<BlogPost, "content">;
