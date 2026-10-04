"use client";

import React, { useState } from "react";
import { PackageOpen, Sparkles, CheckCircle2, X, Send, ShieldCheck, Truck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SampleBoxModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [companyName, setCompanyName] = useState(user?.company_name || "");
  const [contactName, setContactName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState("القاهرة الجديدة / التجمع");
  const [address, setAddress] = useState(user?.address || "");
  const [industry, setIndustry] = useState("أغذية ومطاعم");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      if (user.company_name) setCompanyName(user.company_name);
      if (user.full_name) setContactName(user.full_name);
      if (user.phone) setPhone(user.phone);
      if (user.address) setAddress(user.address);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated || !user) {
      setError("غير مسموح بطلب بوكس العينات التجاري إلا بعد تسجيل الدخول بحساب موثق.");
      openAuthModal("login");
      return;
    }

    if (!user.phone || !user.full_name || !user.username) {
      setError("بيانات حسابك غير مكتملة. يرجى كتابة اسمك الكامل ورقم الهاتف واسم المستخدم لتأكيد شحن بوكس العينات.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sample-box", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          company_name: companyName,
          contact_name: contactName || user.full_name,
          phone: phone || user.phone,
          city,
          address,
          industry,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "تعذر إرسال طلب العينات، يرجى المحاولة لاحقاً.");
      }
    } catch (e) {
      console.error(e);
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1f1f1f] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              تم طلب بوكس العينات الفاخر بنجاح!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              سيقوم فريق التجهيز بشحن بوكس عينات الخامات والتشطيبات (أوراق كوشيه، كرافت، دوبلكس، سبوت UV، وبصمة ذهبية وفضية) إلى مقر شركتكم مجاناً خلال 48 ساعة.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl btn-crimson text-white text-xs font-bold shadow-md cursor-pointer"
              >
                إغلاق والعودة للموقع
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-[#c93b41] flex items-center justify-center shrink-0">
                <PackageOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#c93b41] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  خدمة مخصصة للشركات والعلامات التجارية
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  اطلب بوكس عينات الخامات مجاناً (Sample Box)
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              عاينة ملموسة لكافة خامات الورق، الكرتون المقوى، نماذج السلوفان، السكينة، والبصمة الحرارية قبل بدء طباعة كمياتكم.
            </p>

            {/* Auth Notice */}
            {!isAuthenticated && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
                <span>يلزم تسجيل الدخول أو إنشاء حساب لطلب بوكس العينات التجاري.</span>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="font-bold underline text-[#c93b41] cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">اسم الشركة / البراند:</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="مثال: شركة أفق للاستثمار"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">اسم المستلم المسؤول:</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="الاسم ثلاثي..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف / الواتساب:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">المجال أو قطاع العمل:</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  >
                    <option value="أغذية ومطاعم وكافيهات">أغذية ومطاعم وكافيهات</option>
                    <option value="مستحضرات تجميل وعطور">مستحضرات تجميل وعطور</option>
                    <option value="شركات أدوية ومستلزمات طبية">شركات أدوية ومستلزمات طبية</option>
                    <option value="ملابس وأزياء ومتاجر إلكترونية">ملابس وأزياء ومتاجر إلكترونية</option>
                    <option value="مؤسسات عقارية ومقاولات">مؤسسات عقارية ومقاولات</option>
                    <option value="شركات برمجيات وحلول رقمية">شركات برمجيات وحلول رقمية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">عنوان التسليم التفصيلي:</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="المحافظة، الحي، اسم الشارع، رقم المبنى والدور..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "جاري المعالجة..." : "إرسال طلب بوكس العينات المجاني"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 pt-1">
                <Truck className="w-3.5 h-3.5 text-emerald-500" />
                <span>الشحن والتوصيل مجاني 100% لكافة محافظات مصر للشركات المسجلة</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
