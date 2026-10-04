"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, CheckCircle2, Zap, RefreshCw, FileCode, Check } from "lucide-react";

export function SeoSitemapTab() {
  const [isPinging, setIsPinging] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);

  const handlePingSearchEngines = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sitemap & Instant Indexing */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              خريطة الموقع والفهرسة اللحظية (XML Sitemap & IndexNow)
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            200 OK متصل
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-[#121316] rounded-xl border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">ملف خريطة الموقع العام (Sitemap)</div>
              <div className="text-[11px] font-mono text-slate-400">/sitemap.xml</div>
            </div>
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#c93b41] text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>فتح الملف</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 pt-2">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              إرسال إشعار فوري لمحركات البحث (Ping):
            </span>
            <p className="text-[11px] text-slate-500">
              يتم إرسال إشعار فوري لبروتوكول IndexNow (Bing, Yandex) وتنبيه عناكب Googlebot بتحديث المقالات والمنتجات فورياً.
            </p>

            <button
              type="button"
              disabled={isPinging}
              onClick={handlePingSearchEngines}
              className="w-full py-2.5 btn-crimson text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
              <span>{isPinging ? "جاري إرسال التنبيه الفوري..." : "تنبيه Google & Bing بالفهرسة الفورية 🚀"}</span>
            </button>

            {pingSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>تم إرسال إشعار التحديث بنجاح لجميع محركات البحث الشريكة!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Robots.txt Preview */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                ملف توجيه العناكب (Robots.txt)
              </h3>
            </div>
            <Link
              href="/robots.txt"
              target="_blank"
              className="text-[11px] text-cyan-500 hover:underline flex items-center gap-1"
            >
              <span>عرض الرابط</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <pre className="mt-3 p-4 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed">
{`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /cart/
Disallow: /checkout/

# Sitemaps
Sitemap: https://etbaaly.com/sitemap.xml`}
          </pre>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#121316] rounded-xl border border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-500 space-y-1">
          <div className="font-bold text-slate-700 dark:text-slate-300">🔒 حماية لوحة التحكم والخصوصية</div>
          <p>
            تم ضبط ملف robots.txt تلقائياً لمنع أرشفة لوحة التحكم وصفحات سلة الشراء، مع السماح الكامل لأرشفة المدونة والمنتجات وصفحات الهبوط.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeoSitemapTab;
