"use client";

import React from "react";
import { User, Check, ThumbsUp } from "lucide-react";
import { ProductAddReviewForm } from "./ProductAddReviewForm";

export interface ReviewItem {
  id: string;
  author: string;
  company: string;
  rating: number;
  date: string;
  verified: boolean;
  text: string;
  helpfulCount: number;
}

interface ProductReviewsTabProps {
  reviewsList: ReviewItem[];
  onAddReview: (e: React.FormEvent) => void;
  newReviewAuthor: string;
  setNewReviewAuthor: (v: string) => void;
  newReviewCompany: string;
  setNewReviewCompany: (v: string) => void;
  newReviewRating: number;
  setNewReviewRating: (v: number) => void;
  newReviewText: string;
  setNewReviewText: (v: string) => void;
  reviewSubmitted: boolean;
  onHelpfulClick: (id: string) => void;
}

export default function ProductReviewsTab({
  reviewsList,
  onAddReview,
  newReviewAuthor,
  setNewReviewAuthor,
  newReviewCompany,
  setNewReviewCompany,
  newReviewRating,
  setNewReviewRating,
  newReviewText,
  setNewReviewText,
  reviewSubmitted,
  onHelpfulClick,
}: ProductReviewsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Reviews Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="text-center md:text-right space-y-1">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono flex items-center justify-center md:justify-start gap-2">
            <span>4.9</span>
            <div className="flex text-amber-400 text-xl">{"★".repeat(5)}</div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
            متوسط التقييم العام بناءً على تجارب مشتريات حقيقية
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-bold">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.06] text-center">
            <span className="text-[#c93b41] block text-base font-black">99%</span>
            <span className="text-slate-500">مطابقة الألوان والصور</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.06] text-center">
            <span className="text-emerald-500 block text-base font-black">100%</span>
            <span className="text-slate-500">سلامة التغليف ضد الكسر</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.06] text-center">
            <span className="text-blue-500 block text-base font-black">98%</span>
            <span className="text-slate-500">سرعة التوصيل</span>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <ProductAddReviewForm
        onAddReview={onAddReview}
        newReviewAuthor={newReviewAuthor}
        setNewReviewAuthor={setNewReviewAuthor}
        newReviewCompany={newReviewCompany}
        setNewReviewCompany={setNewReviewCompany}
        newReviewRating={newReviewRating}
        setNewReviewRating={setNewReviewRating}
        newReviewText={newReviewText}
        setNewReviewText={setNewReviewText}
        reviewSubmitted={reviewSubmitted}
      />

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#18191d] text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  <User className="w-4 h-4 text-[#c93b41]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>مشتري موثق</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {rev.company} • {rev.date}
                  </div>
                </div>
              </div>

              <div className="flex text-amber-400 text-sm">
                {"★".repeat(rev.rating)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {rev.text}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              <span>تم التحقق من مطابقة المنتج مع الفاتورة الرسمية</span>
              <button
                type="button"
                onClick={() => onHelpfulClick(rev.id)}
                className="flex items-center gap-1 text-slate-500 hover:text-[#c93b41] cursor-pointer transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>مفيد ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
