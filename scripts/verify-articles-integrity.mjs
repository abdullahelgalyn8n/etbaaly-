import fs from "node:fs";
import path from "node:path";

const files = [
  "data/blog/posts/postPackagingBoxes.ts",
  "data/blog/posts/postOffsetVsDigital.ts",
  "data/blog/posts/postStickersLabelsGuide.ts",
  "data/blog/posts/postPaperBagsGuide.ts",
  "data/blog/posts/postCorporateGiftsPromo.ts",
  "data/blog/posts/postSignageOutdoorGuide.ts",
  "data/blog/posts/postPrepressCmykGuide.ts",
  "data/blog/posts/postPrintFinishesLuxury.ts",
  "data/articles/part01.ts",
  "data/articles/part02.ts",
  "data/articles/part03.ts",
  "data/articles/part04.ts",
  "data/articles/part05.ts",
  "data/articles/part06.ts",
];

let totalArticles = 0;
let errors = [];

for (const f of files) {
  const content = fs.readFileSync(f, "utf-8");
  // Check for dead creative files
  if (content.includes("الملفات الإبداعية والتصميمات المرفقة") || content.includes(".psd") || content.includes("لوحة الكانفس")) {
    errors.push(`[${f}] Found dead creative files or psd references`);
  }

  // Find articles by slug
  const slugMatches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  totalArticles += slugMatches.length;

  // Check semantic clusters for duplicate links
  const clusterBlocks = content.split("## 🔗 شبكة الربط الدلالي والعناقيد");
  for (let i = 1; i < clusterBlocks.length; i++) {
    const block = clusterBlocks[i].slice(0, 1000);
    const pillarMatch = block.match(/\* \*\*المحور الرئيسي للعنقود[^*]+\*\*:?\s*\n\s*\[([^\]]+)\]\(([^)]+)\)/);
    const pillarUrl = pillarMatch ? pillarMatch[2].trim() : null;

    const sisterMatch = block.match(/\* \*\*مقالات شقيقة[^*]+\*\*:?([\s\S]*?)(?:\* \*\*|$)/);
    if (sisterMatch && pillarUrl) {
      const sisterContent = sisterMatch[1];
      const sisterLinks = [...sisterContent.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => m[2].trim());
      if (sisterLinks.includes(pillarUrl)) {
        errors.push(`[${f}] Cluster ${i} duplicates pillar link in sister spokes: ${pillarUrl}`);
      }
      const uniqueLinks = new Set(sisterLinks);
      if (uniqueLinks.size !== sisterLinks.length) {
        errors.push(`[${f}] Cluster ${i} contains duplicate sister links: ${sisterLinks}`);
      }
    }
  }
}

console.log(`Verified ${totalArticles} articles across ${files.length} files.`);
if (errors.length > 0) {
  console.error("FAILURES DETECTED:");
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("ALL ARTICLE CLUSTERS AND LINKS VERIFIED CLEAN!");
}
