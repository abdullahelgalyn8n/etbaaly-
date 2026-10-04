"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export interface CartItemColor {
  id: string;
  name: string;
  hex: string;
  priceAdd?: number;
}

export interface CartItem {
  id: string; // unique item key e.g. `${productId}-${colorId || 'none'}`
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  category?: string;
  selectedColor?: CartItemColor;
  selectedOptions?: Record<string, string | number>;
  customNotes?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id"> & { id?: string }, autoOpenDrawer?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totalPrice: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1000;
const STANDARD_SHIPPING_COST = 50;

const VALID_COUPONS: Record<string, { discountPercent: number; label: string }> = {
  ETBA310: { discountPercent: 10, label: "خصم إطبعلي الترحيبي 10%" },
  PRINTVIP: { discountPercent: 15, label: "خصم VIP للطباعة الفاخرة 15%" },
  AZAGENCY: { discountPercent: 20, label: "كوبون شراكة وكالة A.Z 20%" },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("etbaaly_cart_items");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("etbaaly_cart_coupon");
      if (savedCoupon && VALID_COUPONS[savedCoupon.toUpperCase()]) {
        setAppliedCoupon(savedCoupon.toUpperCase());
        setDiscountPercent(VALID_COUPONS[savedCoupon.toUpperCase()].discountPercent);
      }
    } catch {
      console.warn("Could not read cart from localStorage");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("etbaaly_cart_items", JSON.stringify(items));
    } catch {
      console.warn("Could not write cart to localStorage");
    }
  }, [items, isHydrated]);

  const generateItemId = (item: {
    productId: string;
    selectedColor?: CartItemColor;
    selectedOptions?: Record<string, string | number>;
    customNotes?: string;
  }) => {
    const colorPart = item.selectedColor?.id || "default";
    const optionsPart = item.selectedOptions
      ? Object.entries(item.selectedOptions)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}:${v}`)
          .join("|")
      : "";
    const notesPart = item.customNotes?.trim() ? `notes:${item.customNotes.trim()}` : "";
    return [item.productId, colorPart, optionsPart, notesPart].filter(Boolean).join("-");
  };

  const addItem = useCallback(
    (newItem: Omit<CartItem, "id"> & { id?: string }, autoOpenDrawer = false) => {
      const targetId = newItem.id || generateItemId(newItem);

      setItems((prevItems) => {
        const existingIdx = prevItems.findIndex((i) => i.id === targetId);
        if (existingIdx > -1) {
          const updated = [...prevItems];
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + (newItem.quantity || 1),
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              ...newItem,
              id: targetId,
              quantity: Math.max(1, newItem.quantity || 1),
            },
          ];
        }
      });

      if (autoOpenDrawer) {
        setIsCartOpen(true);
      }
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const cleanQty = Number(quantity);
    if (isNaN(cleanQty) || cleanQty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: Math.floor(cleanQty) } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem("etbaaly_cart_items");
      localStorage.removeItem("etbaaly_cart_coupon");
    } catch {
      // ignore
    }
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const applyCoupon = useCallback((code: string) => {
    if (!code || !code.trim()) {
      return { success: false, message: "يرجى كتابة كود الخصم أولاً." };
    }
    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];
    if (coupon) {
      setAppliedCoupon(cleanCode);
      setDiscountPercent(coupon.discountPercent);
      try {
        localStorage.setItem("etbaaly_cart_coupon", cleanCode);
      } catch {
        // ignore
      }
      return { success: true, message: `تم تطبيق ${coupon.label} بنجاح!` };
    }
    return { success: false, message: "كود الخصم غير صالح أو منتهي الصلاحية." };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem("etbaaly_cart_coupon");
    } catch {
      // ignore
    }
  }, []);

  // Derived totals
  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!discountPercent || subtotal <= 0) return 0;
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return STANDARD_SHIPPING_COST;
  }, [items.length, subtotal]);

  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const totalPrice = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [items.length, subtotal, discountAmount, shippingCost]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        shippingCost,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        totalPrice,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
