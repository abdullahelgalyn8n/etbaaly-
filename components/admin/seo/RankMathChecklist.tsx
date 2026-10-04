"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  FileText,
  HelpCircle,
} from "lucide-react";
import { SeoTestResult } from "./RankMathScoreCalculator";

interface RankMathChecklistProps {
  tests: SeoTestResult[];
}

export default function RankMathChecklist({ tests }: RankMathChecklistProps) {
  const [openSection, setOpenSection] = useState<string>("basic");

  const categories = [
    { id: "basic", label: "السيو الأساسي (Basic SEO)", icon: Award },
    { id: "additional", label: "السيو الإضافي (Additional SEO)", icon: Layers },
    { id: "title", label: "قراءة العنوان (Title Readability)", icon: FileText },
    { id: "content", label: "قراءة المحتوى (Content Readability)", icon: HelpCircle },
  ];

  return (
    <div className="space-y-2 text-xs select-none">
      {categories.map((cat) => {
        const catTests = tests.filter((t) => t.category === cat.id);
        const passedCount = catTests.filter((t) => t.passed).length;
        const totalCount = catTests.length;
        const isOpen = openSection === cat.id;

        return (
          <div
            key={cat.id}
            className="border border-[#24262d] rounded-xl overflow-hidden bg-[#17181c]"
          >
            {/* Header Accordion */}
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? "" : cat.id)}
              className="w-full flex items-center justify-between p-3 cursor-pointer hover:bg-[#1f2127] transition-colors"
            >
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <cat.icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cat.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                    passedCount === totalCount
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : passedCount > 0
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {passedCount} / {totalCount} تم اجتيازه
                </span>
                {isOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>

            {/* List of Tests */}
            {isOpen && (
              <div className="p-3 pt-0 border-t border-[#22242a] space-y-2.5 mt-1">
                {catTests.map((t) => (
                  <div key={t.id} className="flex items-start gap-2.5 pt-1">
                    {t.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : t.warning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-bold ${
                            t.passed
                              ? "text-slate-200"
                              : t.warning
                              ? "text-amber-300"
                              : "text-slate-300"
                          }`}
                        >
                          {t.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          +{t.points} نقطة
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
