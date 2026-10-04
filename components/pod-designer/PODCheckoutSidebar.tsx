"use client";

import React from "react";
import Link from "next/link";
import { Palette, Minus, Plus, Send, CheckCircle2 } from "lucide-react";
import { PODProduct, ProductColor } from "@/lib/db";
import NumericQuantityInput from "@/components/ui/NumericQuantityInput";

interface PODCheckoutSidebarProps {
  selectedProduct: PODProduct;
  selectedColor: ProductColor;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  unitPrice: number;
  totalPrice: number;
  clientName: string;
  setClientName: (name: string) => void;
  clientPhone: string;
  setClientPhone: (phone: string) => void;
  clientAddress: string;
  setClientAddress: (addr: string) => void;
  isSubmitting: boolean;
  submittedOrder: { tracking_code: string } | null;
  onSaveAndOrder: (e: React.FormEvent) => void;
}

export function PODCheckoutSidebar({
  selectedProduct,
  selectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  unitPrice,
  totalPrice,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  clientAddress,
  setClientAddress,
  isSubmitting,
  submittedOrder,
  onSaveAndOrder,
}: PODCheckoutSidebarProps) {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-white/[0.08] flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#c93b41]" />
          ملخص طلب الطباعة
        </h3>

        {/* Price & Specs */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-bold">المنتج:</span>
            <span className="font-bold text-slate-900 dark:text-white">{selectedProduct.title.split("(")[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-bold">اللون المختار:</span>
            <span className="font-bold text-slate-900 dark:text-white">{selectedColor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-bold">المقاس:</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">{selectedSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-bold">وقت التنفيذ:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300 font-medium">{selectedProduct.turnaround}</span>
          </div>
        </div>

        {/* Size Selector Chips */}
        {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">اختر المقاس:</label>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.sizes.map((s: string) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedSize === s
                      ? "bg-[#c93b41] text-white"
                      : "bg-slate-100 dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Counter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">الكمية:</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <NumericQuantityInput
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={100000}
              ariaLabel="الكمية المطلوبة للتصميم"
              className="w-16 h-8 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 focus:ring-1 focus:ring-[#c93b41]/40 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1b1b1b] border border-slate-200 dark:border-white/[0.08] text-center">
          <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold block mb-1">الإجمالي التقديري:</span>
          <div className="text-2xl font-black font-mono text-[#c93b41]">
            {totalPrice.toLocaleString()} <span className="text-xs font-bold text-slate-900 dark:text-white">ج.م</span>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold">({unitPrice} ج.م للقطعة)</span>
        </div>

        {/* Checkout Form */}
        {submittedOrder ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center space-y-2">
            <CheckCircle2 className="w-7 h-7 mx-auto" />
            <div className="font-bold text-xs">تم تسجيل أمر الشغل بنجاح!</div>
            <div className="font-mono font-black text-sm text-[#c93b41]">
              {submittedOrder.tracking_code}
            </div>
            <Link
              href={`/track/?code=${submittedOrder.tracking_code}`}
              className="inline-block px-4 py-1.5 rounded-lg btn-crimson text-white text-[11px] font-bold shadow-sm mt-1"
            >
              تتبع مسار الشحنة ➔
            </Link>
          </div>
        ) : (
          <form onSubmit={onSaveAndOrder} className="space-y-2.5">
            <input
              type="text"
              placeholder="اسم المستلم..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              required
            />
            <input
              type="tel"
              placeholder="رقم الهاتف للتأكيد والتوصيل..."
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              required
            />
            <input
              type="text"
              placeholder="عنوان التسليم بالتفصيل..."
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl btn-crimson text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "جاري الإنشاء والربط..." : "اعتمد التصميم وأصدر أمر الشغل"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
