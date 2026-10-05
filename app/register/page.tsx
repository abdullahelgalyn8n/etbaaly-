"use client";

import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-9 shadow-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}
