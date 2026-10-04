"use client";

import React from "react";
import { Minus, Plus, PhoneCall, Truck, ShieldCheck, ShoppingBag, Check } from "lucide-react";
import NumericQuantityInput from "@/components/ui/NumericQuantityInput";

interface ProductOrderActionBoxProps {
  productId: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  unitPrice: number;
  totalPrice: number;
  whatsappUrl: string;
  onAddToCart?: () => void;
  isAdded?: boolean;
}

export function ProductOrderActionBox({
  productId,
  quantity,
  setQuantity,
  unitPrice,
  totalPrice,
  whatsappUrl,
  onAddToCart,
  isAdded = false,
}: ProductOrderActionBoxProps) {
  return (
    <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] space-y-4 select-none">
      {/* 1. Quantity Stepper */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">
            الكمية المطلوبة:
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {quantity > 1 ? `(${unitPrice} ج.م للقطعة الواحدة)` : "قطعة واحدة"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#18191d] rounded-2xl p-1 border border-slate-200 dark:border-white/[0.08]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#242424] text-slate-700 dark:text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2d2d34] transition-colors"
            title="تقليل الكمية"
            aria-label="تقليل الكمية"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <NumericQuantityInput
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={100000}
            ariaLabel="الكمية المطلوبة"
            className="w-16 h-8 text-sm text-slate-900 dark:text-white bg-transparent hover:bg-white/60 dark:hover:bg-white/[0.04] focus:bg-white dark:focus:bg-[#242424] focus:ring-2 focus:ring-[#c93b41]/40 rounded-xl"
          />

          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-xl bg-white dark:bg-[#242424] text-slate-700 dark:text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2d2d34] transition-colors"
            title="زيادة الكمية"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Quantity Chips */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium ml-1">
          كميات شائعة:
        </span>
        {[1, 5, 10, 25, 50, 100].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setQuantity(preset)}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              quantity === preset
                ? "bg-[#c93b41] text-white shadow-xs"
                : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.12]"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* 2. Total Due Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50/70 to-amber-50/70 dark:from-red-950/30 dark:to-amber-950/20 border border-red-200/70 dark:border-red-900/40 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold block">
            الإجمالي المستحق للطلب:
          </span>
          <div className="text-2xl font-black font-mono text-[#c93b41]">
            {totalPrice}{" "}
            <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">ج.م</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          شامل التجهيز والطباعة
        </span>
      </div>

      {/* 3. Action Buttons Row: Add to Cart + WhatsApp */}
      <div className="space-y-2.5 pt-1">

        {/* Add to Cart CTA */}
        {onAddToCart && (
          <button
            type="button"
            onClick={onAddToCart}
            className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-95 ${
              isAdded
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                : "bg-[#c93b41] hover:bg-[#b03238]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in-50" />
                <span>تمت الإضافة إلى السلة بنجاح ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة إلى السلة</span>
              </>
            )}
          </button>
        )}

        {/* Secondary WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.01] active:scale-95"
          title="تواصل مباشر واستفسار عبر واتساب"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>طلب أو استفسار عبر واتساب مباشرة</span>
        </a>
      </div>

      {/* 4. Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#c93b41] shrink-0" />
          <span>شحن وتوصيل خلال 24 - 48 ساعة</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>ضمان الجودة واستبدال فوري</span>
        </div>
      </div>
    </div>
  );
}
