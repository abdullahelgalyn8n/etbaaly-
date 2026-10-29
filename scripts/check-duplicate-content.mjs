import fs from "node:fs";

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

const articles = [];

for (const f of files) {
  const content = fs.readFileSync(f, "utf-8");
  // extract content fields
  const matches = [...content.matchAll(/content:\s*`([\s\S]*?)`,\s*(?:isAction|tags|excerpt|seoTitle|focusKeyword|\}\;)/g)];
  const slugs = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  for (let i = 0; i < matches.length; i++) {
    articles.push({
      file: f,
      slug: slugs[i] ? slugs[i][1] : `unknown-${i}`,
      text: matches[i][1],
    });
  }
}

console.log(`Parsed ${articles.length} articles.`);

// Function to compute 5-word shingle similarity
function getShingles(text) {
  const words = text.replace(/[#*`_\[\]()\-:\n\r\t]/g, " ").split(/\s+/).filter(w => w.length > 2);
  const shingles = new Set();
  for (let i = 0; i < words.length - 4; i++) {
    shingles.add(words.slice(i, i + 5).join(" "));
  }
  return shingles;
}

const articleShingles = articles.map(a => ({ slug: a.slug, shingles: getShingles(a.text) }));

let highOverlap = 0;
for (let i = 0; i < articleShingles.length; i++) {
  for (let j = i + 1; j < articleShingles.length; j++) {
    const s1 = articleShingles[i].shingles;
    const s2 = articleShingles[j].shingles;
    let intersect = 0;
    for (const sh of s1) {
      if (s2.has(sh)) intersect++;
    }
    const union = s1.size + s2.size - intersect;
    const similarity = union > 0 ? (intersect / union) * 100 : 0;
    if (similarity > 20) {
      console.warn(`WARNING: High similarity (${similarity.toFixed(1)}%) between ${articleShingles[i].slug} and ${articleShingles[j].slug}`);
      highOverlap++;
    }
  }
}

if (highOverlap === 0) {
  console.log("EXCELLENT! All 20 articles have distinct, unique content (similarity < 20% across all pairs).");
} else {
  console.warn(`Found ${highOverlap} pairs with >20% duplicate text.`);
}
