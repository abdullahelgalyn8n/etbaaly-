import { SeoTestResult, SeoEvalContext } from "./seoEvaluators";

export function evaluateReadabilityTests(ctx: SeoEvalContext): SeoTestResult[] {
  const { kw, lowerTitle, title, content, words } = ctx;
  const kwNearStart = Boolean(kw && lowerTitle.indexOf(kw) <= 25);
  const hasNumberInTitle = /\d+/.test(title);
  const powerWords = ["أفضل", "دليل", "شامل", "احترافي", "كيف", "طريقة", "أسرار", "مزايا", "مقارنة", "حصري"];
  const hasPowerWord = powerWords.some((pw) => title.includes(pw));

  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const avgParaWords = paragraphs.length > 0 ? words / paragraphs.length : 0;
  const goodParaLength = avgParaWords <= 80 && avgParaWords >= 15;
  const hasImagesOrMedia = /!\[.*\]\(.*\)|\.(png|jpe?g|webp|svg)|<img/i.test(content);

  return [
    {
      id: "title_start",
      category: "title",
      title: "الكلمة المفتاحية في بداية العنوان",
      passed: kwNearStart,
      description: kwNearStart
        ? "الكلمة المفتاحية تظهر في بداية العنوان، مما يعطيها أولوية كبرى في CTR."
        : "يفضل وضع الكلمة المفتاحية في أول 20 إلى 30 حرفاً من العنوان.",
      points: 5,
    },
    {
      id: "title_number",
      category: "title",
      title: "أرقام في العنوان لزيادة نسبة النقر (CTR)",
      passed: hasNumberInTitle,
      description: hasNumberInTitle
        ? "العنوان يحتوي على أرقام محددة تجذب انتباه القراء في نتائج البحث."
        : "إضافة أرقام (مثل: 7 نصائح، دليل 2026) ترفع نسبة النقر 36%.",
      points: 5,
    },
    {
      id: "title_power",
      category: "title",
      title: "كلمات جاذبة ومحفزة في العنوان (Power Words)",
      passed: hasPowerWord,
      description: hasPowerWord
        ? "العنوان يحتوي على كلمات دافعة وقوية تحفز على النقر والقراءة."
        : "أضف كلمة دافعة في العنوان مثل: (أفضل، دليل شامل، أسرار، احترافي).",
      points: 5,
    },
    {
      id: "para_length",
      category: "content",
      title: "قصر الفقرات وسهولة القراءة",
      passed: goodParaLength,
      description: goodParaLength
        ? "الفقرات مقسمة بشكل مريح للعين ومتوافقة مع قراء الهواتف المحمولة."
        : "قسّم النصوص الطويلة إلى فقرات أصغر (3 إلى 4 أسطر لكل فقرة).",
      points: 8,
    },
    {
      id: "media_presence",
      category: "content",
      title: "الوسائط والصور التوضيحية داخل المقال",
      passed: hasImagesOrMedia,
      description: hasImagesOrMedia
        ? "المحتوى يحتوي على صور ووسائط تعزز تجربة المستخدم وتثري النتائج."
        : "أضف صوراً توضيحية أو إنفوجرافيك أو أمثلة مصورة للمطبوعات داخل المقال.",
      points: 7,
    },
  ];
}
