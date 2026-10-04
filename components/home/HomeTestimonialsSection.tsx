import React from "react";
import { CheckCircle2 } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";

export function HomeTestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          تجارب وشهادات شركاء النجاح
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          ماذا يقول عملاؤنا عن دقة الطباعة والتسليم؟
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-4"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05]">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {t.author}
              </div>
              <div className="text-[11px] text-[#c93b41] font-semibold mt-0.5">
                {t.role} • {t.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeTestimonialsSection;
