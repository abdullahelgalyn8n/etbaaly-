import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";
import { blogPostsData } from "@/data/blogPostsData";
import { getAdminProducts } from "@/lib/db";
import { initialAdminProducts } from "@/lib/db/seed";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/about/",
    "/services/",
    "/products/",
    "/track/",
    "/contact/",
    "/blog/",
    "/terms/",
    "/refund/",
    "/privacy/",
    "/policy/",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority:
      route === ""
        ? 1.0
        : route === "/products/"
        ? 0.95
        : route.startsWith("/policy") || route.startsWith("/terms")
        ? 0.7
        : 0.8,
  }));

  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  let products = [];
  try {
    products = await getAdminProducts("published");
  } catch {
    products = initialAdminProducts.filter((p) => p.status === "published");
  }

  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug || product.id}/`,
    lastModified: product.updatedAt
      ? new Date(product.updatedAt).toISOString()
      : new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = blogPostsData.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...productPages, ...blogPages];
}
