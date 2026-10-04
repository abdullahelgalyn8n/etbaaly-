"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpLeft,
  ShieldCheck,
  Truck,
  Calculator,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/servicesData";

export default function FooterLinks() {
  return (
    <>
      {/* Quick Links */}
      <div className="lg:col-span-2 space-y-4">
        <p className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
          أدوات وتتبع
        </p>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link
              href="/track/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <Truck className="w-3.5 h-3.5 text-[#c93b41]" />
              <span>تتبع طلبك وشحنتك</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blog/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>مدونة ودليل الطباعة</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <Calculator className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>حاسبة أسعار ومقايسات الشركات</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#preflight"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>فحص جاهزية الملفات</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>بوابة الشركات والفواتير</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Services Links */}
      <div className="lg:col-span-3 space-y-4">
        <p className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
          أقسام الطباعة والتغليف
        </p>
        <ul className="space-y-2 text-sm font-medium">
          {servicesData.slice(0, 5).map((serv) => (
            <li key={serv.id}>
              <Link
                href={`/services/${serv.slug}/`}
                prefetch={false}
                className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
              >
                <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41] transition-colors" />
                <span className="line-clamp-1">{serv.title.split("(")[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal & Policies */}
      <div className="lg:col-span-2 space-y-4">
        <p className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
          السياسات والضمان
        </p>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link
              href="/terms/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>الشروط والأحكام</span>
            </Link>
          </li>
          <li>
            <Link
              href="/refund/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>الاسترجاع والإلغاء</span>
            </Link>
          </li>
          <li>
            <Link
              href="/privacy/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c93b41]" />
              <span>الخصوصية والبيانات</span>
            </Link>
          </li>
          <li>
            <Link
              href="/policy/"
              prefetch={false}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
              <ArrowUpLeft className="w-3.5 h-3.5 text-[#c93b41]" />
              <span className="text-[#c93b41] font-bold">المركز القانوني</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Col */}
      <div className="lg:col-span-2 space-y-4">
        <p className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
          المقر والاتصال
        </p>
        <ul className="space-y-3 text-xs font-medium">
          <li className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#c93b41] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{siteConfig.address}</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#c93b41] shrink-0" />
            <a
              href={`tel:${siteConfig.phone}`}
              dir="ltr"
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors font-mono"
            >
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#c93b41] shrink-0" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[#c93b41] dark:hover:text-white transition-colors font-mono"
            >
              {siteConfig.email}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
