"use client";

import React from "react";
import { Clock, Truck, Printer, CheckCircle2 } from "lucide-react";
import { OrderData } from "./types";

interface TrackerTimelineProps {
  order: OrderData;
}

export function getStatusBadge(status: string) {
  switch (status) {
    case "received":
      return { label: "تم الاستلام", bg: "bg-amber-500/10 text-amber-500 border-amber-500/30" };
    case "preflight":
      return { label: "فحص الملفات والألوان", bg: "bg-blue-500/10 text-blue-500 border-blue-500/30" };
    case "printing":
      return { label: "جاري الطباعة والسحب", bg: "bg-red-500/10 text-[#c93b41] border-red-500/30" };
    case "finishing":
      return { label: "التشطيب والسلوفان", bg: "bg-purple-500/10 text-purple-500 border-purple-500/30" };
    case "packaging":
      return { label: "التعبئة والفحص النهائي", bg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30" };
    case "shipped":
      return { label: "مع مندوب التوصيل", bg: "bg-orange-500/10 text-orange-500 border-orange-500/30" };
    case "delivered":
      return { label: "تم التسليم بنجاح", bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" };
    default:
      return { label: "قيد المتابعة", bg: "bg-slate-500/10 text-slate-400 border-slate-500/30" };
  }
}

export function TrackerTimeline({ order }: TrackerTimelineProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">رقم أمر الشغل:</span>
            <span className="font-mono text-xl sm:text-2xl font-black text-[#c93b41] bg-red-500/10 px-3 py-1 rounded-xl border border-red-500/20">
              {order.tracking_code}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full border font-bold ${
                getStatusBadge(order.status).bg
              }`}
            >
              {order.status_label || getStatusBadge(order.status).label}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-3">
            {order.product_name}
          </h3>
        </div>

        {/* Delivery ETA Pill */}
        <div className="bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-[#c93b41] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold">موعد التسليم المتوقع:</div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {order.estimated_delivery}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Stepper Timeline */}
      <div className="mt-8">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#c93b41]" />
          مراحل الإنتاج وسير الشحنة:
        </h4>

        <div className="relative pl-2 sm:pl-4">
          {/* Connecting vertical line */}
          <div className="absolute right-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/[0.1] -mr-px" />

          <div className="space-y-6 sm:space-y-8">
            {order.timeline.map((step, idx) => {
              const isCompleted = step.completed;
              const isCurrent = step.current;

              return (
                <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                  {/* Status Icon Indicator */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      isCompleted
                        ? isCurrent
                          ? "bg-[#c93b41] border-[#c93b41] text-white ring-4 ring-red-500/20 shadow-lg"
                          : "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-slate-100 dark:bg-[#2b2b2b] border-slate-300 dark:border-white/[0.2] text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      isCurrent ? (
                        <Printer className="w-4 h-4 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200/80 dark:border-white/[0.05] rounded-xl sm:rounded-2xl p-4 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h5
                        className={`text-sm sm:text-base font-bold ${
                          isCurrent
                            ? "text-[#c93b41] dark:text-red-400 font-extrabold"
                            : isCompleted
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {step.step}
                      </h5>
                      <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">
                        {step.date}
                      </span>
                    </div>
                    {step.desc && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
