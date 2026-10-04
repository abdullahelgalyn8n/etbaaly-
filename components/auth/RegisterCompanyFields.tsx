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
    <>
      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          اسم المؤسسة / العلامة التجارية:
        </label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="اسم الشركة أو المصنع..."
          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            رقم البطاقة الضريبية (اختياري):
          </label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            placeholder="XXX-XXX-XXX"
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-mono"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            السجل التجاري (اختياري):
          </label>
          <input
            type="text"
            value={commercialReg}
            onChange={(e) => setCommercialReg(e.target.value)}
            placeholder="رقم السجل..."
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs font-mono"
          />
        </div>
      </div>
    </>
  );
}

export default RegisterCompanyFields;
