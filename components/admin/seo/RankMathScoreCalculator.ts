import {
  SeoTestResult,
  SeoEvalContext,
  evaluateBasicTests,
  evaluateAdditionalTests,
  evaluateReadabilityTests,
} from "./seoEvaluators";

export type { SeoTestResult };

export interface SeoAnalysisReport {
  score: number;
  wordCount: number;
  readingTimeMinutes: number;
  keywordDensity: number;
  keywordCount: number;
  tests: SeoTestResult[];
}

export function analyzeRankMathSeo({
  title = "",
  content = "",
  excerpt = "",
  slug = "",
  focusKeyword = "",
  metaDescription = "",
}: {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  focusKeyword: string;
  metaDescription?: string;
}): SeoAnalysisReport {
  const kw = focusKeyword.trim().toLowerCase();
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  const lowerDesc = (metaDescription || excerpt || "").toLowerCase();
  const lowerSlug = slug.toLowerCase();

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 180));

  let keywordCount = 0;
  if (kw) {
    const regex = new RegExp(kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi");
    keywordCount = (lowerContent.match(regex) || []).length;
  }
  const keywordDensity = words > 0 && kw ? Number(((keywordCount / words) * 100).toFixed(2)) : 0;

  const ctx: SeoEvalContext = {
    kw,
    lowerTitle,
    lowerContent,
    lowerDesc,
    lowerSlug,
    title,
    content,
    words,
    keywordDensity,
    keywordCount,
  };

  const tests: SeoTestResult[] = [
    ...evaluateBasicTests(ctx),
    ...evaluateAdditionalTests(ctx),
    ...evaluateReadabilityTests(ctx),
  ];

  // Calculate total score
  const earned = tests.reduce(
    (acc, t) => acc + (t.passed ? t.points : t.warning ? Math.floor(t.points / 2) : 0),
    0
  );
  const maxPoints = tests.reduce((acc, t) => acc + t.points, 0);
  const score = Math.min(100, Math.max(0, Math.round((earned / maxPoints) * 100)));

  return {
    score,
    wordCount: words,
    readingTimeMinutes,
    keywordDensity,
    keywordCount,
    tests,
  };
}

export const calculateRankMathScore = analyzeRankMathSeo;
export default analyzeRankMathSeo;
