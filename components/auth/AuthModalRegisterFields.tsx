import React from "react";
import { User, Building2, Phone } from "lucide-react";

interface AuthModalRegisterFieldsProps {
  fullName: string;
  setFullName: (val: string) => void;
  username: string;
  setUsername: (val: string) => void;
  companyName: string;
  setCompanyName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
}

export function AuthModalRegisterFields({
  fullName,
  setFullName,
  username,
  setUsername,
  companyName,
  setCompanyName,
  phone,
  setPhone,
}: AuthModalRegisterFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          الاسم بالكامل: <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثال: أحمد عبد الرحمن"
            className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          اسم المستخدم (Username): <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            required
            dir="ltr"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
            placeholder="ahmed_99"
            className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          رقم الهاتف / الواتساب للتواصل: <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="tel"
            required
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010XXXXXXXX"
            className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
          اسم المؤسسة / الشركة (اختياري):
        </label>
        <div className="relative">
          <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="اسم الشركة أو البراند..."
            className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
          />
        </div>
      </div>
    </>
  );
}

export default AuthModalRegisterFields;
