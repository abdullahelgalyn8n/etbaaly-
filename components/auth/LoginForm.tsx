"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoginRoleTabs } from "./LoginRoleTabs";
import { LoginQuickDemoButtons } from "./LoginQuickDemoButtons";
import LoginFormHeader from "./LoginFormHeader";
import LoginPasswordField from "./LoginPasswordField";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const { login, switchRole } = useAuth();
  const [activeRole, setActiveRole] = useState<"client" | "admin">(
    roleParam === "admin" ? "admin" : "client"
  );
  const [email, setEmail] = useState(
    roleParam === "admin" ? "admin@etbaaly.com" : "client@azagency.online"
  );
  const [password, setPassword] = useState(
    roleParam === "admin" ? "admin123456" : "demo123456"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (roleParam === "admin") {
      setActiveRole("admin");
      setEmail("admin@etbaaly.com");
      setPassword("admin123456");
    } else if (roleParam === "client") {
      setActiveRole("client");
      setEmail("client@azagency.online");
      setPassword("demo123456");
    }
  }, [roleParam]);

  const handleRoleTabChange = (role: "client" | "admin") => {
    setActiveRole(role);
    setError(null);
    if (role === "admin") {
      setEmail("admin@etbaaly.com");
      setPassword("admin123456");
    } else {
      setEmail("client@azagency.online");
      setPassword("demo123456");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login({ email, password, role: activeRole });
      if (success) {
        if (activeRole === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("بيانات الدخول غير صحيحة، يرجى التحقق من البريد وكلمة المرور.");
      }
    } catch (err) {
      setError("حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickClientLogin = () => {
    setLoading(true);
    setError(null);
    try {
      switchRole("client");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = () => {
    setLoading(true);
    setError(null);
    try {
      switchRole("admin");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <LoginRoleTabs activeRole={activeRole} onRoleChange={handleRoleTabChange} />

      {/* Main Login Box */}
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow Accent */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
            activeRole === "admin" ? "bg-red-600" : "bg-blue-600"
          }`}
        />

        <LoginFormHeader activeRole={activeRole} />

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {activeRole === "admin"
                ? "اسم المستخدم أو البريد الإلكتروني الإداري:"
                : "اسم المستخدم (Username) أو البريد الإلكتروني:"}
            </label>
            <div className="relative">
              <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeRole === "admin" ? "assem_admin أو admin@etbaaly.com" : "ahmed_99 أو user@company.com"}
                className="w-full pr-10 pl-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] font-medium transition-all"
              />
            </div>
          </div>

          <LoginPasswordField
            password={password}
            setPassword={setPassword}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all ${
                activeRole === "admin"
                  ? "bg-[#c93b41] hover:bg-[#a82d32] text-white shadow-red-500/20"
                  : "btn-crimson text-white"
              }`}
            >
              <span>
                {loading
                  ? "جاري التحقق من الصلاحيات..."
                  : activeRole === "admin"
                  ? "دخول لوحة تحكم الموقع (Admin)"
                  : "تسجيل الدخول إلى حساب العميل"}
              </span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        <LoginQuickDemoButtons
          loading={loading}
          activeRole={activeRole}
          onQuickClientLogin={handleQuickClientLogin}
          onQuickAdminLogin={handleQuickAdminLogin}
        />
      </div>
    </div>
  );
}

export default LoginForm;
