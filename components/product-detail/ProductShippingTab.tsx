"use client";

import React from "react";
import { ShieldCheck, Truck } from "lucide-react";

export default function ProductShippingTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          ضمان عدم الكسر والاستبدال الفوري
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          يتم فحص وتغليف كل مج في علبة كرتونية فردية مقواة محاطة بطبقات فوم هوائي عازل للصدمات. وفي حال حدوث أي كسر أو عيب مصنعي أثناء الشحن، نلتزم بإرسال بديل فوراً على نفقتنا الكاملة.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <Truck className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          شحن سريع لكافة محافظات مصر
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          يتم تجهيز وتسليم الشحنات خلال 24 - 48 ساعة لمندوب التوصيل السريع، مع إمكانية التتبع المباشر وإشعار الاستلام.
        </p>
      </div>
    </div>
  );
}
