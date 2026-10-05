"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, ShieldAlert, User, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoginRoleTabs } from "./LoginRoleTabs";
import { LoginQuickDemoButtons } from "./LoginQuickDemoButtons";
import LoginFormHeader from "./LoginFormHeader";
import LoginPasswordField from "./LoginPasswordField";
import { RegisterForm } from "./RegisterForm";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const tabParam = searchParams.get("tab") || searchParams.get("mode");

  const { login, switchRole } = useAuth();
  
  // Auth Mode: "login" or "register"
  const [authMode, setAuthMode] = useState<"login" | "register">(
    tabParam === "register" ? "register" : "login"
  );

  const [activeRole, setActiveRole] = useState<"client" | "admin">(
    roleParam === "admin" ? "admin" : "client"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "register") {
      setAuthMode("register");
    } else if (tabParam === "login") {
      setAuthMode("login");
    }
  }, [tabParam]);

  useEffect(() => {
    if (roleParam === "admin") {
      setActiveRole("admin");
    } else if (roleParam === "client") {
      setActiveRole("client");
    }

    // Only pre-fill demo credentials in local testing or development environment
    const isLocal =
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local") ||
          window.location.search.includes("dev_demo=true")));

    if (isLocal) {
      if (roleParam === "admin") {
        setEmail("admin@etbaaly.com");
        setPassword("admin123456");
      } else if (roleParam === "client") {
        setEmail("client@azagency.online");
        setPassword("demo123456");
      }
    }
  }, [roleParam]);

  const handleRoleTabChange = (role: "client" | "admin") => {
    setActiveRole(role);
    setError(null);
    const isLocal =
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local") ||
          window.location.search.includes("dev_demo=true")));

    if (isLocal) {
      if (role === "admin") {
        setEmail("admin@etbaaly.com");
        setPassword("admin123456");
      } else {
        setEmail("client@azagency.online");
        setPassword("demo123456");
      }
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login({ email, password, role: activeRole });
      if (success) {
        const saved = typeof window !== "undefined" ? localStorage.getItem("etbaaly_user_session") : null;
        const parsed = saved ? JSON.parse(saved) : null;
        const isAdmin = parsed?.role === "admin" || parsed?.email?.toLowerCase().includes("admin") || roleParam === "admin";
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("بيانات الدخول غير صحيحة، يرجى التحقق من اسم المستخدم أو البريد وكلمة المرور.");
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
      {/* Top Main Mode Switcher: Login vs Register */}
      <div className="bg-slate-200/80 dark:bg-[#1a1c22] p-1.5 rounded-2xl flex items-center mb-6 shadow-inner border border-slate-300 dark:border-white/[0.08]">
        <button
          type="button"
          onClick={() => {
            setAuthMode("login");
            setError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            authMode === "login"
              ? "bg-white dark:bg-[#262830] text-[#c93b41] shadow-md dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <User className="w-4 h-4 text-[#c93b41]" />
          <span>تسجيل الدخول</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAuthMode("register");
            setError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            authMode === "register"
              ? "bg-white dark:bg-[#262830] text-[#c93b41] shadow-md dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>إنشاء حساب جديد</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow Accent */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
            authMode === "register" ? "bg-amber-500" : "bg-blue-600"
          }`}
        />

        {authMode === "register" ? (
          <RegisterForm onSwitchToLogin={() => setAuthMode("login")} hideHeader={false} />
        ) : (
          <>
            {/* Quick Register Banner for New Visitors */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-2 text-xs relative z-10">
              <span className="text-amber-800 dark:text-amber-300 font-medium">
                جديد في إطبعلي؟ ليس لديك حساب بعد؟
              </span>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="text-[#c93b41] dark:text-red-400 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>إنشاء حساب جديد في 30 ثانية</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <LoginFormHeader isAdminExplicit={roleParam === "admin"} />

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
                  اسم المستخدم (Username) أو البريد الإلكتروني:
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="اسم المستخدم أو name@example.com"
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
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all btn-crimson text-white"
                >
                  <span>
                    {loading
                      ? "جاري التحقق من الصلاحيات..."
                      : "تسجيل الدخول"}
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
              onSwitchToRegister={() => setAuthMode("register")}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
