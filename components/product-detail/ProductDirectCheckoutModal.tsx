"use client";

import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  CheckCircle2,
  PhoneCall,
  Truck,
  CreditCard,
  Copy,
  ExternalLink,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AdminProduct, ProductColor } from "@/lib/db";
import { siteConfig } from "@/data/siteConfig";
import { useAuth } from "@/context/AuthContext";

interface ProductDirectCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: AdminProduct;
  selectedColor: ProductColor;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImage: string;
}

export default function ProductDirectCheckoutModal({
  isOpen,
  onClose,
  product,
  selectedColor,
  quantity,
  unitPrice,
  totalPrice,
  productImage,
}: ProductDirectCheckoutModalProps) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingCity, setShippingCity] = useState("القاهرة");
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [formError, setFormError] = useState("");

  // Auto pre-fill from user profile
  React.useEffect(() => {
    if (user) {
      if (user.full_name) setCustomerName(user.full_name);
      if (user.phone) setCustomerPhone(user.phone);
      if (user.address) setShippingAddress(user.address);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!isAuthenticated || !user) {
      setFormError("غير مسموح بطلب أي منتج دون تسجيل الدخول. يرجى تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم لإتمام طلبك.");
      openAuthModal("login");
      return;
    }

    if (!user.phone || !user.full_name || !user.username) {
      setFormError("بيانات حسابك غير مكتملة. يرجى استكمال اسمك ورقم هاتفك واسم المستخدم في ملفك الشخصي لتأكيد الطلب.");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setFormError("يرجى إدخال كافة البيانات الأساسية (الاسم، رقم الهاتف، والعنوان).");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        product_name: product.title,
        customer_name: customerName.trim() || user.full_name,
        customer_phone: customerPhone.trim() || user.phone,
        customer_email: user.email || undefined,
        service_type: product.category || "هدايا ومجات",
        specs: {
          color_name: selectedColor.name,
          color_hex: selectedColor.hex,
          unit_price: unitPrice,
          product_slug: product.slug || product.id,
        },
        quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
        shipping_address: shippingAddress.trim(),
        shipping_city: shippingCity,
        shipping_method: "شحن سريع مخصص",
        notes: notes.trim(),
      };

      const res = await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrderResult(data.order);
      } else {
        setFormError(data.error || "تعذر إتمام الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error(err);
      setFormError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!orderResult?.tracking_code) return;
    navigator.clipboard.writeText(orderResult.tracking_code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // WhatsApp payment follow-up message
  const whatsappPaymentUrl = () => {
    if (!orderResult) return siteConfig.social.whatsapp;
    const msg = `مرحباً إطبعلي، لقد قمت بتسجيل طلب جديد من الموقع بنجاح:
📌 رقم الطلب (Order ID): ${orderResult.tracking_code}
🛍️ المنتج: ${product.title}
🎨 اللون: ${selectedColor.name}
📦 الكمية: ${quantity} قطعة
💰 الإجمالي المستحق: ${totalPrice} ج.م
👤 اسم العميل: ${customerName}
📞 رقم الهاتف: ${customerPhone}
📍 العنوان: ${shippingCity} - ${shippingAddress}
${notes ? `📝 ملاحظات: ${notes}` : ""}

أود تأكيد خطة الدفع (إنستاباي / فودافون كاش / فيزا / تحويل بنكي) وتأكيد الشحن فوراً.`;
    return `${siteConfig.social.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1c1e24] border border-slate-200 dark:border-white/[0.1] rounded-[2rem] max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden select-none">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/70 dark:bg-[#181a20]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/40 text-[#c93b41] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                {orderResult ? "تم تأكيد طلبك بنجاح!" : "تأكيد طلب الشراء الفوري من الموقع"}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {orderResult
                  ? "احتفظ برقم الطلب للتتبع وخطة الدفع"
                  : "سجل بيانات التوصيل وسيتم تجهيز شحنتك فوراً"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!orderResult ? (
            /* STEP 1: ORDER FORM */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Product Mini Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141518] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#ECEAE6] dark:bg-[#1c1e24] p-1.5 shrink-0 flex items-center justify-center border border-slate-200 dark:border-white/10">
                  <img
                    src={productImage}
                    alt={product.title}
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-white/20"
                        style={{ background: selectedColor.hex }}
                      />
                      <span>{selectedColor.name}</span>
                    </span>
                    <span>•</span>
                    <span>الكمية: {quantity} قطعة</span>
                  </div>
                  <div className="text-xs font-mono font-black text-[#c93b41]">
                    الإجمالي: {totalPrice} ج.م
                  </div>
                </div>
              </div>

              {/* User Authentication Status */}
              {!isAuthenticated ? (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      يلزم تسجيل الدخول لإتمام وتأكيد الطلب
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300">
                    يجب أن يكون لديك حساب مسجل برقم هاتف واسم مستخدم لتتبع خط الإنتاج.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openAuthModal("login")}
                      className="px-3 py-1.5 rounded-lg btn-crimson text-white text-[11px] font-bold cursor-pointer"
                    >
                      تسجيل الدخول
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthModal("register")}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#151619] border border-amber-500/30 text-[11px] font-bold cursor-pointer text-slate-800 dark:text-white"
                    >
                      إنشاء حساب
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-between text-[11px]">
                  <span className="font-bold">حساب مسجل: {user?.full_name} (@{user?.username || "client"})</span>
                  <span className="font-mono">{user?.phone}</span>
                </div>
              )}

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-bold">
                  {formError}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-3.5 text-xs">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>رقم الهاتف / واتساب *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="010XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#c93b41] text-right"
                  />
                </div>

                {/* City / Governorate */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>المحافظة *</span>
                  </label>
                  <select
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41] cursor-pointer"
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
                    <option value="الإسماعيلية / بورسعيد / السويس">مدن القناة</option>
                    <option value="كافة المحافظات الأخرى">محافظات أخرى</option>
                  </select>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#c93b41]" />
                    <span>العنوان بالتفصيل *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="اسم الشارع، رقم العمارة، رقم الشقة أو اسم الشركة"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41]"
                  />
                </div>

                {/* Optional Notes */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>ملاحظات إضافية أو كتابة إهداء (اختياري)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي تعليمات خاصة بالطباعة أو موعد الاستلام..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#c93b41] resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-bold">المبلغ المطلوب:</span>
                  <span className="text-xl font-black font-mono text-[#c93b41]">
                    {totalPrice} ج.م
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري تسجيل الطلب...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#c93b41]" />
                      <span>تأكيد وتسجيل الطلب الآن</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: SUCCESS & WHATSAPP PAYMENT PLAN */
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  تم تسجيل طلبك بنجاح في نظام إطبعلي!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  تم حجز رقم تتبع فوري لأمر الشغل، يرجى متابعة خطة الدفع لاعتماد سحب الطباعة.
                </p>
              </div>

              {/* Tracking Code Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/10 flex items-center justify-between max-w-md mx-auto">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">
                    كود التتبع ورقم الطلب:
                  </span>
                  <span className="text-base sm:text-lg font-mono font-black text-[#c93b41] tracking-wider">
                    {orderResult.tracking_code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#202228] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5 hover:border-[#c93b41] cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#c93b41]" />
                  <span>{copiedCode ? "تم النسخ ✓" : "نسخ الكود"}</span>
                </button>
              </div>

              {/* Payment Methods Info Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50/70 to-amber-50/70 dark:from-red-950/20 dark:to-amber-950/20 border border-red-200/70 dark:border-red-900/40 text-right space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white">
                  <CreditCard className="w-4 h-4 text-[#c93b41]" />
                  <span>خيارات وخطة الدفع المتاحة:</span>
                </div>
                <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 font-medium pr-5 list-disc">
                  <li>الدفع عبر إنستاباي (InstaPay) الفوري.</li>
                  <li>محافظ كاش الإلكترونية (فودافون كاش / أورنج / إتصالات).</li>
                  <li>تحويل بنكي / فواتير شركات ضريبية معتمدة.</li>
                </ul>
              </div>

              {/* Primary WhatsApp Payment Plan Action */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappPaymentUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>متابعة خطة الدفع وتأكيد الشحن عبر واتساب</span>
                </a>

                <div className="flex items-center justify-center gap-4 text-xs pt-1">
                  <a
                    href={`/track/?code=${orderResult.tracking_code}`}
                    target="_blank"
                    className="text-[#c93b41] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>صفحة تتبع الشحنة المباشرة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
                  >
                    إغلاق النافذة
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
