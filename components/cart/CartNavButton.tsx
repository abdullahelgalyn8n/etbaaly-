"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartNavButtonProps {
  className?: string;
}

export default function CartNavButton({ className = "" }: CartNavButtonProps) {
  const { totalCount, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      className={`relative p-2 rounded-full bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-[#c93b41] hover:border-[#c93b41]/40 transition-all cursor-pointer flex items-center justify-center ${className}`}
      aria-label="سلة المشتريات"
      title="عرض سلة المشتريات"
    >
      <ShoppingBag className="w-4 h-4" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c93b41] text-white text-[10px] font-mono font-black rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </button>
  );
}
