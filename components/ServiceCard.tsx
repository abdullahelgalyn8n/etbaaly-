import React from "react";
import Link from "next/link";
import {
  Package,
  Printer,
  FileText,
  ShoppingBag,
  Tag,
  Presentation,
  Search,
  Film,
  Palette,
  Bot,
  Globe,
  ArrowLeft,
  CheckCircle,
  Shirt,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-6 h-6 text-[#c93b41]" />,
  Printer: <Printer className="w-6 h-6 text-[#c93b41]" />,
  FileText: <FileText className="w-6 h-6 text-[#c93b41]" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#c93b41]" />,
  Tag: <Tag className="w-6 h-6 text-[#c93b41]" />,
  Presentation: <Presentation className="w-6 h-6 text-[#c93b41]" />,
  Palette: <Palette className="w-6 h-6 text-[#c93b41]" />,
  SearchCheck: <Search className="w-6 h-6 text-[#c93b41]" />,
  Film: <Film className="w-6 h-6 text-[#c93b41]" />,
  Bot: <Bot className="w-6 h-6 text-[#c93b41]" />,
  Globe: <Globe className="w-6 h-6 text-[#c93b41]" />,
  Shirt: <Shirt className="w-6 h-6 text-[#c93b41]" />,
};

export default function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div
      id={service.id}
      className="group relative bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(201,59,65,0.15)] flex flex-col justify-between"
    >
      <div>
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href={`/services/${service.slug}/`}
            prefetch={false}
            aria-label={`تفاصيل خدمة ${service.title}`}
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center group-hover:scale-105 group-hover:border-[#c93b41]/40 transition-all shadow-sm"
          >
            {iconMap[service.iconName] || <Package className="w-6 h-6 text-[#c93b41]" />}
          </Link>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full badge-crimson">
            {service.metrics}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2 group-hover:text-[#c93b41] transition-colors">
          <Link href={`/services/${service.slug}/`} prefetch={false}>
            {service.title}
          </Link>
        </h3>
        <p className="text-xs font-semibold text-slate-500 dark:text-[#a8abb4] mb-4">
          {service.subtitle}
        </p>
        <p className="text-sm text-slate-700 dark:text-[#a8abb4] leading-relaxed mb-6 font-medium">
          {service.description}
        </p>

        {/* Key Features */}
        <ul className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-[#a8abb4] font-medium">
          {service.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#c93b41] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Actions: Details & Portfolio link + Direct Booking */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-3 mt-auto">
        <Link
          href={`/services/${service.slug}/`}
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white hover:text-[#c93b41] dark:hover:text-[#c93b41] transition-colors"
        >
          <span>المواصفات والأسعار</span>
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        <Link
          href={`/services/${service.slug}/`}
          prefetch={false}
          className="inline-flex items-center gap-1 text-xs font-bold text-white btn-crimson px-3.5 py-1.5 rounded-full shadow-sm"
        >
          <span>طلب الخدمة والمواصفات</span>
        </Link>
      </div>
    </div>
  );
}
