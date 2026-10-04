"use client";

import React, { useState, useMemo } from "react";
import { Code2, Sliders, FileCheck2 } from "lucide-react";
import { analyzeRankMathSeo } from "./RankMathScoreCalculator";
import RankMathSnippetPreview from "./RankMathSnippetPreview";
import RankMathChecklist from "./RankMathChecklist";
import RankMathHeader from "./RankMathHeader";
import RankMathSchemaTab from "./RankMathSchemaTab";
import RankMathAdvancedTab from "./RankMathAdvancedTab";

interface RankMathSeoBoxProps {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  setSlug: (v: string) => void;
  focusKeyword: string;
  setFocusKeyword: (v: string) => void;
  seoTitle: string;
  setSeoTitle: (v: string) => void;
  metaDescription: string;
  setMetaDescription: (v: string) => void;
  schemaType: string;
  setSchemaType: (v: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (v: string) => void;
  robotsIndex: boolean;
  setRobotsIndex: (v: boolean) => void;
  robotsFollow: boolean;
  setRobotsFollow: (v: boolean) => void;
  featuredImage?: string;
  onScoreCalculated?: (score: number) => void;
}

export function RankMathSeoBox({
  title,
  content,
  excerpt,
  slug,
  setSlug,
  focusKeyword,
  setFocusKeyword,
  seoTitle,
  setSeoTitle,
  metaDescription,
  setMetaDescription,
  schemaType,
  setSchemaType,
  canonicalUrl,
  setCanonicalUrl,
  robotsIndex,
  setRobotsIndex,
  robotsFollow,
  setRobotsFollow,
  featuredImage,
}: RankMathSeoBoxProps) {
  const [activeTab, setActiveTab] = useState<"general" | "schema" | "advanced">("general");

  const report = useMemo(() => {
    return analyzeRankMathSeo({
      title: seoTitle || title,
      content,
      excerpt,
      slug,
      focusKeyword,
      metaDescription,
    });
  }, [title, content, excerpt, slug, focusKeyword, seoTitle, metaDescription]);

  return (
    <div className="bg-[#121316] border border-[#26282f] rounded-3xl p-4 sm:p-5 space-y-4 shadow-xl text-xs select-none">
      <RankMathHeader
        report={report}
        focusKeyword={focusKeyword}
        setFocusKeyword={setFocusKeyword}
      />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-[#24262d] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === "general"
              ? "bg-[#00e5ff] text-black shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>التحليل والمعاينة</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schema")}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === "schema"
              ? "bg-[#00e5ff] text-black shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>المخطط (Schema)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("advanced")}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === "advanced"
              ? "bg-[#00e5ff] text-black shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>إعدادات متقدمة</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="space-y-4">
          <RankMathSnippetPreview
            seoTitle={seoTitle || title}
            setSeoTitle={setSeoTitle}
            slug={slug}
            setSlug={setSlug}
            metaDescription={metaDescription || excerpt}
            setMetaDescription={setMetaDescription}
            focusKeyword={focusKeyword}
            featuredImage={featuredImage}
          />
          <RankMathChecklist tests={report.tests} />
        </div>
      )}

      {activeTab === "schema" && (
        <RankMathSchemaTab
          schemaType={schemaType}
          setSchemaType={setSchemaType}
          seoTitle={seoTitle}
          title={title}
          metaDescription={metaDescription}
          excerpt={excerpt}
          featuredImage={featuredImage}
          slug={slug}
        />
      )}

      {activeTab === "advanced" && (
        <RankMathAdvancedTab
          robotsIndex={robotsIndex}
          setRobotsIndex={setRobotsIndex}
          robotsFollow={robotsFollow}
          setRobotsFollow={setRobotsFollow}
          canonicalUrl={canonicalUrl}
          setCanonicalUrl={setCanonicalUrl}
          slug={slug}
        />
      )}
    </div>
  );
}

export default RankMathSeoBox;
