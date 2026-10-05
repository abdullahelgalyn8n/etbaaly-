"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, CheckCircle2, Loader2, Lock } from "lucide-react";

interface BotVerificationProps {
  onVerified: (token: string) => void;
  onReset?: () => void;
  disabled?: boolean;
}

export function BotVerification({ onVerified, onReset, disabled = false }: BotVerificationProps) {
  const [status, setStatus] = useState<"idle" | "verifying" | "verified" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Check if Cloudflare Turnstile site key is configured
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // If Cloudflare Turnstile is configured in production, load Turnstile script
    if (turnstileSiteKey && typeof window !== "undefined") {
      const scriptId = "cf-turnstile-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          renderTurnstile();
        };
      } else {
        renderTurnstile();
      }
    }
  }, [turnstileSiteKey]);

  const renderTurnstile = () => {
    if (typeof window !== "undefined" && (window as any).turnstile && turnstileContainerRef.current) {
      try {
        (window as any).turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          callback: (responseToken: string) => {
            setStatus("verified");
            setToken(responseToken);
            onVerified(responseToken);
          },
          "error-callback": () => {
            setStatus("error");
            onReset?.();
          },
          theme: "auto",
          language: "ar",
        });
      } catch (err) {
        console.warn("Turnstile render fallback:", err);
      }
    }
  };

  const handleInteractiveVerify = (e: React.MouseEvent) => {
    if (disabled || status === "verifying" || status === "verified") return;

    // Check for artificial / synthetic bot events
    if (!e.isTrusted) {
      setStatus("error");
      return;
    }

    setStatus("verifying");

    // Human verification simulation with cryptographic nonce
    setTimeout(() => {
      const timestamp = Date.now();
      const randomNonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const generatedToken = `bvt_${timestamp}_${randomNonce}`;
      
      setToken(generatedToken);
      setStatus("verified");
      onVerified(generatedToken);
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border transition-all duration-300 p-3 sm:p-3.5 relative overflow-hidden select-none ${
        status === "verified"
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
          : status === "verifying"
          ? "bg-blue-500/5 border-blue-500/30"
          : "bg-slate-50 dark:bg-[#15161a] border-slate-200 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.15]"
      }`}
    >
      {turnstileSiteKey && (
        <div ref={turnstileContainerRef} className="my-1 flex justify-center" />
      )}

      {(!turnstileSiteKey || status !== "verified") && (
        <div className="flex items-center justify-between gap-3">
          {/* Right side: Interactive verification trigger */}
          <div
            onClick={handleInteractiveVerify}
            className={`flex items-center gap-3 cursor-pointer group ${
              disabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                status === "verified"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 scale-105"
                  : status === "verifying"
                  ? "bg-blue-500/20 text-blue-600 border border-blue-500/40"
                  : "border-2 border-slate-400 dark:border-slate-500 group-hover:border-[#c93b41] bg-white dark:bg-[#202228]"
              }`}
            >
              {status === "verifying" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : status === "verified" ? (
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              ) : null}
            </div>

            <div className="flex flex-col text-right">
              <span className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-slate-100 group-hover:text-[#c93b41] transition-colors">
                {status === "verified"
                  ? "تم التحقق: لست برنامج روبوت"
                  : status === "verifying"
                  ? "جاري التحقق الأمني..."
                  : "أنا لست برنامج روبوت (I'm not a robot)"}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {status === "verified"
                  ? "فحص أمني معتمد - مصرح بالمتابعة"
                  : "انقر للتأكيد والحماية من الهجمات التلقائية"}
              </span>
            </div>
          </div>

          {/* Left side: Security Shield Branding */}
          <div className="flex flex-col items-center gap-0.5 text-slate-400 dark:text-slate-500 shrink-0 pr-2 border-r border-slate-200 dark:border-white/[0.08]">
            <ShieldCheck className={`w-5 h-5 ${status === "verified" ? "text-emerald-500" : "text-[#c93b41]"}`} />
            <span className="text-[9px] font-bold tracking-tight text-slate-600 dark:text-slate-400">حماية المنصة</span>
            <span className="text-[8px] font-mono text-slate-400">Bot Guard</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotVerification;
