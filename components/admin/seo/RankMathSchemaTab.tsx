import React from "react";

interface RankMathSchemaTabProps {
  schemaType: string;
  setSchemaType: (v: string) => void;
  seoTitle: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  featuredImage?: string;
  slug: string;
}

export function RankMathSchemaTab({
  schemaType,
  setSchemaType,
  seoTitle,
  title,
  metaDescription,
  excerpt,
  featuredImage,
  slug,
}: RankMathSchemaTabProps) {
  return (
    <div className="space-y-3 bg-[#17181c] border border-[#24262d] rounded-2xl p-4 text-xs">
      <div className="space-y-1">
        <label className="text-slate-300 font-bold block">نوع المخطط المهيكل (Schema Type)</label>
        <select
          value={schemaType}
          onChange={(e) => setSchemaType(e.target.value)}
          className="w-full px-3 py-2 bg-[#101114] border border-[#26282f] rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
        >
          <option value="Article">Article (مقال قياسي)</option>
          <option value="BlogPosting">BlogPosting (مقال مدونة مطبعة)</option>
          <option value="NewsArticle">NewsArticle (خبر صحفي أو تحديث)</option>
          <option value="FAQPage">FAQPage (أسئلة شائعة وإجابات)</option>
          <option value="HowTo">HowTo (دليل تعليمي خطوة بخطوة)</option>
        </select>
      </div>

      <div className="space-y-1">
        <span className="text-slate-400 font-mono text-[11px] block">JSON-LD Structured Data Preview:</span>
        <pre className="p-3 bg-[#101114] rounded-lg border border-[#22242a] text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-48" dir="ltr">
{JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: seoTitle || title,
    description: metaDescription || excerpt,
    image: featuredImage || "https://etbaaly.com/og-image.jpg",
    author: { "@type": "Organization", name: "مطبعة إطبعلي - Etbaaly" },
    publisher: { "@type": "Organization", name: "إطبعلي", logo: { "@type": "ImageObject", url: "https://etbaaly.com/logo.png" } },
    mainEntityOfPage: `https://etbaaly.com/blog/${slug}`,
  },
  null,
  2
)}
        </pre>
      </div>
    </div>
  );
}

export default RankMathSchemaTab;
