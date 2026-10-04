"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface PolicyFaqItem {
  q: string;
  a: string;
  tag?: string;
}

interface PolicyFaqSectionProps {
  title?: string;
  description?: string;
  items: PolicyFaqItem[];
}

export default function PolicyFaqSection({
  title = "أسئلة شائعة حول السياسات والتشغيل",
  description = "إجابات واضحة وحاسمة حول أكثر التساؤلات والنقاط الجدلية الشائعة لضمان حقوق العميل والمطبعة وفقاً للأعراف والقوانين المصرية.",
  items,
}: PolicyFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-10 shadow-xs my-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-[#c93b41]/10 flex items-center justify-center text-[#c93b41]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">{description}</p>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "bg-slate-50 dark:bg-white/[0.04] border-[#c93b41]/40 shadow-xs"
                  : "bg-white dark:bg-[#1f1f1f] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4 px-5 flex items-center justify-between gap-4 text-right transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                      isOpen
                        ? "bg-[#c93b41] text-white"
                        : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.q}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.tag && (
                    <span className="hidden sm:inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {item.tag}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#c93b41]" : ""
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/[0.06]">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
