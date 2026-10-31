"use client";

import React, { useMemo } from "react";
import {
  ShieldCheck,
  Zap,
  Scissors,
  CheckCircle2,
  Sparkles,
  Package,
  Flame,
  LucideIcon,
} from "lucide-react";

interface HighlightItem {
  icon: LucideIcon;
  colorClass: string;
  text: string;
}

interface ProductHighlightsProps {
  category?: string;
  subCategory?: string;
  title?: string;
}

export function ProductHighlights({
  category = "",
  subCategory = "",
  title = "",
}: ProductHighlightsProps) {
  const highlights = useMemo<HighlightItem[]>(() => {
    const cat = category.toLowerCase();
    const sub = subCategory.toLowerCase();
    const t = title.toLowerCase();

    if (
      cat.includes("استيكر") ||
      cat.includes("ستيكر") ||
      sub.includes("استيكر") ||
      sub.includes("داي-كت")
    ) {
      return [
        {
          icon: ShieldCheck,
          colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          text: "فينيل لاصق مقاوم للماء والخدش والشمس",
        },
        {
          icon: Zap,
          colorClass: "bg-red-500/10 text-[#c93b41]",
          text: "طباعة ألوان Ultra HD بدقة 300 DPI",
        },
        {
          icon: Scissors,
          colorClass: "bg-amber-500/10 text-amber-500",
          text: "قص ليزر داي-كت فائق الدقة بالمللي",
        },
        {
          icon: CheckCircle2,
          colorClass: "bg-blue-500/10 text-blue-500",
          text: "سهولة فك وسلخ بدون أي أثر صمغي",
        },
      ];
    }

    if (
      cat.includes("ملابس") ||
      cat.includes("هوديز") ||
      sub.includes("تيشيرت") ||
      sub.includes("كابات")
    ) {
      return [
        {
          icon: CheckCircle2,
          colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          text: "قطن مصري طبيعي 100% معالج ضد الانكماش",
        },
        {
          icon: Zap,
          colorClass: "bg-red-500/10 text-[#c93b41]",
          text: "طباعة DTF أصلية متينة ومقاومة للغسيل",
        },
        {
          icon: Sparkles,
          colorClass: "bg-amber-500/10 text-amber-500",
          text: "خياطة مزدوجة معززة وقصة مريحة ممتازة",
        },
        {
          icon: Package,
          colorClass: "bg-blue-500/10 text-blue-500",
          text: "تغليف فردي معقم مع باركود المقاس المعتمد",
        },
      ];
    }

    if (
      cat.includes("علب") ||
      cat.includes("تغليف") ||
      sub.includes("علب") ||
      sub.includes("أكياس") ||
      sub.includes("باوتش")
    ) {
      return [
        {
          icon: Package,
          colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          text: "كرتون صلب عالي المتانة ومقاوم لثني الشحن",
        },
        {
          icon: Zap,
          colorClass: "bg-red-500/10 text-[#c93b41]",
          text: "طباعة أوفست فوتوغرافية مع سيلوفان فاخر",
        },
        {
          icon: Sparkles,
          colorClass: "bg-amber-500/10 text-amber-500",
          text: "تصميم ذكي سريع الطي والتجميع بدون هدر",
        },
        {
          icon: ShieldCheck,
          colorClass: "bg-blue-500/10 text-blue-500",
          text: "شحن مفرود آمن ومحمي لتوفير مساحة التخزين",
        },
      ];
    }

    if (
      cat.includes("مكاتب") ||
      cat.includes("يافط") ||
      sub.includes("يافط") ||
      sub.includes("أكريليك") ||
      sub.includes("لوحات")
    ) {
      return [
        {
          icon: ShieldCheck,
          colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          text: "أكريليك كريستال نقي أو خشب طبيعي معالج",
        },
        {
          icon: Zap,
          colorClass: "bg-red-500/10 text-[#c93b41]",
          text: "قص وتفريغ 3D فائق الدقة وتشطيب ناعم",
        },
        {
          icon: Sparkles,
          colorClass: "bg-amber-500/10 text-amber-500",
          text: "ألوان ثابتة ومقاومة للبهتان والشمس والخدش",
        },
        {
          icon: Package,
          colorClass: "bg-blue-500/10 text-blue-500",
          text: "تغليف فوم هوائي عازل لحماية الحواف والزوايا",
        },
      ];
    }

    if (t.includes("مج") || t.includes("كوب") || sub.includes("كوستر")) {
      return [
        {
          icon: CheckCircle2,
          colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          text: "بورسلين حراري فندقي ممتاز (330 مل)",
        },
        {
          icon: Zap,
          colorClass: "bg-red-500/10 text-[#c93b41]",
          text: "طباعة ألوان Ultra HD بدقة 300 DPI",
        },
        {
          icon: Flame,
          colorClass: "bg-amber-500/10 text-amber-500",
          text: "آمن داخل غسالة الأطباق والمايكروويف",
        },
        {
          icon: ShieldCheck,
          colorClass: "bg-blue-500/10 text-blue-500",
          text: "تغليف كرتوني مقوى عازل لحماية الشحن",
        },
      ];
    }

    return [
      {
        icon: CheckCircle2,
        colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        text: "خامات تصنيع أصلية معتمدة بأعلى معايير الجودة",
      },
      {
        icon: Zap,
        colorClass: "bg-red-500/10 text-[#c93b41]",
        text: "طباعة ألوان Ultra HD بدقة 300 DPI",
      },
      {
        icon: ShieldCheck,
        colorClass: "bg-amber-500/10 text-amber-500",
        text: "فحص جودة يدوي دقيق لكل قطعة قبل التجهيز",
      },
      {
        icon: Package,
        colorClass: "bg-blue-500/10 text-blue-500",
        text: "تغليف وقائي معتمد لضمان سلامة الشحن والتسليم",
      },
    ];
  }, [category, subCategory, title]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {highlights.map((h, i) => {
        const IconComp = h.icon;
        return (
          <div
            key={i}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-[#18191d] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-2.5"
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${h.colorClass}`}
            >
              <IconComp className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
              {h.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
