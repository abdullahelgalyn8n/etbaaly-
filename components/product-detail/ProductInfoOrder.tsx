"use client";

import React, { useState } from "react";
import {
  Palette,
  Star,
  CheckCircle2,
  Check,
  ShieldCheck,
  Zap,
  Flame,
  Scissors,
  Package,
  Sparkles,
} from "lucide-react";
import { AdminProduct, ProductColor } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { ProductOrderActionBox } from "./ProductOrderActionBox";

interface ProductInfoOrderProps {
  product: AdminProduct;
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  unitPrice: number;
  originalPrice: number;
  totalPrice: number;
  whatsappUrl: string;
  reviewsCount: number;
}

export default function ProductInfoOrder({
  product,
  selectedColor,
  onColorChange,
  quantity,
  setQuantity,
  unitPrice,
  originalPrice,
  totalPrice,
  whatsappUrl,
  reviewsCount,
}: ProductInfoOrderProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addItem } = useCart();

  // Active product image for modal
  const activeProductImage =
    selectedColor.images?.[0] ||
    selectedColor.mockupOverlay ||
    product.colors?.[0]?.images?.[0] ||
    product.colors?.[0]?.mockupOverlay ||
    product.image ||
    "/images/products/mugs/green/Free_Mug_Mockup_1.jpg";

  const handleAddToCart = () => {
    addItem({
      productId: product.id || product.slug,
      slug: product.slug || product.id,
      title: product.title,
      image: activeProductImage,
      price: unitPrice,
      originalPrice,
      quantity,
      category: product.category,
      selectedColor: {
        id: selectedColor.id,
        name: selectedColor.name,
        hex: selectedColor.hex,
        priceAdd: selectedColor.priceAdd,
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2200);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-sm space-y-6">
        {/* 1. Header Badges & Rating */}
        <div className="space-y-3 border-b border-slate-100 dark:border-white/[0.06] pb-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/40 text-[#c93b41] border border-red-200 dark:border-red-900/50">
                {product.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>متاح للتسليم السريع</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                ({reviewsCount * 48}+ تقييم معتمد)
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {product.title}
          </h1>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 pt-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-[#c93b41]">
              {unitPrice}{" "}
              <span className="text-sm font-bold text-slate-900 dark:text-white font-sans">ج.م</span>
            </div>
            <div className="text-sm font-bold text-slate-400 line-through font-mono">
              {originalPrice} ج.م
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              وفر 20% لفترة محدودة
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            شامل ضريبة القيمة المضافة • متاح للطلب الفردي وبالكميات مع شحن مخصص
          </p>
        </div>

        {/* 2. Color Palette Selector */}
        {product.colors && product.colors.length > 1 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#c93b41]" />
                <span>اللون والخامة المحددة:</span>
              </span>
              <span className="text-[#c93b41] font-bold">
                {selectedColor.name}
                {selectedColor.priceAdd ? ` (+${selectedColor.priceAdd} ج.م)` : ""}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor.id === c.id;
                const isLight =
                  !c.hex ||
                  c.hex.toLowerCase() === "#ffffff" ||
                  c.hex.toLowerCase() === "#fff" ||
                  (c.bgStyle && c.bgStyle.toLowerCase().includes("#ffffff"));

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onColorChange(c)}
                    className={`relative p-1 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-[#c93b41] ring-offset-2 dark:ring-offset-[#202227] scale-110 shadow-md"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-8 h-8 rounded-full block border border-slate-300 dark:border-white/20 shadow-inner"
                      style={{ background: c.bgStyle || c.hex }}
                    />
                    {isSelected && (
                      <Check
                        className={`w-3.5 h-3.5 absolute inset-0 m-auto drop-shadow-md ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-bold p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200/80 dark:border-white/[0.06]">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Palette className="w-4 h-4 text-[#c93b41]" />
              <span>الخامة والتشطيب:</span>
            </span>
            <span className="text-slate-900 dark:text-white font-bold bg-white dark:bg-[#24272d] px-3 py-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs">
              {selectedColor?.name || "الخامة القياسية الأصلية"}
            </span>
          </div>
        )}

        {/* 3. Product Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>تفاصيل وخامات المنتج:</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* 4. Luxury Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(() => {
            const cat = (product.category || "").toLowerCase();
            const sub = (product.subCategory || "").toLowerCase();
            const title = (product.title || "").toLowerCase();

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

            const highlights = isSticker
              ? [
                  {
                    icon: ShieldCheck,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "فينيل لاصق مقاوم للماء والخدش والشمس",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "طباعة ألوان Ultra HD بدقة 300 DPI",
                  },
                  {
                    icon: Scissors,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "قص ليزر داي-كت فائق الدقة بالمللي",
                  },
                  {
                    icon: CheckCircle2,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "سهولة فك وسلخ بدون أي أثر صمغي",
                  },
                ]
              : isApparel
              ? [
                  {
                    icon: CheckCircle2,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "قطن مصري طبيعي 100% معالج ضد الانكماش",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "طباعة DTF أصلية متينة ومقاومة للغسيل",
                  },
                  {
                    icon: Sparkles,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "خياطة مزدوجة معززة وقصة مريحة ممتازة",
                  },
                  {
                    icon: Package,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "تغليف فردي معقم مع باركود المقاس المعتمد",
                  },
                ]
              : isPackaging
              ? [
                  {
                    icon: Package,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "كرتون صلب عالي المتانة ومقاوم لثني الشحن",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "طباعة أوفست فوتوغرافية مع سيلوفان فاخر",
                  },
                  {
                    icon: Sparkles,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "تصميم ذكي سريع الطي والتجميع بدون هدر",
                  },
                  {
                    icon: ShieldCheck,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "شحن مفرود آمن ومحمي لتوفير مساحة التخزين",
                  },
                ]
              : isOffice
              ? [
                  {
                    icon: ShieldCheck,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "أكريليك كريستال نقي أو خشب طبيعي معالج",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "قص وتفريغ 3D فائق الدقة وتشطيب ناعم",
                  },
                  {
                    icon: Sparkles,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "ألوان ثابتة ومقاومة للبهتان والشمس والخدش",
                  },
                  {
                    icon: Package,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "تغليف فوم هوائي عازل لحماية الحواف والزوايا",
                  },
                ]
              : isMug
              ? [
                  {
                    icon: CheckCircle2,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "بورسلين حراري فندقي ممتاز (330 مل)",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "طباعة ألوان Ultra HD بدقة 300 DPI",
                  },
                  {
                    icon: Flame,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "آمن داخل غسالة الأطباق والمايكروويف",
                  },
                  {
                    icon: ShieldCheck,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "تغليف كرتوني مقوى عازل لحماية الشحن",
                  },
                ]
              : [
                  {
                    icon: CheckCircle2,
                    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    text: "خامات تصنيع أصلية معتمدة بأعلى معايير الجودة",
                  },
                  {
                    icon: Zap,
                    colorClass: "bg-red-500/10 text-[#c93b41]",
                    text: "طباعة ألوان Ultra HD بدقة 300 DPI",
                  },
                  {
                    icon: ShieldCheck,
                    colorClass: "bg-amber-500/10 text-amber-500",
                    text: "فحص جودة يدوي دقيق لكل قطعة قبل التجهيز",
                  },
                  {
                    icon: Package,
                    colorClass: "bg-blue-500/10 text-blue-500",
                    text: "تغليف وقائي معتمد لضمان سلامة الشحن والتسليم",
                  },
                ];

            return highlights.map((h, i) => {
              const IconComp = h.icon;
              return (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-2.5"
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${h.colorClass}`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {h.text}
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* 5. Quantity & Order / WhatsApp Action Box */}
        <ProductOrderActionBox
          productId={product.id || product.slug}
          quantity={quantity}
          setQuantity={setQuantity}
          unitPrice={unitPrice}
          totalPrice={totalPrice}
          whatsappUrl={whatsappUrl}
          onAddToCart={handleAddToCart}
          isAdded={isAddedToCart}
        />
      </div>
    </>
  );
}
