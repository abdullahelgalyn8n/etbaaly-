import React from "react";
import { Building2, ShieldAlert } from "lucide-react";

interface LoginFormHeaderProps {
  activeRole: "client" | "admin";
}

export function LoginFormHeader({ activeRole }: LoginFormHeaderProps) {
  return (
    <div className="text-center space-y-2 relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-1 border shadow-xs">
        {activeRole === "admin" ? (
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>لوحة التحكم الرئيسية (Site Admin)</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>بوابة الشركات وحسابات B2B المعتمدة</span>
          </span>
        )}
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
        {activeRole === "admin"
          ? "تسجيل دخول مشرف المنصة والمطبعة"
          : "تسجيل الدخول إلى حساب شركتك"}
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
        {activeRole === "admin"
          ? "إدارة خطوط إنتاج الطباعة، استوديو تجهيز الطبقات، وتعديل أسعار وعروض الخدمات."
          : "متابعة أوامر التشغيل لحظياً، سحب الفواتير الضريبية، وإدارة مقايسات الإنتاج."}
      </p>
    </div>
  );
}

export default LoginFormHeader;
