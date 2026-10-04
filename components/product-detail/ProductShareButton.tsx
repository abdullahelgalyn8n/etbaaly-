"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Share2,
  Check,
  Copy,
  ChevronDown,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ProductShareButtonProps {
  title: string;
  category?: string;
  className?: string;
}

export function ProductShareButton({
  title,
  category,
  className = "",
}: ProductShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        setHasNativeShare(true);
      }
    }
  }, []);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  };

  const handleCopyLink = async () => {
    const url = currentUrl || (typeof window !== "undefined" ? window.location.href : "");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setIsCopied(true);
      triggerToast("تم نسخ رابط المنتج بنجاح إلى الحافظة ✨");
      setTimeout(() => {
        setIsCopied(false);
      }, 2500);
    } catch {
      triggerToast("يرجى نسخ الرابط يدوياً من شريط العنوان");
    }
  };

  const handleNativeShare = async () => {
    const url = currentUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `شاهد منتج "${title}" من إطبعلي للطباعة الفاخرة والتصنيع:`,
          url,
        });
        setIsOpen(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const shareText = `شاهد منتج "${title}" على منصة إطبعلي للطباعة المخصصة:`;

  const socialLinks = [
    {
      name: "واتساب",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.834.843 2.806.844h.005c3.178 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.079-1.09-1.089-2.539-1.688-4.085-1.688zm9.969 5.766c-.002 5.515-4.487 10-10 10-1.748 0-3.376-.452-4.793-1.242l-5.207 1.364 1.388-5.074c-.889-1.474-1.388-3.197-1.388-5.048.002-5.515 4.487-10 10-10 2.671 0 5.182 1.04 7.071 2.929 1.89 1.889 2.929 4.4 2.929 7.071z" />
        </svg>
      ),
      bgHover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + currentUrl)}`,
    },
    {
      name: "تليجرام",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
      bgHover: "hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-500/20",
      href: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "فيسبوك",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bgHover: "hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-500/20",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "منصة X",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bgHover: "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/10",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className={`relative inline-block text-right ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`group relative px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all duration-200 select-none shadow-xs active:scale-95 border ${
          isCopied
            ? "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700/50"
            : isOpen
            ? "bg-slate-100 dark:bg-[#2c2f37] text-[#c93b41] border-[#c93b41]/40 shadow-sm"
            : "bg-white hover:bg-slate-50 dark:bg-[#202227] dark:hover:bg-[#282b32] text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.16]"
        }`}
        title="مشاركة هذا المنتج"
      >
        {isCopied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in duration-200" />
        ) : (
          <Share2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#c93b41] dark:text-slate-400 dark:group-hover:text-[#e04b4f] transition-colors" />
        )}
        <span>{isCopied ? "تم النسخ!" : "مشاركة"}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#c93b41] dark:text-[#e04b4f]" : ""
          }`}
        />
      </button>

      {/* Share Popover Menu */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={menuRef}
            role="dialog"
            aria-label="قائمة مشاركة المنتج"
            className="absolute left-0 mt-2 w-76 sm:w-80 max-w-[calc(100vw-2rem)] z-50 bg-white/95 dark:bg-[#1a1c21]/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 text-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-500/10 text-[#c93b41] dark:text-[#e04b4f] flex items-center justify-center">
                  <Share2 className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    مشاركة المنتج
                  </h4>
                  {category && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {category}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
                title="إغلاق"
                aria-label="إغلاق"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Copy Link Box */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                رابط المنتج المباشر:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.08] rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  aria-label="رابط المنتج"
                  className="flex-1 bg-transparent px-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 select-all outline-hidden truncate text-left dir-ltr"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 shadow-xs ${
                    isCopied
                      ? "bg-emerald-600 text-white shadow-emerald-500/20"
                      : "bg-[#c93b41] hover:bg-[#ba3239] text-white active:scale-95"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                مشاركة سريعة عبر:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#202227] transition-all duration-150 text-xs font-bold ${item.bgHover} group`}
                  >
                    <span className="transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Native System Share (if supported) */}
            {hasNativeShare && (
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#252830] dark:hover:bg-[#2e313b] text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c93b41]" />
                  <span>مشاركة عبر تطبيقات أخرى على هاتفك</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-950 shadow-2xl border border-white/10 dark:border-slate-900/10 backdrop-blur-md text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductShareButton;
