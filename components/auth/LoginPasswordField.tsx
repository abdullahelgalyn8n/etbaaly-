import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface LoginPasswordFieldProps {
  password: string;
  setPassword: (val: string) => void;
}

export function LoginPasswordField({ password, setPassword }: LoginPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          كلمة المرور:
        </label>
        <button
          type="button"
          onClick={() =>
            alert("لاستعادة كلمة المرور، يرجى مراجعة الدعم الفني المباشر عبر واتساب المنصة.")
          }
          className="text-[11px] font-bold text-[#c93b41] hover:underline cursor-pointer"
        >
          نسيت كلمة المرور؟
        </button>
      </div>
      <div className="relative">
        <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full pr-10 pl-10 py-3 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] font-medium transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default LoginPasswordField;
