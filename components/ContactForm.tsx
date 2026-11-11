"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/data/siteConfig";
import { trackEvent } from "@/lib/fpixel";

const ETBAALY_SERVICE_OPTIONS = [
  { value: "packaging-boxes", label: "علب الكرتون وتغليف المنتجات (Custom Packaging)" },
  { value: "offset-commercial", label: "طباعة الأوفست التجارية والكميات الكبيرة" },
  { value: "corporate-stationery", label: "المطبوعات المكتبية وبروفايل الشركات" },
  { value: "paper-bags", label: "الأكياس الورقية والقماشية المخصصة" },
  { value: "stickers-labels", label: "الستيكرات والليبل المقصوص داي-كت" },
  { value: "displays-uniforms", label: "مطبوعات المعارض، الرول أب، واليونيفورم" },
  { value: "laser-signage-gifts", label: "تجهيزات المقرات، اليافطات، وهدايا الليزر" },
  { value: "outdoor-cladding-signage", label: "واجهات الكلادينج والحروف البارزة 3D" },
  { value: "hoodies-printing-private-label", label: "طباعة الهوديز وتصنيع الملابس للغير" },
  { value: "sample-box", label: "طلب بوكس عينات الخامات والتشطيبات (Sample Box)" },
  { value: "consulting", label: "استشارة تسعير ومواصفات إنتاج مخصصة" },
] as const;

const VALID_SERVICE_VALUES = new Set<string>(ETBAALY_SERVICE_OPTIONS.map((opt) => opt.value));

const subscribePopState = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};

const getServiceFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get("service") || params.get("type");
  return serviceParam && VALID_SERVICE_VALUES.has(serviceParam)
    ? serviceParam
    : "packaging-boxes";
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [userService, setUserService] = useState<string | null>(null);
  const urlService = useSyncExternalStore(subscribePopState, getServiceFromUrl, () => "packaging-boxes");
  const selectedService = userService ?? urlService;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    trackEvent("Lead", {
      service: selectedService,
      content_name: "Contact Form Submission",
    });

    setTimeout(() => {
      setStatus("success");
      const text = `طلب تسعير واستشارة طباعة جديد من منصة إطبعلي (Etbaaly):\n- الاسم: ${formData.name}\n- البريد: ${formData.email}\n- الهاتف: ${formData.phone}\n- القسم المطلوب: ${selectedService}\n- التفاصيل: ${formData.message}`;
      window.open(getWhatsAppUrl(text), "_blank");
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-[#13161f] border border-slate-200 dark:border-[#1f2533] rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-lg dark:shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-[radial-gradient(circle,rgba(200,35,44,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />

      {status === "success" ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950 dark:text-white">تم استلام طلبك بنجاح!</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto font-medium">
            شكراً لتواصلك مع إطبعلي (Etbaaly). تم توجيه رسالتك لمسؤول الحسابات وسنقوم بالتواصل معك فوراً عبر الواتساب.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1a1f2c] text-[#c8232c] dark:text-red-400 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            إرسال رسالة أخرى
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                الاسم الكامل <span className="text-[#c8232c]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أحمد محمد"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c8232c] focus:ring-1 focus:ring-[#c8232c] text-sm transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                البريد الإلكتروني <span className="text-[#c8232c]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c8232c] focus:ring-1 focus:ring-[#c8232c] text-sm transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                رقم الهاتف / الواتساب <span className="text-[#c8232c]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010XXXXXXXX"
                dir="ltr"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c8232c] focus:ring-1 focus:ring-[#c8232c] text-sm transition-all text-right font-medium"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                نوع الخدمة المطلوبة
              </label>
              <select
                id="contact-service"
                aria-label="نوع الخدمة المطلوبة"
                value={selectedService}
                onChange={(e) => setUserService(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] text-slate-950 dark:text-white focus:outline-none focus:border-[#c8232c] focus:ring-1 focus:ring-[#c8232c] text-sm transition-all font-medium"
              >
                {ETBAALY_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              مواصفات الطلب والكمية <span className="text-[#c8232c]">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="اكتب الكمية المطلوبة، المقاسات، نوع الورق أو الكرتون، وأي تشطيبات مثل السلوفان أو البصمة..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0c0e12] border border-slate-200 dark:border-[#1f2533] text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#c8232c] focus:ring-1 focus:ring-[#c8232c] text-sm transition-all resize-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-4 px-6 rounded-xl bg-[#c8232c] hover:bg-[#b81d24] text-white font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span>جاري الإرسال والتجهيز...</span>
            ) : (
              <>
                <Send className="w-4 h-4 shrink-0" />
                <span>إرسال الطلب وحجز استشارة مجانية</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
