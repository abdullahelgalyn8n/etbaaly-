"use client";

import React from "react";
import { Building2, ShieldCheck } from "lucide-react";

interface LoginRoleTabsProps {
  activeRole: "client" | "admin";
  onRoleChange: (role: "client" | "admin") => void;
}

export function LoginRoleTabs({ activeRole, onRoleChange }: LoginRoleTabsProps) {
  return (
    <div className="bg-slate-200/80 dark:bg-[#1a1c22] p-1.5 rounded-2xl flex items-center mb-6 shadow-inner border border-slate-300 dark:border-white/[0.08]">
      <button
        type="button"
        onClick={() => onRoleChange("client")}
        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          activeRole === "client"
            ? "bg-white dark:bg-[#262830] text-[#c93b41] shadow-md dark:text-white"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span>بوابة عملاء الشركات</span>
      </button>

      <button
        type="button"
        onClick={() => onRoleChange("admin")}
        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          activeRole === "admin"
            ? "bg-gradient-to-r from-red-600 to-[#c93b41] text-white shadow-md"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>إدارة الموقع والمشرفين</span>
      </button>
    </div>
  );
}
