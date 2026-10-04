"use client";

import React, { useState, useEffect } from "react";
import { Truck, Clock, ShieldCheck, MapPin, Sparkles, Check } from "lucide-react";
import { egyptianGovernorates } from "@/app/api/shipping/route";

export default function ShippingCalculator() {
  const [selectedGovId, setSelectedGovId] = useState("cairo");
  const [speed, setSpeed] = useState<"standard" | "express">("standard");
  const [weightKg, setWeightKg] = useState(3);
  const [calculation, setCalculation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateShipping = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          governorateId: selectedGovId,
          speed,
          weightKg,
          totalAmount: 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCalculation(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateShipping();
  }, [selectedGovId, speed, weightKg]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-crimson text-xs font-bold mb-2">
            <Truck className="w-3.5 h-3.5" />
            شبكة الشحن والتسليم لجميع المحافظات
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            حاسبة مصاريف ومواعيد التوصيل
          </h3>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>شحن مجاني لكافة محافظات مصر للطلبات من 3,500 ج.م</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              اختر المحافظة / النطاق الجغرافي:
            </label>
            <select
              value={selectedGovId}
              onChange={(e) => setSelectedGovId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/[0.1] text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#c93b41]"
            >
              {egyptianGovernorates.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              سرعة وخيار التوصيل:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSpeed("standard")}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  speed === "standard"
                    ? "border-[#c93b41] bg-red-500/5 text-slate-900 dark:text-white font-bold"
                    : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="text-xs font-bold">شحن قياسي</div>
                <div className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 font-medium">اقتصادي وآمن</div>
              </button>

              <button
                type="button"
                onClick={() => setSpeed("express")}
                className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                  speed === "express"
                    ? "border-[#c93b41] bg-red-500/5 text-slate-900 dark:text-white font-bold"
                    : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="text-xs font-bold text-[#c93b41]">شحن فوري Express ⚡</div>
                <div className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 font-medium">أسرع وقت تسليم</div>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                وزن شحنة المطبوعات التقريبي:
              </label>
              <span className="text-xs font-mono font-bold text-[#c93b41]">{weightKg} كجم</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#1c1c1c] rounded-lg appearance-none cursor-pointer accent-[#c93b41]"
            />
            <div className="flex justify-between text-[11px] text-slate-700 dark:text-slate-300 font-mono mt-1">
              <span>1 كجم (كروت/أوراق)</span>
              <span>15 كجم (علب/كتالوجات)</span>
              <span>30 كجم (بالتات شحن)</span>
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between">
          {calculation ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-700 dark:text-slate-300 block font-bold">المنطقة المحددة:</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#c93b41]" />
                  {calculation.governorate}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-700 dark:text-slate-300 block font-bold">المدة المتوقعة للتوصيل:</span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mt-0.5 font-medium">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {calculation.deliveryDays}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08]">
                <span className="text-xs text-slate-700 dark:text-slate-300 block font-bold">تكلفة الشحن المقدرة:</span>
                <div className="text-3xl font-black font-mono text-[#c93b41] mt-1">
                  {calculation.shippingCost}{" "}
                  <span className="text-sm font-bold text-slate-900 dark:text-white">ج.م</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-700 dark:text-slate-300">جاري الحساب...</div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>تغليف كرتوني مقوى مزدوج مضاد للصدمات والرطوبة مجاناً مع كل شحنة.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
