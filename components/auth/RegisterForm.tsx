"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  AtSign, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterCompanyFields from "@/components/auth/RegisterCompanyFields";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  hideHeader?: boolean;
}

export function RegisterForm({ onSwitchToLogin, hideHeader = false }: RegisterFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  
  // Default to individual for instant, frictionless signup
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");

  // Core essential states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Company B2B states (shown only when company tab is selected)
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [commercialReg, setCommercialReg] = useState("");

  // Optional extra details
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username: username.trim() || undefined,
          email,
          phone,
          password,
          companyName: accountType === "company" ? companyName : "",
          taxNumber: accountType === "company" ? taxNumber : "",
          commercialReg: accountType === "company" ? commercialReg : "",
          address: address.trim() || "",
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        await login({ email, password });
        router.push("/dashboard");
      } else {
        setError(data.error || "تعذر إنشاء الحساب، يرجى مراجعة البيانات والمحاولة مجدداً.");
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع أثناء التسجيل. يرجى التحقق من اتصالك بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <RegisterHeader
          accountType={accountType}
          setAccountType={setAccountType}
        />
      )}

      {hideHeader && (
        <div className="flex bg-slate-100 dark:bg-[#141518] p-1.5 rounded-2xl border border-slate-200 dark:border-white/[0.08] mb-4">
          <button
            type="button"
            onClick={() => setAccountType("individual")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              accountType === "individual"
                ? "bg-white dark:bg-[#262830] text-[#c93b41] shadow-sm"
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
                ? "bg-white dark:bg-[#262830] text-[#c93b41] shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>حساب شركات (B2B)</span>
          </button>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold leading-relaxed">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Row 1: Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              رقم الهاتف / الواتساب: <span className="text-red-500">*</span>
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
                className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            البريد الإلكتروني: <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>
        </div>

        {/* Row 3: Password with Visibility Toggle */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            كلمة المرور: <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (6 أحرف أو أكثر)"
              className="w-full pr-9 pl-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Company Fields (Only when B2B account is selected) */}
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

        {/* Optional Extra Fields Accordion */}
        <div className="border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={() => setShowExtraFields(!showExtraFields)}
            className="w-full px-3.5 py-2.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span>خيارات إضافية (اسم مستخدم مخصص، عنوان التسليم)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">(اختياري)</span>
            </span>
            {showExtraFields ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showExtraFields && (
            <div className="p-3.5 border-t border-slate-200 dark:border-white/[0.08] space-y-3 bg-white dark:bg-[#1a1c22]">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    اسم المستخدم (Username):
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    يُنشأ تلقائياً من بريدك إن تركته فارغاً
                  </span>
                </div>
                <div className="relative">
                  <AtSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    dir="ltr"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="ahmed_99"
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    عنوان التسليم المبدئي:
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    يمكنك تحديده لاحقاً عند الشحن
                  </span>
                </div>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="المحافظة، الحي، الشارع..."
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl btn-crimson text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all hover:brightness-105 active:scale-[0.99]"
          >
            <span>{loading ? "جاري إنشاء الحساب..." : accountType === "company" ? "إنشاء حساب شركة وتفعيل المزايا" : "إنشاء حساب عميل جديد"}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Feature Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08] text-center text-[10px] text-slate-600 dark:text-slate-400 font-medium">
        <div className="flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>تسجيل فوري</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#c93b41]" />
          <span>حماية البيانات</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>أسعار الجملة</span>
        </div>
      </div>

      {/* Login Switcher */}
      <div className="text-center text-xs text-slate-700 dark:text-slate-300 font-medium">
        لديك حساب بالفعل؟{" "}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#c93b41] font-bold hover:underline cursor-pointer"
          >
            تسجيل الدخول هنا
          </button>
        ) : (
          <Link href="/login" className="text-[#c93b41] font-bold hover:underline">
            تسجيل الدخول هنا
          </Link>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
