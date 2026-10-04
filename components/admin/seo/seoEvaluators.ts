export interface SeoTestResult {
  id: string;
  category: "basic" | "additional" | "title" | "content";
  title: string;
  passed: boolean;
  warning?: boolean;
  description: string;
  points: number;
}

export interface SeoEvalContext {
  kw: string;
  lowerTitle: string;
  lowerContent: string;
  lowerDesc: string;
  lowerSlug: string;
  title: string;
  content: string;
  words: number;
  keywordDensity: number;
  keywordCount: number;
}

export function evaluateBasicTests(ctx: SeoEvalContext): SeoTestResult[] {
  const { kw, lowerTitle, lowerDesc, lowerSlug, lowerContent, words } = ctx;
  const kwInTitle = Boolean(kw && lowerTitle.includes(kw));
  const kwInDesc = Boolean(kw && lowerDesc.includes(kw));
  const kwInSlug = Boolean(kw && (lowerSlug.includes(kw) || kw.split(" ").some((w) => lowerSlug.includes(w))));
  const first10Percent = lowerContent.slice(0, Math.max(200, Math.floor(lowerContent.length * 0.15)));
  const kwInFirst10 = Boolean(kw && first10Percent.includes(kw));
  const hasLength = words >= 600;
  const isModerateLength = words >= 350;

  return [
    {
      id: "kw_title",
      category: "basic",
      title: "الكلمة المفتاحية في عنوان المقال",
      passed: kwInTitle,
      description: kwInTitle
        ? "رائع! الكلمة المفتاحية موجودة في العنوان الرئيسي."
        : "أضف الكلمة المفتاحية المستهدفة في عنوان المقال.",
      points: 10,
    },
    {
      id: "kw_desc",
      category: "basic",
      title: "الكلمة المفتاحية في وصف الميتا (Meta Description)",
      passed: kwInDesc,
      description: kwInDesc
        ? "ممتاز! الكلمة المفتاحية موجودة في وصف الميتا لجذب النقرات من Google."
        : "أضف الكلمة المفتاحية في وصف الميتا لتظهر بنص عريض في نتائج البحث.",
      points: 10,
    },
    {
      id: "kw_slug",
      category: "basic",
      title: "الكلمة المفتاحية في الرابط الدائم (URL / Slug)",
      passed: kwInSlug,
      description: kwInSlug
        ? "رابط المقال يحتوي على الكلمة المفتاحية المستهدفة."
        : "احرص على تضمين الكلمة أو مرادفها في رابط المقال (Slug).",
      points: 8,
    },
    {
      id: "kw_intro",
      category: "basic",
      title: "الكلمة المفتاحية في أول 10% من المحتوى (المقدمة)",
      passed: kwInFirst10,
      description: kwInFirst10
        ? "ظهرت الكلمة المفتاحية مبكراً في مقدمة المقال، مما يسرع فهرسة الروبوتات."
        : "اجعل الكلمة المفتاحية تظهر في أول فقرة من مقدمة المقال.",
      points: 6,
    },
    {
      id: "word_count",
      category: "basic",
      title: "طول المحتوى وعدد الكلمات",
      passed: hasLength,
      warning: !hasLength && isModerateLength,
      description: hasLength
        ? `طول ممتاز! المقال يحتوي على ${words} كلمة (الحد الموصى به 600+).`
        : `المقال يحتوي على ${words} كلمة. ننصح بزيادة المحتوى إلى 600 كلمة على الأقل لتعزيز الصدارة.`,
      points: 6,
    },
  ];
}

export function evaluateAdditionalTests(ctx: SeoEvalContext): SeoTestResult[] {
  const { kw, content, lowerContent, keywordDensity, keywordCount } = ctx;
  const hasSubheadings = /##\s+|###\s+|<h[234]/i.test(content);
  const kwInSubheading = Boolean(
    kw &&
      hasSubheadings &&
      (lowerContent.includes(`## ${kw}`) ||
        lowerContent.includes(`### ${kw}`) ||
        (lowerContent.match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi) || []).some((h) => h.toLowerCase().includes(kw)))
  );
  const optimalDensity = keywordDensity >= 0.8 && keywordDensity <= 3.0;
  const hasOutboundLinks = /https?:\/\/(?!etbaaly\.com)[^\s)]+/i.test(content);
  const hasInternalLinks =
    /\/(services|products|configurator|about|contact|blog|track)/i.test(content) || /\[.*\]\(\/.*\)/.test(content);

  return [
    {
      id: "kw_subheading",
      category: "additional",
      title: "الكلمة المفتاحية في العناوين الفرعية (H2, H3)",
      passed: kwInSubheading || hasSubheadings,
      warning: hasSubheadings && !kwInSubheading,
      description: kwInSubheading
        ? "تم توزيع الكلمة المفتاحية في العناوين الفرعية بنجاح."
        : hasSubheadings
        ? "توجد ترويسات فرعية لكن يفضل إدراج الكلمة المفتاحية في إحداها."
        : "أضف ترويسات فرعية (H2, H3) لتقسيم المحتوى وتنظيمه لمحركات البحث.",
      points: 8,
    },
    {
      id: "kw_density",
      category: "additional",
      title: `كثافة الكلمة المفتاحية (${keywordDensity}%)`,
      passed: optimalDensity,
      warning: keywordDensity > 3.0,
      description: optimalDensity
        ? `كثافة الكلمة المفتاحية ممتازة (${keywordDensity}%) وتتكرر ${keywordCount} مرات.`
        : keywordDensity > 3.0
        ? `تحذير حشو كلمات: الكثافة مرتفعة (${keywordDensity}%). خفف تكرار الكلمة لتجنب عقوبات المحركات.`
        : `كثافة الكلمة منخفضة (${keywordDensity}%). احرص على تكرار الكلمة بسلاسة داخل النص.`,
      points: 7,
    },
    {
      id: "outbound_links",
      category: "additional",
      title: "روابط خارجية لمصادر موثوقة (Outbound Links)",
      passed: hasOutboundLinks,
      description: hasOutboundLinks
        ? "المقال يحتوي على مراجع وروابط خارجية تعزز مصداقية E-E-A-T."
        : "أضف رابطاً خارجياً لمصدر رسمي أو دراسة موثوقة.",
      points: 7,
    },
    {
      id: "internal_links",
      category: "additional",
      title: "روابط داخلية لخدمات ومنتجات مطبعة إطبعلي",
      passed: hasInternalLinks,
      description: hasInternalLinks
        ? "ممتاز! المقال يربط القارئ بخدمات ومنتجات الموقع الداخلية لخفض معدل الارتداد."
        : "أضف روابط داخلية لخدمات مطبعة إطبعلي (مثل التغليف، الأوفست، الهدايا).",
      points: 8,
    },
  ];
}

export { evaluateReadabilityTests } from "./seoReadabilityEvaluator";

