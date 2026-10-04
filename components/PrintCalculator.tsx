"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Truck } from "lucide-react";
import { ProductPreset, productPresets } from "./print-calculator/presets";
import { CalculatorForm } from "./print-calculator/CalculatorForm";
import { CalculatorSummary } from "./print-calculator/CalculatorSummary";
import { useAuth } from "@/context/AuthContext";

export default function PrintCalculator() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<ProductPreset>(productPresets[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(selectedProduct.materials[0].id);
  const [selectedFinish, setSelectedFinish] = useState(selectedProduct.finishes[0].id);
  const [quantity, setQuantity] = useState(selectedProduct.minQty);
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.full_name) setClientName(user.full_name);
      if (user.phone) setClientPhone(user.phone);
    }
  }, [user]);

  // Handle product switch
  const handleProductChange = (prodId: string) => {
    const prod = productPresets.find((p) => p.id === prodId) || productPresets[0];
    setSelectedProduct(prod);
    setSelectedMaterial(prod.materials[0].id);
    setSelectedFinish(prod.finishes[0].id);
    setQuantity(prod.minQty);
  };

  // Pricing math
  const curMaterial = selectedProduct.materials.find((m) => m.id === selectedMaterial) || selectedProduct.materials[0];
  const curFinish = selectedProduct.finishes.find((f) => f.id === selectedFinish) || selectedProduct.finishes[0];

  // Volume discount curve
  let volumeDiscountFactor = 1.0;
  if (quantity >= selectedProduct.minQty * 5) {
    volumeDiscountFactor = 0.78; // 22% discount for large runs
  } else if (quantity >= selectedProduct.minQty * 2) {
    volumeDiscountFactor = 0.88; // 12% discount for medium runs
  }

  const unitPrice =
    (selectedProduct.basePricePerUnit * curMaterial.multiplier + curFinish.addPerUnit) *
    volumeDiscountFactor;
  const totalPrice = Math.round(unitPrice * quantity);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      alert("غير مسموح بتسجيل أمر الشغل إلا بعد تسجيل الدخول. يرجى تسجيل الدخول أو إنشاء حساب موثق برقم الهاتف واسم المستخدم.");
      openAuthModal("login");
      return;
    }

    if (!user.phone || !user.full_name || !user.username) {
      alert("بيانات حسابك غير مكتملة. يرجى التأكد من كتابة اسمك الكامل، رقم الهاتف للتواصل، واسم المستخدم في ملفك الشخصي لتأكيد الطلب.");
      return;
    }

    if (!clientPhone || !clientName) {
      alert("يرجى كتابة الاسم ورقم الهاتف لتأكيد أمر الشغل.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          customer_name: clientName || user.full_name,
          customer_phone: clientPhone || user.phone,
          customer_email: user.email || undefined,
          service_type: selectedProduct.category,
          product_name: selectedProduct.name,
          specs: {
            "الخامة المختارة": curMaterial.name,
            "المعالجة والتشطيب": curFinish.name,
            "وقت الإنتاج المقدر": selectedProduct.turnaround,
          },
          quantity: quantity,
          unit_price: Number(unitPrice.toFixed(2)),
          total_price: totalPrice,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            حاسبة التسعير والمواصفات اللحظية
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            اختر مواصفات مطبوعاتك واحسب تكلفتك بدقة
          </h3>
        </div>
        <div className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5 bg-slate-50 dark:bg-[#1a1a1a] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/[0.08]">
          <Truck className="w-4 h-4 text-[#c93b41]" />
          <span>خصم كميات تلقائي + شحن مجاني للطلبات فوق 3,500 ج.م</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <CalculatorForm
          selectedProduct={selectedProduct}
          onProductChange={handleProductChange}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
          selectedFinish={selectedFinish}
          setSelectedFinish={setSelectedFinish}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <CalculatorSummary
          selectedProduct={selectedProduct}
          curMaterial={curMaterial}
          curFinish={curFinish}
          unitPrice={unitPrice}
          totalPrice={totalPrice}
          volumeDiscountFactor={volumeDiscountFactor}
          submitted={submitted}
          clientName={clientName}
          setClientName={setClientName}
          clientPhone={clientPhone}
          setClientPhone={setClientPhone}
          isSubmitting={isSubmitting}
          onOrderSubmit={handleOrderSubmit}
        />
      </div>
    </div>
  );
}
