import { allBlogPostsData, BlogPost } from "@/data/blogPostsData";
import { getDb } from "@/lib/db/client";

export type AdminBlogPost = BlogPost & {
  status: "published" | "draft" | "scheduled";
  views?: number;
};

// In-memory runtime cache for admin posts (seeded with existing blog posts data)
let adminPostsCache: AdminBlogPost[] = allBlogPostsData.map((post) => {
  const now = new Date();
  const isScheduled = Boolean(post.publishDate && new Date(post.publishDate) > now);
  return {
    ...post,
    status: isScheduled ? "scheduled" : "published",
    views: Math.floor(Math.random() * 800) + 150,
  };
});

export interface QueryPostsOptions {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

async function ensurePostsTable() {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS posts (
          id VARCHAR(64) PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(500) NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          category VARCHAR(255) DEFAULT 'مقالات عامة وتصميم',
          category_tag VARCHAR(100) DEFAULT 'general',
          image TEXT DEFAULT '/images/social-media/az-social-offer-99egp.webp',
          date VARCHAR(50),
          publish_date TIMESTAMP WITH TIME ZONE,
          read_time VARCHAR(50) DEFAULT '4 دقائق قراءة',
          author VARCHAR(255) DEFAULT 'فريق تحرير مطبعة إطبعلي',
          tags JSONB DEFAULT '["إطبعلي"]'::jsonb,
          status VARCHAR(50) DEFAULT 'published',
          views INTEGER DEFAULT 0,
          seo_metadata JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    } catch (err) {
      console.error("Neon ensurePostsTable error:", err);
    }
  }
}

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  category_tag?: string;
  image?: string;
  date?: string;
  publish_date?: string | Date;
  read_time?: string;
  author?: string;
  tags?: string[] | string;
  status?: string;
  views?: number;
  seo_metadata?: {
    focusKeyword?: string;
    seoTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    schemaType?: string;
    ogImage?: string;
    robotsMeta?: { index: boolean; follow: boolean };
    seoScore?: number;
  };
  created_at?: string | Date;
}

function mapPostRow(r: PostRow): AdminBlogPost {
  let parsedTags: string[] = ["إطبعلي"];
  if (Array.isArray(r.tags)) {
    parsedTags = r.tags;
  } else if (typeof r.tags === "string") {
    try {
      parsedTags = JSON.parse(r.tags);
    } catch {
      parsedTags = [r.tags];
    }
  }

  const seo = r.seo_metadata || {};

  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || "",
    category: r.category || "مقالات عامة وتصميم",
    categoryTag: r.category_tag || "general",
    image: r.image || "/images/social-media/az-social-offer-99egp.webp",
    date: r.date || new Date(r.created_at || Date.now()).toISOString().split("T")[0],
    publishDate: r.publish_date ? new Date(r.publish_date).toISOString() : undefined,
    readTime: r.read_time || "4 دقائق قراءة",
    author: r.author || "فريق تحرير مطبعة إطبعلي",
    content: r.content || "",
    tags: parsedTags,
    status: (r.status as "published" | "draft" | "scheduled") || "published",
    views: Number(r.views) || 0,
    focusKeyword: seo.focusKeyword,
    seoTitle: seo.seoTitle,
    metaDescription: seo.metaDescription,
    canonicalUrl: seo.canonicalUrl,
    schemaType: seo.schemaType,
    ogImage: seo.ogImage,
    robotsMeta: seo.robotsMeta,
    seoScore: seo.seoScore,
  };
}

export async function findPostBySlug(slug: string): Promise<AdminBlogPost | undefined> {
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensurePostsTable();
      const rows = await sql`
        SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
      `;
      if (rows && rows.length > 0) {
        const post = mapPostRow(rows[0] as unknown as PostRow);
        const existingIdx = adminPostsCache.findIndex((p) => p.slug === slug);
        if (existingIdx >= 0) {
          adminPostsCache[existingIdx] = post;
        } else {
          adminPostsCache.unshift(post);
        }
        return post;
      }
    } catch (err) {
      console.error("Neon findPostBySlug error:", err);
    }
  }
  return adminPostsCache.find((p) => p.slug === slug);
}

export async function queryAdminPosts(options: QueryPostsOptions) {
  const { search = "", category = "all", status = "all", page = 1, limit = 15 } = options;
  const { isLive, sql } = getDb();

  if (isLive && sql) {
    try {
      await ensurePostsTable();
      const countRes = await sql`SELECT COUNT(*)::int AS count FROM posts`;
      const tableCount = countRes?.[0]?.count ?? 0;

      // Seed static posts to DB if table is fresh
      if (tableCount === 0 && adminPostsCache.length > 0) {
        for (const p of adminPostsCache) {
          const id = `post-${p.slug}`;
          const tagsJson = JSON.stringify(p.tags || []);
          const seoJson = JSON.stringify({
            focusKeyword: p.focusKeyword,
            seoTitle: p.seoTitle,
            metaDescription: p.metaDescription,
            canonicalUrl: p.canonicalUrl,
            schemaType: p.schemaType,
            ogImage: p.ogImage,
            robotsMeta: p.robotsMeta,
            seoScore: p.seoScore,
          });
          await sql`
            INSERT INTO posts (
              id, slug, title, excerpt, content, category, category_tag, image,
              date, read_time, author, tags, status, views, seo_metadata
            ) VALUES (
              ${id}, ${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.category},
              ${p.categoryTag}, ${p.image}, ${p.date}, ${p.readTime}, ${p.author},
              ${tagsJson}::jsonb, ${p.status}, ${p.views || 0}, ${seoJson}::jsonb
            ) ON CONFLICT (slug) DO NOTHING;
          `;
        }
      }

      const dbRows = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
      if (dbRows && dbRows.length > 0) {
        const allDbPosts = (dbRows as unknown as PostRow[]).map(mapPostRow);
        const slugMap = new Map<string, AdminBlogPost>();
        allDbPosts.forEach((p) => slugMap.set(p.slug, p));
        adminPostsCache.forEach((p) => {
          if (!slugMap.has(p.slug)) slugMap.set(p.slug, p);
        });
        adminPostsCache = Array.from(slugMap.values());
      }
    } catch (err) {
      console.error("Neon queryAdminPosts error:", err);
    }
  }

  let filtered = [...adminPostsCache];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(
      (p) => p.categoryTag === category || p.category === category
    );
  }

  if (status !== "all") {
    filtered = filtered.filter((p) => p.status === status);
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  const publishedCount = adminPostsCache.filter((p) => p.status === "published").length;
  const draftCount = adminPostsCache.filter((p) => p.status === "draft").length;
  const scheduledCount = adminPostsCache.filter((p) => p.status === "scheduled").length;

  const categoryCounts: Record<string, { name: string; tag: string; count: number }> = {};
  adminPostsCache.forEach((p) => {
    const key = p.categoryTag || "general";
    if (!categoryCounts[key]) {
      categoryCounts[key] = {
        name: p.category,
        tag: p.categoryTag,
        count: 0,
      };
    }
    categoryCounts[key].count++;
  });

  return {
    posts: paginated,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    stats: {
      totalPosts: adminPostsCache.length,
      published: publishedCount,
      drafts: draftCount,
      scheduled: scheduledCount,
      categories: Object.values(categoryCounts),
    },
  };
}

export async function insertAdminPost(data: Partial<AdminBlogPost>): Promise<{ success: boolean; error?: string; post?: AdminBlogPost }> {
  const title = data.title?.trim();
  const content = data.content?.trim();

  if (!title || !content) {
    return { success: false, error: "العنوان ومحتوى المقال مطلوبان." };
  }

  const slug =
    data.slug?.trim() ||
    title
      .toLowerCase()
      .replace(/[^\u0621-\u064Aa-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") ||
    `post-${Date.now()}`;

  if (adminPostsCache.some((p) => p.slug === slug)) {
    return { success: false, error: "يوجد مقال آخر بنفس الرابط الدائم (Slug)." };
  }

  const newPost: AdminBlogPost = {
    slug,
    title,
    excerpt: data.excerpt?.trim() || title,
    category: data.category || "مقالات عامة وتصميم",
    categoryTag: data.categoryTag || "general",
    image: data.image || "/images/social-media/az-social-offer-99egp.webp",
    date: new Date().toISOString().split("T")[0],
    publishDate: data.publishDate,
    readTime: data.readTime || "4 دقائق قراءة",
    author: data.author?.trim() || "فريق تحرير مطبعة إطبعلي",
    content,
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? (data.tags as string).split(",").map((t) => t.trim())
      : ["إطبعلي"],
    status: data.status === "draft" ? "draft" : data.status === "scheduled" ? "scheduled" : "published",
    views: 0,
    focusKeyword: data.focusKeyword,
    seoTitle: data.seoTitle,
    metaDescription: data.metaDescription,
    canonicalUrl: data.canonicalUrl,
    schemaType: data.schemaType,
    ogImage: data.ogImage,
    robotsMeta: data.robotsMeta,
    seoScore: data.seoScore,
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensurePostsTable();
      const existing = await sql`SELECT slug FROM posts WHERE slug = ${slug} LIMIT 1`;
      if (existing && existing.length > 0) {
        return { success: false, error: "يوجد مقال آخر بنفس الرابط الدائم (Slug)." };
      }

      const id = `post-${Date.now()}`;
      const tagsJson = JSON.stringify(newPost.tags);
      const seoJson = JSON.stringify({
        focusKeyword: newPost.focusKeyword,
        seoTitle: newPost.seoTitle,
        metaDescription: newPost.metaDescription,
        canonicalUrl: newPost.canonicalUrl,
        schemaType: newPost.schemaType,
        ogImage: newPost.ogImage,
        robotsMeta: newPost.robotsMeta,
        seoScore: newPost.seoScore,
      });

      await sql`
        INSERT INTO posts (
          id, slug, title, excerpt, content, category, category_tag, image,
          date, read_time, author, tags, status, views, seo_metadata
        ) VALUES (
          ${id}, ${newPost.slug}, ${newPost.title}, ${newPost.excerpt}, ${newPost.content},
          ${newPost.category}, ${newPost.categoryTag}, ${newPost.image}, ${newPost.date},
          ${newPost.readTime}, ${newPost.author}, ${tagsJson}::jsonb, ${newPost.status},
          ${newPost.views || 0}, ${seoJson}::jsonb
        );
      `;
    } catch (err) {
      console.error("Neon insertAdminPost error:", err);
    }
  }

  adminPostsCache = [newPost, ...adminPostsCache];
  return { success: true, post: newPost };
}

export async function updateAdminPost(targetSlug: string, updates: Partial<AdminBlogPost>): Promise<{ success: boolean; error?: string; post?: AdminBlogPost }> {
  let existingPost = adminPostsCache.find((p) => p.slug === targetSlug);
  if (!existingPost) {
    existingPost = await findPostBySlug(targetSlug);
  }
  if (!existingPost) {
    return { success: false, error: "المقال غير موجود." };
  }

  const updated: AdminBlogPost = {
    ...existingPost,
    ...updates,
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensurePostsTable();
      const tagsJson = JSON.stringify(updated.tags);
      const seoJson = JSON.stringify({
        focusKeyword: updated.focusKeyword,
        seoTitle: updated.seoTitle,
        metaDescription: updated.metaDescription,
        canonicalUrl: updated.canonicalUrl,
        schemaType: updated.schemaType,
        ogImage: updated.ogImage,
        robotsMeta: updated.robotsMeta,
        seoScore: updated.seoScore,
      });

      await sql`
        UPDATE posts
        SET 
          title = ${updated.title},
          excerpt = ${updated.excerpt},
          content = ${updated.content},
          category = ${updated.category},
          category_tag = ${updated.categoryTag},
          image = ${updated.image},
          read_time = ${updated.readTime},
          author = ${updated.author},
          tags = ${tagsJson}::jsonb,
          status = ${updated.status},
          seo_metadata = ${seoJson}::jsonb,
          updated_at = CURRENT_TIMESTAMP
        WHERE slug = ${targetSlug};
      `;
    } catch (err) {
      console.error("Neon updateAdminPost error:", err);
    }
  }

  const index = adminPostsCache.findIndex((p) => p.slug === targetSlug);
  if (index >= 0) {
    adminPostsCache[index] = updated;
  } else {
    adminPostsCache.unshift(updated);
  }

  return { success: true, post: updated };
}

export async function deleteAdminPost(slug: string): Promise<boolean> {
  let deletedFromDb = false;
  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await ensurePostsTable();
      const res = await sql`DELETE FROM posts WHERE slug = ${slug} RETURNING slug`;
      if (res && res.length > 0) {
        deletedFromDb = true;
      }
    } catch (err) {
      console.error("Neon deleteAdminPost error:", err);
    }
  }

  const initialLen = adminPostsCache.length;
  adminPostsCache = adminPostsCache.filter((p) => p.slug !== slug);
  const deletedFromCache = adminPostsCache.length < initialLen;

  return deletedFromCache || deletedFromDb;
}
