import React from "react";
import AZLogo from "./AZLogo";

export default function BrandLogo({
  className = "w-auto h-8",
  showSubtext = true,
}: {
  className?: string;
  showSubtext?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official A.Z Agency Geometric Vector Logo */}
      <div className="text-[#c93b41] flex items-center justify-center shrink-0">
        <AZLogo className="w-8 h-6 sm:w-9 sm:h-6.5 transition-transform duration-300 group-hover:scale-105" />
      </div>

      <div className="flex flex-col justify-center leading-none select-none">
        <div className="flex items-baseline gap-1.5">
          <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
            إطبعلي<span className="text-[#c93b41]">.</span>
          </span>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold uppercase">
            ETBAALY
          </span>
        </div>
        {showSubtext && (
          <span className="text-[8.5px] font-medium tracking-tight text-slate-500 dark:text-slate-400 mt-0.5">
            A.Z Agency Print Production
          </span>
        )}
      </div>
    </div>
  );
}
