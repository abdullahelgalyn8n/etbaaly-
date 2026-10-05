import React from "react";
import Link from "next/link";
import { Building2, User } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface RegisterHeaderProps {
  accountType: "company" | "individual";
  setAccountType: (type: "company" | "individual") => void;
}

export function RegisterHeader({ accountType, setAccountType }: RegisterHeaderProps) {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block py-1 hover:opacity-85 transition-opacity">
          <BrandLogo className="w-auto h-8 mx-auto" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {accountType === "company" ? "حساب شركات ومؤسسات (B2B)" : "إنشاء حساب عميل جديد"}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          {accountType === "company"
            ? "احصل على أسعار مخفضة للكميات، تسهيلات سداد، وفواتير إلكترونية معتمدة."
            : "سجل حسابك في ثوانٍ لمتابعة طلبات الطباعة والأسعار الفورية لحظة بلحظة."}
        </p>
      </div>

      <div className="flex bg-slate-100 dark:bg-[#1c1c1c] p-1.5 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
        <button
          type="button"
          onClick={() => setAccountType("individual")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            accountType === "individual"
              ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <User className="w-4 h-4" />
          <span>حساب أفراد (سريع)</span>
        </button>
        <button
          type="button"
          onClick={() => setAccountType("company")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            accountType === "company"
              ? "bg-white dark:bg-[#282828] text-[#c93b41] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>حساب شركات ومطابع (B2B)</span>
        </button>
      </div>
    </div>
  );
}

export default RegisterHeader;
