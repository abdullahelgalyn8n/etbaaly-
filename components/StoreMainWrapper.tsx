"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function StoreMainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={isAdmin ? "flex-grow" : "flex-grow pt-20"}>
      {children}
    </main>
  );
}
