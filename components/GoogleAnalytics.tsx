"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === "undefined") return;

    const initGA = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      // Clean up event listeners
      window.removeEventListener("scroll", initGA);
      window.removeEventListener("mousemove", initGA);
      window.removeEventListener("touchstart", initGA);
      window.removeEventListener("pointerdown", initGA);
      window.removeEventListener("click", initGA);
      window.removeEventListener("keydown", initGA);

      // Inject GTAG Script asynchronously
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      // Init dataLayer
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
    };

    // Attach interaction listeners
    window.addEventListener("scroll", initGA, { passive: true, once: true });
    window.addEventListener("mousemove", initGA, { passive: true, once: true });
    window.addEventListener("touchstart", initGA, { passive: true, once: true });
    window.addEventListener("pointerdown", initGA, { passive: true, once: true });
    window.addEventListener("click", initGA, { passive: true, once: true });
    window.addEventListener("keydown", initGA, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", initGA);
      window.removeEventListener("mousemove", initGA);
      window.removeEventListener("touchstart", initGA);
      window.removeEventListener("pointerdown", initGA);
      window.removeEventListener("click", initGA);
      window.removeEventListener("keydown", initGA);
    };
  }, []);

  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === "undefined" || !(window as any).gtag) return;
    const url = pathname + (window.location.search || "");
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }, [pathname]);

  return null;
}
