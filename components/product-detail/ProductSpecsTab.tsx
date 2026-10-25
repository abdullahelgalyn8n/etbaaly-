"use client";

import React from "react";
import { AdminProduct } from "@/lib/db";

interface ProductSpecsTabProps {
  product: AdminProduct;
}

export default function ProductSpecsTab({ product }: ProductSpecsTabProps) {
  const cat = product.category || "";
  const isApparel = cat.includes("ملابس") || cat.includes("هوديز");
  const isSticker = cat.includes("استيكر") || cat.includes("ستيكر");
  const isPackaging = cat.includes("علب") || cat.includes("تغليف");
  const isOffice = cat.includes("مكاتب") || cat.includes("يافط");
  const isMug = product.title.includes("مج") || product.title.includes("كوب");

  const material = isApparel
    ? "قطن طبيعي فاخر 100% عالي الكثافة معالج ضد الانكماش"
    : isSticker
    ? "فينيل لاصق بريميوم مقاوم للماء وأشعة الشمس والخدش"
    : isPackaging
    ? "كرتون دوبلكس مقوى / كرافت عالي الصلابة مع تشطيب فاخر"
    : isOffice
    ? "أكريليك كريستال نقي أو خشب طبيعي معالج مع قص ليزر 3D"
    : isMug
    ? "بورسلين سيراميكي حراري فندقي فاخر عالي الكثافة"
    : "خامات تصنيع بريميوم مخصصة للعلامات التجارية والشركات";

  const care = isApparel
    ? "غسيل مقلوب على درجة حرارة 30° مئوية، آمن وثابت ضد بهتان الألوان"
    : isSticker
    ? "لاصق دائم فائق الثبات، سهل التطبيق والإزالة دون ترك أي أثر صمغي"
    : isPackaging
    ? "تخزين في مكان جاف، تصميم ذكي وسريع الطي والتجميع بدون هدر"
    : isOffice
    ? "تنظيف بقطعة قماش ناعمة، خامات متينة ومقاومة للبهتان للاستخدام اليومي"
    : isMug
    ? "آمن 100% في غسالة الأطباق والمايكروويف"
    : "مطابق لمعايير الجودة والاستخدام التجاري المكثف";

  const packaging = isApparel
    ? "تغليف فردي في أكياس حماية معقمة مع باركود المقاس"
    : isSticker
    ? "مجموعات مقصوصة داي كت دقيق مع بطانة حماية سهلة التقشير"
    : isPackaging
    ? "شحن مفرود (Flat) محمي بالبابلز والكرتون لسهولة التخزين والنقل"
    : isOffice
    ? "تغليف فوم هوائي عازل لحماية الحواف والزوايا والأكريليك"
    : "علبة فردية كرتونية مقواة مع فوم هوائي عازل لحماية المنتج";

  return (
    <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-200">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
        المواصفات الفنية وخامات التصنيع:
      </h3>
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] text-xs sm:text-sm">
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">التصنيف:</span>
          <span className="font-bold text-slate-900 dark:text-white">{product.category}</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">الخامة الأساسية:</span>
          <span className="font-bold text-slate-900 dark:text-white">{material}</span>
        </div>
        {product.subCategory && (
          <div className="py-3 flex justify-between">
            <span className="font-bold text-slate-500 dark:text-slate-400">النوع الفرعي:</span>
            <span className="font-bold text-slate-900 dark:text-white">{product.subCategory}</span>
          </div>
        )}
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">مساحة الطباعة واللوجو:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {product.printAreaLabel || "مساحة مخصصة حسب التصميم"}
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">دقة الطباعة وثبات الألوان:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            300 DPI فوتوغرافي فائق النقاء، ثبات دائم ومقاوم للعوامل الجوية
          </span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">إرشادات الاستخدام:</span>
          <span className="font-bold text-slate-900 dark:text-white">{care}</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">التغليف:</span>
          <span className="font-bold text-slate-900 dark:text-white">{packaging}</span>
        </div>
        <div className="py-3 flex justify-between">
          <span className="font-bold text-slate-500 dark:text-slate-400">مدة التجهيز والتسليم:</span>
          <span className="font-bold text-slate-900 dark:text-white">{product.turnaround || "24 - 48 ساعة"}</span>
        </div>
      </div>
    </div>
  );
}
