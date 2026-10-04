"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { COUNTRY_META, CountryMeta, DEFAULT_COUNTRY_CODE } from "@/data/countryMeta";
import { siteConfig } from "@/data/siteConfig";

interface CountryContextType {
  countryCode: string;
  country: CountryMeta;
  setCountryCode: (code: string) => void;
  isAutoDetected: boolean;
  getWhatsAppUrl: (customMessage?: string) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<string>(DEFAULT_COUNTRY_CODE);
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    // 1. Check if user already manually selected a country
    const saved = localStorage.getItem("az_selected_country");
    if (saved && COUNTRY_META[saved]) {
      setCountryCodeState(saved);
      setIsAutoDetected(false);
      return;
    }

    // 2. Instant Zero-Latency Timezone Heuristics
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Riyadh") || tz.includes("Saudi")) {
        setCountryCodeState("SA");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Dubai")) {
        setCountryCodeState("AE");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Kuwait")) {
        setCountryCodeState("KW");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Qatar")) {
        setCountryCodeState("QA");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Muscat")) {
        setCountryCodeState("OM");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Bahrain")) {
        setCountryCodeState("BH");
        setIsAutoDetected(true);
        return;
      } else if (tz.includes("Cairo")) {
        setCountryCodeState("EG");
        setIsAutoDetected(true);
        return;
      }
    } catch {
      // ignore
    }

    // 3. Fallback: Idle Cloudflare trace detection
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(async () => {
        try {
          const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
          if (!isLocal) {
            const traceRes = await fetch("/cdn-cgi/trace", { cache: "no-store" }).catch(() => null);
            if (traceRes && traceRes.ok) {
              const text = await traceRes.text();
              const match = text.match(/loc=([A-Z]{2})/);
              if (match && match[1] && COUNTRY_META[match[1]]) {
                setCountryCodeState(match[1]);
                setIsAutoDetected(true);
              }
            }
          }
        } catch {
          // ignore
        }
      });
    }
  }, []);

  const setCountryCode = (code: string) => {
    if (COUNTRY_META[code]) {
      setCountryCodeState(code);
      localStorage.setItem("az_selected_country", code);
      setIsAutoDetected(false);
    }
  };

  const currentCountry = useMemo(() => {
    return COUNTRY_META[countryCode] || COUNTRY_META[DEFAULT_COUNTRY_CODE];
  }, [countryCode]);

  const getWhatsAppUrl = (customMessage?: string) => {
    const baseMsg =
      customMessage ||
      `مرحباً A.Z Agency، أود الاستفسار عن باقات وخدمات الوكالة المتاحة في ${currentCountry.name}.`;
    return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(baseMsg)}`;
  };

  return (
    <CountryContext.Provider
      value={{
        countryCode,
        country: currentCountry,
        setCountryCode,
        isAutoDetected,
        getWhatsAppUrl,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    const defaultCountry = COUNTRY_META[DEFAULT_COUNTRY_CODE];
    return {
      countryCode: DEFAULT_COUNTRY_CODE,
      country: defaultCountry,
      setCountryCode: () => {},
      isAutoDetected: false,
      getWhatsAppUrl: (customMsg?: string) => {
        const baseMsg =
          customMsg ||
          `مرحباً A.Z Agency، أود الاستفسار عن باقات وخدمات الوكالة المتاحة في ${defaultCountry.name}.`;
        return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(baseMsg)}`;
      },
    };
  }
  return context;
}
