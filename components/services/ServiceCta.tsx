import React from "react";
import Link from "next/link";

interface ServiceCtaProps {
  serviceTitle: string;
  serviceId: string;
}

export default function ServiceCta({ serviceTitle, serviceId }: ServiceCtaProps) {
  const shortTitle = serviceTitle.split("(")[0].trim();

  return (
    <section className="rounded-[32px] p-8 sm:p-12 bg-gradient-to-r from-[#4a1518] via-[#242424] to-[#1d1d1d] border border-[#752327] text-center space-y-6 text-white shadow-2xl">
      <h2 className="text-2xl sm:text-4xl font-black">
        جاهز للبدء في تنفيذ {shortTitle}؟
      </h2>
      <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-medium">
        تواصل معنا اليوم لحجز جلسة استشارية ومناقشة تفاصيل مشروعك مع الفريق المختص.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/contact/?service=${serviceId}`}
          className="px-8 py-3.5 rounded-full btn-crimson text-white font-bold text-sm shadow-md transition-all hover:scale-105"
        >
          طلب الخدمة الآن
        </Link>
        <Link
          href="/services/"
          className="px-8 py-3.5 rounded-full bg-[#1d1d1d] border border-white/[0.12] text-slate-200 hover:text-white font-bold text-sm transition-all"
        >
          تصفح باقي الخدمات
        </Link>
      </div>
    </section>
  );
}
