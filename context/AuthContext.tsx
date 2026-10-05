"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role?: "admin" | "client";
  company_name?: string;
  phone: string;
  tax_number?: string;
  commercial_reg?: string;
  address?: string;
  created_at?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register" | "sample";
  openAuthModal: (tab?: "login" | "register" | "sample") => void;
  closeAuthModal: () => void;
  login: (credentials: { email: string; password?: string; role?: "admin" | "client"; botToken?: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  switchRole: (role: "admin" | "client") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register" | "sample">("login");

  useEffect(() => {
    // Load persisted mock session from localStorage if present
    try {
      const savedUser = localStorage.getItem("etbaaly_user_session");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.role === "admin" || parsed.email?.includes("admin")) {
          fetch("/api/auth/session/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          }).catch(() => {});
        }
      }
    } catch {
      console.warn("Storage access failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = (tab: "login" | "register" | "sample" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async ({ email, password, role, botToken }: { email: string; password?: string; role?: "admin" | "client"; botToken?: string }) => {
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password || "123456", role, botToken }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("etbaaly_user_session", JSON.stringify(data.user));
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("etbaaly_user_session");
    fetch("/api/auth/logout/", { method: "POST" }).catch(() => {});
  };

  const switchRole = (newRole: "admin" | "client") => {
    if (newRole === "admin") {
      const adminUser: UserProfile = {
        id: "usr-admin-01",
        username: "assem_admin",
        email: "admin@etbaaly.com",
        full_name: "م. عاصم (مدير منصة إطبعلي)",
        role: "admin",
        company_name: "إدارة إطبعلي المركزية - A.Z",
        phone: "01099887766",
        tax_number: "990-112-400",
        address: "المقر الرئيسي - مدينة نصر، القاهرة",
      };
      setUser(adminUser);
      localStorage.setItem("etbaaly_user_session", JSON.stringify(adminUser));
      fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminUser),
      }).catch(() => {});
    } else {
      const clientUser: UserProfile = {
        id: "usr-demo-01",
        username: "ahmed_abdelrahman",
        email: "client@azagency.online",
        full_name: "م. أحمد عبد الرحمن",
        role: "client",
        company_name: "شركة النور للحلول والمنتجات",
        phone: "01012345678",
        tax_number: "748-291-832",
        address: "التجمع الخامس، القاهرة الجديدة",
      };
      setUser(clientUser);
      localStorage.setItem("etbaaly_user_session", JSON.stringify(clientUser));
      fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "client" }),
      }).catch(() => {});
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("etbaaly_user_session", JSON.stringify(updated));
  };

  const isAdmin = Boolean(user?.role === "admin" || user?.email?.toLowerCase().includes("admin"));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        updateProfile,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
