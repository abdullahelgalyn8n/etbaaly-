"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/context/AuthContext";
import CartNavButton from "@/components/cart/CartNavButton";
import NavbarDesktopActions from "./navbar/NavbarDesktopActions";
import NavbarMobileDrawer from "./navbar/NavbarMobileDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Store Navbar in Admin Dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "خدمات الطباعة والتغليف", href: "/services/" },
    { name: "معرض المنتجات", href: "/products/" },
    { name: "المدونة والمقالات", href: "/blog/" },
    { name: "تواصل معنا", href: "/contact/" },
  ];

  const whatsappInstantPrintUrl = `${siteConfig.social.whatsapp}?text=${encodeURIComponent(
    "مرحباً، أرغب في الاستفسار عن خدمة إطبع صورتك فوراً وإرسال الصورة للطباعة."
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#111215]/95 border-b border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-2xl py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center group py-1"
            aria-label="إطبعلي - منصة الطباعة المتكاملة"
            title="إطبعلي | Etbaaly"
          >
            <BrandLogo className="w-auto h-8 sm:h-9" />
            <span className="sr-only">إطبعلي | Etbaaly - مطابع وحلول طباعة وتغليف متكاملة</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-full p-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && !link.href.startsWith("/#") && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={false}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "text-white btn-crimson shadow-md"
                      : "text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#24272d]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Desktop Buttons */}
          <NavbarDesktopActions
            isAuthenticated={isAuthenticated}
            pathname={pathname}
            whatsappInstantPrintUrl={whatsappInstantPrintUrl}
          />

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <CartNavButton />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Component */}
      <NavbarMobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        isAuthenticated={isAuthenticated}
        whatsappInstantPrintUrl={whatsappInstantPrintUrl}
      />
    </header>
  );
}
