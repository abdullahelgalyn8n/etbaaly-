"use client";

import { useState } from "react";
import { ReviewItem } from "./ProductReviewsTab";

const initialReviews: ReviewItem[] = [
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

export function useProductReviews() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
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
