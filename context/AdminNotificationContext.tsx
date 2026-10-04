"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AdminNotification, NotificationType } from "@/lib/db/types";
import { useAuth } from "@/context/AuthContext";

interface AdminNotificationContextType {
  notifications: AdminNotification[];
  unreadCount: number;
  isLoading: boolean;
  isRefreshing: boolean;
  audioEnabled: boolean;
  browserNotificationsEnabled: boolean;
  latestToast: AdminNotification | null;
  toggleAudio: () => void;
  requestBrowserPermission: () => Promise<boolean>;
  dismissToast: () => void;
  markAsRead: (id: string, read?: boolean) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  triggerTestNotification: (type?: NotificationType) => Promise<void>;
  refresh: () => Promise<void>;
}

const AdminNotificationContext = createContext<
  AdminNotificationContextType | undefined
>(undefined);

// Web Audio synthesizer chime sound
function playNotificationChime() {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.12); // A5

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(880.0, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28); // D6

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.25);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.52);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 600);
  } catch (err) {
    // Audio might be blocked by autoplay policies until user interaction
  }
}

export function AdminNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useAuth();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] =
    useState<boolean>(false);
  const [latestToast, setLatestToast] = useState<AdminNotification | null>(null);

  const prevIdsRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef<boolean>(true);

  // Load sound setting from localStorage
  useEffect(() => {
    try {
      const storedAudio = localStorage.getItem("etbaaly_admin_audio_notif");
      if (storedAudio !== null) {
        setAudioEnabled(storedAudio === "true");
      }
      if (typeof window !== "undefined" && "Notification" in window) {
        setBrowserNotificationsEnabled(Notification.permission === "granted");
      }
    } catch {}
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("etbaaly_admin_audio_notif", String(next));
      } catch {}
      if (next) playNotificationChime();
      return next;
    });
  }, []);

  const requestBrowserPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === "granted";
      setBrowserNotificationsEnabled(granted);
      return granted;
    } catch {
      return false;
    }
  }, []);

  const dismissToast = useCallback(() => {
    setLatestToast(null);
  }, []);

  const showIncomingNotification = useCallback(
    (notif: AdminNotification) => {
      setLatestToast(notif);

      if (audioEnabled) {
        playNotificationChime();
      }

      if (
        browserNotificationsEnabled &&
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(notif.title, {
            body: notif.message,
            icon: "/favicon.ico",
          });
        } catch {}
      }
    },
    [audioEnabled, browserNotificationsEnabled]
  );

  const fetchNotifications = useCallback(
    async (isBackground = false) => {
      if (!isAdmin) return;
      if (!isBackground) setIsRefreshing(true);

      try {
        const res = await fetch("/api/admin/notifications", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success && Array.isArray(data.notifications)) {
          const newNotifs: AdminNotification[] = data.notifications;
          const currentIds = new Set(newNotifs.map((n) => n.id));

          // Check if there are newly arrived unread notifications
          if (!isInitialLoadRef.current) {
            const newlyAdded = newNotifs.find(
              (n) => !n.read && !prevIdsRef.current.has(n.id)
            );
            if (newlyAdded) {
              showIncomingNotification(newlyAdded);
            }
          } else {
            isInitialLoadRef.current = false;
          }

          prevIdsRef.current = currentIds;
          setNotifications(newNotifs);
          setUnreadCount(
            data.unreadCount !== undefined
              ? data.unreadCount
              : newNotifs.filter((n) => !n.read).length
          );
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [isAdmin, showIncomingNotification]
  );

  // Initial load
  useEffect(() => {
    if (isAdmin) {
      fetchNotifications(false);
    }
  }, [isAdmin, fetchNotifications]);

  // Polling every 20 seconds for live updates
  useEffect(() => {
    if (!isAdmin) return;
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchNotifications(true);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isAdmin, fetchNotifications]);

  const markAsRead = useCallback(
    async (id: string, read: boolean = true) => {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read } : n))
      );
      setUnreadCount((prev) => Math.max(0, read ? prev - 1 : prev + 1));

      try {
        const res = await fetch("/api/admin/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id, read }),
        });
        const data = await res.json();
        if (data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
        fetchNotifications(true);
      }
    },
    [fetchNotifications]
  );

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "mark_all_read" }),
      });
      const data = await res.json();
      if (data.unreadCount !== undefined) {
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      fetchNotifications(true);
    }
  }, [fetchNotifications]);

  const deleteNotification = useCallback(
    async (id: string) => {
      const target = notifications.find((n) => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (target && !target.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      try {
        const res = await fetch("/api/admin/notifications", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      } catch (err) {
        console.error("Failed to delete notification:", err);
        fetchNotifications(true);
      }
    },
    [notifications, fetchNotifications]
  );

  const clearAll = useCallback(async () => {
    setNotifications([]);
    setUnreadCount(0);

    try {
      await fetch("/api/admin/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "clear_all" }),
      });
    } catch (err) {
      console.error("Failed to clear notifications:", err);
      fetchNotifications(true);
    }
  }, [fetchNotifications]);

  const triggerTestNotification = useCallback(
    async (type?: NotificationType) => {
      try {
        const res = await fetch("/api/admin/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action: "test", type }),
        });
        const data = await res.json();
        if (data.success && data.notification) {
          setNotifications((prev) => [data.notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          showIncomingNotification(data.notification);
        }
      } catch (err) {
        console.error("Failed to trigger test notification:", err);
      }
    },
    [showIncomingNotification]
  );

  return (
    <AdminNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        isRefreshing,
        audioEnabled,
        browserNotificationsEnabled,
        latestToast,
        toggleAudio,
        requestBrowserPermission,
        dismissToast,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        triggerTestNotification,
        refresh: () => fetchNotifications(false),
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error(
      "useAdminNotifications must be used within an AdminNotificationProvider"
    );
  }
  return context;
}
