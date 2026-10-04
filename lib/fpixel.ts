export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1630628135121340";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

// Track page views
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    window.fbq("track", "PageView");
  }
};

// Track standard Meta events (Lead, Contact, ViewContent, etc.)
export const trackEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    window.fbq("track", name, options);
  }
};

// Track custom events (e.g. WhatsAppClick, OfferingClick)
export const trackCustomEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    window.fbq("trackCustom", name, options);
  }
};
