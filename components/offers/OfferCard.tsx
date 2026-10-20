"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft, CheckCircle, ShieldCheck, Clock, MessageCircle, Layers } from "lucide-react";
import { OfferItem } from "@/data/offersData";
import { siteConfig } from "@/data/siteConfig";

interface OfferCardProps {
  offer: OfferItem;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const waMessage = encodeURIComponent(
    `مرحباً إطبعلي، أود حجز والاستفسار عن "${offer.title}" (كود: ${offer.id}) بسعر العرض ${offer.discountedPrice}.`
  );
  const waUrl = `${siteConfig.social.whatsapp}?text=${waMessage}`;

  return (
    <article
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        offer.popular
          ? "bg-white dark:bg-[#1a1c20] border-2 border-[#c93b41] shadow-xl hover:shadow-2xl dark:shadow-[0_10px_35px_rgba(201,59,65,0.2)]"
          : "bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/50 shadow-sm hover:shadow-xl"
      }`}
    >
      {/* Top Banner & Popular Flag */}
      <div className="p-6 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm ${
              offer.popular
                ? "bg-[#c93b41] text-white"
                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
            }`}
          >
            {offer.popular && <Sparkles className="w-3.5 h-3.5" />}
            {offer.badge}
          </span>

          {/* Parent Service Link */}
          <Link
            href={`/services/${offer.serviceSlug}/`}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-[#c93b41] dark:hover:text-white transition-colors bg-slate-50 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-white/[0.06]"
            title={`عرض تفاصيل خدمة ${offer.serviceName}`}
          >
            <Layers className="w-3 h-3 text-[#c93b41]" />
            <span className="line-clamp-1">{offer.serviceName}</span>
          </Link>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-snug group-hover:text-[#c93b41] transition-colors">
            <Link href={`/offers/${offer.slug}/`}>{offer.title}</Link>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#a8abb4] leading-relaxed line-clamp-2 font-medium">
            {offer.subtitle}
          </p>
        </div>

        {/* Pricing & Savings Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#c93b41]">
                {offer.discountedPrice}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {offer.originalPrice}
              </span>
            </div>
            {offer.unitPrice && (
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">
                {offer.unitPrice}
              </span>
            )}
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/20">
            وفر {offer.savings}
          </span>
        </div>

        {/* Deliverables Preview */}
        <div className="space-y-2.5 pt-1">
          <span className="text-xs font-black text-slate-900 dark:text-white block">
            محتويات الباقة الرئيسية:
          </span>
          <ul className="space-y-2">
            {offer.deliverables.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#c93b41] shrink-0 mt-0.5" />
                <span className="leading-tight font-medium">
                  <strong>{item.title}</strong>: {item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus Stack Highlight */}
        {offer.bonusStack.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="line-clamp-1">{offer.bonusStack[0].title}</span>
          </div>
        )}
      </div>

      {/* Card Actions & Footer */}
      <div className="p-6 pt-0 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-white/[0.06]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>التسليم: {offer.turnaround}</span>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>ضمان جودة المصنع</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/offers/${offer.slug}/`}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/[0.1] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <span>التفاصيل الكاملة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl btn-crimson text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] transition-all text-center"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>طلب العرض</span>
          </a>
        </div>
      </div>
    </article>
  );
}
