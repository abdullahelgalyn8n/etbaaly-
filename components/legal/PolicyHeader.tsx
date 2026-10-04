"use client";

import React, { useState } from "react";
import { Scale, Printer, Check, Copy, Calendar, Clock, ShieldCheck } from "lucide-react";

interface PolicyHeaderProps {
  title: string;
  badge: string;
  description: string;
  lastUpdated: string;
  readTime: string;
}

export default function PolicyHeader({
  title,
  badge,
  description,
  lastUpdated,
  readTime,
}: PolicyHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-[#1d1d1d] to-[#17181c] border border-white/10 p-6 sm:p-10 text-white shadow-xl">
      {/* Decorative Brand Background Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(201,59,65,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#c93b41]/20 border border-[#c93b41]/40 text-[#ff767c]">
              <Scale className="w-3.5 h-3.5 text-[#c93b41]" />
              {badge}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              سارية ومعتمدة قانوناً بمصر
            </span>
          </div>

          {/* Action buttons (Print / Share) */}
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-slate-200 hover:text-white"
              title="نسخ رابط الصفحة"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>مشاركة</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-slate-200 hover:text-white"
              title="طباعة هذه الوثيقة"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>طباعة</span>
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Footer Meta: Updated Date + Read Time + Jurisdiction */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>آخر تحديث ومراجعة: {lastUpdated}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>وقت القراءة التقديري: {readTime}</span>
          </span>
          <span>•</span>
          <span className="text-slate-400">
            الجهة المصدرة: A.Z Agency (منصة إطبعلي) | جمهورية مصر العربية
          </span>
        </div>
      </div>
    </div>
  );
}
