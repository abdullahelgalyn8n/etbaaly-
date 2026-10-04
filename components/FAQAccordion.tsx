import React from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, idx) => (
        <details
          key={idx}
          open={idx === 0}
          className="group rounded-2xl border border-slate-200 dark:border-[#1f2533] bg-white/80 dark:bg-[#13161f]/50 open:bg-white dark:open:bg-[#13161f] open:border-red-500/50 dark:open:border-red-600/50 transition-all duration-300 overflow-hidden"
        >
          <summary className="w-full text-right p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-slate-950 dark:text-white cursor-pointer list-none select-none">
            <span>{item.question}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-[#1a1f2c] text-slate-600 dark:text-slate-400 group-open:rotate-180 group-open:bg-red-100 dark:group-open:bg-red-600/20 group-open:border-red-300 dark:group-open:border-red-600/40 group-open:text-[#c8232c] dark:group-open:text-red-400 transition-transform duration-300">
              <ChevronDown className="w-4 h-4" />
            </div>
          </summary>
          <div className="px-6 pb-6 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-100 dark:border-[#1a1f2c] pt-4 font-medium">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
