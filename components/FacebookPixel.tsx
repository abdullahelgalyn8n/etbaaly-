"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";

function PixelTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (pathname) {
      pageview();
    }
  }, [pathname]);

  return null;
}

export default function FacebookPixel() {
  useEffect(() => {
    if (typeof window === "undefined" || !FB_PIXEL_ID) return;

    let loaded = false;

    const initPixel = () => {
      if (loaded) return;
      loaded = true;

      // Clean up event listeners
      window.removeEventListener("scroll", initPixel);
      window.removeEventListener("mousemove", initPixel);
      window.removeEventListener("touchstart", initPixel);
      window.removeEventListener("click", initPixel);
      window.removeEventListener("keydown", initPixel);

      // Initialize Facebook Pixel
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */

      if (window.fbq) {
        window.fbq("init", FB_PIXEL_ID);
        window.fbq("track", "PageView");
      }
    };

    // Attach interaction listeners
    window.addEventListener("scroll", initPixel, { passive: true, once: true });
    window.addEventListener("mousemove", initPixel, { passive: true, once: true });
    window.addEventListener("touchstart", initPixel, { passive: true, once: true });
    window.addEventListener("pointerdown", initPixel, { passive: true, once: true });
    window.addEventListener("click", initPixel, { passive: true, once: true });
    window.addEventListener("keydown", initPixel, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", initPixel);
      window.removeEventListener("mousemove", initPixel);
      window.removeEventListener("touchstart", initPixel);
      window.removeEventListener("pointerdown", initPixel);
      window.removeEventListener("click", initPixel);
      window.removeEventListener("keydown", initPixel);
    };
  }, []);

  return <PixelTracker />;
}
