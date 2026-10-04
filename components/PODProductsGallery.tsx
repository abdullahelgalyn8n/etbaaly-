"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Clock,
  Layers,
  Image as ImageIcon,
  Box,
  MessageSquare,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { initialAdminProducts, AdminProduct } from "@/lib/db";
import { siteConfig } from "@/data/siteConfig";
import StickerMuleVisualCategoryBar from "@/components/StickerMuleVisualCategoryBar";

// Sub-category definitions for each top-level category
const subCategoryMap: Record<
  string,
  { id: string; name: string; tag?: string }[]
> = {
  استيكرات: [
    { id: "all", name: "كافة الاستيكرات" },
    { id: "قص مخصص وداي-كت", name: "قص مخصص وداي-كت (Die-Cut & Sheets)" },
    { id: "خامات خاصة وهولوجرام", name: "خامات خاصة وهولوجرام (Specialty & Hologram)" },
    { id: "أشكال هندسية وقياسية", name: "أشكال قياسية (دائري/مربع/مستطيل)" },
    { id: "سيارات وزجاج وواجهات", name: "سيارات وزجاج ومتاجر (Automotive & Windows)" },
    { id: "باقات وتوفير كميات", name: "باقات وتوفير كميات (Packs & Bulk)" },
  ],
  "تجهيزات مكاتب ويافط": [
    { id: "all", name: "كافة تجهيزات المكاتب" },
    { id: "يافطات مكاتب 3D", name: "يافطات ولوحات مكاتب" },
    { id: "لوحات إرشادية للمباني", name: "لوحات ويافط إرشادية" },
    { id: "ميداليات ودلايات", name: "دلايات وتشارمز أكريليك" },
  ],
  "علب وتغليف": [
    { id: "all", name: "كافة منتجات التغليف" },
    { id: "أشرطة لاصقة وتيب", name: "شريط لاصق وتيب مطبوع" },
    { id: "أظرف وأكياس شحن", name: "أظرف وأكياس بولي ميلر" },
    { id: "أكياس ستاند باوتش", name: "أكياس ستاند باوتش للأغذية" },
    { id: "أدوات وموزعات", name: "حامل وموزع رول الليبل" },
  ],
  "هدايا شخصية وحفر ليزر": [
    { id: "all", name: "كافة الهدايا والبادجات" },
    { id: "بادجات وبروشات", name: "بادجات ودبابيس معدنية وأكريليك" },
    { id: "مغناطيس وتذكارات", name: "مغناطيس وتذكارات وصوصات" },
    { id: "كوسترات وأدوات ضيافة", name: "كوسترات أكواب كرتونية (Coasters)" },
    { id: "ميداليات باركود QR", name: "ميداليات وبطاقات هدايا Gift Cards" },
  ],
  "ملابس وهوديز": [
    { id: "all", name: "كافة الملابس والهوديز" },
    { id: "هوديز وسويت شيرت", name: "هوديز وسويت شيرت (Oversized Hoodies)" },
    { id: "تيشيرتات وبولو", name: "تيشيرتات قطن وأوفر سايز (T-Shirts)" },
    { id: "كابات وإكسسوارات", name: "كابات وقبعات مطرزة (Hats & Caps)" },
    { id: "طباعة واستيكرات DTF", name: "شيتات ترانسفير DTF (Apparel Transfers)" },
  ],
};

export default function PODProductsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<AdminProduct[]>(initialAdminProducts);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products?status=published");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadProducts();
  }, []);

  // Reset subcategory when primary category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory("all");
  };

  // Active subcategories list
  const activeSubCategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    return subCategoryMap[selectedCategory] || [];
  }, [selectedCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.status !== "published") return false;

      // Category match
      const matchCat =
        selectedCategory === "all" ||
        p.category === selectedCategory ||
        p.categorySlug === selectedCategory;
      if (!matchCat) return false;

      // Sub-category match
      if (selectedSubCategory !== "all") {
        const matchSub =
          p.subCategory === selectedSubCategory ||
          p.subCategorySlug === selectedSubCategory ||
          (p.title && p.title.includes(selectedSubCategory)) ||
          (p.description && p.description.includes(selectedSubCategory));
        if (!matchSub) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = p.description?.toLowerCase().includes(q);
        const inCat = p.category?.toLowerCase().includes(q);
        const inSub = p.subCategory?.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCat && !inSub) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* 1. Primary 3D Visual Category Selector Strip */}
      <StickerMuleVisualCategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* 2. Secondary Subcategory Pills & Search Bar */}
      <div className="bg-slate-50 dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search & Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن منتج (داي كت، هولوجرام، يافطة، ختم...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-10 py-2 rounded-2xl bg-white dark:bg-[#16171b] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#c93b41]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Counter and Reset */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                المنتجات المتاحة:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#c93b41]/10 text-[#c93b41] font-mono text-xs font-black">
                {filteredProducts.length} خيار
              </span>
            </div>

            {(selectedCategory !== "all" ||
              selectedSubCategory !== "all" ||
              searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSubCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#c93b41] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>إعادة ضبط ↺</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Sub-Category Tabs if a specific category is active */}
        {activeSubCategories.length > 0 && (
          <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              تصنيفات وخامات {selectedCategory}:
            </span>
            {activeSubCategories.map((sub) => {
              const isSubActive = selectedSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubCategory(sub.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSubActive
                      ? "bg-[#c93b41] text-white shadow-md scale-105"
                      : "bg-white dark:bg-[#16171b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]"
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#1a1c22] border border-slate-200 dark:border-white/[0.08] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            لم يتم العثور على منتجات مطابقة
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            جرب اختيار قسم آخر أو تعديل كلمة البحث لعرض كافة خيارات الاستيكرات، التغليف، والهدايا.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedSubCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold shadow-md cursor-pointer"
          >
            عرض كافة المنتجات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-[#1e2026] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#c93b41]/50 rounded-3xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Container with Real Cutout Photo */}
                <Link
                  href={`/products/${product.slug || product.id}/`}
                  className="relative aspect-[4/3] w-full bg-[#ECEAE6] dark:bg-[#15161a] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.05] flex items-center justify-center transition-all block cursor-pointer group-hover:bg-[#E4E2DC] dark:group-hover:bg-[#1a1c22]"
                >
                  {/* Product Image */}
                  {product.image ||
                  product.colors[0]?.images?.[0] ||
                  (product.colors[0]?.mockupOverlay?.startsWith("/")
                    ? product.colors[0]?.mockupOverlay
                    : null) ? (
                    <img
                      src={
                        product.image ||
                        product.colors[0]?.images?.[0] ||
                        product.colors[0]?.mockupOverlay
                      }
                      alt={product.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
                    />
                  ) : (
                    <div
                      className="w-32 h-36 rounded-2xl shadow-xl flex items-center justify-center p-2 border border-black/10"
                      style={{
                        background:
                          product.colors[0]?.bgStyle ||
                          product.colors[0]?.hex ||
                          "#FFFFFF",
                      }}
                    >
                      <div className="w-20 h-20 rounded-xl bg-black/10 dark:bg-white/10 border border-dashed border-white/40 flex flex-col items-center justify-center p-1 text-center">
                        <ImageIcon className="w-5 h-5 text-[#c93b41]" />
                        <span className="text-[9px] font-bold text-slate-800 dark:text-white leading-tight mt-0.5">
                          {product.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Top Badge: Category or SubCategory */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[#c93b41] text-[10px] font-bold shadow-xs">
                      {product.subCategory || product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[9px] font-black shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Turnaround Pill */}
                  <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] text-white font-mono flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{product.turnaround}</span>
                  </span>

                  {/* Gallery Photos Count Indicator */}
                  {product.colors[0]?.images &&
                    product.colors[0].images.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-white font-mono flex items-center gap-1 shadow-xs">
                        <ImageIcon className="w-3 h-3 text-amber-300" />
                        <span>{product.colors[0].images.length} صور</span>
                      </span>
                    )}
                </Link>

                {/* Title & Info */}
                <div className="mt-4 space-y-1.5">
                  <Link
                    href={`/products/${product.slug || product.id}/`}
                    className="block group-hover:text-[#c93b41] transition-colors"
                  >
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price & Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold">
                    يبدأ من:
                  </span>
                  <div className="text-base sm:text-lg font-black font-mono text-[#c93b41]">
                    {product.basePrice}{" "}
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      ج.م
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/products/${product.slug || product.id}/`}
                    className="px-3.5 py-2 rounded-xl btn-crimson text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                    title="فتح صفحة طلب المنتج ومعاينة الصور الواقعية"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>طلب المنتج ➔</span>
                  </Link>
                  <a
                    href={`${siteConfig.social.whatsapp}?text=${encodeURIComponent(
                      `مرحباً إطبعلي، أود الاستفسار وطلب منتج: ${product.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-[#16171b] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 border border-slate-200 dark:border-white/[0.08] transition-colors"
                    title="طلب واستفسار واتساب"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
