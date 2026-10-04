"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAdminMenuItems } from "./adminMenuItems";
import { useAdminNotifications } from "@/context/AdminNotificationContext";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (o: boolean) => void;
  activeOrdersCount: number;
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  activeOrdersCount,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { unreadCount } = useAdminNotifications();
  const menuItems = getAdminMenuItems(activeOrdersCount, unreadCount);

  return (
    <aside
      className={`bg-white dark:bg-[#18191c] border-l border-slate-200 dark:border-white/[0.08] transition-all duration-300 z-30 flex flex-col justify-between select-none shadow-xs ${
        isCollapsed ? "w-16" : "w-60"
      } ${
        isMobileOpen
          ? "fixed inset-y-0 right-0 z-50 shadow-2xl block w-64 pt-12"
          : "hidden md:flex"
      }`}
    >
      {/* Sidebar Nav Items */}
      <div className="py-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <div key={item.title} className="group relative px-2">
              <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#c93b41] to-[#ba3239] text-white font-bold shadow-md shadow-red-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                }`}
                title={isCollapsed ? item.title : undefined}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:scale-110"
                    }`}
                  />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-white text-[#c93b41]"
                        : "bg-[#c93b41] text-white shadow-xs"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Sub-items (WordPress Flyout / Accordion style) */}
              {!isCollapsed && item.subItems && isActive && (
                <div className="mt-1 mr-4 pr-3 border-r-2 border-[#c93b41]/40 space-y-1">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      target={sub.href.includes("configurator") ? "_blank" : undefined}
                      rel={sub.href.includes("configurator") ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-2.5 py-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-[#c93b41] dark:hover:text-[#e04b4f] hover:bg-slate-50 dark:hover:bg-white/[0.02] rounded-lg transition-colors"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Collapsed Tooltip Flyout */}
              {isCollapsed && (
                <div className="hidden group-hover:block absolute right-full top-0 mr-2 w-48 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-2xl p-2.5 z-50 text-right animate-fadeIn">
                  <div className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.08] pb-1.5 mb-1.5">
                    {item.title}
                  </div>
                  {item.subItems?.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block py-1 px-2 text-[11px] text-slate-600 dark:text-slate-400 hover:text-[#c93b41] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.05] rounded-lg"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Collapse Button at Bottom */}
      <div className="hidden md:block p-3 border-t border-slate-100 dark:border-white/[0.06]">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-xl text-xs transition-colors cursor-pointer"
          title="طي / توسيع القائمة الجانبية"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-xs font-medium">طي القائمة الجانبية</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
