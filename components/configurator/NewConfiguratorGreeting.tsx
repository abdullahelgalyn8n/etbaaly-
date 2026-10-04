import React from "react";
import { CheckCircle2 } from "lucide-react";

export function NewConfiguratorGreeting() {
  return (
    <div className="p-8 bg-slate-50 dark:bg-[#16171b] flex flex-col justify-center border-b md:border-b-0 md:border-l border-slate-100 dark:border-white/[0.06] relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#c93b41]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
          Make Your Web Store <br />
          <span className="text-[#c93b41]">Stand Out!</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Offer visitors a truly different shopping experience and convert them to customers.
        </p>
        <div className="pt-4 flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>دعم زوايا متعددة (Front, Back, Side)</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>حساب تسعير ووكومرس الحي والتفاعلي</span>
        </div>
      </div>
    </div>
  );
}

export default NewConfiguratorGreeting;
