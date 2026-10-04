import React from "react";
import Link from "next/link";
import { ShieldCheck, Globe } from "lucide-react";
import BrandedImage from "@/components/BrandedImage";

interface ArticleAuthorCardProps {
  author: string;
}

export function ArticleAuthorCard({ author }: ArticleAuthorCardProps) {
  return (
    <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#c93b41] flex-shrink-0 bg-[#1d1d1d] flex items-center justify-center">
        <BrandedImage
          src="/images/ICON-LOGO-SITE.webp"
          alt={author}
          fill
          className="object-contain p-1"
        />
      </div>

      <div className="flex-grow space-y-1.5">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-base text-slate-900 dark:text-white">
            {author}
          </h4>
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#c93b41]/10 text-[#c93b41] font-bold">
            <ShieldCheck className="w-3 h-3" />
            <span>مؤلف معتمد E-E-A-T</span>
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-[#a8abb4] leading-relaxed">
          استشاري السيو التقني وهندسة محركات الإجابة الذكية (AEO) ومؤسس A.Z Agency. يقود تطوير البنى التحتية السحابية فائقة السرعة وأنظمة الأتمتة للشركات والمتاجر في الشرق الأوسط.
        </p>
        <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
          <a
            href="https://github.com/abdullahelgalyn8n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c93b41] flex items-center gap-1 transition-colors font-mono"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <span>•</span>
          <Link href="/about/" className="hover:text-[#c93b41] flex items-center gap-1 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span>عن الكاتب والوكالة</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
