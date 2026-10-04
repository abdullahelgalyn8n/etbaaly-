"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export default function BrandedImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "/images/brand-hero-business.webp",
  onLoad,
  priority,
  ...props
}: BrandedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [hasError, setHasError] = useState<boolean>(false);
  const isPriority = Boolean(priority);
  const [isLoaded, setIsLoaded] = useState<boolean>(isPriority);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-slate-100 dark:bg-[#15171c]",
        containerClassName
      )}
    >
      {/* Skeleton Shimmer Overlay: only for non-priority lazy images to prevent delaying LCP render */}
      {!isPriority && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200/80 dark:bg-[#27282d] animate-shimmer z-0" />
      )}

      <Image
        {...props}
        priority={priority}
        src={imgSrc || fallbackSrc}
        alt={alt || "A.Z Agency"}
        className={cn(
          className,
          isPriority
            ? "opacity-100"
            : cn(
                "transition-opacity duration-500 ease-in-out",
                !isLoaded && !hasError ? "opacity-0" : "opacity-100"
              )
        )}
        onError={handleError}
        onLoad={handleLoad}
      />

      {hasError && !imgSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1d] to-[#0f1012] flex flex-col items-center justify-center text-center p-4 z-10">
          <div className="w-10 h-10 rounded-full bg-[#c93b41]/20 flex items-center justify-center text-[#c93b41] mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white/80">A.Z Agency</span>
        </div>
      )}
    </div>
  );
}
