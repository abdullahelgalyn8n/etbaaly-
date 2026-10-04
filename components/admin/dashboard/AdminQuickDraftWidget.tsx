"use client";

import React, { useState } from "react";
import { Pin, Save, Trash2 } from "lucide-react";

export default function AdminQuickDraftWidget() {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [drafts, setDrafts] = useState<Array<{ id: string; title: string; content: string; date: string }>>([
    {
      id: "d1",
      title: "ملاحظة لوردية المساء: سحب كراتين كرم الشام",
      content: "التأكد من مطابقة كود لون CMYK للأحمر واستخدام السلوفان المطفي المقاوم للبصمات.",
      date: "13 سبتمبر 2026",
    },
  ]);

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() && !draftContent.trim()) return;

    const newDraft = {
      id: `d-${Date.now()}`,
      title: draftTitle.trim() || "ملاحظة بدون عنوان",
      content: draftContent.trim(),
      date: new Date().toLocaleDateString("ar-EG", { day: "numeric", month: "long" }),
    };

    setDrafts([newDraft, ...drafts]);
    setDraftTitle("");
    setDraftContent("");
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] shadow-xs hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
        <span className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#c93b41]">
            <Pin className="w-3.5 h-3.5" />
          </div>
          <span>مسودة سريعة / ملاحظات الوردية (Quick Draft)</span>
        </span>
        <span className="text-[10px] text-slate-400">تدوين فوري</span>
      </div>

      <div className="p-5 text-xs">
        <form onSubmit={handleSaveDraft} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="العنوان (مثال: تنبيه بخصوص موعد تسليم شحنة الأكياس...)"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <textarea
              rows={3}
              placeholder="اكتب ملاحظاتك لوردية الطباعة أو التغليف..."
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="submit"
              className="btn-crimson px-4 py-2 text-white font-bold text-xs rounded-xl shadow-md shadow-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ المسودة</span>
            </button>
            <span className="text-[11px] text-slate-400">تحفظ محلياً وتظهر لك دائماً</span>
          </div>
        </form>

        {drafts.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              المسودات والملاحظات المحفوظة:
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {drafts.map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200/80 dark:border-white/[0.06] rounded-xl text-xs flex items-start justify-between gap-2.5"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {d.content}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5">{d.date}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteDraft(d.id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
                    title="حذف المسودة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
