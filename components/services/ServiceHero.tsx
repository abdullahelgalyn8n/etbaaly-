import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Search,
  Film,
  Palette,
  Bot,
  Globe,
  Package,
  Printer,
  ShoppingBag,
  Tag,
  Presentation,
  FileText,
  Shirt,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Service } from "@/data/servicesData";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-8 h-8 text-[#c93b41]" />,
  Printer: <Printer className="w-8 h-8 text-[#c93b41]" />,
  FileText: <FileText className="w-8 h-8 text-[#c93b41]" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8 text-[#c93b41]" />,
  Tag: <Tag className="w-8 h-8 text-[#c93b41]" />,
  Presentation: <Presentation className="w-8 h-8 text-[#c93b41]" />,
  Palette: <Palette className="w-8 h-8 text-[#c93b41]" />,
  SearchCheck: <Search className="w-8 h-8 text-[#c93b41]" />,
  Film: <Film className="w-8 h-8 text-[#c93b41]" />,
  Bot: <Bot className="w-8 h-8 text-[#c93b41]" />,
  Globe: <Globe className="w-8 h-8 text-[#c93b41]" />,
  Shirt: <Shirt className="w-8 h-8 text-[#c93b41]" />,
};

interface ServiceHeroProps {
  service: Service;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative rounded-[32px] p-8 sm:p-12 md:p-16 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(201,59,65,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#1d1d1d] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center">
              {iconMap[service.iconName]}
            </div>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full badge-crimson">
              {service.metrics}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[#c93b41] font-bold">
            {service.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#a8abb4] leading-relaxed max-w-2xl font-medium">
            {service.fullOverview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={`/contact/?service=${service.id}`}
              className="px-8 py-3.5 rounded-full btn-crimson text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              طلب استشارة بخصوص الخدمة
            </Link>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-slate-100 dark:bg-[#1d1d1d] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-xs transition-all"
            >
              محادثة واتساب مباشرة
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-50 dark:bg-[#1d1d1d] p-6 rounded-2xl border border-slate-200 dark:border-white/[0.06] space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            المخرجات المضمونة للتسليم
          </h3>
          <ul className="space-y-2.5">
            {service.deliverables.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-[#a8abb4] leading-relaxed font-medium">
                <CheckCircle className="w-4 h-4 text-[#c93b41] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08]">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-2">الأدوات والتقنيات:</span>
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
