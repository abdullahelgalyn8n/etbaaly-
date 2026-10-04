"use client";

import React from "react";
import { Star, MessageSquare, CheckCircle2, Send } from "lucide-react";

interface ProductAddReviewFormProps {
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
}

export function ProductAddReviewForm({
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
}: ProductAddReviewFormProps) {
  return (
    <form
      onSubmit={onAddReview}
      className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#c93b41]" />
          <span>أضف تقييمك ورأيك في المنتج</span>
        </h3>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setNewReviewRating(s)}
              className="text-lg cursor-pointer transition-transform hover:scale-125"
            >
              <Star
                className={`w-5 h-5 ${
                  s <= newReviewRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 dark:text-slate-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {reviewSubmitted && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>شكراً لك! تم إضافة تقييمك بنجاح.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="اسمك الكريم..."
          required
          value={newReviewAuthor}
          onChange={(e) => setNewReviewAuthor(e.target.value)}
          className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
        <input
          type="text"
          placeholder="المدينة / الشركة (اختياري)..."
          value={newReviewCompany}
          onChange={(e) => setNewReviewCompany(e.target.value)}
          className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      <textarea
        placeholder="اكتب تقييمك الصادق لجودة المنتج والخامات والطباعة..."
        rows={3}
        required
        value={newReviewText}
        onChange={(e) => setNewReviewText(e.target.value)}
        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
      />

      <button
        type="submit"
        className="px-6 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
      >
        <Send className="w-3.5 h-3.5" />
        <span>إرسال التقييم</span>
      </button>
    </form>
  );
}
