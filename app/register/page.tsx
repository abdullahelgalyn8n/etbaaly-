"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterCompanyFields from "@/components/auth/RegisterCompanyFields";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState<"company" | "individual">("company");

  // Form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [commercialReg, setCommercialReg] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          phone,
          password,
          companyName: accountType === "company" ? companyName : "",
          taxNumber: accountType === "company" ? taxNumber : "",
          commercialReg: accountType === "company" ? commercialReg : "",
          address,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        await login({ email, password });
        router.push("/dashboard");
      } else {
        setError(data.error || "تعذر إنشاء الحساب، يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع أثناء التسجيل.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
        <RegisterHeader
          accountType={accountType}
          setAccountType={setAccountType}
        />

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                الاسم بالكامل: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: أحمد عبد الرحمن"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                اسم المستخدم (Username): <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="ahmed_99"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                رقم الهاتف / الواتساب للتواصل: <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                البريد الإلكتروني للعمل: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          {accountType === "company" && (
            <RegisterCompanyFields
              companyName={companyName}
              setCompanyName={setCompanyName}
              taxNumber={taxNumber}
              setTaxNumber={setTaxNumber}
              commercialReg={commercialReg}
              setCommercialReg={setCommercialReg}
            />
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              البريد الإلكتروني للعمل:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              عنوان التسليم والمقر:
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="المحافظة، الحي، اسم الشارع، رقم المبنى..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              كلمة المرور: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all"
            >
              <span>{loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب وتفعيل المزايا"}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08] text-center text-xs text-slate-700 dark:text-slate-300 font-medium">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-[#c93b41] font-bold hover:underline">
            تسجيل الدخول هنا
          </Link>
        </div>
      </div>
    </div>
  );
}
