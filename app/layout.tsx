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
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StoreMainWrapper from "@/components/StoreMainWrapper";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { siteConfig } from "@/data/siteConfig";
import { WebMCP } from "@/components/WebMCP";

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
    <html lang="ar" dir="rtl" className={lateef.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__name=window.__name||function(t,v){return t};",
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="service-desc" href="/openapi.json" type="application/json" />
        <link rel="oauth-authorization-server" href="/.well-known/oauth-authorization-server" type="application/json" />
        <link rel="openid-configuration" href="/.well-known/openid-configuration" type="application/json" />
        <link rel="oauth-protected-resource" href="/.well-known/oauth-protected-resource" type="application/json" />
        <link rel="service-desc" href="/.well-known/poppy.json" type="application/json" />
        <link rel="service-desc" href="/.well-known/x402.json" type="application/json" />
                <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function s(){var mc=(typeof document!=='undefined'&&document.modelContext)?document.modelContext:(typeof navigator!=='undefined'&&navigator.modelContext)?navigator.modelContext:null;var t=window.__webmcp_tools||[];window.__webmcp_tools=t;if(!mc){mc={tools:t,getTools:function(){return t;},listTools:function(){return t;},registerTool:function(o,p){t.push(o);if(p&&p.signal){p.signal.addEventListener('abort',function(){var i=t.indexOf(o);if(i!==-1)t.splice(i,1);});}return Promise.resolve();}};try{Object.defineProperty(document,'modelContext',{value:mc,writable:true,configurable:true});}catch(e){document.modelContext=mc;}try{Object.defineProperty(navigator,'modelContext',{value:mc,writable:true,configurable:true});}catch(e){navigator.modelContext=mc;}}var l=[{name:'search-products',description:'Search products in the Etbaaly printing and packaging catalog.',inputSchema:{type:'object',properties:{query:{type:'string',description:'Search keyword.'},category:{type:'string',description:'Category filter.'}}},execute:async function(p){return fetch('/api/products'+(p&&p.category?'?category='+encodeURIComponent(p.category):'')).then(function(r){return r.json();}).then(function(d){return{content:[{type:'text',text:JSON.stringify(d)}]};});}},{name:'track-order',description:'Track custom printing runs, packaging manufacturing, or shipping courier status by tracking code.',inputSchema:{type:'object',required:['trackingCode'],properties:{trackingCode:{type:'string',description:'Order tracking number.'}}},execute:async function(p){return fetch('/api/orders/track?trackingCode='+encodeURIComponent((p&&p.trackingCode)||'')).then(function(r){return r.json();}).then(function(d){return{content:[{type:'text',text:JSON.stringify(d)}]};});}},{name:'request-quote',description:'Request a custom packaging manufacturing estimate or offset printing quotation.',inputSchema:{type:'object',required:['name','phone','serviceType'],properties:{name:{type:'string'},phone:{type:'string'},serviceType:{type:'string'},quantity:{type:'number'}}},execute:async function(p){return fetch('/api/quotes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p||{})}).then(function(r){return r.json();}).then(function(d){return{content:[{type:'text',text:JSON.stringify(d)}]};});}},{name:'calculate-shipping',description:'Calculate domestic shipping delivery time and fees across Egyptian governorates.',inputSchema:{type:'object',required:['governorate'],properties:{governorate:{type:'string'}}},execute:async function(p){return fetch('/api/shipping?governorate='+encodeURIComponent((p&&p.governorate)||'')).then(function(r){return r.json();}).then(function(d){return{content:[{type:'text',text:JSON.stringify(d)}]};});}}];var c=typeof AbortController!=='undefined'?new AbortController():null;var g=c?c.signal:undefined;l.forEach(function(o){try{var r=mc.registerTool(o,{signal:g});if(r&&typeof r.catch==='function')r.catch(function(){});}catch(e){}});}s();if(typeof document!=='undefined'&&document.readyState==='loading'){document.addEventListener('DOMContentLoaded',s);}if(typeof window!=='undefined'){window.addEventListener('load',s);}})();`,
          }}
        />
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
      <body className="min-h-screen bg-[#f8f9fa] dark:bg-[#1d1d1d] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-[#c93b41]/20 selection:text-[#c93b41] flex flex-col justify-between text-lg">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <FacebookPixel />
              <GoogleAnalytics />
              <Navbar />
              <StoreMainWrapper>{children}</StoreMainWrapper>
              <Footer />
              <CountryProvider>
                <FloatingWhatsApp />
              </CountryProvider>
              <AuthModal />
              <CartDrawer />
              <WebMCP />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
</body>
    </html>
  );
}
