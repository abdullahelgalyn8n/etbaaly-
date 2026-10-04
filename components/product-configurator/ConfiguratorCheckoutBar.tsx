import React from "react";
import { ShoppingBag, FileDown } from "lucide-react";

interface ConfiguratorCheckoutBarProps {
  totalPrice: number;
  onAddToCart: () => void;
  onDownloadPdf: () => void;
}

export function ConfiguratorCheckoutBar({
  totalPrice,
  onAddToCart,
  onDownloadPdf,
}: ConfiguratorCheckoutBarProps) {
  return (
    <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-mono">
        <span className="text-slate-400 font-sans text-xs">▲ الإجمالي:</span>
        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {totalPrice} ج.م
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onAddToCart}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>أضف إلى السلة (Add to cart)</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPdf}
          className="px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all"
        >
          <FileDown className="w-4 h-4" />
          <span>مواصفات PDF</span>
        </button>
      </div>
    </div>
  );
}

export default ConfiguratorCheckoutBar;
