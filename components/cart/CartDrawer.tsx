"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import NumericQuantityInput from "@/components/ui/NumericQuantityInput";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    totalPrice,
    freeShippingThreshold,
    remainingForFreeShipping,
    clearCart,
  } = useCart();

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-[9999] flex justify-start select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#18191d] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-white/[0.08] animate-in slide-in-from-right duration-300">
        {/* 1. Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/80 dark:bg-[#141518]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#c93b41] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>سلة المشتريات</span>
                <span className="text-xs px-2 py-0.2 rounded-full bg-[#c93b41]/10 text-[#c93b41] font-mono">
                  {items.length}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                مراجعة وتأكيد الكميات والخيارات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Free Shipping Progress Bar */}
        <div className="p-4 bg-slate-50/50 dark:bg-[#151619] border-b border-slate-100 dark:border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#c93b41]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  مبروك! شحن مجاني متاح لطلبك الآن
                </span>
              ) : (
                <span>
                  أضف <strong className="font-mono text-[#c93b41]">{remainingForFreeShipping} ج.م</strong> للحصول على شحن مجاني
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-slate-400">{freeShippingProgress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-white/[0.1] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-red-500 to-[#c93b41]"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 3. Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-[#202227] text-slate-400 flex items-center justify-center border border-slate-200 dark:border-white/[0.08]">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  سلة التسوق فارغة حالياً
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  لم تقم بإضافة أي منتجات إلى سلتك بعد. استكشف كتالوج المنتجات المميزة وابدأ طلبك الآن.
                </p>
              </div>
              <Link
                href="/products/"
                onClick={closeCart}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>تصفح معرض المنتجات</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#202227] border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-3 relative group"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#151619] p-1 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h5>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                      title="حذف المنتج من السلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Color pill if present */}
                  {item.selectedColor && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-white/20"
                        style={{ background: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </div>
                  )}

                  {/* Selected Options Badges */}
                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {Object.entries(item.selectedOptions).map(([key, val]) => (
                        <span
                          key={key}
                          className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {key}: {val}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Custom Notes */}
                  {item.customNotes && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                      {item.customNotes}
                    </p>
                  )}

                  {/* Quantity Stepper & Item Total */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-xl p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer"
                        title="تقليل الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <NumericQuantityInput
                        value={item.quantity}
                        onChange={(newQty) => updateQuantity(item.id, newQty)}
                        min={1}
                        max={100000}
                        ariaLabel={`كمية ${item.title}`}
                        className="w-10 h-6 text-xs text-slate-900 dark:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 focus:bg-white dark:focus:bg-[#202227] focus:ring-1 focus:ring-[#c93b41]/40 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer"
                        title="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-xs text-[#c93b41]">
                        {(item.price * item.quantity).toLocaleString()} ج.م
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400 font-mono block">
                          ({item.price} ج.م / ق)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 4. Footer Summary & Action Buttons */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#141518] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>المجموع الفرعي ({items.length} منتجات):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {subtotal.toLocaleString()} ج.م
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>تكلفة الشحن المقدرة:</span>
                <span className="font-mono font-bold">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">مجاناً</span>
                  ) : (
                    <span>{shippingCost} ج.م</span>
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between font-bold text-sm">
                <span className="text-slate-900 dark:text-white">الإجمالي النهائي:</span>
                <span className="font-mono font-black text-lg text-[#c93b41]">
                  {totalPrice.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#c93b41]" />
                <span>إتمام الطلب والدفع السريع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-slate-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
                >
                  إفراغ السلة بالكامل
                </button>
                <button
                  type="button"
                  onClick={closeCart}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>دفع آمن • ضمان استبدال فوري • شحن لجميع المحافظات</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
