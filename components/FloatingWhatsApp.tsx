"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCountry } from "@/context/CountryContext";
import { trackEvent } from "@/lib/fpixel";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { country, getWhatsAppUrl } = useCountry();

  // Hide WhatsApp floating button in admin pages and configurator studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const dynamicMsg = `مرحباً مطابع إطبعلي (Etbaaly)، أتواصل معكم من ${country.name} للاستفسار عن خدمات الطباعة والتغليف المتاحة.`;
  const whatsappUrl = getWhatsAppUrl(dynamicMsg);

  return (
    <aside
      aria-label="زر التواصل المباشر عبر واتساب"
      className="fixed bottom-6 right-6 z-50 flex items-center group select-none"
      dir="rtl"
    >
      {/* Floating Button Anchor with Green Circle Background */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا مباشرة عبر واتساب"
        onClick={() => {
          trackEvent("Contact", { method: "whatsapp_floating", country: country.name });
        }}
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25d266] text-white shadow-xl shadow-[#25d266]/35 hover:shadow-2xl hover:shadow-[#25d266]/50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25d266]/40"
      >
        {/* Crisp Shadow Ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-[#25d266]/30 pointer-events-none"></span>

        {/* Provided WhatsApp SVG (Rendered crisp in white inside the green circle) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="w-8 h-8 md:w-9 md:h-9 fill-white transition-transform duration-300 group-hover:scale-105"
        >
          <path d="M13.6,2.33C12.12.83,10.1,0,7.99,0,3.63,0,.07,3.56.06,7.93c0,1.4.37,2.76,1.06,3.96l-1.12,4.11,4.2-1.1c1.16.63,2.47.97,3.79.97h0c4.37,0,7.93-3.56,7.93-7.93,0-2.1-.84-4.12-2.33-5.61h0ZM7.99,14.52c-1.18,0-2.34-.32-3.36-.92l-.24-.14-2.49.65.67-2.43-.16-.25c-.66-1.05-1.01-2.26-1.01-3.51C1.41,4.3,4.36,1.34,8,1.34c1.75,0,3.43.69,4.66,1.93,1.24,1.23,1.93,2.91,1.93,4.66,0,3.64-2.96,6.59-6.59,6.59h0ZM11.61,9.59c-.2-.1-1.17-.58-1.35-.65-.18-.06-.31-.1-.44.1-.13.2-.51.65-.63.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.59-.98-.59-.52-.99-1.18-1.1-1.37-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.07-.13.03-.25-.01-.35-.05-.1-.45-1.08-.61-1.47-.16-.39-.32-.34-.45-.34-.11,0-.25,0-.38,0-.2,0-.39.09-.53.25-.18.2-.69.68-.69,1.65s.71,1.92.81,2.05c.1.13,1.39,2.13,3.38,2.99.47.2.84.33,1.13.42.48.15.9.13,1.25.08.38-.06,1.17-.48,1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23h0Z" />
        </svg>
      </a>
    </aside>
  );
}
