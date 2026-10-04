"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full transition-all duration-300 bg-slate-100 dark:bg-[#1a1c20] hover:bg-slate-200 dark:hover:bg-[#24272d] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c93b41]/40 flex items-center justify-center shadow-sm cursor-pointer group"
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      title={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-slate-200 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 group-hover:text-slate-950 group-hover:-rotate-12 transition-all duration-300" />
      )}
    </button>
  );
}
