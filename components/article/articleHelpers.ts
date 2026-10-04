import { siteConfig } from "@/data/siteConfig";
import { BlogPost } from "@/data/blogPostsData";

export function extractFaqsFromContent(content: string) {
  const faqs: { question: string; answer: string }[] = [];
  const regex = /###\s+(.+?)\n([\s\S]*?)(?=(?:###|\n##|$))/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const q = match[1].trim();
    const a = match[2].trim().replace(/\n+/g, " ");
    if (q.includes("؟") || q.startsWith("هل") || q.startsWith("ما") || q.startsWith("كيف") || q.startsWith("كم")) {
      faqs.push({ question: q, answer: a });
    }
  }
  return faqs;
}

export function generateArticleSchema(post: BlogPost, isNews: boolean) {
  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": [`${siteConfig.url}${post.image}`],
    "datePublished": post.publishedTime || `${post.date}T09:00:00+03:00`,
    "dateModified": post.publishedTime || `${post.date}T09:00:00+03:00`,
    "inLanguage": "ar",
    "keywords": post.tags.join(", "),
    "author": {
      "@type": "Person",
      "@id": `${siteConfig.url}/#founder`,
      "name": post.author,
      "url": `${siteConfig.url}/about/`,
      "jobTitle": "مؤسس A.Z Agency واستشاري السيو التقني والنمو الرقمي",
      "image": `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
      "sameAs": [
        "https://github.com/abdullahelgalyn8n",
        siteConfig.social.facebook,
        siteConfig.social.instagram,
        siteConfig.social.whatsapp,
      ],
      "worksFor": {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": "A.Z Agency",
        "url": siteConfig.url,
      },
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      "name": "A.Z Agency",
      "url": siteConfig.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/images/ICON-LOGO-SITE.webp`,
      },
      "sameAs": [
        siteConfig.social.facebook,
        siteConfig.social.instagram,
        siteConfig.social.whatsapp,
        siteConfig.social.linkedin,
        "https://github.com/abdullahelgalyn8n",
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${post.slug}/`,
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };
}
