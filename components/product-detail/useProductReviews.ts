"use client";

import { useState, useMemo } from "react";
import { ReviewItem } from "./ProductReviewsTab";
import { AdminProduct } from "@/lib/db";

function getInitialReviews(product?: AdminProduct): ReviewItem[] {
  const cat = (product?.category || "").toLowerCase();
  const sub = (product?.subCategory || "").toLowerCase();
  const title = (product?.title || "").toLowerCase();

  const isSticker =
    cat.includes("استيكر") ||
    cat.includes("ستيكر") ||
    sub.includes("استيكر") ||
    sub.includes("داي-كت");
  const isApparel =
    cat.includes("ملابس") ||
    cat.includes("هوديز") ||
    sub.includes("تيشيرت") ||
    sub.includes("كابات");
  const isPackaging =
    cat.includes("علب") ||
    cat.includes("تغليف") ||
    sub.includes("علب") ||
    sub.includes("أكياس") ||
    sub.includes("باوتش");
  const isOffice =
    cat.includes("مكاتب") ||
    cat.includes("يافط") ||
    sub.includes("يافط") ||
    sub.includes("أكريليك") ||
    sub.includes("لوحات");
  const isMug =
    title.includes("مج") ||
    title.includes("كوب") ||
    sub.includes("كوستر");

  if (isSticker) {
    return [
      {
        id: "rev-1",
        author: "م. طارق العسلي",
        company: "المدير التنفيذي - شركة فيجن للاستشارات",
        rating: 5,
        date: "منذ 3 أيام",
        verified: true,
        text: "جودة الاستيكرات وتشطيب الألوان فاق التوقعات! القص بالمللي والتفريغ سلس بدون أي تمزق، وتشبع الألوان زاهي جداً ومطابق لملف التصميم. تم تسليم الشحنة في الموعد المحدد.",
        helpfulCount: 24,
      },
      {
        id: "rev-2",
        author: "أ. نورهان الشناوي",
        company: "مسؤولة المشتريات - براند لوسيندا",
        rating: 5,
        date: "منذ أسبوع",
        verified: true,
        text: "الفينيل ممتاز ومقاوم للماء والاحتكاك فعلياً، استخدمناها كملصقات لمنتجاتنا وثبات اللاصق قوي بدون ما يترك أي أثر صمغي عند الإزالة.",
        helpfulCount: 18,
      },
      {
        id: "rev-3",
        author: "م. كريم عبد الفتاح",
        company: "أكتوبر - الجيزة",
        rating: 5,
        date: "منذ أسبوعين",
        verified: true,
        text: "طلبت كمية للبراند، التعامل راقي والتنفيذ سريع جداً، وجودة الطباعة الدقيقة 300 DPI ظهرت بوضوح في التفاصيل الصغيرة.",
        helpfulCount: 12,
      },
    ];
  }

  if (isApparel) {
    return [
      {
        id: "rev-1",
        author: "م. طارق العسلي",
        company: "المدير التنفيذي - شركة فيجن للاستشارات",
        rating: 5,
        date: "منذ 3 أيام",
        verified: true,
        text: "خامة القطن ممتازة وثقيلة، والطباعة DTF بارزة وواضحة ولا تتأثر بالغسيل المتكرر. المقاسات مضبوطة تماماً والتسليم كان سريعاً.",
        helpfulCount: 21,
      },
      {
        id: "rev-2",
        author: "أ. نورهان الشناوي",
        company: "مسؤولة المشتريات - براند لوسيندا",
        rating: 5,
        date: "منذ أسبوع",
        verified: true,
        text: "طلبنا يونيفورم وتيشيرتات للشركة والجميع أشاد بجودة الخامات والألوان الزاهية. التغليف الفردي بالباركود سهل علينا التوزيع جداً.",
        helpfulCount: 19,
      },
      {
        id: "rev-3",
        author: "م. كريم عبد الفتاح",
        company: "أكتوبر - الجيزة",
        rating: 5,
        date: "منذ أسبوعين",
        verified: true,
        text: "التقفيل ممتاز والخياطة متينة جداً، والطباعة مطابقة 100% للتصميم المرفق.",
        helpfulCount: 11,
      },
    ];
  }

  if (isPackaging) {
    return [
      {
        id: "rev-1",
        author: "م. طارق العسلي",
        company: "المدير التنفيذي - شركة فيجن للاستشارات",
        rating: 5,
        date: "منذ 3 أيام",
        verified: true,
        text: "خامة الكرتون صلبة ومتينة، والتقفيل والسيلوفان ممتاز جداً بدون أي عيوب ثني. حسنت من مظهر شحنات متجرنا بشكل ملحوظ.",
        helpfulCount: 22,
      },
      {
        id: "rev-2",
        author: "أ. نورهان الشناوي",
        company: "مسؤولة المشتريات - براند لوسيندا",
        rating: 5,
        date: "منذ أسبوع",
        verified: true,
        text: "الطباعة أوفست فوتوغرافية واضحة جداً، والشحن المفرود ساعدنا في توفير مساحة التخزين وسهل عملية التجميع.",
        helpfulCount: 16,
      },
      {
        id: "rev-3",
        author: "م. كريم عبد الفتاح",
        company: "أكتوبر - الجيزة",
        rating: 5,
        date: "منذ أسبوعين",
        verified: true,
        text: "دقة المقاسات وثبات التقفيل احترافي. شكراً مطابع إطبعلي على الجودة العالية.",
        helpfulCount: 14,
      },
    ];
  }

  if (isOffice) {
    return [
      {
        id: "rev-1",
        author: "م. طارق العسلي",
        company: "المدير التنفيذي - شركة فيجن للاستشارات",
        rating: 5,
        date: "منذ 3 أيام",
        verified: true,
        text: "تقطيع الليزر في الأكريليك ناعم جداً ومفيش أي أثر للحرق، وقواعد التثبيت محكمة وأنيقة جداً في واجهة الشركة.",
        helpfulCount: 20,
      },
      {
        id: "rev-2",
        author: "أ. نورهان الشناوي",
        company: "مسؤولة المشتريات - براند لوسيندا",
        rating: 5,
        date: "منذ أسبوع",
        verified: true,
        text: "الألوان ثابتة وتشطيب الحواف كريستالي فاخر، وصل المنتج محمي بطبقات فوم عازلة بدون أي خدش.",
        helpfulCount: 17,
      },
      {
        id: "rev-3",
        author: "م. كريم عبد الفتاح",
        company: "أكتوبر - الجيزة",
        rating: 5,
        date: "منذ أسبوعين",
        verified: true,
        text: "شغل احترافي يليق بالمكاتب والشركات، والأبعاد واللوجو مطابق تماماً للملف المرسل.",
        helpfulCount: 13,
      },
    ];
  }

  if (isMug) {
    return [
      {
        id: "rev-1",
        author: "م. طارق العسلي",
        company: "المدير التنفيذي - شركة فيجن للاستشارات",
        rating: 5,
        date: "منذ 3 أيام",
        verified: true,
        text: "جودة المج وتشطيب الألوان فاق التوقعات! البورسلين وزنه ممتاز والقلب الملون زاهي جداً ومطابق تماماً للصور. تم تسليم الشحنة في الموعد المحدد مع تغليف متين.",
        helpfulCount: 24,
      },
      {
        id: "rev-2",
        author: "أ. نورهان الشناوي",
        company: "مسؤولة المشتريات - براند لوسيندا",
        rating: 5,
        date: "منذ أسبوع",
        verified: true,
        text: "الطباعة ثابتة جداً ولا تتأثر بالغسيل اليومي أو المايكروويف. اشترينا كمية للشركة والجميع أشاد بجودة الخامات والألوان الزاهية.",
        helpfulCount: 18,
      },
      {
        id: "rev-3",
        author: "م. كريم عبد الفتاح",
        company: "أكتوبر - الجيزة",
        rating: 5,
        date: "منذ أسبوعين",
        verified: true,
        text: "طلبت المج كهدية، التعامل راقي والتنفيذ سريع، والصور المعروضة في الموقع حقيقية ومطابقة 100% للمنتج المستلم.",
        helpfulCount: 12,
      },
    ];
  }

  return [
    {
      id: "rev-1",
      author: "م. طارق العسلي",
      company: "المدير التنفيذي - شركة فيجن للاستشارات",
      rating: 5,
      date: "منذ 3 أيام",
      verified: true,
      text: "جودة المنتج والطباعة فاقت التوقعات! دقة الألوان وتشطيب الخامات عالي الجودة ومطابق للتصميم المرسل. تم التسليم في الموعد المحدد مع تغليف متين.",
      helpfulCount: 24,
    },
    {
      id: "rev-2",
      author: "أ. نورهان الشناوي",
      company: "مسؤولة المشتريات - براند لوسيندا",
      rating: 5,
      date: "منذ أسبوع",
      verified: true,
      text: "تعامل راقي وسرعة في الرد والتجهيز. الخامات متينة وتتحمل الاستخدام المكثف، وسنعاود الطلب بالتأكيد.",
      helpfulCount: 18,
    },
    {
      id: "rev-3",
      author: "م. كريم عبد الفتاح",
      company: "أكتوبر - الجيزة",
      rating: 5,
      date: "منذ أسبوعين",
      verified: true,
      text: "التنفيذ احترافي وسريع، والصور المعروضة في الموقع واقعية ومطابقة 100% للمنتج المستلم.",
      helpfulCount: 12,
    },
  ];
}

export function useProductReviews(product?: AdminProduct) {
  const initialData = useMemo(
    () => getInitialReviews(product),
    [product?.category, product?.title, product?.subCategory]
  );
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialData);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewCompany, setNewReviewCompany] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      company: newReviewCompany || "عميل موثق",
      rating: newReviewRating,
      date: "الآن",
      verified: true,
      text: newReviewText,
      helpfulCount: 0,
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor("");
    setNewReviewCompany("");
    setNewReviewText("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  const handleHelpfulClick = (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  return {
    reviewsList,
    newReviewAuthor,
    setNewReviewAuthor,
    newReviewCompany,
    setNewReviewCompany,
    newReviewRating,
    setNewReviewRating,
    newReviewText,
    setNewReviewText,
    reviewSubmitted,
    handleAddReview,
    handleHelpfulClick,
  };
}
