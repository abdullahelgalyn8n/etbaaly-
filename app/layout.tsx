import type { Metadata, Viewport } from "next";
import { Lateef } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CountryProvider } from "@/context/CountryContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { OrganizationSchema } from "@/components/JsonLd";
import FacebookPixel from "@/components/FacebookPixel";
import StoreMainWrapper from "@/components/StoreMainWrapper";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { siteConfig } from "@/data/siteConfig";

const lateef = Lateef({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-lateef",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1d1d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "إطبعلي | Etbaaly - مطابع وحلول طباعة وتغليف متكاملة",
    template: `%s | إطبعلي - Etbaaly`,
  },
  description: siteConfig.description,
  keywords: [
    "إطبعلي",
    "Etbaaly",
    "طباعة وتغليف مصر",
    "مطابع أوفست القاهرة",
    "علب كرتون منتجات",
    "كروت شخصية فاخرة",
    "أكياس ورقية مطبوعة",
    "ستيكرات داي كت",
    "تتبع شحنات الطباعة",
    "A.Z Agency",
  ],
  authors: [{ name: "Etbaaly & A.Z Agency Print Production Team", url: siteConfig.url }],
  creator: "إطبعلي | Etbaaly (A.Z Agency)",
  publisher: "إطبعلي | Etbaaly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    title: "إطبعلي | Etbaaly - مطابع وحلول طباعة وتغليف متكاملة",
    description: siteConfig.description,
    siteName: "إطبعلي | Etbaaly",
    images: [
      {
        url: "/images/brand-hero-business.webp",
        width: 1200,
        height: 630,
        alt: "إطبعلي | Etbaaly - حلول الطباعة الرقمية والأوفست والتغليف الفاخر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إطبعلي | Etbaaly - مطابع وحلول طباعة وتغليف متكاملة",
    description: siteConfig.description,
    images: ["/images/brand-hero-business.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${lateef.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/images/brand-hero-business-sm.webp" type="image/webp" media="(max-width: 640px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/brand-hero-business.webp" type="image/webp" media="(min-width: 641px)" fetchPriority="high" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <OrganizationSchema />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1630628135121340&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen bg-[#f8f9fa] dark:bg-[#1d1d1d] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-[#c93b41]/20 selection:text-[#c93b41] flex flex-col justify-between overflow-x-hidden text-lg">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <FacebookPixel />
              <Navbar />
              <StoreMainWrapper>{children}</StoreMainWrapper>
              <Footer />
              <CountryProvider>
                <FloatingWhatsApp />
              </CountryProvider>
              <AuthModal />
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
</body>
    </html>
  );
}
