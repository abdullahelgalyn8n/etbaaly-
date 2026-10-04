"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Phone,
  MapPin,
  User,
  Tag,
  Lock,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/data/siteConfig";
import NumericQuantityInput from "@/components/ui/NumericQuantityInput";

type CheckoutStep = "cart" | "checkout" | "success";
type PaymentMethod = "card" | "instapay" | "b2b_transfer" | "whatsapp";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shippingCost,
    discountAmount,
    totalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    remainingForFreeShipping,
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>("cart");

  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  // Customer Checkout Form
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingCity, setShippingCity] = useState("القاهرة");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Sync user details when authenticated
  useEffect(() => {
    if (user) {
      if (user.full_name) setCustomerName(user.full_name);
      if (user.phone) setCustomerPhone(user.phone);
      if (user.email) setCustomerEmail(user.email);
      if (user.address) setShippingAddress(user.address);
      if (user.company_name) {
        setCompanyName(user.company_name);
        setIsB2bInvoice(true);
      }
      if (user.tax_number) setTaxNumber(user.tax_number);
    }
  }, [user]);

  // B2B Invoice Option
  const [isB2bInvoice, setIsB2bInvoice] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");

  // Payment Selection & Simulated Card State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [walletPhone, setWalletPhone] = useState("");
  const [transferRef, setTransferRef] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponInput("");
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // 1. Mandatory Authentication Check
    if (!isAuthenticated || !user) {
      setFormError("غير مسموح بطلب أي منتج دون تسجيل الدخول. يرجى تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم لإتمام طلبك.");
      openAuthModal("login");
      return;
    }

    // 2. Validate Contact and Profile Details
    if (!user.phone || !user.full_name || !user.username) {
      setFormError("بيانات حسابك غير مكتملة. يرجى استكمال اسمك، رقم هاتفك للتواصل، واسم المستخدم في ملفك الشخصي لإتمام الطلب.");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setFormError("يرجى استكمال البيانات الإلزامية (الاسم، الهاتف، والعنوان).");
      return;
    }

    if (items.length === 0) {
      setFormError("سلة المشتريات فارغة.");
      return;
    }

    if (paymentMethod === "card") {
      const cleanCard = cardNumber.replace(/\s+/g, "");
      if (cleanCard.length < 15 || !cardExpiry.trim() || !cardCvv.trim()) {
        setFormError("يرجى إدخال بيانات البطاقة البنكية كاملة وصحيحة (رقم البطاقة، تاريخ الانتهاء، ورمز CVV).");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const summaryTitle = `سلة مشتريات (${items.length} منتجات): ${items
        .map((i) => `${i.title} (${i.quantity})`)
        .slice(0, 3)
        .join("، ")}${items.length > 3 ? "..." : ""}`;

      const payload = {
        user_id: user.id,
        customer_name: customerName.trim() || user.full_name,
        customer_phone: customerPhone.trim() || user.phone,
        customer_email: customerEmail.trim() || user.email || undefined,
        service_type: "طلب سلة مشتريات متكاملة",
        product_name: summaryTitle,
        quantity: items.reduce((acc, i) => acc + i.quantity, 0),
        unit_price: Math.round(subtotal / Math.max(1, items.reduce((acc, i) => acc + i.quantity, 0))),
        total_price: totalPrice,
        shipping_address: `${shippingAddress.trim()}${alternatePhone ? ` (هاتف بديل: ${alternatePhone})` : ""}`,
        shipping_city: shippingCity,
        shipping_method: shippingCost === 0 ? "شحن مجاني مميز" : "شحن سريع مخصص",
        notes: orderNotes.trim(),
        specs: {
          items: items.map((i) => ({
            id: i.id,
            productId: i.productId,
            title: i.title,
            quantity: i.quantity,
            price: i.price,
            total: i.price * i.quantity,
            selectedColor: i.selectedColor?.name || "افتراضي",
            colorHex: i.selectedColor?.hex || null,
            selectedOptions: i.selectedOptions || null,
            customNotes: i.customNotes || null,
          })),
          payment_method: paymentMethod,
          payment_status: "معتمد إلكترونياً",
          coupon_applied: appliedCoupon || null,
          discount_amount: discountAmount,
          b2b_company: isB2bInvoice ? companyName.trim() : null,
          b2b_tax_number: isB2bInvoice ? taxNumber.trim() : null,
          transaction_ref: transferRef.trim() || null,
        },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        clearCart();
        setStep("success");
      } else {
        setFormError(data.error || "تعذر تسجيل الطلب، يرجى المحاولة لاحقاً.");
      }
    } catch {
      setFormError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!completedOrder?.tracking_code) return;
    navigator.clipboard.writeText(completedOrder.tracking_code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2500);
  };

  const whatsappCheckoutUrl = () => {
    if (completedOrder) {
      const msg = `مرحباً إطبعلي، لقد قمت بتسجيل وتأكيد طلب شراء عبر سلة الموقع:
رقم الطلب (Order ID): ${completedOrder.tracking_code}
اسم العميل: ${completedOrder.customer_name}
الهاتف: ${completedOrder.customer_phone}
المحافظة والعنوان: ${completedOrder.shipping_city} - ${completedOrder.shipping_address}
الإجمالي المستحق: ${completedOrder.total_price} ج.م
طريقة الدفع: ${paymentMethod}
أود تأكيد الشحن الفوري ومتابعة خط الإنتاج.`;
      return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(msg)}`;
    }

    const itemsSummary = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.title} (اللون: ${i.selectedColor?.name || "افتراضي"}) - الكمية: ${i.quantity} قطعة - ${i.price * i.quantity} ج.م`
      )
      .join("\n");

    const msg = `مرحباً إطبعلي، أود إتمام طلب سلة المشتريات:
${itemsSummary}
المجموع الفرعي: ${subtotal} ج.م
${discountAmount > 0 ? `الخصم: -${discountAmount} ج.م\n` : ""}الشحن: ${shippingCost === 0 ? "مجاناً" : `${shippingCost} ج.م`}
الإجمالي النهائي: ${totalPrice} ج.م
الرجاء تأكيد استلام الطلب وبدء التنفيذ فوراً.`;

    return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* 1. Header & Stepper */}
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-[#c93b41]" />
            <span>سلة المشتريات وإتمام الطلب (Checkout)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            نظام شراء متكامل يتيح لك طلب عدة منتجات معاً، اختيار طريقة الدفع المناسبة، وتتبع الشحنة لحظياً.
          </p>
        </div>

        {/* Multi-step Visual Indicator */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-1.5 shadow-xs text-xs font-bold">
          <button
            type="button"
            onClick={() => items.length > 0 && setStep("cart")}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              step === "cart"
                ? "bg-[#c93b41] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
            }`}
          >
            <span>1. مراجعة السلة</span>
          </button>
          <span className="text-slate-300 dark:text-slate-600">←</span>
          <button
            type="button"
            onClick={() => items.length > 0 && setStep("checkout")}
            disabled={items.length === 0}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              step === "checkout"
                ? "bg-[#c93b41] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 disabled:opacity-40"
            }`}
          >
            <span>2. التوصيل والدفع</span>
          </button>
          <span className="text-slate-300 dark:text-slate-600">←</span>
          <span
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${
              step === "success"
                ? "bg-emerald-600 text-white font-bold"
                : "text-slate-400 opacity-60"
            }`}
          >
            <span>3. تأكيد الطلب</span>
          </span>
        </div>
      </div>

      {/* STEP 1: CART REVIEW */}
      {step === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-5">
            {items.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] text-center space-y-4 shadow-sm">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-[#151619] text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    سلة المشتريات فارغة حالياً
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    تصفح أحدث منتجات الطباعة الرقمية، المجات الفاخرة، العلب والتغليف وأضف ما ترغب به إلى السلة.
                  </p>
                </div>
                <Link
                  href="/products/"
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>استكشاف المنتجات الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Free Shipping Alert Bar */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#c93b41]" />
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          مبروك! شحن مجاني متاح لطلبك بالكامل
                        </span>
                      ) : (
                        <span>
                          أضف بقيمة <strong className="font-mono text-[#c93b41]">{remainingForFreeShipping} ج.م</strong> إضافية للحصول على شحن مجاني
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{freeShippingProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        remainingForFreeShipping === 0
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-red-500 to-[#c93b41]"
                      }`}
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items Table/Cards */}
                <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-sm divide-y divide-slate-100 dark:divide-white/[0.05]">
                  <div className="pb-3 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>المنتج وتفاصيل الطلب</span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      إفراغ السلة
                    </button>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-3.5">
                        <Link
                          href={`/products/${item.slug}/`}
                          className="w-18 h-18 rounded-2xl bg-[#ECEAE6] dark:bg-[#151619] p-1.5 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center overflow-hidden hover:opacity-90"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </Link>
                        <div className="space-y-1">
                          <Link
                            href={`/products/${item.slug}/`}
                            className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#c93b41] transition-colors block"
                          >
                            {item.title}
                          </Link>
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                              <span
                                className="w-3 h-3 rounded-full border border-slate-300 dark:border-white/20"
                                style={{ background: item.selectedColor.hex }}
                              />
                              <span>اللون المختار: {item.selectedColor.name}</span>
                            </div>
                          )}
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {Object.entries(item.selectedOptions).map(([k, v]) => (
                                <span
                                  key={k}
                                  className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-medium"
                                >
                                  {k}: {v}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.customNotes && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                              {item.customNotes}
                            </p>
                          )}
                          <div className="text-xs font-mono font-bold text-slate-500">
                            سعر القطعة: {item.price} ج.م
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-2xl p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-xl bg-white dark:bg-[#22242a] text-slate-700 dark:text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50"
                            title="تقليل"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <NumericQuantityInput
                            value={item.quantity}
                            onChange={(newQty) => updateQuantity(item.id, newQty)}
                            min={1}
                            max={100000}
                            ariaLabel={`كمية ${item.title}`}
                            className="w-12 h-7 text-sm text-slate-900 dark:text-white bg-transparent hover:bg-slate-50 dark:hover:bg-[#202227] focus:bg-white dark:focus:bg-[#202227] focus:ring-1 focus:ring-[#c93b41]/40 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-xl bg-white dark:bg-[#22242a] text-slate-700 dark:text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50"
                            title="زيادة"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-left min-w-[90px]">
                          <span className="font-mono font-black text-base text-[#c93b41] block">
                            {(item.price * item.quantity).toLocaleString()} ج.م
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.08] pb-4 flex items-center gap-2">
                <span>ملخص الطلب والحساب</span>
              </h3>

              {/* Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>المجموع الفرعي ({items.length} منتجات):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {subtotal.toLocaleString()} ج.م
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>تكلفة الشحن:</span>
                  <span className="font-mono font-bold text-sm">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">مجاناً</span>
                    ) : (
                      <span>{shippingCost} ج.م</span>
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>خصم الكوبون ({appliedCoupon}):</span>
                    <span className="font-mono">- {discountAmount.toLocaleString()} ج.م</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between font-black text-base">
                  <span className="text-slate-900 dark:text-white">الإجمالي المستحق:</span>
                  <span className="font-mono text-2xl text-[#c93b41]">
                    {totalPrice.toLocaleString()} ج.م
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#c93b41]" />
                  <span>هل لديك كود خصم؟</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="مثل ETBA310"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 text-xs font-bold cursor-pointer transition-colors"
                  >
                    تطبيق
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    <span>الكوبون النشط: {appliedCoupon}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
                {couponFeedback && !appliedCoupon && (
                  <div className="text-[11px] text-red-500 font-bold">{couponFeedback}</div>
                )}
              </form>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={() => setStep("checkout")}
                  className="w-full py-4 px-4 rounded-2xl bg-[#c93b41] hover:bg-[#b03238] text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40"
                >
                  <span>متابعة لإتمام الطلب والدفع</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <a
                  href={whatsappCheckoutUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>طلب مباشر وسريع عبر واتساب</span>
                </a>
              </div>

              {/* Guarantee */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>ضمان الجودة 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#c93b41] shrink-0" />
                  <span>توصيل 24 - 48 ساعة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CHECKOUT & PAYMENT INTEGRATION */}
      {step === "checkout" && (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping & Payment Fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* Authentication Status Banner */}
            {!isAuthenticated ? (
              <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">يلزم تسجيل الدخول أو إنشاء حساب لإتمام الطلب</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                      وفقاً لسياسة منصة إطبعلي، لا يمكن إتمام الشراء إلا للعملاء المسجلين برقم هاتف واسم مستخدم موثقين لضمان تتبع خط الإنتاج والشحن.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="px-4 py-2 rounded-xl btn-crimson text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-[#1a1a1a] border border-amber-500/30 hover:border-amber-500 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
                  >
                    حساب جديد
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold">حساب موثق: </span>
                    <span>{user?.full_name} (@{user?.username || "client"})</span>
                    <span className="mx-2 text-emerald-400">|</span>
                    <span className="font-mono">{user?.phone}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  جاهز للإنتاج المباشر
                </span>
              </div>
            )}

            {formError && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                <span>{formError}</span>
              </div>
            )}

            {/* A. Customer & Shipping Details */}
            <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.08] pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#c93b41]" />
                <span>1. بيانات الشحن والتوصيل</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>الاسم بالكامل (مستلم الطلب) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: م. أحمد عبد الرحمن"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                  />
                </div>

                {/* Primary Phone */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>رقم الهاتف الأساسي / واتساب *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="010XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#c93b41] text-right"
                  />
                </div>

                {/* Secondary Phone */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    رقم هاتف بديل (اختياري)
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="011XXXXXXXX"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#c93b41] text-right"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    البريد الإلكتروني (لتلقي الفاتورة الرقمية)
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="client@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41] text-right"
                  />
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>المحافظة *</span>
                  </label>
                  <select
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41] cursor-pointer"
                  >
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="القليوبية">القليوبية</option>
                    <option value="الدقهلية (المنصورة)">الدقهلية (المنصورة)</option>
                    <option value="الشرقية (الزقازيق)">الشرقية (الزقازيق)</option>
                    <option value="الغربية (طنطا)">الغربية (طنطا)</option>
                    <option value="البحيرة">البحيرة</option>
                    <option value="المنوفية">المنوفية</option>
                    <option value="مدن القناة (الإسماعيلية / بورسعيد / السويس)">مدن القناة</option>
                    <option value="باقي المحافظات">محافظات أخرى</option>
                  </select>
                </div>

                {/* Detailed Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>العنوان التفصيلي (الشارع، العمارة، رقم الشقة أو الشركة) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شارع التسعين الشمالي، مجمع البنوك، مبنى 4B"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                  />
                </div>

                {/* B2B Tax Invoice Option */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isB2bInvoice}
                      onChange={(e) => setIsB2bInvoice(e.target.checked)}
                      className="rounded text-[#c93b41] focus:ring-[#c93b41]"
                    />
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      أرغب في إصدار فاتورة ضريبية معتمدة باسم الشركة (B2B)
                    </span>
                  </label>

                  {isB2bInvoice && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                      <input
                        type="text"
                        placeholder="اسم الشركة بالكامل"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                      />
                      <input
                        type="text"
                        placeholder="رقم السجل التجاري / البطاقة الضريبية"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                      />
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2 space-y-1 pt-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>ملاحظات إضافية على الطلب أو الشحن (اختياري)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي تعليمات خاصة بالتسليم أو مواعيد التواجد..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* B. Payment Methods Selection */}
            <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.08] pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#c93b41]" />
                <span>2. وسيلة وخطة الدفع المعتمدة</span>
              </h3>

              <div className="space-y-3">
                {/* Method 1: Credit / Debit Card */}
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "bg-red-500/5 border-[#c93b41] shadow-xs"
                      : "bg-slate-50 dark:bg-[#151619] border-slate-200 dark:border-white/[0.08] hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 text-[#c93b41] focus:ring-[#c93b41]"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#c93b41]" />
                        <span>البطاقات البنكية (فيزا / ماستركارد / ميزة)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        دفع إلكتروني آمن 100%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      دفع مباشر ومشفر عبر بوابات البنوك المصرية المعتمدة مع مصادقة 3D Secure.
                    </p>

                    {paymentMethod === "card" && (
                      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-red-500/10">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">رقم البطاقة (16 رقماً):</label>
                          <input
                            type="text"
                            maxLength={19}
                            dir="ltr"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-[#c93b41]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">اسم صاحب البطاقة:</label>
                          <input
                            type="text"
                            placeholder="AHMED ABDELRAHMAN"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#c93b41]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">الانتهاء (MM/YY):</label>
                            <input
                              type="text"
                              maxLength={5}
                              dir="ltr"
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 font-mono text-xs text-center focus:outline-none focus:border-[#c93b41]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">رمز الأمان (CVV):</label>
                            <input
                              type="password"
                              maxLength={4}
                              dir="ltr"
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 font-mono text-xs text-center focus:outline-none focus:border-[#c93b41]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 2: InstaPay & Digital Wallets */}
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === "instapay"
                      ? "bg-red-500/5 border-[#c93b41] shadow-xs"
                      : "bg-slate-50 dark:bg-[#151619] border-slate-200 dark:border-white/[0.08] hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "instapay"}
                    onChange={() => setPaymentMethod("instapay")}
                    className="mt-1 text-[#c93b41] focus:ring-[#c93b41]"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-purple-500" />
                        <span>إنستاباي ومحافظ الهاتف (فودافون كاش / أورنج / إتصالات)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        تحويل لحظي فوري
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      حول مباشرة إلى حساب إنستاباي: <code className="font-bold text-purple-600 dark:text-purple-400 font-mono">etbaaly@instapay</code> أو رقم الكاش: <code className="font-bold font-mono">01099887766</code>.
                    </p>

                    {paymentMethod === "instapay" && (
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-purple-500/10">
                        <input
                          type="text"
                          placeholder="رقم المحفظة التي قمت بالتحويل منها"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#c93b41]"
                        />
                        <input
                          type="text"
                          placeholder="الرقم المرجعي للتحويل (اختياري)"
                          value={transferRef}
                          onChange={(e) => setTransferRef(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#c93b41]"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 3: B2B Bank Transfer */}
                <label
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === "b2b_transfer"
                      ? "bg-red-500/5 border-[#c93b41] shadow-xs"
                      : "bg-slate-50 dark:bg-[#151619] border-slate-200 dark:border-white/[0.08] hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "b2b_transfer"}
                    onChange={() => setPaymentMethod("b2b_transfer")}
                    className="mt-1 text-[#c93b41] focus:ring-[#c93b41]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span>تحويل بنكي مباشر للشركات وفاتورة إلكترونية معتمدة</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      حساب البنك التجاري الدولي (CIB): 10004829104 - يتم إصدار أمر شغل رسمي وفاتورة ضريبية.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Review & CTA */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.08] pb-4 flex items-center justify-between">
                <span>ملخص الفاتورة</span>
                <span className="text-xs text-slate-400 font-normal">{items.length} منتج</span>
              </h3>

              {/* Items mini list */}
              <div className="space-y-2.5 max-h-48 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate max-w-[200px]">
                      <span className="font-mono font-bold text-[#c93b41]">{i.quantity}x</span>
                      <span className="truncate text-slate-800 dark:text-slate-200">{i.title}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {(i.price * i.quantity).toLocaleString()} ج.م
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {subtotal.toLocaleString()} ج.م
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>الشحن إلى ({shippingCity}):</span>
                  <span className="font-mono font-bold">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-500">مجاناً</span>
                    ) : (
                      <span>{shippingCost} ج.م</span>
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>الخصم ({appliedCoupon}):</span>
                    <span className="font-mono">- {discountAmount.toLocaleString()} ج.م</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex justify-between font-black text-lg">
                  <span className="text-slate-900 dark:text-white">المبلغ المطلوب:</span>
                  <span className="font-mono text-[#c93b41]">{totalPrice.toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-[#c93b41]" />
                  <span>
                    {isSubmitting ? "جاري تسجيل وتأكيد الطلب..." : "تأكيد الطلب وحجز رقم التتبع الفوري"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
                >
                  العودة لمراجعة السلة
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-relaxed px-1">
                بتأكيد الطلب، فإنك تقر بموافقتك على{" "}
                <Link
                  href="/terms/"
                  target="_blank"
                  className="text-[#c93b41] font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  الشروط والأحكام
                </Link>{" "}
                و{" "}
                <Link
                  href="/refund/"
                  target="_blank"
                  className="text-[#c93b41] font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  سياسة الاسترجاع والتشغيل
                </Link>{" "}
                و{" "}
                <Link
                  href="/privacy/"
                  target="_blank"
                  className="text-[#c93b41] font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  الخصوصية
                </Link>
                .
              </p>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>بياناتك محمية بتشفير 256-bit SSL آمن بالكامل</span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* STEP 3: SUCCESS & CONFIRMATION */}
      {step === "success" && completedOrder && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          {/* Success Check Badge */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-11 h-11" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              تهانينا! تم تسجيل طلبك وتوليد رقم التتبع بنجاح
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              أمر الشغل الخاص بك مسجل رسمياً في نظام إطبعلي ومتاح للمتابعة اللحظية من خلال رقم التتبع الفريد أدناه.
            </p>
          </div>

          {/* Tracking Box */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 flex items-center justify-between max-w-md mx-auto">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block">رقم أمر الشغل والتتبع الفوري:</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-[#c93b41] tracking-wider">
                {completedOrder.tracking_code}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#202227] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5 hover:border-[#c93b41] cursor-pointer transition-colors shadow-xs"
            >
              <Copy className="w-3.5 h-3.5 text-[#c93b41]" />
              <span>{copiedTracking ? "تم النسخ ✓" : "نسخ الكود"}</span>
            </button>
          </div>

          {/* Receipt Summary Grid */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 text-right text-xs space-y-2">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>اسم العميل:</span>
              <span className="font-bold text-slate-900 dark:text-white">{completedOrder.customer_name}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>رقم الهاتف:</span>
              <span dir="ltr" className="font-mono font-bold text-slate-900 dark:text-white">
                {completedOrder.customer_phone}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>عنوان التوصيل:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {completedOrder.shipping_city} - {completedOrder.shipping_address}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>طريقة الدفع:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {paymentMethod === "card"
                  ? "بطاقة بنكية (معتمدة)"
                  : paymentMethod === "instapay"
                  ? "إنستاباي / محفظة كاش"
                  : "تحويل بنكي / فاتورة شركات"}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between font-black text-sm">
              <span>الإجمالي المسجل:</span>
              <span className="font-mono text-base text-[#c93b41]">
                {Number(completedOrder.total_price).toLocaleString()} ج.م
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Link
              href={`/track/?code=${completedOrder.tracking_code}`}
              target="_blank"
              className="w-full py-4 px-6 rounded-2xl bg-[#c93b41] hover:bg-[#b03238] text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>متابعة خط الإنتاج وحركة الشحن في شاشة التتبع</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <a
              href={whatsappCheckoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>مشاركة تأكيد الطلب مع خدمة العملاء عبر واتساب</span>
            </a>

            <div className="pt-2">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
              >
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
