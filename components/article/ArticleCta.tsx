import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ArticleCta() {
  return (
    <section className="rounded-[32px] p-8 sm:p-10 bg-gradient-to-r from-[#4a1518] via-[#242424] to-[#1d1d1d] border border-[#752327] text-center space-y-4 text-white shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold">هل تريد تطبيق هذه الاستراتيجية في شركتك؟</h3>
      <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto font-medium">
        فريق A.Z Agency الإبداعي والتقني جاهز لمساعدتك في بناء حضور رقمي مميز يضاعف مبيعاتك.
      </p>
      <Link
        href="/contact/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-crimson text-white font-bold text-xs transition-all shadow-md hover:scale-105"
      >
        <span>تواصل معنا الآن</span>
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </section>
  );
}
