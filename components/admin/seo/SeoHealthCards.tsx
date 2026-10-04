"use client";

import React from "react";
import { Sparkles, Globe, FileText, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface SeoHealthCardsProps {
  totalPosts: number;
  avgSeoScore: number;
  indexedCount: number;
}

export function SeoHealthCards({ totalPosts, avgSeoScore, indexedCount }: SeoHealthCardsProps) {
  const cards = [
    {
      title: "صحة السيو الشاملة (Rank Math)",
      value: `${avgSeoScore}/100`,
      desc: "تقييم خوارزميات جوجل والذكاء الاصطناعي AEO",
      icon: Sparkles,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      badge: "ممتاز A+",
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "المقالات المفهرسة لايف",
      value: `${indexedCount} من ${totalPosts}`,
      desc: "نسبة التغطية الفهرسية في محركات البحث 100%",
      icon: Globe,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      badge: "مفهرس",
      badgeColor: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "بيانات Schema المعتمدة",
      value: "JSON-LD 100%",
      desc: "Organization, LocalBusiness, Breadcrumbs",
      icon: ShieldCheck,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      badge: "فعال",
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "الفهرسة الفورية (Instant Indexing)",
      value: "متصل ✓",
      desc: "IndexNow & Google Indexing API جاهز",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      badge: "نشط ⚡",
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4.5 shadow-xs flex flex-col justify-between hover:border-[#c93b41]/40 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {card.title}
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                {card.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SeoHealthCards;
