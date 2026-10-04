import React from "react";
import { Star } from "lucide-react";
import { AdminProduct } from "@/lib/db";
import ProductSpecsTab from "./ProductSpecsTab";
import ProductReviewsTab from "./ProductReviewsTab";
import ProductShippingTab from "./ProductShippingTab";

interface ProductTabsSectionProps {
  product: AdminProduct;
  activeTab: "specs" | "reviews" | "shipping";
  setActiveTab: (tab: "specs" | "reviews" | "shipping") => void;
  reviewsList: any[];
  handleAddReview: (e: React.FormEvent) => void;
  newReviewAuthor: string;
  setNewReviewAuthor: (v: string) => void;
  newReviewCompany: string;
  setNewReviewCompany: (v: string) => void;
  newReviewRating: number;
  setNewReviewRating: (v: number) => void;
  newReviewText: string;
  setNewReviewText: (v: string) => void;
  reviewSubmitted: boolean;
  handleHelpfulClick: (id: string) => void;
}

export function ProductTabsSection({
  product,
  activeTab,
  setActiveTab,
  reviewsList,
  handleAddReview,
  newReviewAuthor,
  setNewReviewAuthor,
  newReviewCompany,
  setNewReviewCompany,
  newReviewRating,
  setNewReviewRating,
  newReviewText,
  setNewReviewText,
  reviewSubmitted,
  handleHelpfulClick,
}: ProductTabsSectionProps) {
  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "specs"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          المواصفات الفنية الكاملة
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>تقييمات وآراء العملاء ({reviewsList.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "shipping"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          الشحن والتوصيل وضمان الكسر
        </button>
      </div>

      {activeTab === "specs" && <ProductSpecsTab product={product} />}
      {activeTab === "reviews" && (
        <ProductReviewsTab
          reviewsList={reviewsList}
          onAddReview={handleAddReview}
          newReviewAuthor={newReviewAuthor}
          setNewReviewAuthor={setNewReviewAuthor}
          newReviewCompany={newReviewCompany}
          setNewReviewCompany={setNewReviewCompany}
          newReviewRating={newReviewRating}
          setNewReviewRating={setNewReviewRating}
          newReviewText={newReviewText}
          setNewReviewText={setNewReviewText}
          reviewSubmitted={reviewSubmitted}
          onHelpfulClick={handleHelpfulClick}
        />
      )}
      {activeTab === "shipping" && <ProductShippingTab />}
    </div>
  );
}

export default ProductTabsSection;
