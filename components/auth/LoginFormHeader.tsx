import React from "react";
import { ShieldCheck, UserCheck } from "lucide-react";

interface LoginFormHeaderProps {
  isAdminExplicit?: boolean;
}

export function LoginFormHeader({ isAdminExplicit = false }: LoginFormHeaderProps) {
  return (
    <div className="text-center space-y-2 relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-1 border shadow-xs">
        {isAdminExplicit ? (
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>تسجيل دخول المسؤولين (Admin Portal)</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] px-2.5 py-0.5 rounded-full">
            <UserCheck className="w-3.5 h-3.5 text-[#c93b41]" />
            <span>بوابة العملاء والمستخدمين</span>
          </span>
        )}
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
        {isAdminExplicit ? "تسجيل دخول مشرف المنصة" : "تسجيل الدخول إلى حسابك"}
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
        {isAdminExplicit
          ? "أدخل بيانات حساب الإدارة المصرح له للمتابعة إلى لوحة التحكم."
          : "أدخل اسم المستخدم أو البريد الإلكتروني وكلمة المرور للوصول إلى حسابك ومتابعة الطلبات."}
      </p>
    </div>
  );
}

export default LoginFormHeader;
