"use client";

import React, { useState } from "react";
import { Building2, CheckCircle2 } from "lucide-react";

interface DashboardProfileTabProps {
  user: any;
  updateProfile: (profile: any) => void;
}

export default function DashboardProfileTab({ user, updateProfile }: DashboardProfileTabProps) {
  const [companyName, setCompanyName] = useState(user?.company_name || "");
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [taxNumber, setTaxNumber] = useState(user?.tax_number || "");
  const [address, setAddress] = useState(user?.address || "");
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      company_name: companyName,
      full_name: fullName,
      phone,
      tax_number: taxNumber,
      address,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3500);
  };

  return (
    <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
      <div className="pb-5 border-b border-slate-100 dark:border-white/[0.08] text-center sm:text-right">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
          <Building2 className="w-5 h-5 text-[#c93b41]" />
          الملف التجاري والضريبي للشركة
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          تُستخدم هذه البيانات لإصدار الفواتير الضريبية الإلكترونية واعتماد تسليمات الشحن الرسمية.
        </p>
      </div>

      {profileSaved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>تم تحديث بيانات الملف التجاري والضريبي بنجاح!</span>
        </div>
      )}

      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            الاسم التجاري للمنشأة / الشركة:
          </label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="مثال: شركة النور للحلول والمنتجات"
            className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              رقم التسجيل الضريبي (9 أرقام):
            </label>
            <input
              type="text"
              required
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder="748-291-832"
              className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              اسم المسؤول المفوض:
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="م. أحمد عبد الرحمن"
              className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              رقم الهاتف للتواصل وإشعارات الشحن:
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              البريد الإلكتروني للعمل (المسجل):
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full px-3.5 py-3 rounded-xl bg-slate-100 dark:bg-[#191a1e] border border-slate-200 dark:border-white/[0.05] text-xs font-medium text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            عنوان المقر الرئيسي والتسليم:
          </label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="اسم الشارع، رقم المبنى، الحي، المدينة..."
            className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all"
          >
            حفظ بيانات المنشأة الضريبية
          </button>
        </div>
      </form>
    </div>
  );
}
