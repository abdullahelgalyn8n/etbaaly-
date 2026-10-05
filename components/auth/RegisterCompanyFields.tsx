import React from "react";

interface RegisterCompanyFieldsProps {
  companyName: string;
  setCompanyName: (val: string) => void;
  taxNumber: string;
  setTaxNumber: (val: string) => void;
  commercialReg: string;
  setCommercialReg: (val: string) => void;
}

export function RegisterCompanyFields({
  companyName,
  setCompanyName,
  taxNumber,
  setTaxNumber,
  commercialReg,
  setCommercialReg,
}: RegisterCompanyFieldsProps) {
  return (
    <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-3 transition-all">
      <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-bold">
        <span>بيانات المنشأة (للفواتير الضريبية وتسهيلات B2B)</span>
        <span className="text-[10px] text-amber-600/80 font-normal">اختيارية ما عدا الاسم</span>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          اسم المؤسسة / العلامة التجارية: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="مثال: شركة النور للحلول المتكاملة أو براند كذا"
          className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            رقم التسجيل الضريبي <span className="text-[10px] text-slate-400 font-normal">(اختياري)</span>:
          </label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            placeholder="XXX-XXX-XXX"
            className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            السجل التجاري <span className="text-[10px] text-slate-400 font-normal">(اختياري)</span>:
          </label>
          <input
            type="text"
            value={commercialReg}
            onChange={(e) => setCommercialReg(e.target.value)}
            placeholder="رقم السجل التجاري..."
            className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterCompanyFields;
