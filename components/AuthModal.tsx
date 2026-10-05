"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Lock, Mail, ArrowLeft, Sparkles } from "lucide-react";
import AuthModalRegisterFields from "@/components/auth/AuthModalRegisterFields";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === "register") {
        const res = await fetch("/api/auth/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            username,
            email,
            phone,
            password,
            companyName,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.error || "تعذر إنشاء الحساب.");
          setLoading(false);
          return;
        }
      }

      const success = await login({ email, password });
      if (!success) {
        setError("بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.");
      } else {
        closeAuthModal();
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCorporate = () => {
    setEmail("client@azagency.online");
    setPassword("demo123456");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1f1f1f] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 dark:border-white/[0.08] mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`pb-3 text-sm font-bold flex-1 text-center transition-all cursor-pointer ${
              tab === "login"
                ? "border-b-2 border-[#c93b41] text-[#c93b41]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`pb-3 text-sm font-bold flex-1 text-center transition-all cursor-pointer ${
              tab === "register"
                ? "border-b-2 border-[#c93b41] text-[#c93b41]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            حساب شركة / عميل جديد
          </button>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {tab === "login" ? "بوابة عملاء إطبعلي | Etbaaly" : "إنشاء حساب ومساحة أعمال"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {tab === "login"
              ? "تابع طلبات الطباعة، فواتيرك الضريبية، وسجل الشحنات من مكان واحد."
              : "استمتع بأسعار الشركات وتسهيلات السداد ومتابعة الإنتاج لحظياً."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-3.5">
          {tab === "register" && (
            <AuthModalRegisterFields
              fullName={fullName}
              setFullName={setFullName}
              username={username}
              setUsername={setUsername}
              companyName={companyName}
              setCompanyName={setCompanyName}
              phone={phone}
              setPhone={setPhone}
            />
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              {tab === "login" ? "اسم المستخدم أو البريد الإلكتروني:" : "البريد الإلكتروني للعمل: *"}
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={tab === "login" ? "text" : "email"}
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tab === "login" ? "ahmed_99 أو name@company.com" : "name@company.com"}
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">كلمة المرور:</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
            >
              <span>{loading ? "جاري المعالجة..." : tab === "login" ? "دخول إلى حسابي" : "إنشاء الحساب وتفعيل المزايا"}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Demo Fast Login Shortcut */}
        {tab === "login" && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.08] text-center">
            <button
              type="button"
              onClick={fillDemoCorporate}
              className="text-xs font-bold text-[#c93b41] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              تجربة دخول سريع بحساب شركة تجريبي
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
