"use client";

import React from "react";
import { usePathname } from "next/navigation";
import FooterBrand from "./footer/FooterBrand";
import FooterLinks from "./footer/FooterLinks";
import FooterCopyright from "./footer/FooterCopyright";

export default function Footer() {
  const pathname = usePathname();

  // Hide store footer in admin dashboard and configurator studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-slate-100 dark:bg-[#07090c] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden text-slate-600 dark:text-[#a8abb4]">
      {/* Subtle brand red glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(201,59,65,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          <FooterBrand />
          <FooterLinks />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
}
