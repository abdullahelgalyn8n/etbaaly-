"use client";

import React, { useState } from "react";
import { Download, CheckCircle2, ShieldCheck, Sparkles, Send } from "lucide-react";
import { trackEvent } from "@/lib/fpixel";
import { siteConfig } from "@/data/siteConfig";

interface LeadMagnetProps {
  categoryTag?: string;
  sourceArticle?: string;
}

export default function LeadMagnetCard({ categoryTag = "all", sourceArticle = "" }: LeadMagnetProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    website: "",
  });

  const getMagnetDetails = () => {
    switch (categoryTag) {
      case "packaging":
        return {
          badge: "كتالوج فني مجاني للشركات والمتاجر",
          title: "كتالوج خامات التغليف ومخططات سكاكين العلب القياسية (Dielines Guide 2026)",
          desc: "دليل مصور ومقاسات جاهزة لأكثر من 50 نموذج علبة كرتون، هارد بوكس، وأكياس شحن مع معايير اختيار الجراماج ونوع السلوفان المناسب لمنتجك.",
          fileName: "Etbaaly-Packaging-Dielines-Catalog-2026.pdf",
        };
      case "signage":
        return {
          badge: "دليل المواصفات الفنية لليافط",
          title: "دليل خامات وتراخيص يافط المحلات والكلادينج والنيون ليد 2026",
          desc: "مقارنة شاملة بين سماكات الكلادينج المقاوم للحريق، أنواع الأكريليك، درجات عزل الليدات IP68، واشتراطات المظهر الحضاري والتراخيص.",
          fileName: "Etbaaly-Signage-Cladding-Guide-2026.pdf",
        };
      case "stickers":
        return {
          badge: "دليل خامات الرول ليبل والاستيكر",
          title: "كتالوج عينات وخامات الاستيكرات المقاومة للماء والزيوت والحرارة",
          desc: "جدول مقارنة تفصيلي بين الفينيل، الشفاف، الهولوجرام، والورقي، مع اختبارات قوة الالتصاق على الزجاج والبلاستيك لخطوط الإنتاج والتعبئة.",
          fileName: "Etbaaly-Stickers-Labels-Guide-2026.pdf",
        };
      case "offset":
      case "prepress":
      case "finishes":
        return {
          badge: "دليل التجهيز الطباعي والتشطيبات",
          title: "دليل فحص ملفات الطباعة وضبط ألوان CMYK والتشطيبات الفاخرة",
          desc: "قائمة فحص تقنية شاملة تشمل ضبط هوامش النزيف (Bleed)، مطابقة أحبار Pantone، وتطبيقات السبوت UV والفويل الحراري بدون أخطاء.",
          fileName: "Etbaaly-Prepress-Finishes-Guide-2026.pdf",
        };
      case "branding":
      case "design":
        return {
          badge: "أداة تدقيق مجانية للشركات",
          title: "قائمة تدقيق الهوية البصرية وفحص جودة المطبوعات التجارية 2026",
          desc: "دليل عملي لفحص مدى اتساق علامتك التجارية، جودة المطبوعات الرسمية، وتطابق ألوان الهوية عبر كافة المواد الإعلانية.",
          fileName: "Etbaaly-Brand-Print-Checklist-2026.pdf",
        };
      case "gifts":
      case "uniforms":
      case "bags":
      default:
        return {
          badge: "كتالوج الخامات والعينات المجانية",
          title: "تحميل كتالوج الخامات والمقاسات القياسية للطباعة والتغليف 2026",
          desc: "كتالوج شامل يضم مواصفات الخامات الورقية، الكرتون المضلع، الأكياس، الهدايا الترويجية، وجداول المقاسات القياسية المعتمدة لدى إطبعلي.",
          fileName: "Etbaaly-Printing-Materials-Catalog-2026.pdf",
        };
    }
  };

  const magnet = getMagnetDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setLoading(true);

    try {
      // Track Meta Pixel Lead event
      trackEvent("Lead", {
        content_name: magnet.title,
        content_category: categoryTag,
        source_article: sourceArticle,
      });

      // Send lead to internal API/Webhook if configured
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            magnetTitle: magnet.title,
            categoryTag,
            sourceArticle,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // Fallback gracefully
      }

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1d1d1d] via-[#262626] to-[#1a1c20] border border-[#c93b41]/30 text-white shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(201,59,65,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c93b41]/20 border border-[#c93b41]/40 text-[#c93b41] text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{magnet.badge}</span>
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>تحميل مجاني وفوري 100%</span>
          </span>
        </div>

        <h3 className="text-lg sm:text-2xl font-black text-white mb-2 leading-snug">
          {magnet.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          {magnet.desc}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">الاسم أو اسم الشركة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبدالله - شركة الرواد"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#c93b41] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">رقم الواتساب أو الإيميل *</label>
                <input
                  type="text"
                  required
                  placeholder="010xxxxxxx أو email@company.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#c93b41] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full btn-crimson text-white font-bold text-xs shadow-lg hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>جاري التجهيز...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>تحميل الدليل المجاني الآن</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-400">
                🔒 لا نرسل رسائل مزعجة إطلاقاً، خصوصيتك مضمونة بالكامل.
              </span>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>تم إعداد الدليل بنجاح! شكرًا لاهتمامك يا {formData.name}.</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              إذا كنت ترغب في مراجعة مخصصة لشركتك مباشرة مع مستشارينا، يمكنك التواصل الفوري عبر الواتساب.
            </p>
            <div className="pt-2">
              <a
                href={`${siteConfig.social.whatsapp}?text=${encodeURIComponent(
                  `مرحبًا إطبعلي، قمت بتحميل (${magnet.title}) وأرغب في استشارة تسعير / عينات لشركتي.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>متابعة الاستشارة عبر الواتساب مباشرة</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
