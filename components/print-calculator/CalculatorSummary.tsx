"use client";

import React from "react";
import { Sparkles, CheckCircle2, Send } from "lucide-react";
import { ProductPreset, ProductMaterial, ProductFinish } from "./presets";

interface CalculatorSummaryProps {
  selectedProduct: ProductPreset;
  curMaterial: ProductMaterial;
  curFinish: ProductFinish;
  unitPrice: number;
  totalPrice: number;
  volumeDiscountFactor: number;
  submitted: boolean;
  clientName: string;
  setClientName: (name: string) => void;
  clientPhone: string;
  setClientPhone: (phone: string) => void;
  isSubmitting: boolean;
  onOrderSubmit: (e: React.FormEvent) => void;
}

export function CalculatorSummary({
  selectedProduct,
  curMaterial,
  curFinish,
  unitPrice,
  totalPrice,
  volumeDiscountFactor,
  submitted,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  isSubmitting,
  onOrderSubmit,
}: CalculatorSummaryProps) {
  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-6">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <Sparkles className="w-4 h-4 text-[#c93b41]" />
          ملخص المقايسة والإنتاج الفوري
        </h4>

        {/* Specs Summary List */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">المنتج:</span>
            <span className="font-bold text-slate-900 dark:text-white text-left">{selectedProduct.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">الخامة:</span>
            <span className="font-bold text-slate-900 dark:text-white text-left">{curMaterial.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">التشطيب:</span>
            <span className="font-bold text-slate-900 dark:text-white text-left">{curFinish.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">وقت التنفيذ:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300 font-medium">{selectedProduct.turnaround}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">سعر القطعة التقريبي:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {unitPrice.toFixed(2)} ج.م / قطعة
            </span>
          </div>
        </div>

        {/* Price Total Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block mb-1">
            التكلفة الإجمالية التقديرية:
          </span>
          <div className="text-3xl sm:text-4xl font-black text-[#c93b41] font-mono">
            {totalPrice.toLocaleString()}{" "}
            <span className="text-sm font-bold text-slate-900 dark:text-white">ج.م</span>
          </div>
          {volumeDiscountFactor < 1.0 && (
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold mt-1">
              🎉 تم تطبيق خصم الكميات الكبير بنجاح!
            </div>
          )}
        </div>

        {/* Direct Instant Confirmation Form */}
        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <div className="font-bold text-sm">تم تسجيل المقايسة وأمر الشغل بنجاح!</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              تم إرسال البيانات لقسم الإنتاج وحجز رقم تتبع فوري، وسيتواصل معك مهندس الجودة لتأكيد الملفات.
            </p>
          </div>
        ) : (
          <form onSubmit={onOrderSubmit} className="space-y-3 pt-2">
            <input
              type="text"
              placeholder="اسم المسؤول / الشركة..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c93b41]"
              required
            />
            <input
              type="tel"
              placeholder="رقم هاتف / واتساب للتأكيد والمتابعة..."
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-3 rounded-xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c93b41]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "جاري الحفظ والربط..." : "اعتمد المقايسة وأصدر أمر الطباعة"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
