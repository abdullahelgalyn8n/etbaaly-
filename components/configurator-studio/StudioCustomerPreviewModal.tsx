"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { ConfiguratorGroup, ConfiguratorView } from "@/lib/db";

interface StudioCustomerPreviewModalProps {
  showCustomerPreview: boolean;
  setShowCustomerPreview: (v: boolean) => void;
  title: string;
  views: ConfiguratorView[];
  activeViewId: string;
  setActiveViewId: (id: string) => void;
  groups: ConfiguratorGroup[];
  selectedOptionId: string;
  setSelectedGroupId: (id: string) => void;
  setSelectedOptionId: (id: string) => void;
}

export default function StudioCustomerPreviewModal({
  showCustomerPreview,
  setShowCustomerPreview,
  title,
  views,
  activeViewId,
  setActiveViewId,
  groups,
  selectedOptionId,
  setSelectedGroupId,
  setSelectedOptionId,
}: StudioCustomerPreviewModalProps) {
  if (!showCustomerPreview) return null;

  const totalPrice =
    120 +
    groups.reduce((sum, g) => {
      const active = g.options.find((o) => o.id === selectedOptionId);
      return sum + (active?.priceAdd || 0);
    }, 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#181a20] border border-[#2e323e] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#26282f] flex items-center justify-between">
          <div>
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>معاينة تجربة العميل التفاعلية في المتجر</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              هكذا سيظهر المنتج في المعرض مع حساب الأسعار المباشر والتنقل بين الزوايا.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCustomerPreview(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left Canvas Preview */}
          <div className="p-6 flex flex-col items-center justify-center bg-[#121316] border-b md:border-b-0 md:border-l border-[#26282f]">
            {/* View Camera Angles Switcher */}
            <div className="flex items-center gap-2 mb-4">
              {views.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveViewId(v.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeViewId === v.id
                      ? "bg-cyan-400 text-black shadow-md"
                      : "bg-[#202228] text-slate-400 hover:text-white"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            {/* The Interactive Preview Canvas */}
            <div className="w-[320px] h-[320px] relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-b from-[#1c1e24] to-[#121316] flex items-center justify-center select-none">
              {groups.map((grp) => {
                const viewOptions = grp.options.filter(
                  (opt) => opt.viewId === activeViewId || !opt.viewId
                );
                if (viewOptions.length === 0) return null;

                const allOptions = groups.flatMap((g) => g.options);
                const globallySelectedOpt = allOptions.find((o) => o.id === selectedOptionId);

                let visibleOptions = viewOptions;
                if (!grp.multiple || grp.controlType === "color") {
                  let activeOpt = viewOptions.find((o) => o.id === selectedOptionId);

                  if (!activeOpt && globallySelectedOpt) {
                    activeOpt = viewOptions.find(
                      (o) =>
                        (globallySelectedOpt.colorHex &&
                          o.colorHex &&
                          o.colorHex.toLowerCase() === globallySelectedOpt.colorHex.toLowerCase()) ||
                        (o.name &&
                          globallySelectedOpt.name &&
                          o.name.split("(")[0]?.trim() ===
                            globallySelectedOpt.name.split("(")[0]?.trim())
                    );
                  }

                  if (!activeOpt) {
                    activeOpt = viewOptions.find((o) => o.activeOnLoad) || viewOptions[0];
                  }

                  visibleOptions = activeOpt ? [activeOpt] : [];
                }

                return visibleOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="absolute transition-all"
                    style={{
                      left: `${opt.x}%`,
                      top: `${opt.y}%`,
                      width: `${opt.width}%`,
                      height: `${opt.height}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: opt.zIndex || 1,
                      backgroundColor:
                        opt.imageUrl
                          ? "transparent"
                          : opt.controlType === "color"
                          ? opt.colorHex || "#C93B41"
                          : undefined,
                      borderRadius: "12px",
                      opacity: opt.opacity ?? 1,
                    }}
                  >
                    {opt.imageUrl ? (
                      <img
                        src={opt.imageUrl}
                        alt={opt.name}
                        className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                      />
                    ) : opt.controlType === "icon" ? (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {opt.iconUrl?.startsWith("/") || opt.iconUrl?.startsWith("http") ? (
                          <img src={opt.iconUrl} alt={opt.name} className="w-full h-full object-contain" />
                        ) : (
                          <span>{opt.iconUrl || "✨"}</span>
                        )}
                      </div>
                    ) : opt.controlType === "inline_text" ? (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs bg-black/40 rounded border border-dashed border-cyan-400/80 px-2">
                        {opt.name || "مساحة النص المخصص"}
                      </div>
                    ) : null}
                  </div>
                ));
              })}
            </div>
          </div>

          {/* Right Options Controls & Total Price */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-black text-white">{title}</h4>
                <span className="text-xs text-emerald-400 font-bold font-mono">
                  السعر الأساسي: 120 ج.م
                </span>
              </div>

              {/* Groups Selection matching active view */}
              {groups
                .filter((grp) =>
                  grp.options.some((opt) => !opt.viewId || opt.viewId === activeViewId)
                )
                .map((grp) => {
                  const viewOptions = grp.options.filter(
                    (opt) => !opt.viewId || opt.viewId === activeViewId
                  );
                  const allOptions = groups.flatMap((g) => g.options);
                  const globallySelectedOpt = allOptions.find((o) => o.id === selectedOptionId);

                  return (
                    <div key={grp.id} className="space-y-2">
                      <div className="text-xs font-bold text-slate-300">{grp.title}</div>
                      <div className="flex flex-wrap gap-2">
                        {viewOptions.map((opt) => {
                          const isOptionActive =
                            selectedOptionId === opt.id ||
                            (globallySelectedOpt &&
                              ((opt.colorHex &&
                                globallySelectedOpt.colorHex &&
                                opt.colorHex.toLowerCase() ===
                                  globallySelectedOpt.colorHex.toLowerCase()) ||
                                (opt.name &&
                                  globallySelectedOpt.name &&
                                  opt.name.split("(")[0]?.trim() ===
                                    globallySelectedOpt.name.split("(")[0]?.trim())));

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedGroupId(grp.id);
                                setSelectedOptionId(opt.id);
                                if (opt.switchViewId) setActiveViewId(opt.switchViewId);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
                                isOptionActive
                                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md ring-1 ring-cyan-400/50"
                                  : "bg-[#202228] text-slate-300 border-white/10 hover:border-white/30"
                              }`}
                            >
                              {opt.controlType === "color" && (
                                <span
                                  className="w-3 h-3 rounded-full border border-white/20"
                                  style={{ backgroundColor: opt.colorHex }}
                                />
                              )}
                              <span>{opt.name}</span>
                              {opt.priceAdd > 0 && (
                                <span className="font-mono text-emerald-400 text-[10px]">
                                  (+{opt.priceAdd} ج.م)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-[#26282f] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">الإجمالي النهائي:</div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  {totalPrice} ج.م
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert("تمت إضافة المنتج المهيأ إلى السلة بنجاح!");
                  setShowCustomerPreview(false);
                }}
                className="btn-crimson px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
              >
                أضف إلى السلة 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
