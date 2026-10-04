"use client";

import React, { useState } from "react";
import { ShieldCheck, Code, CheckCircle2, Save, Building, Share2 } from "lucide-react";

export function SeoGlobalSchemaTab() {
  const [siteName, setSiteName] = useState("مطبعة ومنصة إطبعلي (Etbaaly)");
  const [siteDescription, setSiteDescription] = useState("المنصة الرائدة في خدمات الطباعة الرقمية والأوفست، التغليف الفاخر، وحلول الهويات البصرية في مصر والعالم العربي.");
  const [telephone, setTelephone] = useState("+201000000000");
  const [priceRange, setPriceRange] = useState("$$");
  const [addressLocality, setAddressLocality] = useState("القاهرة، جمهورية مصر العربية");
  const [facebook, setFacebook] = useState("https://facebook.com/etbaaly");
  const [instagram, setInstagram] = useState("https://instagram.com/etbaaly");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/etbaaly");
  const [savedNotice, setSavedNotice] = useState(false);

  const globalSchemaJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteName,
    "description": siteDescription,
    "url": "https://etbaaly.com",
    "logo": "https://etbaaly.com/logo.png",
    "telephone": telephone,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": addressLocality,
      "addressCountry": "EG"
    },
    "sameAs": [facebook, instagram, linkedin].filter(Boolean)
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Settings */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#c93b41]" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              بيانات المنشأة والهيكل المنظم (Organization / LocalBusiness)
            </h3>
          </div>
          {savedNotice && (
            <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              تم الحفظ!
            </span>
          )}
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-500 font-bold block mb-1">اسم المؤسسة أو العلامة التجارية:</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">الوصف التعريفي للشركة (Schema Description):</label>
            <textarea
              rows={2}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-500 font-bold block mb-1">رقم خدمة العملاء:</label>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
              />
            </div>
            <div>
              <label className="text-slate-500 font-bold block mb-1">الموقع الجغرافي والفرع الرئيسي:</label>
              <input
                type="text"
                value={addressLocality}
                onChange={(e) => setAddressLocality(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-500" />
              روابط الشبكات الاجتماعية (SameAs):
            </span>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook URL"
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono"
            />
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram URL"
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 btn-crimson text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer mt-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>حفظ إعدادات الهيكل العام</span>
          </button>
        </div>
      </div>

      {/* JSON-LD Schema Code Output */}
      <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                كود Schema JSON-LD التفاعلي المولد
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Valid JSON-LD
            </span>
          </div>

          <pre className="mt-3 p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed max-h-[380px]">
            {JSON.stringify(globalSchemaJson, null, 2)}
          </pre>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#121316] rounded-xl border border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-500 space-y-1">
          <div className="font-bold text-slate-700 dark:text-slate-300">💡 كيف تعمل هذه الميزة؟</div>
          <p>
            يتم حقن هذا الكود تلقائياً في الوسم &lt;head&gt; لجميع صفحات المتجر والمدونة لمساعدة Google Knowledge Graph ومحركات AEO مثل ChatGPT و Perplexity على فهم هوية مطبعة إطبعلي.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeoGlobalSchemaTab;
