import React from "react";
import { Sparkles, Tag } from "lucide-react";
import { SeoAnalysisReport } from "./RankMathScoreCalculator";

interface RankMathHeaderProps {
  report: SeoAnalysisReport;
  focusKeyword: string;
  setFocusKeyword: (v: string) => void;
}

export function RankMathHeader({
  report,
  focusKeyword,
  setFocusKeyword,
}: RankMathHeaderProps) {
  const scoreColor =
    report.score >= 80
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      : report.score >= 50
      ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
      : "text-red-400 bg-red-500/10 border-red-500/30";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#24262d]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>Rank Math SEO Suite</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                PRO
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              تحليل محركات البحث، معاينة Google Snippet، وإدارة المخططات المهيكلة.
            </p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2.5 self-start sm:self-auto ${scoreColor}`}>
          <div className="text-right">
            <span className="text-[10px] font-bold block text-slate-400">SEO Score</span>
            <span className="text-lg font-black font-mono leading-none">{report.score} / 100</span>
          </div>
          <span className="text-xs font-bold">
            {report.score >= 80 ? "ممتاز ✓" : report.score >= 50 ? "جيد ✎" : "يحتاج تحسين ⚠"}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-slate-300 font-bold flex items-center gap-1.5 text-xs">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          <span>الكلمة المفتاحية المستهدفة (Focus Keyword)</span>
        </label>
        <input
          type="text"
          value={focusKeyword}
          onChange={(e) => setFocusKeyword(e.target.value)}
          placeholder="مثال: طباعة أكياس ورقية، علب كرتون فاخرة..."
          className="w-full px-3.5 py-2.5 bg-[#17181c] border border-[#2a2d36] rounded-xl text-white text-xs focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
        />
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>عدد الكلمات: <strong className="text-white">{report.wordCount}</strong></span>
          <span>•</span>
          <span>زمن القراءة: <strong className="text-white">{report.readingTimeMinutes} دقائق</strong></span>
          <span>•</span>
          <span>الكثافة: <strong className="text-white">{report.keywordDensity}%</strong></span>
        </div>
      </div>
    </>
  );
}

export default RankMathHeader;
